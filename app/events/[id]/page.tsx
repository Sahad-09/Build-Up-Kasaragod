"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    ArrowLeft,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { getEventById } from "@/lib/actions/event-actions";

interface Event {
    id: string | number;
    title: string;
    date: Date;
    location: string;
    description: string;
    image?: string;
    additionalImages?: string[];
    category: "Community" | "Education" | "Health" | "Agriculture" | "National";
    additionalLink?: {
        url: string;
        text: string;
    };
}

// Hardcoded events (fallback)
const hardcodedEvents: Event[] = [
    {
        id: 0,
        title: "Paddy cultivation done under BUK Agricultural Division to promote organic farming.",
        date: new Date(2023, 5, 15),
        location: "BUK Agricultural Division",
        description:
            "Promoting organic farming through paddy cultivation under the BUK Agricultural Division.",
        category: "Agriculture",
        image: "/id-0.jpg",
        additionalImages: ["/id-0_02.jpg"],
    },
    {
        id: 1,
        title: "BUK Help Desk activities during Covid",
        date: new Date(2023, 8, 22),
        location: "BUK Help Desk",
        description:
            "During Covid, the Help Desk provided various services such as oxygen cylinders, PPE & medical kits, food kits, etc.",
        category: "Community",
        image: "/id-1.jpg",
        additionalImages: [],
    },
    {
        id: 2,
        title: "Paper Seed Pen Project for Endosulfan affected Victims in Enmakaje Panchayath",
        date: new Date(2023, 9, 22),
        location: "Enmakaje Panchayath",
        description:
            "A project to support Endosulfan affected victims in Enmakaje Panchayath through Paper Seed Pens.",
        category: "Community",
        image: "/id-2.jpeg",
        additionalImages: [],
    },
    {
        id: 3,
        title: "Free Medical Camps in Bela Kumbale & Manjeshwar",
        date: new Date(2023, 10, 5),
        location: "Bela Kumbale & Manjeshwar",
        description:
            "Free medical camps conducted to provide health services in Bela Kumbale and Manjeshwar.",
        category: "Health",
        image: "/id-3.jpg",
        additionalImages: [],
    },
    {
        id: 4,
        title: "Seminar on 'Effects of Drug Abuse on Youths' with Narcotics Control Bureau",
        date: new Date(2022, 5, 26),
        location: "Kasaragod Government College",
        description:
            "A seminar on drug abuse effects on youths, with an essay writing competition for students.",
        category: "Education",
        image: "/id-4.jpeg",
        additionalImages: ["/id-4_02.jpg"],
    },
    {
        id: 5,
        title: "BUK Karshaka Puraskaram 2022",
        date: new Date(2022, 8, 25),
        location: "Majibail Bank Hall, Manjeshwar",
        description:
            "A felicitation ceremony for 25 farmers of Kasaragod District.",
        category: "Agriculture",
        image: "/id-5.jpg",
        additionalImages: ["/id-5_02.jpeg", "/id-5_03.jpeg", "/id-5_04.jpeg"],
    },
    {
        id: 6,
        title: "World Environment Day Plantation",
        date: new Date(2023, 5, 5),
        location: "Various Locations",
        description:
            "Participated in World Environment Day with plantation activities.",
        category: "Community",
        image: "/id-6.jpeg",
        additionalImages: [],
    },
    {
        id: 7,
        title: "Various Seminars & Workshops",
        date: new Date(2023, 6, 1),
        location: "Various Locations",
        description:
            "A series of seminars and workshops conducted both virtually and physically, including topics such as Nano Enterprises, Financial Literacy, and AI tools for education.",
        category: "Education",
        image: "/id-7.png",
        additionalImages: [],
    },
    {
        id: 8,
        title: "Seminar on Scope of Household Enterprises without License",
        date: new Date(2024, 1, 18),
        location: "Kasaragod",
        description:
            "Seminar focusing on the scope of household enterprises without a license.",
        category: "Community",
        image: "/id-8.jpg",
        additionalImages: [],
    },
];

const EventDetailsPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function loadEvent() {
            try {
                // Try to fetch from MongoDB first (if ID looks like MongoDB ObjectId)
                const dbEvent = await getEventById(id);
                
                if (dbEvent) {
                    const eventData = {
                        ...dbEvent,
                        date: new Date(dbEvent.date),
                    };
                    setEvent(eventData);
                    setSelectedImage(eventData.image);
                } else {
                    // Fallback to hardcoded events
                    const numericId = parseInt(id, 10);
                    if (!isNaN(numericId) && numericId >= 0 && numericId < hardcodedEvents.length) {
                        const hardcodedEvent = hardcodedEvents[numericId];
                        setEvent(hardcodedEvent);
                        setSelectedImage(hardcodedEvent.image);
                    } else {
                        router.push('/events');
                    }
                }
            } catch (error) {
                console.error('Error loading event:', error);
                // Fallback to hardcoded events
                const numericId = parseInt(id, 10);
                if (!isNaN(numericId) && numericId >= 0 && numericId < hardcodedEvents.length) {
                    const hardcodedEvent = hardcodedEvents[numericId];
                    setEvent(hardcodedEvent);
                    setSelectedImage(hardcodedEvent.image);
                } else {
                    router.push('/events');
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadEvent();
    }, [id, router]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-muted-foreground">Loading event...</div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-muted-foreground mb-4">Event not found</div>
                <Link href="/events">
                    <Button variant="outline">Back to Events</Button>
                </Link>
            </div>
        );
    }

    const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
    const allImages = [event.image, ...(event.additionalImages || [])].filter(Boolean) as string[];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <Link href="/events">
                <Button variant="outline" className="mb-6 flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
                </Button>
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    {selectedImage && (
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4 rounded-lg overflow-hidden"
                        >
                            <img
                                src={selectedImage}
                                alt={event.title}
                                className="w-full h-[400px] object-cover"
                            />
                        </motion.div>
                    )}

                    {allImages.length > 1 && (
                        <div className="flex space-x-2 mt-4">
                            {allImages.map((img, index) => (
                                <motion.img
                                    key={index}
                                    src={img}
                                    alt={`Event thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75 transition-opacity ${selectedImage === img ? "border-2 border-primary" : ""
                                        }`}
                                    onClick={() => setSelectedImage(img)}
                                    whileHover={{ scale: 1.05 }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                        <Badge variant="secondary" className="self-start mb-4">
                            {event.category}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                                <span>
                                    {eventDate.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        weekday: "long",
                                    })}
                                </span>
                            </div>

                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="mr-2 h-5 w-5 text-green-500" />
                                <span>{event.location}</span>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-xl font-semibold mb-2">Event Description</h3>
                                <p className="text-muted-foreground">{event.description}</p>
                            </div>

                            {event.additionalLink && (
                                <div className="border-t pt-4">
                                    <a
                                        href={event.additionalLink.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline" className="w-full">
                                            {event.additionalLink.text}
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};

export default EventDetailsPage;
