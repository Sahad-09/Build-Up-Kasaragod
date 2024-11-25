"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, GraduationCap, Heart, Lightbulb, Users } from "lucide-react";

// Define the type for the scholarship names (as string literals)
type ScholarshipName =
    | "Merit-Based Scholarship"
    | "Need-Based Scholarship"
    | "STEM Scholarship"
    | "Women in Tech Scholarship";

// Type for scholarship data
interface Scholarship {
    name: ScholarshipName;
    description: string;
    eligibility: string;
    amount: string;
    link: string;
}

// Type the getScholarshipIcon function argument as ScholarshipName
const getScholarshipIcon = (name: ScholarshipName): JSX.Element | null => {
    switch (name) {
        case "Merit-Based Scholarship":
            return (
                <div className="p-2 w-fit rounded-lg bg-blue-100 dark:bg-blue-950">
                    <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
            );
        case "Need-Based Scholarship":
            return (
                <div className="p-2 w-fit rounded-lg bg-green-100 dark:bg-green-950">
                    <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
            );
        case "STEM Scholarship":
            return (
                <div className="p-2 w-fit rounded-lg bg-purple-100 dark:bg-purple-950">
                    <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
            );
        case "Women in Tech Scholarship":
            return (
                <div className="p-2 w-fit rounded-lg bg-pink-100 dark:bg-pink-950">
                    <Users className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
            );
        default:
            return null;
    }
};

// Define the scholarships array with the Scholarship type
const scholarships: Scholarship[] = [
    {
        name: "Merit-Based Scholarship",
        description: "Awarded to students with exceptional academic achievements.",
        eligibility: "Students with a GPA of 3.8 or higher.",
        amount: "$5,000 per year",
        link: "/apply/merit-based",
    },
    {
        name: "Need-Based Scholarship",
        description: "Supports students from low-income families.",
        eligibility: "Family income less than $40,000 annually.",
        amount: "$3,000 per year",
        link: "/apply/need-based",
    },
    {
        name: "STEM Scholarship",
        description: "For students pursuing degrees in Science, Technology, Engineering, or Mathematics.",
        eligibility: "Must be enrolled in a STEM-related program.",
        amount: "$4,000 per year",
        link: "/apply/stem-scholarship",
    },
    {
        name: "Women in Tech Scholarship",
        description: "Empowering women in the field of technology.",
        eligibility: "Female students enrolled in tech programs.",
        amount: "$5,000 per year",
        link: "/apply/women-in-tech",
    },
];

const MotionCard = motion(Card);

const ScholarshipsPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header Section */}
            <motion.div
                className="space-y-4 text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold tracking-tight">Scholarships</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore a variety of scholarships designed to support your academic and career aspirations.
                </p>
            </motion.div>

            {/* Scholarships Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarships.map((scholarship, index) => (
                    <MotionCard
                        key={index}
                        className="group transition-all duration-300"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                        }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <CardHeader>
                            <motion.div
                                className="mb-4"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + index * 0.1,
                                    type: "spring",
                                    stiffness: 200,
                                }}
                            >
                                {getScholarshipIcon(scholarship.name)}
                            </motion.div>
                            <CardTitle>{scholarship.name}</CardTitle>
                            <CardDescription>{scholarship.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border rounded-lg p-4">
                                <p className="font-semibold mb-2">Eligibility:</p>
                                <p className="text-muted-foreground">{scholarship.eligibility}</p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <p className="font-semibold mb-2">Amount:</p>
                                <p className="text-muted-foreground">{scholarship.amount}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <motion.a
                                href={scholarship.link}
                                className="inline-flex items-center"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                Apply Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </motion.a>
                        </CardFooter>
                    </MotionCard>
                ))}
            </div>
        </div>
    );
};

export default ScholarshipsPage;
