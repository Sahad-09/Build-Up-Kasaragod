"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaTrophy, FaUserFriends } from "react-icons/fa";

const AboutUsPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-16 px-8 space-y-12">
            <div className="max-w-4xl w-full text-center space-y-8">
                {/* Animated Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                >
                    About Us
                </motion.h1>

                {/* Introduction Text with animation */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-xl text-gray-700"
                >
                    We are a passionate team driven by innovation and excellence, crafting solutions that shape the future.
                </motion.p>
            </div>

            {/* Three Icon Sections with Animations */}
            <div className="flex flex-wrap justify-center gap-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-center space-y-4"
                >
                    <FaHandsHelping className="text-6xl text-purple-500 mx-auto" />
                    <h3 className="text-2xl font-semibold">Collaboration</h3>
                    <p className="text-lg text-gray-600">
                        We believe in teamwork and the power of collaboration to achieve amazing things.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="text-center space-y-4"
                >
                    <FaTrophy className="text-6xl text-yellow-500 mx-auto" />
                    <h3 className="text-2xl font-semibold">Excellence</h3>
                    <p className="text-lg text-gray-600">
                        Excellence is at the core of everything we do. We aim to deliver the best results.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="text-center space-y-4"
                >
                    <FaUserFriends className="text-6xl text-green-500 mx-auto" />
                    <h3 className="text-2xl font-semibold">Community</h3>
                    <p className="text-lg text-gray-600">
                        We foster a supportive community, valuing every individual’s input to create something greater.
                    </p>
                </motion.div>
            </div>

            {/* Additional Info Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="space-y-4 text-center max-w-2xl mx-auto"
            >
                <p className="text-lg text-gray-600">
                    We are committed to crafting a future that is powered by technology, creativity, and collaboration. Our team works with dedication and passion, focused on making a real impact with every project we undertake.
                </p>
                <p className="text-lg text-gray-600">
                    Our core values—innovation, quality, and customer-first—guide us in everything we do. Join us in making a difference.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutUsPage;
