import { requireAuth } from '@/lib/auth';
import { getAgmReports, type AgmReport } from '@/lib/actions/agm-report-actions';
import { redirect } from 'next/navigation';
import AgmReportsDashboardClient from './agm-reports-dashboard-client';

export default async function AgmReportsAdminPage() {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  let reports: AgmReport[] = [];
  try {
    reports = await getAgmReports();
  } catch (error) {
    console.error('Error loading AGM reports:', error);
  }

  return <AgmReportsDashboardClient reports={reports} />;
}
