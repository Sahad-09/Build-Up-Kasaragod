import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Heart,
    GraduationCap,
    Sprout,
    Users,
    Laptop,
    Building2
} from 'lucide-react';

// ... (previous imports and code remain the same until after the Explore button)

export const WhatWeDoSection = () => {
    return (
        <div className="container mx-auto py-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold mb-6">What We Do?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Our initiatives focus on sustainable development and community empowerment through various targeted programs.
                </p>
            </motion.div>

            <Tabs defaultValue="education" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                    <TabsTrigger value="environment">Environment</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="technology">Technology</TabsTrigger>
                    <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                </TabsList>

                <div className="mt-8">
                    <TabsContent value="education">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-6 w-6" />
                                    Educational Initiatives
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <li>• Free tutoring programs for underprivileged students</li>
                                    <li>• Digital literacy workshops for all age groups</li>
                                    <li>• Career guidance and mentorship programs</li>
                                    <li>• School infrastructure improvement projects</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="healthcare">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-6 w-6" />
                                    Healthcare Access
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <li>• Mobile health clinics for remote areas</li>
                                    <li>• Health awareness campaigns</li>
                                    <li>• Medical camps and check-ups</li>
                                    <li>• Mental health support programs</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="environment">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sprout className="h-6 w-6" />
                                    Environmental Conservation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <li>• Tree plantation drives</li>
                                    <li>• Promoting renewable energy solutions</li>
                                    <li>• Community waste management programs</li>
                                    <li>• Conservation of natural habitats</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="skills">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-6 w-6" />
                                    Skills Development
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <li>• Vocational training programs</li>
                                    <li>• Entrepreneurship workshops</li>
                                    <li>• Hands-on technical skill development</li>
                                    <li>• Career-oriented certifications</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="technology">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Laptop className="h-6 w-6" />
                                    Technological Advancements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <li>• Building tech labs in schools</li>
                                    <li>• Coding bootcamps for beginners</li>
                                    <li>• Access to modern digital tools</li>
                                    <li>• Initiatives for AI and robotics education</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="infrastructure">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-6 w-6" />
                                    Infrastructure Development
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <li>• Building schools and healthcare facilities</li>
                                    <li>• Enhancing rural transportation networks</li>
                                    <li>• Providing clean water and sanitation</li>
                                    <li>• Supporting urban community centers</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    );
};

