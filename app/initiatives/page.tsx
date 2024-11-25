"use client";
import React from "react";
import {
    ArrowRight,
    Users,
    Trees,
    Heart,
    BookOpen,
    Laptop,
    ShieldCheck,
    School,
    Globe,
    Stethoscope,
    PenTool,
    Rocket,
    CloudRain,
    Factory
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react"; // Import this type if needed

// Types
type Initiative = {
    title: string;
    description: string;
    impact: string;
    link: string;
};

type IconMap = {
    [key: string]: {
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;  // Ensure this type accepts 'className'
        bgColor: string;
        textColor: string;
        darkBgColor: string;
        darkTextColor: string;
    };
};


const iconMap: IconMap = {
    // Digital Literacy Initiatives
    "Digital Literacy for All": {
        icon: Users,
        bgColor: "blue-100",
        textColor: "blue-600",
        darkBgColor: "blue-950",
        darkTextColor: "blue-400"
    },
    "Rural Internet Connectivity": {
        icon: Globe,
        bgColor: "teal-100",
        textColor: "teal-600",
        darkBgColor: "teal-950",
        darkTextColor: "teal-400"
    },
    "Cybersecurity Awareness": {
        icon: ShieldCheck,
        bgColor: "purple-100",
        textColor: "purple-600",
        darkBgColor: "purple-950",
        darkTextColor: "purple-400"
    },

    // Environmental Initiatives
    "Green Earth Initiative": {
        icon: Trees,
        bgColor: "emerald-100",
        textColor: "emerald-600",
        darkBgColor: "emerald-950",
        darkTextColor: "emerald-400"
    },
    "Urban Gardening Project": {
        icon: CloudRain,
        bgColor: "green-100",
        textColor: "green-600",
        darkBgColor: "green-950",
        darkTextColor: "green-400"
    },
    "Sustainable Manufacturing": {
        icon: Factory,
        bgColor: "lime-100",
        textColor: "lime-600",
        darkBgColor: "lime-950",
        darkTextColor: "lime-400"
    },

    // Health Initiatives
    "Health Awareness Drive": {
        icon: Heart,
        bgColor: "red-100",
        textColor: "red-600",
        darkBgColor: "red-950",
        darkTextColor: "red-400"
    },
    "Mental Health Support": {
        icon: Stethoscope,
        bgColor: "pink-100",
        textColor: "pink-600",
        darkBgColor: "pink-950",
        darkTextColor: "pink-400"
    },
    "Community Health Clinics": {
        icon: School,
        bgColor: "rose-100",
        textColor: "rose-600",
        darkBgColor: "rose-950",
        darkTextColor: "rose-400"
    },

    // Skills & Education Initiatives
    "Skill Development Workshops": {
        icon: BookOpen,
        bgColor: "indigo-100",
        textColor: "indigo-600",
        darkBgColor: "indigo-950",
        darkTextColor: "indigo-400"
    },
    "Youth Entrepreneurship": {
        icon: PenTool,
        bgColor: "orange-100",
        textColor: "orange-600",
        darkBgColor: "orange-950",
        darkTextColor: "orange-400"
    },
    "Tech for Education": {
        icon: Laptop,
        bgColor: "cyan-100",
        textColor: "cyan-600",
        darkBgColor: "cyan-950",
        darkTextColor: "cyan-400"
    },

    // Innovation Initiatives
    "Innovation Accelerator": {
        icon: Rocket,
        bgColor: "amber-100",
        textColor: "amber-600",
        darkBgColor: "amber-950",
        darkTextColor: "amber-400"
    }
};

const getInitiativeIcon = (title: string) => {
    const { icon: Icon, bgColor, textColor, darkBgColor, darkTextColor } = iconMap[title] || {};

    return Icon ? (
        <div className={`p-2 w-fit rounded-lg bg-${bgColor} dark:bg-${darkBgColor}`}>
            <Icon className={`h-8 w-8 text-${textColor} dark:text-${darkTextColor}`} />
        </div>
    ) : null;
};

const initiativesByYear: { [key: number]: Initiative[] } = {
    2020: [
        {
            title: "Digital Literacy for All",
            description: "Empowering individuals with essential digital skills to thrive in the modern world.",
            impact: "Trained over 5,000 individuals in rural areas.",
            link: "/initiatives/digital-literacy-2020"
        },
        {
            title: "Green Earth Initiative",
            description: "A campaign to promote tree plantation and sustainable living practices.",
            impact: "Planted 15,000 trees across 8 cities.",
            link: "/initiatives/green-earth-2020"
        },
        {
            title: "Health Awareness Drive",
            description: "Providing free health check-ups and awareness programs in underserved areas.",
            impact: "Benefited over 6,000 people through health camps.",
            link: "/initiatives/health-awareness-2020"
        }
    ],
    2021: [
        {
            title: "Rural Internet Connectivity",
            description: "Bridging the digital divide by providing internet access to remote communities.",
            impact: "Connected 50 villages to high-speed internet.",
            link: "/initiatives/rural-connectivity-2021"
        },
        {
            title: "Urban Gardening Project",
            description: "Promoting sustainable urban agriculture and green living.",
            impact: "Established 100 community gardens in urban centers.",
            link: "/initiatives/urban-gardening-2021"
        },
        {
            title: "Mental Health Support",
            description: "Providing counseling and support programs for mental wellness.",
            impact: "Counseled over 4,000 individuals across various communities.",
            link: "/initiatives/mental-health-2021"
        }
    ],
    2022: [
        {
            title: "Cybersecurity Awareness",
            description: "Educational program to enhance digital safety and security knowledge.",
            impact: "Trained 7,500 students and professionals in cybersecurity.",
            link: "/initiatives/cybersecurity-2022"
        },
        {
            title: "Sustainable Manufacturing",
            description: "Partnering with local industries to implement eco-friendly manufacturing practices.",
            impact: "Reduced carbon emissions by 25% in partner factories.",
            link: "/initiatives/sustainable-manufacturing-2022"
        },
        {
            title: "Community Health Clinics",
            description: "Establishing primary healthcare centers in underserved regions.",
            impact: "Set up 15 community health clinics in rural areas.",
            link: "/initiatives/health-clinics-2022"
        }
    ],
    2023: [
        {
            title: "Skill Development Workshops",
            description: "Comprehensive training programs to enhance employability skills.",
            impact: "Trained 5,000 young professionals across various sectors.",
            link: "/initiatives/skill-development-2023"
        },
        {
            title: "Youth Entrepreneurship",
            description: "Supporting young entrepreneurs with mentorship and seed funding.",
            impact: "Launched 50 new startup ventures.",
            link: "/initiatives/youth-entrepreneurship-2023"
        },
        {
            title: "Tech for Education",
            description: "Providing digital tools and resources to educational institutions.",
            impact: "Distributed 2,500 digital learning devices to schools.",
            link: "/initiatives/tech-education-2023"
        }
    ],
    2024: [
        {
            title: "Innovation Accelerator",
            description: "Program to foster technological innovation and research.",
            impact: "Supported 30 groundbreaking research and innovation projects.",
            link: "/initiatives/innovation-2024"
        },
        {
            title: "Digital Literacy for All",
            description: "Expanding digital skills training to new demographics.",
            impact: "Reached 10,000 individuals with advanced digital literacy programs.",
            link: "/initiatives/digital-literacy-2024"
        },
        {
            title: "Community Health Clinics",
            description: "Expanding healthcare access and telemedicine services.",
            impact: "Established 20 new health clinics with telemedicine capabilities.",
            link: "/initiatives/health-clinics-2024"
        }
    ]
};

const MotionCard = motion(Card);

const InitiativesPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                className="space-y-4 text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">
                    Our Initiatives by Year
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    A look back at the impact of our initiatives over the years.
                </p>
            </motion.div>

            <Accordion type="multiple">
                {Object.keys(initiativesByYear).map((year) => (
                    <AccordionItem key={year} value={`year-${year}`}>
                        <AccordionTrigger className="text-2xl font-medium">{`Year ${year}`}</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {initiativesByYear[parseInt(year)].map((initiative, idx) => (
                                    <MotionCard
                                        key={idx}
                                        className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    >
                                        <CardHeader>{getInitiativeIcon(initiative.title)}</CardHeader>
                                        <CardContent>
                                            <CardTitle>{initiative.title}</CardTitle>
                                            <CardDescription>{initiative.description}</CardDescription>
                                        </CardContent>
                                        <CardFooter>
                                            <a href={initiative.link} className="text-blue-600 dark:text-blue-400 hover:underline">
                                                Learn More <ArrowRight className="inline-block ml-1" />
                                            </a>
                                        </CardFooter>
                                    </MotionCard>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default InitiativesPage;
