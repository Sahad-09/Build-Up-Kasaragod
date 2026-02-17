import { requireAuth } from '@/lib/auth';
import { getAgmReportById } from '@/lib/actions/agm-report-actions';
import { redirect } from 'next/navigation';
import AgmReportForm from '../../agm-report-form';

interface EditAgmReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAgmReportPage({ params }: EditAgmReportPageProps) {
  try {
    await requireAuth();
  } catch {
    redirect('/admin/login');
  }

  const { id } = await params;
  const report = await getAgmReportById(id);

  if (!report) {
    redirect('/admin/agm-reports');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit AGM Report</h1>
        <p className="text-muted-foreground">Update AGM report details</p>
      </div>
      <AgmReportForm report={report} />
    </div>
  );
}
