import { requireAuth } from '@/lib/auth';
import { getEventById } from '@/lib/actions/event-actions';
import { redirect } from 'next/navigation';
import EventForm from '../../event-form';

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    redirect('/admin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Event</h1>
        <p className="text-muted-foreground">Update event details</p>
      </div>
      <EventForm event={event} />
    </div>
  );
}
