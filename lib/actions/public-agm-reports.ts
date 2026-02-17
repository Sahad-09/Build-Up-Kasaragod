'use server';

import { getAgmReportsCollection, agmReportDocumentToAgmReport } from '../models/agm-report';

export interface AgmReport {
  id: string;
  title: string;
  year: number;
  description?: string;
  pdfUrl: string;
}

export async function getPublicAgmReports(): Promise<AgmReport[]> {
  try {
    const collection = await getAgmReportsCollection();
    const reports = await collection.find({}).sort({ year: -1 }).toArray();
    return reports.map(agmReportDocumentToAgmReport);
  } catch (error) {
    console.error('Error fetching public AGM reports:', error);
    return [];
  }
}
