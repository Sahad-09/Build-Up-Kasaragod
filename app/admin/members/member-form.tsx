'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createMember, updateMember } from '@/lib/actions/member-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Member {
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

interface MemberFormProps {
  member?: Member;
}

export default function MemberForm({ member }: MemberFormProps) {
  const router = useRouter();
  const isEditing = !!member;
  
  const [formData, setFormData] = useState({
    name: member?.name || '',
    position: member?.position || '',
    category: member?.category || 'Patron' as const,
    bio: member?.bio || '',
    achievements: member?.achievements?.join('\n') || '',
    order: member?.order.toString() || '0',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(member?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('position', formData.position);
    formDataObj.append('category', formData.category);
    formDataObj.append('bio', formData.bio);
    formDataObj.append('achievements', formData.achievements);
    formDataObj.append('order', formData.order);
    
    if (imageFile) {
      formDataObj.append('image', imageFile);
    }
    
    if (isEditing && !imageFile && !imagePreview) {
      formDataObj.append('deleteExistingImage', 'true');
    }

    try {
      let result;
      if (isEditing) {
        result = await updateMember(member.id, formDataObj);
      } else {
        result = await createMember(formDataObj);
      }

      if (result.success) {
        router.push('/admin/members');
        router.refresh();
      } else {
        setError(result.error || 'Failed to save member');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An error occurred while saving the member');
      setIsSubmitting(false);
    }
  };

  // Generate fallback from name
  const fallback = formData.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Card>
        <CardContent className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter member name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                  placeholder="e.g., President, Vice President"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: 'Patron' | 'Core Team' | 'Vice President') => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Patron">Patron</SelectItem>
                      <SelectItem value="Core Team">Core Team</SelectItem>
                      <SelectItem value="Vice President">Vice President</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    min="0"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <Label>Profile Image</Label>
              <Avatar className="w-32 h-32">
                <AvatarImage src={imagePreview || '/placeholder-avatar.png'} alt="Preview" />
                <AvatarFallback>{fallback || 'IMG'}</AvatarFallback>
              </Avatar>
              <Input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {imagePreview && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    if (imageInputRef.current) {
                      imageInputRef.current.value = '';
                    }
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove Image
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio (Optional)</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder="Enter member biography"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements (Optional)</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              rows={6}
              placeholder="Enter achievements, one per line"
            />
            <p className="text-xs text-muted-foreground">Enter each achievement on a new line</p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Member' : 'Create Member'}
            </Button>
            <Link href="/admin/members">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
