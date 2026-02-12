'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { deleteEvent } from '@/lib/actions/event-actions';
import { logoutAdmin } from '@/lib/actions/admin-auth';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  title: string;
  date: Date | string;
  location: string;
  description: string;
  image?: string;
  category: 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
}

interface AdminDashboardClientProps {
  events: Event[];
}

export default function AdminDashboardClient({ events }: AdminDashboardClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setDeletingId(eventId);
    const result = await deleteEvent(eventId);
    setDeletingId(null);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Failed to delete event');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage events and members for Build Up Kasaragod</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/members">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Members
            </Button>
          </Link>
          <Link href="/admin/events/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Event
            </Button>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No events found.</p>
            <Link href="/admin/events/new">
              <Button>Create Your First Event</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            // Ensure we have a valid event ID
            if (!event.id) {
              console.warn('Event missing ID:', event);
              return null;
            }
            
            const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  {event.image && (
                    <div className="w-full h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit mt-2">
                      {event.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {eventDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/events/${event.id}/edit`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
                        disabled={deletingId === event.id}
                        className="flex-1"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === event.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
