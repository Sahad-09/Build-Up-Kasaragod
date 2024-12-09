import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const UpcomingEventsSection = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    Upcoming Events
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Community Tech Workshop",
                            date: "April 15, 2024",
                            location: "Kasaragod Tech Hub",
                            description: "Learn basic computer skills and internet safety",
                        },
                        {
                            title: "Health Camp",
                            date: "April 20, 2024",
                            location: "Community Center",
                            description: "Free health check-ups and consultations",
                        },
                        {
                            title: "Environmental Drive",
                            date: "April 25, 2024",
                            location: "Kasaragod Beach",
                            description: "Beach cleaning and awareness program",
                        },
                    ].map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-medium">{event.date}</p>
                                    <p>{event.location}</p>
                                    <p className="mt-2">{event.description}</p>
                                    <Button className="mt-4 w-full">Register Now</Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
