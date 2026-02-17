import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../mongodb';

export interface AgmReportDocument {
  _id?: ObjectId;
  title: string;
  year: number;
  description?: string;
  pdfUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgmReport {
  id: string;
  title: string;
  year: number;
  description?: string;
  pdfUrl: string;
}

const COLLECTION_NAME = 'agm-reports';

export async function getAgmReportsCollection() {
  const { db } = await connectToDatabase();
  return db.collection<AgmReportDocument>(COLLECTION_NAME);
}

export function agmReportDocumentToAgmReport(doc: AgmReportDocument): AgmReport {
  return {
    id: doc._id?.toString() || '',
    title: doc.title,
    year: doc.year,
    description: doc.description,
    pdfUrl: doc.pdfUrl,
  };
}

export function agmReportToAgmReportDocument(report: Omit<AgmReport, 'id'>): Omit<AgmReportDocument, '_id' | 'createdAt' | 'updatedAt'> {
  return {
    title: report.title,
    year: report.year,
    description: report.description,
    pdfUrl: report.pdfUrl,
  };
}
