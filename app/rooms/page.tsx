"use client"
import React, { useState, useEffect } from "react";
import {
    MapPin,
    Calendar,
    Clock,
    Users,
    Zap,
    Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

// Define types for the room and event structure
interface Event {
    title: string;
    date: string;
    time: string;
    participants: number;
}

interface Room {
    name: string;
    capacity: number;
    description: string;
    upcoming: Event[];
}

interface RoomCategory {
    icon: React.ElementType;
    color: string;
    rooms: Room[];
}

const roomCategories: { [key: string]: RoomCategory } = {
    innovation: {
        icon: Zap,
        color: "purple",
        rooms: [
            {
                name: "Future Tech Arena",
                capacity: 50,
                description: "A cutting-edge space designed for emerging technology workshops and experimental projects.",
                upcoming: [
                    {
                        title: "AI Innovation Hackathon",
                        date: "2024-07-15",
                        time: "09:00 AM",
                        participants: 30,
                    },
                    {
                        title: "Quantum Computing Symposium",
                        date: "2024-08-22",
                        time: "02:00 PM",
                        participants: 40,
                    },
                ],
            },
            {
                name: "Collaborative Ideation Hub",
                capacity: 30,
                description: "An interactive space for brainstorming, design thinking, and collaborative problem-solving.",
                upcoming: [
                    {
                        title: "Sustainable Design Workshop",
                        date: "2024-07-10",
                        time: "10:30 AM",
                        participants: 25,
                    },
                ],
            },
        ],
    },
    learning: {
        icon: Layers,
        color: "blue",
        rooms: [
            {
                name: "Digital Learning Studio",
                capacity: 40,
                description: "A multimedia-equipped room for online courses, training sessions, and skill development programs.",
                upcoming: [
                    {
                        title: "Web Development Bootcamp",
                        date: "2024-07-05",
                        time: "11:00 AM",
                        participants: 35,
                    },
                    {
                        title: "UX/UI Design Masterclass",
                        date: "2024-08-01",
                        time: "03:00 PM",
                        participants: 40,
                    },
                ],
            },
        ],
    },
    community: {
        icon: Users,
        color: "green",
        rooms: [
            {
                name: "Community Engagement Center",
                capacity: 60,
                description: "A welcoming space for community meetings, cultural exchanges, and social initiatives.",
                upcoming: [
                    {
                        title: "Local Entrepreneurship Network",
                        date: "2024-07-18",
                        time: "06:00 PM",
                        participants: 45,
                    },
                    {
                        title: "Community Art Showcase",
                        date: "2024-08-10",
                        time: "05:00 PM",
                        participants: 50,
                    },
                ],
            },
        ],
    },
};

const NewRoomsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("innovation");
    const [isClient, setIsClient] = useState<boolean>(false); // Added state to detect client-side rendering

    useEffect(() => {
        // Ensure date formatting logic happens on the client side only
        setIsClient(true);
    }, []);

    const renderRoomCard = (room: Room, index: number) => (
        <motion.div
            key={room.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
            }}
        >
            <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>{room.name}</CardTitle>
                        <div className={`p-2 rounded-lg bg-${roomCategories[selectedCategory].color}-100`}>
                            <MapPin className={`h-6 w-6 text-${roomCategories[selectedCategory].color}-600`} />
                        </div>
                    </div>
                    <CardDescription>Capacity: {room.capacity} people</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-muted-foreground">{room.description}</p>
                    <div className="space-y-3">
                        {room.upcoming.map((event, eventIndex) => (
                            <div
                                key={event.title}
                                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold">{event.title}</h4>
                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {isClient
                                                    ? new Date(event.date).toLocaleDateString()
                                                    : event.date} {/* Only format date on client */}
                                            </span>
                                            <Clock className="h-4 w-4 ml-3" />
                                            <span>{event.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 mr-2 text-gray-500" />
                                        <span>{event.participants} participants</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">New Rooms & Upcoming Events</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore our diverse spaces and upcoming events designed to inspire, educate, and connect.
                </p>
            </motion.div>

            <div className="flex justify-center mb-8 space-x-4">
                {Object.keys(roomCategories).map((category) => {
                    const Category = roomCategories[category];
                    const Icon = Category.icon;
                    return (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                flex items-center px-6 py-3 rounded-lg 
                ${selectedCategory === category
                                    ? `bg-${Category.color}-600 text-white`
                                    : `bg-${Category.color}-100 text-${Category.color}-600`
                                }
                transition-all duration-300 hover:scale-105
              `}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Icon className="h-6 w-6 mr-2" />
                            {category.charAt(0).toUpperCase() + category.slice(1)} Rooms
                        </motion.button>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomCategories[selectedCategory].rooms.map(renderRoomCard)}
            </div>
        </div>
    );
};

export default NewRoomsPage;
