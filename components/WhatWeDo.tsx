import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Heart,
    GraduationCap,
    Sprout,
    Users,
    Laptop,
    Building2,
    Lightbulb,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const initiatives = [
    {
        id: 'education',
        title: 'Educational Initiatives',
        icon: GraduationCap,
        color: 'text-blue-500 border-blue-500',
        items: [
            'Free tutoring programs for underprivileged students',
            'Digital literacy workshops for all age groups',
            'Career guidance and mentorship programs',
            'School infrastructure improvement projects'
        ]
    },
    {
        id: 'healthcare',
        title: 'Healthcare Access',
        icon: Heart,
        color: 'text-red-500 border-red-500',
        items: [
            'Mobile health clinics for remote areas',
            'Health awareness campaigns',
            'Medical camps and check-ups',
            'Mental health support programs'
        ]
    },
    {
        id: 'environment',
        title: 'Environmental Conservation',
        icon: Sprout,
        color: 'text-green-500 border-green-500',
        items: [
            'Tree plantation drives',
            'Promoting renewable energy solutions',
            'Community waste management programs',
            'Conservation of natural habitats'
        ]
    },
    {
        id: 'skills',
        title: 'Skills Development',
        icon: Users,
        color: 'text-yellow-500 border-yellow-500',
        items: [
            'Vocational training programs',
            'Entrepreneurship workshops',
            'Hands-on technical skill development',
            'Career-oriented certifications'
        ]
    },
    {
        id: 'technology',
        title: 'Technological Advancements',
        icon: Laptop,
        color: 'text-purple-500 border-purple-500',
        items: [
            'Building tech labs in schools',
            'Coding bootcamps for beginners',
            'Access to modern digital tools',
            'Initiatives for AI and robotics education'
        ]
    },
    {
        id: 'infrastructure',
        title: 'Infrastructure Development',
        icon: Building2,
        color: 'text-orange-500 border-orange-500',
        items: [
            'Building schools and healthcare facilities',
            'Enhancing rural transportation networks',
            'Providing clean water and sanitation',
            'Supporting urban community centers'
        ]
    }
];

export const WhatWeDoSection = () => {
    const [activeInitiative, setActiveInitiative] = useState(initiatives[0].id);
    const [isHovering, setIsHovering] = useState<string | null>(null);


    return (

        <div className="container mx-auto py-16 px-4">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-16 space-y-6">
                    <div className="relative inline-block">
                        <Lightbulb className="w-16 h-16 text-[#FBAA18]" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        What We Do?
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Our initiatives focus on sustainable development and community empowerment through various targeted programs.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
                    {/* Initiative Selector */}
                    <div className="lg:col-span-4 space-y-3">
                        {initiatives.map((initiative) => {
                            const Icon = initiative.icon;
                            const isActive = activeInitiative === initiative.id;
                            return (
                                <div
                                    key={initiative.id}
                                    className={`cursor-pointer transition-all duration-300 ${isActive ? 'scale-102' : 'hover:scale-101'
                                        }`}
                                    onMouseEnter={() => setIsHovering(initiative.id)}
                                    onMouseLeave={() => setIsHovering(null)}
                                    onClick={() => setActiveInitiative(initiative.id)}
                                >
                                    <Card className={`border-l-4 ${isActive ? `${initiative.color} border-l-8` : 'border-transparent'
                                        } transition-all duration-300 hover:shadow-md`}>
                                        <CardContent className="flex items-center p-4">
                                            <Icon className={`h-6 w-6 ${initiative.color}`} />
                                            <span className="ml-4 font-medium flex-grow">
                                                {initiative.title}
                                            </span>
                                            <ChevronRight className={`h-5 w-5 transform transition-transform duration-300 ${isActive || isHovering === initiative.id ? 'translate-x-1 opacity-100' : 'opacity-0'
                                                } ${initiative.color}`} />
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

                    {/* Content Display */}
                    <div className="lg:col-span-8">
                        {initiatives.map((initiative) => {
                            const Icon = initiative.icon;
                            return (
                                <div
                                    key={initiative.id}
                                    className={`transition-all duration-500 ${activeInitiative === initiative.id
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-4 hidden'
                                        }`}
                                >
                                    <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <Icon className={`h-6 w-6 ${initiative.color}`} />
                                                {initiative.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-4">
                                                {initiative.items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-4 p-4  transition-colors duration-300"
                                                    >
                                                        <div className={`w-1 h-1 rounded-full mt-2 border ${initiative.color}`} />
                                                        <p className="flex-grow">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div >
        </div>
    );
};

export default WhatWeDoSection;