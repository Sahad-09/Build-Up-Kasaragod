"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Import Image component from next/image

const ImageSection = () => {
    const sections = [
        {
            title: "Empowering Communities",
            description:
                "We work hand-in-hand with communities to create sustainable and impactful solutions. Join us in our mission to make a difference.",
        },
        {
            title: "Innovating for the Future",
            description:
                "Our projects are driven by innovation, aiming to solve challenges with cutting-edge technology and forward-thinking solutions.",
        },
        {
            title: "Sustainability at Core",
            description:
                "We believe in building a future that is not only prosperous but also environmentally sustainable for generations to come.",
        },
        {
            title: "Connecting the World",
            description:
                "Our initiatives aim to bring people together, fostering collaboration and understanding across borders.",
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
                            src="https://placehold.co/600x400"
                            alt={section.title}
                            width={600} // Set width of the image
                            height={400} // Set height of the image
                            className="rounded-xl shadow-lg w-full object-cover"
                        />
                    </motion.div>

                    {/* Text Section */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                        <motion.h2
                            className="text-3xl font-bold text-gray-800"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            {section.title}
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 leading-relaxed"
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
