"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Calendar,
    MapPin,
    Clock,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Event type definition
interface Event {
    id: number;
    title: string;
    date: Date;
    location: string;
    description: string;
    image?: string;
    category: 'Community' | 'Education' | 'Health' | 'Agriculture';
}

const EventsPage: React.FC = () => {
    // Sample events data
    const events: Event[] = [
        // Past Events
        {
            id: 0,
            title: "Paddy cultivation done under BUK Agricultural Division to promote organic farming.",
            date: new Date(2023, 5, 15),
            location: "BUK Agricultural Division",
            description: "Promoting organic farming through paddy cultivation under the BUK Agricultural Division.",
            category: "Agriculture",
            image: "/paddy-cultivation-3.jpeg"
        },
        {
            id: 1,
            title: "BUK Help Desk activities during Covid",
            date: new Date(2023, 8, 22),
            location: "BUK Help Desk",
            description: "During Covid, the Help Desk provided various services such as oxygen cylinders, PPE & medical kits, food kits, etc.",
            category: "Community",
            image: "/buk-help-desk.jpg"
        },
        {
            id: 2,
            title: "Paper Seed Pen Project for Endosulfan affected Victims in Enmakaje Panchayath",
            date: new Date(2023, 9, 22),
            location: "Enmakaje Panchayath",
            description: "A project to support Endosulfan affected victims in Enmakaje Panchayath through Paper Seed Pens.",
            category: "Community",
            image: "/paper-seed-pen-project.jpg"
        },
        {
            id: 3,
            title: "Free Medical Camps in Bela Kumbale & Manjeshwar",
            date: new Date(2023, 10, 5),
            location: "Bela Kumbale & Manjeshwar",
            description: "Free medical camps conducted to provide health services in Bela Kumbale and Manjeshwar.",
            category: "Health",
            image: "/free-medical-camps.jpg"
        },
        {
            id: 4,
            title: "Seminar on ‘Effects of Drug Abuse on Youths' with Narcotics Control Bureau",
            date: new Date(2022, 5, 26),
            location: "Kasaragod Government College",
            description: "A seminar on drug abuse effects on youths, with an essay writing competition for students.",
            category: "Education",
            image: "/drug-abuse-seminar.jpg"
        },
        {
            id: 5,
            title: "BUK Karshaka Puraskaram 2022",
            date: new Date(2022, 8, 25),
            location: "Majibail Bank Hall, Manjeshwar",
            description: "A felicitation ceremony for 25 farmers of Kasaragod District.",
            category: "Agriculture",
            image: "/buk-karshaka-puraskaram.jpg"
        },
        {
            id: 6,
            title: "World Environment Day Plantation",
            date: new Date(2023, 5, 5),
            location: "Various Locations",
            description: "Participated in World Environment Day with plantation activities.",
            category: "Community",
            image: "/environment-day.jpg"
        },
        {
            id: 7,
            title: "Various Seminars & Workshops",
            date: new Date(2023, 6, 1),
            location: "Various Locations",
            description: "A series of seminars and workshops conducted both virtually and physically, including topics such as Nano Enterprises, Financial Literacy, and AI tools for education.",
            category: "Education",
            image: "/seminars-workshops.jpg"
        },
        {
            id: 8,
            title: "Seminar on Scope of Household Enterprises without License",
            date: new Date(2024, 1, 18),
            location: "Kasaragod",
            description: "Seminar focusing on the scope of household enterprises without a license.",
            category: "Community",
            image: "/household-enterprise-seminar.jpg"
        }
    ];


    // Separate past and upcoming events
    const pastEvents = events
        .filter(event => event.date < new Date())
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    const upcomingEvents = events
        .filter(event => event.date >= new Date())
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    // State for pagination
    const [pastEventsPage, setPastEventsPage] = useState(0);
    const [upcomingEventsPage, setUpcomingEventsPage] = useState(0);
    const eventsPerPage = 2;

    // Pagination functions
    const getPaginatedEvents = (events: Event[], currentPage: number) => {
        const startIndex = currentPage * eventsPerPage;
        return events.slice(startIndex, startIndex + eventsPerPage);
    };

    // Render event card
    const renderEventCard = (event: Event) => (
        <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
        >
            {/* Wrap the card in a Link component for dynamic routing */}
            <Link href={`/events/${event.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                    {event.image && (
                        <div className="w-full h-48 overflow-hidden rounded-t-lg">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                <Badge variant="secondary" className="mr-2">{event.category}</Badge>
                            </div>
                        </div>
                        <div className="space-y-2 text-muted-foreground">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {event.date.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {event.location}
                            </div>
                        </div>
                        <p className="mt-4 text-sm">{event.description}</p>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );

    // Pagination component
    const PaginationControls = ({
        currentPage,
        totalEvents,
        onPageChange
    }: {
        currentPage: number,
        totalEvents: Event[],
        onPageChange: (page: number) => void
    }) => {
        const totalPages = Math.ceil(totalEvents.length / eventsPerPage);

        return (
            <div className="flex justify-center items-center space-x-4 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage >= totalPages - 1}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-3xl font-bold mb-8 text-center">Our Events</h1>

            {/* Upcoming Events Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Clock className="h-6 w-6 mr-3 text-green-500" />
                    Upcoming Events
                </h2>
                {upcomingEvents.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                        No upcoming events at the moment.
                    </p>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 gap-6">
                            {getPaginatedEvents(upcomingEvents, upcomingEventsPage).map(renderEventCard)}
                        </div>
                        <PaginationControls
                            currentPage={upcomingEventsPage}
                            totalEvents={upcomingEvents}
                            onPageChange={setUpcomingEventsPage}
                        />
                    </>
                )}
            </section>

            {/* Past Events Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Calendar className="h-6 w-6 mr-3 text-blue-500" />
                    Past Events
                </h2>
                {pastEvents.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                        No past events to display.
                    </p>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 gap-6">
                            {getPaginatedEvents(pastEvents, pastEventsPage).map(renderEventCard)}
                        </div>
                        <PaginationControls
                            currentPage={pastEventsPage}
                            totalEvents={pastEvents}
                            onPageChange={setPastEventsPage}
                        />
                    </>
                )}
            </section>
        </motion.div>
    );
};

export default EventsPage;