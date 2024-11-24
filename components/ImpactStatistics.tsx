"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const ImpactStatistics = () => {
    const statistics = [
        { number: "500+", label: "Community Members" },
        { number: "25", label: "Active Projects" },
        { number: "10K+", label: "Lives Touched" },
        { number: "5", label: "Key Initiatives" },
    ];

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8">
                {statistics.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Card
                            className="relative overflow-hidden"
                            style={{
                                backgroundImage: `url('/grain.png')`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none"></div>
                            <CardContent className="flex flex-col items-center justify-center p-16">
                                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ImpactStatistics;
