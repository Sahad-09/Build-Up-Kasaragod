"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, Target, Flag, Shield, Book, Settings, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface OfficeBearerType {
    name: string;
    position?: string;
    image: string;
    fallback: string;
}

const AboutUsPage = () => {
    const pageVariants = {
        initial: { opacity: 0, y: 50 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const patrons: OfficeBearerType[] = [
        {
            name: "Mr. Abdul Khader Saleem",
            position: "Chief Patron",
            image: "",
            fallback: "AKS",
        },
        {
            name: "Shri KV Madhusudanan",
            position: "Patron",
            image: "/patron-01.jpg",
            fallback: "MA",
        },
        {
            name: "Mr. M T P Mohammed Kunhi",
            position: "Patron",
            image: "/patron-02.jpg",
            fallback: "KM",
        },
    ];

    const seniorOfficeBearers: OfficeBearerType[] = [
        {
            name: "Dr. Sheikh Bava",
            position: "President",
            image: "/president.png",
            fallback: "SB",
        },
        {
            name: "Dr. Rashmi Prakash",
            position: "General Secretary",
            image: "/generalSecretary.png",
            fallback: "RP",
        },
        {
            name: "Mr. Anoop K",
            position: "Treasurer",
            image: "/treasurer.png",
            fallback: "AK",
        },
    ];

    const vicePresidents: OfficeBearerType[] = [
        {
            name: "Mrs. C. K. Zulekha Mahin",
            position: "Vice President",
            image: "/vicePresident-01.png",
            fallback: "ZM",
        },
        {
            name: "Mr. Dayakara R. K.",
            position: "Vice President",
            image: "/vicePresident-02.png",
            fallback: "DRK",
        },
        {
            name: "Mr. Abdul Nassir N. A.",
            position: "Vice President",
            image: "/vicePresident-03.png",
            fallback: "AN",
        },
        {
            name: "Mr. Rafeek",
            position: "Vice President",
            image: "/vicePresident-04.png",
            fallback: "R",
        },
    ];

    const sectionData = [
        {
            title: "Mission",
            icon: Target,
            color: "text-blue-500",
            content:
                "To make Kasaragod district self-sufficient and self-reliant by implementing outstanding and effective programs that communicate, consult, and align with relevant Government Authorities and stakeholders, expand opportunities for flourishing societies, and work with innovative leaders and communities to build effective institutions and advance pathbreaking reforms.",
        },

        {
            title: "Vision",
            icon: Flag,
            color: "text-green-500",
            content:
                "To envisage Kasaragod District by understanding its requirements in the fields of education, health & hygiene, agriculture, tourism, infrastructure management, and all other recessive sectors, ensuring inhabitants are happy in their homes, communities, and environment; living with safety, security, and dignity; and having equal opportunities to develop and activate their potential.",
        },

        {
            title: "Objectives",  // New Objectives Section
            icon: CheckCircle,
            color: "text-purple-500",
            content:
                "To create an enabling environment through grassroots institutional framework for making marginalized communities and persons be in charge of their own destiny.",
        },
    ];

    const detailSections = [
        {
            title: "Core Values",
            icon: Shield,
            color: "text-purple-500",
            items: [
                "Deep respect for local context: We value local expertise and knowledge; we are immersed in the social, political, environmental, and economic realities where we do service. Our approach is centered on the catalytic role that individuals, communities, and governments play in the development of their societies.",
                "Responsibility: We will integrate environmental and social principles in our services, ensuring that what comes from the people goes back to the people, making them happy because of us.",
                "Inclusion of differing views: We believe in the importance of innumerable views and perspectives; we encourage inclusive dialogue to help ensure everyone has a seat at the table. Our task, people, and programs are defined by our commitment to equality, particularly for women and other marginalized populations.",
                "Innovative & agile thinking: We value fresh, original ideas and we are known for our ability to identify and respond rapidly to issues and events affecting the places where we work. Our formal culture encourages experimentation with new approaches and sharing the results through empirical research, expert analysis, collaboration with other organizations, and outreach.",
                "Trust, accountability & partnership: We value collaboration and believe that working closely with forward-thinking leaders can improve lives, governance, and policies.",
                "Integrity: We will be fair, honest, transparent, and ethical in our conduct; everything we do must stand the test of public scrutiny.",
                "Commitment: Our impact is grounded in our ability to combine a long-term, experienced perspective with our strong network and commitment to regional progress.",
            ],
        },


        {
            title: "Principles",
            icon: Book,
            color: "text-yellow-500",
            items: [
                "Promoting vitality of marginalized society and self-reliance",
                "Emphasizing democratic ownership and human rights-based approach",
                "Representing CSOs and NGOs, providing leadership advice",
                "Ensuring informed decision-making grounded in knowledge and research",
                "Focusing on sector problems and providing actionable recommendations",
                "Ensuring accountability, honesty, and transparency",
                "Committing to effectiveness and efficiency",
                "Collaborating with teams to foster a productive environment",
                "Foreseeing a society based on equity, justice, and self-reliance",
                "Operating with high environmental sustainability standards",
            ],
        },
        {
            title: "Policies",
            icon: Settings,
            color: "text-red-500",
            items: [
                "Compliance with laws, regulations, and NGO policies",
                "Guidance for farmers on cropping patterns and techniques",
                "Providing information on business start-ups and expansion opportunities",
                "Planning and management of education at various levels",
                "Assisting health sector development and collaborations",
                "Representing the community in the tourism industry",
                "Building talent pipelines for job openings in the district",
                "Cooperating in IT & Media matters with national/international agencies",
                "Ensuring women's rights to control resources and improve economic status",
                "Ensuring pravasi (emigrant) welfare and information services",
                "Receiving funds from various sources including membership fees, grants, and donations",
                "Maintaining emergency response, crisis management, and business continuity measures",
                "Engaging service partners committed to 100% NGO activities",
            ],
        }

    ];

    const renderOfficeBearerSection = (
        bearers: OfficeBearerType[],
        title: string,
        hasSeparator?: boolean
    ) => (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bearers.map((bearer, index) => (
                    <Link
                        key={index}
                        href={`/about-us/${bearer.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="cursor-pointer"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center space-y-3"
                        >
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={bearer.image} alt={bearer.name} />
                                <AvatarFallback>{bearer.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <p className="font-semibold">{bearer.name}</p>
                                {bearer.position && (
                                    <Badge variant="secondary">{bearer.position}</Badge>
                                )}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
            {hasSeparator && (
                <div className="border-b border-muted-foreground opacity-20 mt-6 mb-8"></div>
            )}
        </div>
    );


    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="container mx-auto px-4 py-8 space-y-8"
        >

            {/* Office Bearers */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-indigo-500" />
                        Office Bearers
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {renderOfficeBearerSection(patrons, "Patrons", true)}
                    {renderOfficeBearerSection(seniorOfficeBearers, "Senior Office Bearers", true)}
                    {renderOfficeBearerSection(vicePresidents, "Vice Presidents")}
                </CardContent>

            </Card>

            {/* Mission, Vision, and Objectives */}
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
