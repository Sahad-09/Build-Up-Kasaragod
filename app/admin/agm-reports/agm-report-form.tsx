'use client';

import React, { useState, useRef } from 'react';
import { Save, X, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { createAgmReport, updateAgmReport } from '@/lib/actions/agm-report-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AgmReport {
  id: string;
  title: string;
  year: number;
  description?: string;
  pdfUrl: string;
}

interface AgmReportFormProps {
  report?: AgmReport;
}

export default function AgmReportForm({ report }: AgmReportFormProps) {
  const router = useRouter();
  const isEditing = !!report;
  
  const [formData, setFormData] = useState({
    title: report?.title || '',
    year: report?.year.toString() || new Date().getFullYear().toString(),
    description: report?.description || '',
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(report?.pdfUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      setPdfFile(file);
      setPdfPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('year', formData.year);
    formDataObj.append('description', formData.description);
    
    if (pdfFile) {
      formDataObj.append('pdf', pdfFile);
    }

    // Validation
    if (!formData.title || !formData.year) {
      setError('Title and year are required');
      setIsSubmitting(false);
      return;
    }

    if (!isEditing && !pdfFile) {
      setError('PDF file is required');
      setIsSubmitting(false);
      return;
    }

    try {
      let result;
      if (isEditing) {
        result = await updateAgmReport(report.id, formDataObj);
      } else {
        result = await createAgmReport(formDataObj);
      }

      if (result.success) {
        router.push('/admin/agm-reports');
        router.refresh();
      } else {
        setError(result.error || 'Failed to save AGM report');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An error occurred while saving the AGM report');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Card>
        <CardContent className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g., Annual General Meeting Report 2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
                min="1900"
                max="2100"
                placeholder="2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Enter a brief description of the AGM report"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdf">PDF File {!isEditing && '*'}</Label>
              <div className="flex items-center gap-4">
                <Input
                  ref={pdfInputRef}
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="flex-1"
                  required={!isEditing}
                />
                {pdfPreview && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <a
                      href={pdfPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {isEditing && !pdfFile ? 'View Current PDF' : 'Preview'}
                    </a>
                    {!isEditing && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setPdfFile(null);
                          setPdfPreview(null);
                          if (pdfInputRef.current) {
                            pdfInputRef.current.value = '';
                          }
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {isEditing ? 'Upload a new PDF to replace the existing one' : 'Upload the AGM report PDF file'}
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update AGM Report' : 'Create AGM Report'}
            </Button>
            <Link href="/admin/agm-reports">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
