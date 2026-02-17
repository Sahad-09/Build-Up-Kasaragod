"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar } from "lucide-react";
import { getPublicAgmReports } from "@/lib/actions/public-agm-reports";

interface AgmReport {
  id: string;
  title: string;
  year: number;
  description?: string;
  pdfUrl: string;
}

const AgmReportsPage: React.FC = () => {
  const [reports, setReports] = useState<AgmReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await getPublicAgmReports();
        setReports(data);
      } catch (error) {
        console.error('Error loading AGM reports:', error);
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadReports();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-muted-foreground">Loading AGM Reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">AGM Reports</h1>
        <p className="text-muted-foreground text-lg">
          Annual General Meeting Reports and Documentation
        </p>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No AGM reports available at this time.</p>
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
                  <CardTitle className="text-xl">{report.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  {report.description && (
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {report.description}
                    </p>
                  )}
                  <a
                    href={report.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full" variant="default">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgmReportsPage;
