'use server';

import { ObjectId } from 'mongodb';
import { getMembersCollection, memberDocumentToMember, memberToMemberDocument } from '../models/member';
import { requireAuth } from '../auth';
import { uploadBlob, deleteBlob, isBlobUrl } from '../utils/blob-upload';
import { revalidatePath } from 'next/cache';

export interface Member {
  id: string;
  name: string;
  position: string;
  image: string;
  fallback: string;
  bio?: string;
  achievements?: string[];
  category: 'Patron' | 'Core Team' | 'Vice President';
  order: number;
}

export async function createMember(formData: FormData): Promise<{ success: boolean; error?: string; memberId?: string }> {
  try {
    await requireAuth();

    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const category = formData.get('category') as 'Patron' | 'Core Team' | 'Vice President';
    const bio = formData.get('bio') as string | null;
    const achievementsStr = formData.get('achievements') as string | null;
    const orderEntry = formData.get('order');
    const orderStr = typeof orderEntry === 'string' ? orderEntry : null;
    const imageFile = formData.get('image') as File | null;

    // Validation
    if (!name || !position || !category) {
      return { success: false, error: 'Name, position, and category are required' };
    }

    const collection = await getMembersCollection();

    // Order: lower numbers appear first within a category.
    // If not provided, auto-place at the end of the chosen category.
    let order: number;
    if (orderStr && orderStr.trim() !== '') {
      order = parseInt(orderStr, 10);
      if (Number.isNaN(order) || order < 0) {
        return { success: false, error: 'Display Position must be a valid number' };
      }
    } else {
      const lastInCategory = await collection.findOne(
        { category },
        { sort: { order: -1 } }
      );
      order = (lastInCategory?.order ?? -1) + 1;
    }

    const achievements = achievementsStr ? achievementsStr.split('\n').filter(a => a.trim()) : undefined;

    // Generate fallback from name
    const fallback = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);

    // Handle image upload (Vercel Blob)
    let imagePath: string = '/placeholder-avatar.png';
    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadBlob(imageFile, 'members');
    }

    // Prepare member data
    const memberData = {
      name,
      position,
      category,
      image: imagePath,
      fallback,
      bio: bio || undefined,
      achievements,
      order,
    };

    const now = new Date();
    const result = await collection.insertOne({
      ...memberToMemberDocument(memberData),
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath('/about-us');
    revalidatePath('/admin/members');

    return { success: true, memberId: result.insertedId.toString() };
  } catch (error) {
    console.error('Error creating member:', error);
    return { success: false, error: 'Failed to create member' };
  }
}

export async function updateMember(
  memberId: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    if (!ObjectId.isValid(memberId)) {
      return { success: false, error: 'Invalid member ID' };
    }

    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const category = formData.get('category') as 'Patron' | 'Core Team' | 'Vice President';
    const bio = formData.get('bio') as string | null;
    const achievementsStr = formData.get('achievements') as string | null;
    const orderStr = formData.get('order') as string;
    const imageFile = formData.get('image') as File | null;
    const deleteExistingImage = formData.get('deleteExistingImage') === 'true';

    // Validation
    if (!name || !position || !category) {
      return { success: false, error: 'Name, position, and category are required' };
    }

    const collection = await getMembersCollection();
    const existingMember = await collection.findOne({ _id: new ObjectId(memberId) });

    if (!existingMember) {
      return { success: false, error: 'Member not found' };
    }

    const order = orderStr ? parseInt(orderStr, 10) : existingMember.order;
    const achievements = achievementsStr ? achievementsStr.split('\n').filter(a => a.trim()) : existingMember.achievements;

    // Generate fallback from name
    const fallback = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);

    // Handle image upload (Vercel Blob)
    let imagePath: string = existingMember.image;

    if (deleteExistingImage && existingMember.image && !existingMember.image.startsWith('/placeholder')) {
      if (isBlobUrl(existingMember.image)) await deleteBlob(existingMember.image);
      imagePath = '/placeholder-avatar.png';
    }

    if (imageFile && imageFile.size > 0) {
      if (existingMember.image && !existingMember.image.startsWith('/placeholder') && isBlobUrl(existingMember.image)) {
        await deleteBlob(existingMember.image);
      }
      imagePath = await uploadBlob(imageFile, 'members');
    }

    // Prepare update data
    const updateData = {
      name,
      position,
      category,
      image: imagePath,
      fallback,
      bio: bio || undefined,
      achievements: achievements && achievements.length > 0 ? achievements : undefined,
      order,
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(memberId) },
      { $set: updateData }
    );

    revalidatePath('/about-us');
    revalidatePath(`/about-us/${name.toLowerCase().replace(/\s+/g, '-')}`);
    revalidatePath('/admin/members');

    return { success: true };
  } catch (error) {
    console.error('Error updating member:', error);
    return { success: false, error: 'Failed to update member' };
  }
}

export async function deleteMember(memberId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    if (!ObjectId.isValid(memberId)) {
      return { success: false, error: 'Invalid member ID' };
    }

    const collection = await getMembersCollection();
    const member = await collection.findOne({ _id: new ObjectId(memberId) });

    if (!member) {
      return { success: false, error: 'Member not found' };
    }

    // Delete associated image from Vercel Blob
    if (member.image && !member.image.startsWith('/placeholder') && isBlobUrl(member.image)) {
      await deleteBlob(member.image);
    }

    await collection.deleteOne({ _id: new ObjectId(memberId) });

    revalidatePath('/about-us');
    revalidatePath('/admin/members');

    return { success: true };
  } catch (error) {
    console.error('Error deleting member:', error);
    return { success: false, error: 'Failed to delete member' };
  }
}

export async function getMembers(): Promise<Member[]> {
  try {
    await requireAuth();

    const collection = await getMembersCollection();
    const members = await collection.find({}).sort({ category: 1, order: 1 }).toArray();
    return members.map(memberDocumentToMember);
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

export async function getPublicMembers(): Promise<Member[]> {
  try {
    const collection = await getMembersCollection();
    const members = await collection.find({}).sort({ category: 1, order: 1 }).toArray();
    return members.map(memberDocumentToMember);
  } catch (error) {
    console.error('Error fetching public members:', error);
    return [];
  }
}

export async function getMemberById(memberId: string): Promise<Member | null> {
  try {
    if (!ObjectId.isValid(memberId)) {
      return null;
    }

    const collection = await getMembersCollection();
    const member = await collection.findOne({ _id: new ObjectId(memberId) });
    
    return member ? memberDocumentToMember(member) : null;
  } catch (error) {
    console.error('Error fetching member:', error);
    return null;
  }
}
