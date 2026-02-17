"use client"
import Image from 'next/image';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Trophy, User } from "lucide-react";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPublicMembers } from "@/lib/actions/member-actions";
import { memberSlugFromName } from "@/lib/slug";

interface OfficeBearerDetail {
    name: string;
    position: string;
    image: string;
    fallback: string;
    bio?: string;
    achievements: string[];
}

export default function Page() {
    const params = useParams();
    const slug = params.slug as string;
    const [bearer, setBearer] = useState<OfficeBearerDetail | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadBearer() {
            try {
                if (!slug) return;

                const members = await getPublicMembers();
                const matched = members.find((m) => memberSlugFromName(m.name) === slug);

                if (!matched) {
                    setBearer(undefined);
                    return;
                }

                setBearer({
                    name: matched.name,
                    position: matched.position,
                    image: matched.image,
                    fallback: matched.fallback,
                    bio: matched.bio,
                    achievements: matched.achievements ?? [],
                });
            } catch (error) {
                console.error('Error loading office bearer:', error);
                setBearer(undefined);
            } finally {
                setIsLoading(false);
            }
        }

        loadBearer();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Loading office bearer...</h1>
                    <p className="text-muted-foreground">Please wait while we fetch the details.</p>
                </div>
            </div>
        );
    }

    if (!bearer) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Office bearer not found</h1>
                    <p className="text-muted-foreground">The member you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#030712] to-[#1F2937]  flex items-center justify-center p-1">
            <Card className="w-full max-w-4xl shadow-2xl border-none">
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl">
                    {/* Profile Section - Now First on Mobile */}
                    <motion.div
                        className="p-8 bg-background flex flex-col justify-center space-y-6 order-1 md:order-2"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex justify-center mb-4">
                                        {bearer.image ? (
                                            <Image
                                                src={bearer.image}
                                                alt={bearer.name}
                                                width={150}
                                                height={150}
                                                className="rounded-full border-4 border-primary shadow-lg"
                                            />
                                        ) : (
                                            <div className="w-40 h-40 bg-secondary rounded-full flex items-center justify-center">
                                                <span className="text-4xl font-bold text-primary">
                                                    {bearer.fallback}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{bearer.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                {bearer.name}
                            </h1>
                            <p className="text-md text-muted-foreground mb-4">
                                {bearer.position}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="text-[#FBA918] w-6 h-6" />
                                <h2 className="text-xl font-semibold text-foreground">
                                    Personal Bio
                                </h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {bearer.bio}
                            </p>
                        </div>
                    </motion.div>

                    {/* Achievements Section - Now Second on Mobile */}
                    <motion.div
                        className="p-8 flex flex-col justify-center space-y-6 order-2 md:order-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            backgroundImage: `url('/grain.png')`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <Trophy className="text-[#FBA918] w-10 h-10" />
                            <h2 className="text-2xl font-bold text-primary-foreground">
                                Remarkable Achievements
                            </h2>
                        </div>
                        <motion.ul
                            className="space-y-3 text-primary-foreground/90"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        delayChildren: 0.3,
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {bearer.achievements.map((achievement, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start space-x-3"
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                >
                                    <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                                        {index + 1}
                                    </Badge>
                                    <span>{achievement}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
}