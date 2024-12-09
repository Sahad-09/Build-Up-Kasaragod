"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ImageSection = () => {
    const sections = [
        {
            title: 'Bekal Fort Landscape',
            description: 'Explore the historic Bekal Fort, a magnificent coastal fortification showcasing Kerala\'s architectural heritage and strategic location.',
            imageSrc: '/Image1.webp',
        },
        {
            title: 'Serene Beach',
            description: 'Discover a tranquil coastline with pristine sands, gentle waves, and a peaceful atmosphere that invites relaxation and serenity.',
            imageSrc: '/Image2.webp',
        },
        {
            title: 'Winding Roads',
            description: 'Journey through picturesque routes that curve through stunning landscapes, revealing scenic vistas and adventurous pathways.',
            imageSrc: '/Image3.webp',
        },
        {
            title: 'Enchanting Forests',
            description: 'Delve into lush, mysterious woodlands teeming with diverse ecosystems, ancient trees, and hidden natural wonders.',
            imageSrc: '/Image4.webp',
        },
    ];

    return (
        <section className="container mx-auto py-12 space-y-16">
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                        } items-center gap-8`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Image Section */}
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Image
                            src={section.imageSrc}
                            alt={section.title}
                            width={600}
                            height={400}
                            className="rounded-xl shadow-lg w-full object-cover"
                        />
                    </motion.div>

                    {/* Text Section */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                        <motion.h2
                            className="text-3xl font-bold"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            {section.title}
                        </motion.h2>
                        <motion.p
                            className="text-muted-foreground leading-relaxed"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            {section.description}
                        </motion.p>
                    </div>
                </motion.div>
            ))}
        </section>
    );
};

export default ImageSection;