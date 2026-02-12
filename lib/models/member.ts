import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../mongodb';

export interface MemberDocument {
  _id?: ObjectId;
  name: string;
  position: string;
  image: string;
  fallback: string;
  bio?: string;
  achievements?: string[];
  category: 'Patron' | 'Core Team' | 'Vice President';
  order: number; // For sorting within category
  createdAt: Date;
  updatedAt: Date;
}

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

const COLLECTION_NAME = 'members';

export async function getMembersCollection() {
  const { db } = await connectToDatabase();
  return db.collection<MemberDocument>(COLLECTION_NAME);
}

export function memberDocumentToMember(doc: MemberDocument): Member {
  return {
    id: doc._id?.toString() || '',
    name: doc.name,
    position: doc.position,
    image: doc.image,
    fallback: doc.fallback,
    bio: doc.bio,
    achievements: doc.achievements,
    category: doc.category,
    order: doc.order,
  };
}

export function memberToMemberDocument(member: Omit<Member, 'id'>): Omit<MemberDocument, '_id' | 'createdAt' | 'updatedAt'> {
  return {
    name: member.name,
    position: member.position,
    image: member.image,
    fallback: member.fallback,
    bio: member.bio,
    achievements: member.achievements,
    category: member.category,
    order: member.order,
  };
}
