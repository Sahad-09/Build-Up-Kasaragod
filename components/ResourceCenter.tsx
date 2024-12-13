import { FileText, Download, Book, File, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

// Utility function to convert bytes to human-readable format
const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const ResourceCenter = () => {
    const [resources, setResources] = useState([
        {
            category: "Annual Reports",
            items: [
                {
                    title: "Annual Report 2022",
                    description: "Overview of achievements, financial performance, and initiatives for 2022.",
                    type: "PDF",
                    size: "Loading...",
                    downloadUrl: "/files/Annual Report 2022.pdf"
                },
                {
                    title: "Annual Report 2023",
                    description: "Progress and key milestones achieved in 2023.",
                    type: "PDF",
                    size: "Loading...",
                    downloadUrl: "/files/Annual Report 2023.pdf"
                },
                {
                    title: "Annual Report 2024",
                    description: "Highlights of achievements and strategic goals for 2024.",
                    type: "PDF",
                    size: "Loading...",
                    downloadUrl: "/files/Annual Report 2024.pdf"
                }
            ]
        },
        {
            category: "Organizational Statements",
            items: [
                {
                    title: "Vision and Mission Statements",
                    description: "Our core purpose, long-term aspirations, and strategic direction.",
                    type: "PDF",
                    size: "Loading...",
                    downloadUrl: "/files/Mission Vision.pdf"
                }
            ]
        }
    ]);

    useEffect(() => {
        const fetchFileSizes = async () => {
            const updatedResources = await Promise.all(
                resources.map(async (category) => ({
                    ...category,
                    items: await Promise.all(
                        category.items.map(async (item) => {
                            try {
                                const response = await fetch(item.downloadUrl, { method: 'HEAD' });
                                const size = response.headers.get('Content-Length');
                                return {
                                    ...item,
                                    size: size ? formatFileSize(parseInt(size)) : 'Unknown Size'
                                };
                            } catch (error) {
                                console.error(`Error fetching size for ${item.title}:`, error);
                                return {
                                    ...item,
                                    size: 'Unknown Size'
                                };
                            }
                        })
                    )
                }))
            );

            setResources(updatedResources);
        };

        fetchFileSizes();
    }, []);

    const handleDownload = (url: string) => {
        // Create an invisible anchor element
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = url.split('/').pop() ?? 'download'; // Extract file name from URL
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor); // Remove anchor after clicking
    };

    return (
        <div className="container mx-auto py-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <Book className="w-12 h-12 mx-auto mb-6 text-[#FBAA18]" />
                <h2 className="text-4xl font-bold mb-6">Resource Center</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Access our collection of resources, guides, and materials to support
                    community development and personal growth.
                </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {resources.map((category, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-xl font-semibold">
                                {category.category}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid gap-4">
                                    {category.items.map((resource, resourceIndex) => (
                                        <motion.div
                                            key={resourceIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: resourceIndex * 0.1 }}
                                        >
                                            <Card>
                                                <CardContent className="flex items-center justify-between p-6">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg mb-1">
                                                            {resource.title}
                                                        </h3>
                                                        <p className="text-muted-foreground">
                                                            {resource.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <File className="h-4 w-4" />
                                                                {resource.type}
                                                            </span>
                                                            <span>{resource.size}</span>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" className="ml-4" onClick={() => handleDownload(resource.downloadUrl)}>
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};