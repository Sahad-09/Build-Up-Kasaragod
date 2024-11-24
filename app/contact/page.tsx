"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<string>("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus("Submitting...");

        setTimeout(() => {
            setIsSubmitting(false);
            setFormStatus("Message Sent! Thank you for contacting us.");
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-6">
            <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl">
                {/* Contact Form Section with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full"
                >
                    <Card className="p-8 shadow-lg rounded-xl border border-gray-200 w-full">
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-2 p-4 text-lg w-full"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-2 p-4 text-lg w-full"
                                        placeholder="Your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="mt-2 p-4 text-lg w-full"
                                        placeholder="Your message"
                                    />
                                </div>

                                {formStatus && (
                                    <p className="text-center text-sm text-green-500">{formStatus}</p>
                                )}

                                <Button
                                    type="submit"
                                    variant="default"
                                    className={`w-full p-4 text-lg rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact Details Section with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-6"
                >
                    <div className="text-lg font-semibold">Get In Touch</div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="flex items-center space-x-3"
                    >
                        <FaPhoneAlt className="text-4xl text-purple-500" />
                        <div className="text-lg">
                            <p className="font-bold">Phone:</p>
                            <p>+1 234 567 890</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex items-center space-x-3"
                    >
                        <FaEnvelope className="text-4xl text-purple-500" />
                        <div className="text-lg">
                            <p className="font-bold">Email:</p>
                            <p>contact@kasaragod.org</p>
                        </div>
                    </motion.div>

                    {/* Social Media Links with Hover Effects */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="flex space-x-6"
                    >
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl text-blue-400 hover:text-blue-600 transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl text-pink-500 hover:text-pink-700 transition-colors"
                        >
                            Instagram
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
