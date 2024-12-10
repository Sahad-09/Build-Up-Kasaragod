"use client"
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, HandCoins, ShieldCheck, QrCode, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreativeDonationPage = () => {
    const [activePaymentMethod, setActivePaymentMethod] = useState('qr');

    const paymentMethods = [
        {
            id: 'qr',
            name: 'QR Code',
            Icon: QrCode,
            content: (
                <div className="relative z-20 p-4 rounded-3xl shadow-2xl border-4 border-blue-200/50 flex justify-center items-center">
                    <Image
                        src="/QR.png"
                        alt="Donation QR Code"
                        width={300}
                        height={300}
                        className="rounded-2xl transform hover:scale-105 transition-transform duration-300 max-w-full"
                    />
                </div>
            )
        },
        {
            id: 'upi',
            name: 'UPI/BHIM',
            Icon: CreditCard,
            content: (
                <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg shadow-md bg-[#071028] border border-[#FBA918]/50 w-full max-w-[350px]">
                    <h3 className="text-xl font-semibold text-[#FBA918]">
                        Scan QR or Use these UPI IDs
                    </h3>
                    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 w-full">
                        <p className="text-sm font-medium text-gray-700">
                            <span className="text-[#FBA918] font-bold">UPI ID:</span> buildupkasaragod@sbi
                        </p>
                    </div>
                    <p className="text-sm text-gray-400">
                        Every contribution brings us closer to making a difference!
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
                {/* Donation Information Side */}
                <div className="p-6 md:p-10 flex flex-col justify-center space-y-6 bg-blue-600/10 order-2 md:order-1">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                            <Heart className="mr-4 w-8 h-8 md:w-10 md:h-10" /> Donate with Ease
                        </h2>
                        <p className="mb-6">
                            Your contribution makes a real difference. Every donation helps us create positive change.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {[
                            { Icon: HandCoins, text: "100% Impact Driven" },
                            { Icon: ShieldCheck, text: "Secure Transactions" }
                        ].map(({ Icon, text }, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-center space-x-4 p-3 rounded-xl shadow-sm"
                            >
                                <Icon className="w-7 h-7" />
                                <span>{text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Payment Method Selector */}
                    <div className="flex justify-center space-x-4 mt-6">
                        {paymentMethods.map((method) => (
                            <Button
                                key={method.id}
                                onClick={() => setActivePaymentMethod(method.id)}
                                variant={activePaymentMethod === method.id ? "default" : "outline"}
                                className="flex items-center space-x-2"
                            >
                                <method.Icon className="w-5 h-5 mr-2" />
                                {method.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Payment Method Content Side */}
                <div className="flex items-center justify-center p-6 md:p-10 relative order-1 md:order-2">
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-10 flex justify-center items-center w-full"
                    >
                        <div className="absolute -inset-6 rounded-3xl blur-2xl animate-pulse"></div>
                        <div className="flex justify-center items-center w-full">
                            {paymentMethods.find(m => m.id === activePaymentMethod)?.content}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default CreativeDonationPage;