import { requireAuth } from '@/lib/auth';
import { getEvents } from '@/lib/actions/event-actions';
import type { Event } from '@/lib/models/event';
import AdminDashboardClient from './admin-dashboard-client';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  let events: Event[] = [];
  try {
    events = await getEvents();
    // Convert date strings to Date objects for proper display
    events = events.map(event => ({
      ...event,
      date: event.date instanceof Date ? event.date : new Date(event.date),
    }));
  } catch (error) {
    console.error('Error loading events:', error);
  }

  return <AdminDashboardClient events={events} />;
}
