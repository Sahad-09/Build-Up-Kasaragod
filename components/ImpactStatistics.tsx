"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Heart, Target } from "lucide-react";

const ImpactStatistics = () => {
    const statistics = [
        { icon: Users, number: "500+", label: "Community Members" },
        { icon: Briefcase, number: "25", label: "Active Projects" },
        { icon: Heart, number: "10K+", label: "Lives Touched" },
        { icon: Target, number: "5", label: "Key Initiatives" },
        { icon: Users, number: "500+", label: "Community Members" },
        { icon: Briefcase, number: "25", label: "Active Projects" },
        { icon: Heart, number: "10K+", label: "Lives Touched" },
        { icon: Target, number: "5", label: "Key Initiatives" },
        { icon: Users, number: "500+", label: "Community Members" },
        { icon: Briefcase, number: "25", label: "Active Projects" },
        { icon: Heart, number: "10K+", label: "Lives Touched" },
        { icon: Target, number: "5", label: "Key Initiatives" },
        { icon: Users, number: "500+", label: "Community Members" },
        { icon: Briefcase, number: "25", label: "Active Projects" },
        { icon: Heart, number: "10K+", label: "Lives Touched" },
        { icon: Target, number: "5", label: "Key Initiatives" },
        { icon: Users, number: "500+", label: "Community Members" },
        { icon: Briefcase, number: "25", label: "Active Projects" },
        { icon: Heart, number: "10K+", label: "Lives Touched" },
        { icon: Target, number: "5", label: "Key Initiatives" },
    ];

    return (
        <div className="container mx-auto py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
                <p className="text-xl mb-12 text-muted-foreground">
                    Discover the incredible milestones achieved through our community efforts.
                </p>
            </motion.div>

            <motion.div
                className="flex gap-8"
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    x: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
                style={{
                    width: "200%", // Double width to accommodate duplicate items
                }}
            >
                {statistics.map((stat, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-80"
                    >
                        <Card
                            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            style={{
                                backgroundImage: `url('/grain.png')`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none"></div>
                            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                                <stat.icon className="h-12 w-12 mb-4 text-[#FBAA18]" />
                                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ImpactStatistics;
