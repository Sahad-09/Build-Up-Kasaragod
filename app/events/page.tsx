"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Calendar,
    MapPin,
    Clock,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { getPublicEvents, getUpcomingEvents, getPastEvents } from "@/lib/actions/public-events";

// Event type definition
interface Event {
    id: string | number;
    title: string;
    date: Date;
    location: string;
    description: string;
    image?: string;
    category: 'Community' | 'Education' | 'Health' | 'Agriculture' | 'National';
    additionalLink?: {
        url: string;
        text: string;
    };
}

const EventsPage: React.FC = () => {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadEvents() {
            try {
                // Fetch events from MongoDB
                const dbUpcoming = await getUpcomingEvents();
                const dbPast = await getPastEvents();

                // Convert DB events date strings to Date objects
                // Deduplicate by title and date to prevent duplicates
                const upcomingUnique = dbUpcoming.reduce((acc, event) => {
                    const eventDate = new Date(event.date);
                    const key = `${event.title}-${eventDate.getTime()}`;
                    if (!acc.find(e => `${e.title}-${e.date.getTime()}` === key)) {
                        acc.push({ ...event, date: eventDate });
                    }
                    return acc;
                }, [] as Event[]);

                const upcoming = upcomingUnique;

                const dbPastConverted = dbPast.map(event => ({
                    ...event,
                    date: new Date(event.date)
                }));

                // Use only MongoDB events (hardcoded events were migrated to DB)
                // Deduplicate by title and date to prevent duplicates
                const uniquePastEvents = dbPastConverted.reduce((acc, event) => {
                    const key = `${event.title}-${event.date.getTime()}`;
                    if (!acc.find(e => `${e.title}-${e.date.getTime()}` === key)) {
                        acc.push(event);
                    }
                    return acc;
                }, [] as Event[]);

                const allPastEvents = uniquePastEvents
                    .filter(event => event.date < new Date())
                    .sort((a, b) => b.date.getTime() - a.date.getTime());

                setUpcomingEvents(upcoming);
                setPastEvents(allPastEvents);
            } catch (error) {
                console.error('Error loading events:', error);
                setPastEvents([]);
            } finally {
                setIsLoading(false);
            }
        }

        loadEvents();
    }, []);

    // State for pagination
    const [pastEventsPage, setPastEventsPage] = useState(0);
    const [upcomingEventsPage, setUpcomingEventsPage] = useState(0);
    const eventsPerPage = 6; // Increased from 2 to 6 for better layout

    // Pagination functions
    const getPaginatedEvents = (events: Event[], currentPage: number) => {
        const startIndex = currentPage * eventsPerPage;
        return events.slice(startIndex, startIndex + eventsPerPage);
    };

    // Category color mapping
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Community': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'Education': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'Health': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'Agriculture': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            'National': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
        return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    // Render event card with consistent design
    const renderEventCard = (event: Event, index: number) => {
        const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
        const eventLink = typeof event.id === 'string' ? `/events/${event.id}` : `/events/${event.id}`;
        
        return (
            <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
            >
                <Link href={eventLink}>
                    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                        {/* Image Container - Fixed Aspect Ratio */}
                        <div className="relative w-full h-56 overflow-hidden bg-gray-200 dark:bg-gray-800">
                            {event.image ? (
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Calendar className="h-16 w-16 text-gray-400" />
                                </div>
                            )}
                            {/* Category Badge Overlay */}
                            <div className="absolute top-4 left-4">
                                <Badge className={`${getCategoryColor(event.category)} border-0 shadow-lg`}>
                                    {event.category}
                                </Badge>
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content Container */}
                        <CardContent className="p-6 flex flex-col flex-1">
                            {/* Date and Location */}
                            <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span className="font-medium">
                                        {eventDate.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    <span className="truncate max-w-[200px]">{event.location}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                {event.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                {event.description}
                            </p>

                            {/* Additional Link or Read More */}
                            <div className="mt-auto pt-4 border-t">
                                {event.additionalLink ? (
                                    <a 
                                        href={event.additionalLink.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full"
                                    >
                                        <Button variant="outline" className="w-full group/btn">
                                            <ClipboardList className="h-4 w-4 mr-2" />
                                            {event.additionalLink.text}
                                        </Button>
                                    </a>
                                ) : (
                                    <Button variant="ghost" className="w-full group/btn">
                                        Read More
                                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </motion.div>
        );
    };

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

        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="disabled:opacity-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => onPageChange(i)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                currentPage === i
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className="disabled:opacity-50"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading events...</p>
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
                className="container mx-auto px-4 py-12 lg:py-16"
            >
                {/* Upcoming Events Section */}
                {upcomingEvents.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">Upcoming Events</h2>
                                <p className="text-muted-foreground text-sm mt-1">
                                    {upcomingEvents.length} {upcomingEvents.length === 1 ? 'event' : 'events'} scheduled
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {getPaginatedEvents(upcomingEvents, upcomingEventsPage).map((event, index) => 
                                renderEventCard(event, index)
                            )}
                        </div>
                        
                        <PaginationControls
                            currentPage={upcomingEventsPage}
                            totalEvents={upcomingEvents}
                            onPageChange={setUpcomingEventsPage}
                        />
                    </section>
                )}

                {/* Past Events Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Past Events</h2>
                            <p className="text-muted-foreground text-sm mt-1">
                                {pastEvents.length} {pastEvents.length === 1 ? 'event' : 'events'} in our history
                            </p>
                        </div>
                    </div>

                    {pastEvents.length === 0 ? (
                        <div className="text-center py-16">
                            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-lg text-muted-foreground">No past events to display.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {getPaginatedEvents(pastEvents, pastEventsPage).map((event, index) => 
                                    renderEventCard(event, index)
                                )}
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
        </div>
    );
};

export default EventsPage;
