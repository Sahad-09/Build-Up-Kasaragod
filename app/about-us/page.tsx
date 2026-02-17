"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, Target, Flag, Shield, Book, Settings, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getPublicMembers } from "@/lib/actions/member-actions";
import { memberSlugFromName } from "@/lib/slug";

interface OfficeBearerType {
    name: string;
    position?: string;
    image: string;
    fallback: string;
}

const AboutUsPage = () => {
    const [patrons, setPatrons] = useState<OfficeBearerType[]>([]);
    const [seniorOfficeBearers, setSeniorOfficeBearers] = useState<OfficeBearerType[]>([]);
    const [vicePresidents, setVicePresidents] = useState<OfficeBearerType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadMembers() {
            try {
                const members = await getPublicMembers();
                
                // Convert to OfficeBearerType format
                const formattedMembers: OfficeBearerType[] = members.map(m => ({
                    name: m.name,
                    position: m.position,
                    image: m.image,
                    fallback: m.fallback,
                }));

                // Group by category
                setPatrons(formattedMembers.filter(m => {
                    const member = members.find(mm => mm.name === m.name);
                    return member?.category === 'Patron';
                }));
                
                setSeniorOfficeBearers(formattedMembers.filter(m => {
                    const member = members.find(mm => mm.name === m.name);
                    return member?.category === 'Core Team';
                }));
                
                setVicePresidents(formattedMembers.filter(m => {
                    const member = members.find(mm => mm.name === m.name);
                    return member?.category === 'Vice President';
                }));
            } catch (error) {
                console.error('Error loading members:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadMembers();
    }, []);

    const sectionData = [
        {
            title: "Mission",
            icon: Target,
            color: "text-blue-500",
            bgColor: "bg-blue-100 dark:bg-blue-900/30",
            content:
                "To make Kasaragod district self-sufficient and self-reliant by implementing outstanding and effective programs that communicate, consult, and align with relevant Government Authorities and stakeholders, expand opportunities for flourishing societies, and work with innovative leaders and communities to build effective institutions and advance pathbreaking reforms.",
        },

        {
            title: "Vision",
            icon: Flag,
            color: "text-green-500",
            bgColor: "bg-green-100 dark:bg-green-900/30",
            content:
                "To envisage Kasaragod District by understanding its requirements in the fields of education, health & hygiene, agriculture, tourism, infrastructure management, and all other recessive sectors, ensuring inhabitants are happy in their homes, communities, and environment; living with safety, security, and dignity; and having equal opportunities to develop and activate their potential.",
        },

        {
            title: "Objectives",
            icon: CheckCircle,
            color: "text-purple-500",
            bgColor: "bg-purple-100 dark:bg-purple-900/30",
            content:
                "To create an enabling environment through grassroots institutional framework for making marginalized communities and persons be in charge of their own destiny.",
        },
    ];

    const detailSections = [
        {
            title: "Core Values",
            icon: Shield,
            color: "text-purple-500",
            bgColor: "bg-purple-100 dark:bg-purple-900/30",
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
            bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
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
            bgColor: "bg-red-100 dark:bg-red-900/30",
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

    // Render member card with consistent design
    const renderMemberCard = (bearer: OfficeBearerType, index: number, category: string) => {
        const slug = memberSlugFromName(bearer.name);
        const categoryColors: Record<string, { badge: string; border: string }> = {
            'Patron': { badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200', border: 'border-amber-200 dark:border-amber-800' },
            'Core Team': { badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200', border: 'border-indigo-200 dark:border-indigo-800' },
            'Vice President': { badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200', border: 'border-emerald-200 dark:border-emerald-800' },
        };
        
        const colors = categoryColors[category] || { badge: 'bg-gray-100 text-gray-800', border: 'border-gray-200' };

        return (
            <motion.div
                key={`${bearer.name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
            >
                <Link href={`/about-us/${slug}`}>
                    <Card className={`group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 ${colors.border}`}>
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            {/* Avatar Container */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <Avatar className="relative w-32 h-32 border-4 border-background shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <AvatarImage src={bearer.image} alt={bearer.name} className="object-cover" />
                                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                                        {bearer.fallback}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Name */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                                    {bearer.name}
                                </h3>
                                {bearer.position && (
                                    <Badge className={`${colors.badge} border-0 shadow-sm`}>
                                        {bearer.position}
                                    </Badge>
                                )}
                            </div>

                            {/* View Profile Link */}
                            <div className="mt-auto pt-4 w-full">
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                                    <span>View Profile</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </motion.div>
        );
    };

    // Render office bearer section with improved design
    const renderOfficeBearerSection = (
        bearers: OfficeBearerType[],
        title: string,
        category: string,
        icon: React.ElementType,
        iconColor: string,
        iconBg: string,
        hasSeparator?: boolean
    ) => {
        const Icon = icon;
        
        return (
            <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-4">
                    <div className={`p-3 ${iconBg} rounded-xl`}>
                        <Icon className={`h-6 w-6 ${iconColor}`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {bearers.length} {bearers.length === 1 ? 'member' : 'members'}
                        </p>
                    </div>
                </div>

                {/* Members Grid */}
                {bearers.length === 0 ? (
                    <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
                        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <p className="text-muted-foreground">No members in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {bearers.map((bearer, index) => 
                            renderMemberCard(bearer, index, category)
                        )}
                    </div>
                )}

                {/* Separator */}
                {hasSeparator && bearers.length > 0 && (
                    <div className="border-b border-border/50 my-8"></div>
                )}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-12 lg:py-16 space-y-16">
                    {/* Office Bearers Section Skeleton */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Skeleton className="h-11 w-11 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-9 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                        </div>
                        <Card className="border-2">
                            <CardContent className="p-8 lg:p-12 space-y-12">
                                {[1, 2, 3].map((section) => (
                                    <div key={section} className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-12 w-12 rounded-xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-7 w-32" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                            {[1, 2, 3, 4].map((card) => (
                                                <Card key={card} className="border-2">
                                                    <CardContent className="p-6 flex flex-col items-center space-y-4">
                                                        <Skeleton className="h-32 w-32 rounded-full" />
                                                        <div className="space-y-2 w-full">
                                                            <Skeleton className="h-5 w-3/4 mx-auto" />
                                                            <Skeleton className="h-5 w-1/2 mx-auto" />
                                                        </div>
                                                        <Skeleton className="h-6 w-24 rounded-full" />
                                                        <Skeleton className="h-4 w-28" />
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </section>

                    {/* Mission, Vision, Objectives Skeleton */}
                    <section>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-9 w-9 rounded-lg" />
                                            <Skeleton className="h-6 w-28" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Core Values, Principles, Policies Skeleton */}
                    <section>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-9 w-9 rounded-lg" />
                                            <Skeleton className="h-6 w-32" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {[1, 2, 3, 4].map((j) => (
                                            <Skeleton key={j} className="h-4 w-full" />
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-12 lg:py-16 space-y-16"
            >
                {/* Office Bearers Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <Users className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">Our Team</h1>
                            <p className="text-muted-foreground text-sm mt-1">
                                Meet the dedicated individuals leading Build Up Kasaragod
                            </p>
                        </div>
                    </div>

                    <Card className="border-2">
                        <CardContent className="p-8 lg:p-12">
                            {renderOfficeBearerSection(
                                patrons,
                                "Patrons",
                                "Patron",
                                Users,
                                "text-amber-600 dark:text-amber-400",
                                "bg-amber-100 dark:bg-amber-900/30",
                                true
                            )}
                            {renderOfficeBearerSection(
                                seniorOfficeBearers,
                                "Core Team",
                                "Core Team",
                                Users,
                                "text-indigo-600 dark:text-indigo-400",
                                "bg-indigo-100 dark:bg-indigo-900/30",
                                true
                            )}
                            {renderOfficeBearerSection(
                                vicePresidents,
                                "Vice Presidents",
                                "Vice President",
                                Users,
                                "text-emerald-600 dark:text-emerald-400",
                                "bg-emerald-100 dark:bg-emerald-900/30",
                                false
                            )}
                        </CardContent>
                    </Card>
                </section>

                {/* Mission, Vision, and Objectives */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sectionData.map(({ title, icon: Icon, color, bgColor, content }, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 ${bgColor} rounded-lg`}>
                                                <Icon className={`h-5 w-5 ${color}`} />
                                            </div>
                                            <CardTitle className="text-xl">{title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground leading-relaxed">{content}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Core Values, Principles, Policies */}
                <section>
                    <div className="grid md:grid-cols-3 gap-6">
                        {detailSections.map(({ title, icon: Icon, color, bgColor, items }, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 ${bgColor} rounded-lg`}>
                                                <Icon className={`h-5 w-5 ${color}`} />
                                            </div>
                                            <CardTitle className="text-xl">{title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {items.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className={`mt-1.5 h-1.5 w-1.5 rounded-full ${bgColor.replace('bg-', 'bg-').replace('/30', '')} flex-shrink-0`}></div>
                                                    <span className="text-sm text-muted-foreground leading-relaxed">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </motion.div>
        </div>
    );
};

export default AboutUsPage;
