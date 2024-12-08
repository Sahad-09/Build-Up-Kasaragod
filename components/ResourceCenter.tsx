import {
    FileText,
    Download,
    Book,
    File,
    Mail,
    ArrowRight,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import {
    Card,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export const ResourceCenter = () => {
    const resources = [
        {
            category: "Educational Materials",
            items: [
                {
                    title: "Digital Literacy Guide",
                    description: "Basic computer and internet skills handbook",
                    type: "PDF",
                    size: "2.5 MB"
                },
                {
                    title: "Career Development Workbook",
                    description: "Interactive workbook for career planning",
                    type: "PDF",
                    size: "1.8 MB"
                }
            ]
        },
        {
            category: "Community Guidelines",
            items: [
                {
                    title: "Volunteer Handbook",
                    description: "Guidelines and best practices for volunteers",
                    type: "PDF",
                    size: "1.2 MB"
                },
                {
                    title: "Project Planning Template",
                    description: "Template for community project proposals",
                    type: "DOCX",
                    size: "500 KB"
                }
            ]
        },
        {
            category: "Health Resources",
            items: [
                {
                    title: "Health Awareness Guide",
                    description: "Common health issues and preventive measures",
                    type: "PDF",
                    size: "3.1 MB"
                },
                {
                    title: "Mental Health Support Directory",
                    description: "List of mental health resources and contacts",
                    type: "PDF",
                    size: "1.5 MB"
                }
            ]
        }
    ];

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
                                                    <Button variant="outline" className="ml-4">
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
