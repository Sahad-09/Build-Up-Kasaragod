'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload, Plus } from 'lucide-react';
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
import { createEvent, updateEvent } from '@/lib/actions/event-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  description: string;
  image?: string;
  additionalImages?: string[];
  category: 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
  additionalLink?: {
    url: string;
    text: string;
  };
}

interface EventFormProps {
  event?: Event;
}

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const isEditing = !!event;
  
  const [formData, setFormData] = useState({
    title: event?.title || '',
    date: event ? new Date(event.date).toISOString().split('T')[0] : '',
    location: event?.location || '',
    description: event?.description || '',
    category: event?.category || 'Community' as const,
    additionalLinkUrl: event?.additionalLink?.url || '',
    additionalLinkText: event?.additionalLink?.text || '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(event?.image || null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>(event?.additionalImages || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const additionalImageInputRef = useRef<HTMLInputElement>(null);

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

  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAdditionalImages((prev) => [...prev, ...files]);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('date', formData.date);
    formDataObj.append('location', formData.location);
    formDataObj.append('description', formData.description);
    formDataObj.append('category', formData.category);
    
    if (imageFile) {
      formDataObj.append('image', imageFile);
    }
    
    if (isEditing && !imageFile && !imagePreview) {
      formDataObj.append('deleteExistingImage', 'true');
    }

    additionalImages.forEach((file, index) => {
      formDataObj.append(`additionalImage${index}`, file);
    });

    if (formData.additionalLinkUrl && formData.additionalLinkText) {
      formDataObj.append('additionalLinkUrl', formData.additionalLinkUrl);
      formDataObj.append('additionalLinkText', formData.additionalLinkText);
    }

    try {
      let result;
      if (isEditing) {
        result = await updateEvent(event.id, formDataObj);
      } else {
        result = await createEvent(formDataObj);
      }

      if (result.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(result.error || 'Failed to save event');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An error occurred while saving the event');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Card>
        <CardContent className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Enter event title"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National') => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Community">Community</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              placeholder="Enter event location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={5}
              placeholder="Enter event description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Main Image</Label>
            <div className="flex gap-4">
              <Input
                ref={imageInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              {imagePreview && (
                <div className="relative w-32 h-32">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      if (imageInputRef.current) {
                        imageInputRef.current.value = '';
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Images</Label>
            <Input
              ref={additionalImageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImageChange}
            />
            {additionalImagePreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {additionalImagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-full aspect-square">
                    <img
                      src={preview}
                      alt={`Additional ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeAdditionalImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Additional Link (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="additionalLinkUrl">Link URL</Label>
                <Input
                  id="additionalLinkUrl"
                  type="url"
                  value={formData.additionalLinkUrl}
                  onChange={(e) => setFormData({ ...formData, additionalLinkUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalLinkText">Link Text</Label>
                <Input
                  id="additionalLinkText"
                  value={formData.additionalLinkText}
                  onChange={(e) => setFormData({ ...formData, additionalLinkText: e.target.value })}
                  placeholder="Click here"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
            </Button>
            <Link href="/admin">
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
