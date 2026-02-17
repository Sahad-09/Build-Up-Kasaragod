"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { getPublicEvents, getUpcomingEvents, getPastEvents, getPastEventsPaginated } from "@/lib/actions/public-events";

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
    const [loadedPastEvents, setLoadedPastEvents] = useState<Event[]>([]);
    const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true);
    const [isLoadingMorePastEvents, setIsLoadingMorePastEvents] = useState(false);
    const [currentPastBatch, setCurrentPastBatch] = useState(0);
    const [hasMorePastEvents, setHasMorePastEvents] = useState(true);
    const [pastEventsInitialized, setPastEventsInitialized] = useState(false);
    const pastEventsRef = useRef<HTMLDivElement>(null);
    const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
    const initialBatchSize = 3; // Load 3 events initially
    const eventsPerBatch = 3; // Load 3 events per batch as user scrolls

    // Function to load next batch of past events
    const loadNextPastEventsBatch = React.useCallback(async (isInitialLoad: boolean = false) => {
        if (isLoadingMorePastEvents || !hasMorePastEvents) return;

        setIsLoadingMorePastEvents(true);
        try {
            const batchSize = isInitialLoad ? initialBatchSize : eventsPerBatch;
            // Calculate skip: initial load starts at 0, subsequent loads account for initial batch
            const skip = isInitialLoad 
                ? 0 
                : initialBatchSize + (currentPastBatch - 1) * eventsPerBatch;
            const batch = await getPastEventsPaginated(skip, batchSize);

            if (batch.length === 0) {
                setHasMorePastEvents(false);
                setIsLoadingMorePastEvents(false);
                return;
            }

            const batchConverted = batch.map(event => ({
                ...event,
                date: new Date(event.date)
            }));

            // Deduplicate events
            const uniqueBatch = batchConverted.reduce((acc, event) => {
                const key = `${event.title}-${event.date.getTime()}`;
                if (!acc.find(e => `${e.title}-${e.date.getTime()}` === key)) {
                    acc.push(event);
                }
                return acc;
            }, [] as Event[]);

            // Append to loaded events
            setLoadedPastEvents(prev => {
                const combined = [...prev, ...uniqueBatch];
                // Remove duplicates
                const seen = new Set<string>();
                return combined.filter(event => {
                    const key = `${event.title}-${event.date.getTime()}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });
            });

            // Check if we got fewer events than requested (end of list)
            const expectedBatchSize = isInitialLoad ? initialBatchSize : eventsPerBatch;
            if (batch.length < expectedBatchSize) {
                setHasMorePastEvents(false);
            } else {
                setCurrentPastBatch(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error loading past events batch:', error);
        } finally {
            setIsLoadingMorePastEvents(false);
        }
    }, [currentPastBatch, isLoadingMorePastEvents, hasMorePastEvents]);

    // Load upcoming events first (priority)
    useEffect(() => {
        async function loadUpcomingEvents() {
            try {
                const dbUpcoming = await getUpcomingEvents();

                const upcomingUnique = dbUpcoming.reduce((acc, event) => {
                    const eventDate = new Date(event.date);
                    const key = `${event.title}-${eventDate.getTime()}`;
                    if (!acc.find(e => `${e.title}-${e.date.getTime()}` === key)) {
                        acc.push({ ...event, date: eventDate });
                    }
                    return acc;
                }, [] as Event[]);

                setUpcomingEvents(upcomingUnique);
            } catch (error) {
                console.error('Error loading upcoming events:', error);
                setUpcomingEvents([]);
            } finally {
                setIsLoadingUpcoming(false);
            }
        }

        loadUpcomingEvents();
    }, []);

    // Load initial batch when user scrolls near past events section
    useEffect(() => {
        if (pastEventsInitialized) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !pastEventsInitialized) {
                    setPastEventsInitialized(true);
                    loadNextPastEventsBatch(true); // Pass true for initial load
                }
            },
            { rootMargin: '200px' } // Start loading 200px before section comes into view
        );

        if (pastEventsRef.current) {
            observer.observe(pastEventsRef.current);
        }

        // Fallback: Load first batch after 2 seconds if user hasn't scrolled
        const fallbackTimer = setTimeout(() => {
            if (!pastEventsInitialized) {
                setPastEventsInitialized(true);
                loadNextPastEventsBatch(true); // Pass true for initial load
            }
        }, 2000);

        return () => {
            if (pastEventsRef.current) {
                observer.unobserve(pastEventsRef.current);
            }
            clearTimeout(fallbackTimer);
        };
    }, [pastEventsInitialized, loadNextPastEventsBatch]);

    // Infinite scroll: Load more batches when user scrolls to bottom
    useEffect(() => {
        if (!pastEventsInitialized || !hasMorePastEvents || isLoadingMorePastEvents) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMorePastEvents && !isLoadingMorePastEvents) {
                    loadNextPastEventsBatch();
                }
            },
            { rootMargin: '100px' } // Start loading 100px before trigger comes into view
        );

        if (loadMoreTriggerRef.current) {
            observer.observe(loadMoreTriggerRef.current);
        }

        return () => {
            if (loadMoreTriggerRef.current) {
                observer.unobserve(loadMoreTriggerRef.current);
            }
        };
    }, [pastEventsInitialized, hasMorePastEvents, isLoadingMorePastEvents, loadNextPastEventsBatch]);

    // State for pagination (only for upcoming events)
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

    // Render skeleton event card
    const renderSkeletonCard = (index: number) => {
        return (
            <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="h-full flex flex-col overflow-hidden">
                    {/* Image Skeleton */}
                    <div className="relative w-full h-56 overflow-hidden bg-gray-200 dark:bg-gray-800">
                        <Skeleton className="w-full h-full" />
                        {/* Badge Skeleton */}
                        <div className="absolute top-4 left-4">
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <CardContent className="p-6 flex flex-col flex-1">
                        {/* Date and Location Skeleton */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                        </div>

                        {/* Title Skeleton */}
                        <Skeleton className="h-6 w-full mb-3" />
                        <Skeleton className="h-6 w-3/4 mb-4" />

                        {/* Description Skeleton */}
                        <div className="space-y-2 mb-4 flex-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>

                        {/* Button Skeleton */}
                        <div className="mt-auto pt-4 border-t">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
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
                                    loading="lazy"
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

    // Render skeleton loaders for initial load
    if (isLoadingUpcoming && upcomingEvents.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    {/* Upcoming Events Skeleton */}
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <Skeleton className="h-9 w-48 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {Array.from({ length: 6 }).map((_, index) => renderSkeletonCard(index))}
                        </div>
                    </section>

                    {/* Past Events Skeleton */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <Skeleton className="h-9 w-40 mb-2" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {Array.from({ length: initialBatchSize }).map((_, index) => renderSkeletonCard(index + 6))}
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
                className="container mx-auto px-4 py-12 lg:py-16"
            >
                {/* Upcoming Events Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Upcoming Events</h2>
                            {isLoadingUpcoming ? (
                                <Skeleton className="h-4 w-32 mt-1" />
                            ) : (
                                <p className="text-muted-foreground text-sm mt-1">
                                    {upcomingEvents.length} {upcomingEvents.length === 1 ? 'event' : 'events'} scheduled
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {isLoadingUpcoming ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {Array.from({ length: 6 }).map((_, index) => renderSkeletonCard(index))}
                        </div>
                    ) : upcomingEvents.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-lg text-muted-foreground">No upcoming events scheduled.</p>
                        </div>
                    )}
                </section>

                {/* Past Events Section */}
                <section ref={pastEventsRef}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Past Events</h2>
                            {!pastEventsInitialized ? (
                                <Skeleton className="h-4 w-32 mt-1" />
                            ) : (
                                <p className="text-muted-foreground text-sm mt-1">
                                    {loadedPastEvents.length} {loadedPastEvents.length === 1 ? 'event' : 'events'} loaded
                                    {hasMorePastEvents && ' • Scroll for more'}
                                </p>
                            )}
                        </div>
                    </div>

                    {!pastEventsInitialized ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {Array.from({ length: initialBatchSize }).map((_, index) => renderSkeletonCard(index))}
                        </div>
                    ) : loadedPastEvents.length === 0 ? (
                        <div className="text-center py-16">
                            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-lg text-muted-foreground">No past events to display.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {loadedPastEvents.map((event, index) => 
                                    renderEventCard(event, index)
                                )}
                            </div>
                            
                            {/* Loading more skeletons */}
                            {isLoadingMorePastEvents && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
                                    {Array.from({ length: eventsPerBatch }).map((_, index) => 
                                        renderSkeletonCard(loadedPastEvents.length + index)
                                    )}
                                </div>
                            )}

                            {/* Load more trigger (invisible element for Intersection Observer) */}
                            {hasMorePastEvents && (
                                <div 
                                    ref={loadMoreTriggerRef} 
                                    className="h-20 w-full"
                                    aria-hidden="true"
                                />
                            )}

                            {/* End of list indicator */}
                            {!hasMorePastEvents && loadedPastEvents.length > 0 && (
                                <div className="text-center py-12 mt-8">
                                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-5 w-5" />
                                        <p className="text-sm">You've reached the end of past events</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </section>

            </motion.div>
        </div>
    );
};

export default EventsPage;
