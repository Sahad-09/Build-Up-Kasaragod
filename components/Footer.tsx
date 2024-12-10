"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
    return (
        <motion.footer
            className="bg-gray-800 text-white py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: About Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">About Us</h3>
                        <p className="text-gray-400">
                            We are a community-driven organization committed to creating sustainable solutions that make a positive impact globally.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about-us" className="text-gray-400 hover:text-white">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-gray-400 hover:text-white">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/new-member" className="text-gray-400 hover:text-white">
                                    New Member
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Follow Us</h3>
                        <div className="flex space-x-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-3xl text-gray-400 hover:text-white transition-all" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-3xl text-gray-400 hover:text-white transition-all" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-3xl text-gray-400 hover:text-white transition-all" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-3xl text-gray-400 hover:text-white transition-all" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
