'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, FileText, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { deleteAgmReport } from '@/lib/actions/agm-report-actions';
import { useRouter } from 'next/navigation';

interface AgmReport {
  id: string;
  title: string;
  year: number;
  description?: string;
  pdfUrl: string;
}

interface AgmReportsDashboardClientProps {
  reports: AgmReport[];
}

export default function AgmReportsDashboardClient({ reports }: AgmReportsDashboardClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this AGM report?')) {
      return;
    }

    setDeletingId(reportId);
    const result = await deleteAgmReport(reportId);
    setDeletingId(null);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Failed to delete AGM report');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Manage AGM Reports</h1>
          <p className="text-muted-foreground">Manage Annual General Meeting Reports</p>
        </div>
        <Link href="/admin/agm-reports/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New AGM Report
          </Button>
        </Link>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No AGM reports found.</p>
            <Link href="/admin/agm-reports/new">
              <Button>Create Your First AGM Report</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{report.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  {report.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {report.description}
                    </p>
                  )}
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/admin/agm-reports/${report.id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(report.id)}
                      disabled={deletingId === report.id}
                      className="flex-1"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {deletingId === report.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
