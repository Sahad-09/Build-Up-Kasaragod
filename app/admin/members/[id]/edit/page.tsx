import { requireAuth } from '@/lib/auth';
import { getMemberById } from '@/lib/actions/member-actions';
import { redirect } from 'next/navigation';
import MemberForm from '../../member-form';

interface EditMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMemberPage({ params }: EditMemberPageProps) {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  const { id } = await params;
  const member = await getMemberById(id);

  if (!member) {
    redirect('/admin/members');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Member</h1>
        <p className="text-muted-foreground">Update member details</p>
      </div>
      <MemberForm member={member} />
    </div>
  );
}
