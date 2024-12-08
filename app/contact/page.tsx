"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const ElegantContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [formStatus, setFormStatus] = useState("");

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFormStatus("Sending...");

        // Simulate form submission
        setTimeout(() => {
            setFormStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl grid md:grid-cols-2 border rounded-xl shadow-lg overflow-hidden"
            >
                {/* Contact Information Side */}
                <Card className="bg-accent/10 p-8 flex flex-col justify-between">
                    <CardContent className="space-y-6">
                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-light mb-4"
                        >
                            Contact Us
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-muted-foreground"
                        >
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </motion.p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-6 h-6 text-muted-foreground" />
                                <span className="text-foreground">123 Elegant Street, Design City</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Phone className="w-6 h-6 text-muted-foreground" />
                                <span className="text-foreground">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Mail className="w-6 h-6 text-muted-foreground" />
                                <span className="text-foreground">hello@elegantdesign.com</span>
                            </div>
                        </div>

                        <div className="flex space-x-6 pt-4">
                            {[
                                { Icon: Facebook, color: "text-muted-foreground hover:text-primary" },
                                { Icon: Twitter, color: "text-muted-foreground hover:text-primary" },
                                { Icon: Instagram, color: "text-muted-foreground hover:text-primary" }
                            ].map(({ Icon, color }, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`${color} transition-colors`}
                                >
                                    <Icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Form Side */}
                <Card className="p-8">
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Your email"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="message"
                                    className="text-sm font-medium"
                                >
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Your message"
                                    rows={4}
                                />
                            </div>

                            {formStatus && (
                                <p className={`text-center ${formStatus.includes('successfully') ? 'text-green-500' : 'text-muted-foreground'}`}>
                                    {formStatus}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default ElegantContactPage;