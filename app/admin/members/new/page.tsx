import { requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MemberForm from '../member-form';

export default async function NewMemberPage() {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Add New Member</h1>
        <p className="text-muted-foreground">Add a new member to the About Us page</p>
      </div>
      <MemberForm />
    </div>
  );
}
