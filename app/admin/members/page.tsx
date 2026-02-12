import { requireAuth } from '@/lib/auth';
import { getMembers, type Member } from '@/lib/actions/member-actions';
import { redirect } from 'next/navigation';
import MembersDashboardClient from './members-dashboard-client';

export default async function MembersAdminPage() {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  let members: Member[] = [];
  try {
    members = await getMembers();
  } catch (error) {
    console.error('Error loading members:', error);
  }

  return <MembersDashboardClient members={members} />;
}
