'use server';

import { ObjectId } from 'mongodb';
import { getAgmReportsCollection, agmReportDocumentToAgmReport, agmReportToAgmReportDocument } from '../models/agm-report';
import { requireAuth } from '../auth';
import { uploadBlob, deleteBlob, isBlobUrl } from '../utils/blob-upload';
import { revalidatePath } from 'next/cache';

export interface AgmReport {
  id: string;
  title: string;
  year: number;
  description?: string;
  pdfUrl: string;
}

export async function createAgmReport(formData: FormData): Promise<{ success: boolean; error?: string; reportId?: string }> {
  try {
    await requireAuth();

    const title = formData.get('title') as string;
    const yearStr = formData.get('year') as string;
    const description = formData.get('description') as string | null;
    const pdfFile = formData.get('pdf') as File | null;

    // Validation
    if (!title || !yearStr || !pdfFile || pdfFile.size === 0) {
      return { success: false, error: 'Title, year, and PDF file are required' };
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year) || year < 1900 || year > 2100) {
      return { success: false, error: 'Invalid year' };
    }

    // Handle PDF upload (Vercel Blob)
    const pdfUrl = await uploadBlob(pdfFile, 'agm-reports');

    // Prepare report data
    const reportData = {
      title,
      year,
      description: description || undefined,
      pdfUrl,
    };

    const collection = await getAgmReportsCollection();
    const now = new Date();
    const result = await collection.insertOne({
      ...agmReportToAgmReportDocument(reportData),
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath('/agm-reports');
    revalidatePath('/admin/agm-reports');

    return { success: true, reportId: result.insertedId.toString() };
  } catch (error) {
    console.error('Error creating AGM report:', error);
    return { success: false, error: 'Failed to create AGM report' };
  }
}

export async function updateAgmReport(
  reportId: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    if (!ObjectId.isValid(reportId)) {
      return { success: false, error: 'Invalid report ID' };
    }

    const title = formData.get('title') as string;
    const yearStr = formData.get('year') as string;
    const description = formData.get('description') as string | null;
    const pdfFile = formData.get('pdf') as File | null;
    const deleteExistingPdf = formData.get('deleteExistingPdf') === 'true';

    // Validation
    if (!title || !yearStr) {
      return { success: false, error: 'Title and year are required' };
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year) || year < 1900 || year > 2100) {
      return { success: false, error: 'Invalid year' };
    }

    const collection = await getAgmReportsCollection();
    const existingReport = await collection.findOne({ _id: new ObjectId(reportId) });

    if (!existingReport) {
      return { success: false, error: 'Report not found' };
    }

    // Handle PDF upload (Vercel Blob)
    let pdfUrl: string = existingReport.pdfUrl;

    if (deleteExistingPdf && existingReport.pdfUrl) {
      if (isBlobUrl(existingReport.pdfUrl)) await deleteBlob(existingReport.pdfUrl);
      pdfUrl = '';
    }

    if (pdfFile && pdfFile.size > 0) {
      if (existingReport.pdfUrl && isBlobUrl(existingReport.pdfUrl)) {
        await deleteBlob(existingReport.pdfUrl);
      }
      pdfUrl = await uploadBlob(pdfFile, 'agm-reports');
    }

    if (!pdfUrl) {
      return { success: false, error: 'PDF file is required' };
    }

    // Prepare update data
    const updateData = {
      title,
      year,
      description: description || undefined,
      pdfUrl,
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(reportId) },
      { $set: updateData }
    );

    revalidatePath('/agm-reports');
    revalidatePath(`/agm-reports/${reportId}`);
    revalidatePath('/admin/agm-reports');

    return { success: true };
  } catch (error) {
    console.error('Error updating AGM report:', error);
    return { success: false, error: 'Failed to update AGM report' };
  }
}

export async function deleteAgmReport(reportId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();

    if (!ObjectId.isValid(reportId)) {
      return { success: false, error: 'Invalid report ID' };
    }

    const collection = await getAgmReportsCollection();
    const report = await collection.findOne({ _id: new ObjectId(reportId) });

    if (!report) {
      return { success: false, error: 'Report not found' };
    }

    // Delete associated PDF from Vercel Blob
    if (report.pdfUrl && isBlobUrl(report.pdfUrl)) {
      await deleteBlob(report.pdfUrl);
    }

    await collection.deleteOne({ _id: new ObjectId(reportId) });

    revalidatePath('/agm-reports');
    revalidatePath('/admin/agm-reports');

    return { success: true };
  } catch (error) {
    console.error('Error deleting AGM report:', error);
    return { success: false, error: 'Failed to delete AGM report' };
  }
}

export async function getAgmReports(): Promise<AgmReport[]> {
  try {
    await requireAuth();

    const collection = await getAgmReportsCollection();
    const reports = await collection.find({}).sort({ year: -1 }).toArray();
    return reports.map(agmReportDocumentToAgmReport);
  } catch (error) {
    console.error('Error fetching AGM reports:', error);
    return [];
  }
}

export async function getAgmReportById(reportId: string): Promise<AgmReport | null> {
  try {
    if (!ObjectId.isValid(reportId)) {
      return null;
    }

    const collection = await getAgmReportsCollection();
    const report = await collection.findOne({ _id: new ObjectId(reportId) });
    
    return report ? agmReportDocumentToAgmReport(report) : null;
  } catch (error) {
    console.error('Error fetching AGM report:', error);
    return null;
  }
}
