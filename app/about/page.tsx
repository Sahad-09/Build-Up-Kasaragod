"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Users,
    Target,
    Flag,
    Shield,
    Book,
    Settings
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutUsPage = () => {
    const pageVariants = {
        initial: { opacity: 0, y: 50 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const officeBearers = [
        {
            name: "John Doe",
            position: "Founder & Chairman",
            image: "/api/placeholder/300/300",
            fallback: "JD"
        },
        {
            name: "Jane Smith",
            position: "Executive Director",
            image: "/api/placeholder/300/300",
            fallback: "JS"
        },
        {
            name: "Michael Johnson",
            position: "Chief Operations Officer",
            image: "/api/placeholder/300/300",
            fallback: "MJ"
        }
    ];

    const sectionData = [
        {
            title: "Mission",
            icon: Target,
            color: "text-blue-500",
            content: "To empower local communities, drive sustainable development, and create lasting positive impact in Kasaragod through collaborative and innovative approaches."
        },
        {
            title: "Vision",
            icon: Flag,
            color: "text-green-500",
            content: "To establish Kasaragod as a model of holistic, community-led development that balances economic growth, social welfare, and environmental sustainability."
        }
    ];

    const detailSections = [
        {
            title: "Core Values",
            icon: Shield,
            color: "text-purple-500",
            items: [
                "Community Empowerment",
                "Transparency",
                "Sustainable Development",
                "Inclusivity",
                "Innovation"
            ]
        },
        {
            title: "Principles",
            icon: Book,
            color: "text-yellow-500",
            items: [
                "Collaborative Decision Making",
                "Cultural Respect",
                "Environmental Stewardship",
                "Continuous Learning",
                "Ethical Governance"
            ]
        },
        {
            title: "Policies",
            icon: Settings,
            color: "text-red-500",
            items: [
                "Financial Transparency",
                "Equal Opportunity",
                "Sustainable Resources",
                "Community Participation",
                "Impact Assessment"
            ]
        }
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="container mx-auto px-4 py-8 space-y-8"
        >
            <h1 className="text-4xl font-bold text-center mb-12">
                About Build Up Kasaragod
            </h1>

            {/* Office Bearers */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-indigo-500" />
                        Office Bearers
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    {officeBearers.map((bearer, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center space-y-3"
                        >
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={bearer.image} alt={bearer.name} />
                                <AvatarFallback>{bearer.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <p className="font-semibold">{bearer.name}</p>
                                <Badge variant="secondary">{bearer.position}</Badge>
                            </div>
                        </motion.div>
                    ))}
                </CardContent>
            </Card>

            {/* Mission and Vision */}
            <div className="grid md:grid-cols-2 gap-6">
                {sectionData.map(({ title, icon: Icon, color, content }, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Icon className={`h-6 w-6 ${color}`} />
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Core Values, Principles, Policies */}
            <div className="grid md:grid-cols-3 gap-6">
                {detailSections.map(({ title, icon: Icon, color, items }, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Icon className={`h-6 w-6 ${color}`} />
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 list-disc pl-4">
                                {items.map((item, idx) => (
                                    <li key={idx} className="text-muted-foreground">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </motion.div>
    );
};

export default AboutUsPage;
