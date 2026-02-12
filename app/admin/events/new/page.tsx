import { requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import EventForm from '../event-form';

export default async function NewEventPage() {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="text-muted-foreground">Add a new event to the website</p>
      </div>
      <EventForm />
    </div>
  );
}
