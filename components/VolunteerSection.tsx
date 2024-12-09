import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";


export const VolunteerSection = () => {
    return (
        <div className="container mx-auto py-24 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
                <p className="text-xl text-muted-foreground mb-8">
                    Be part of the change. Volunteer with us to make a difference in our community.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500">
                    Become a Volunteer
                </Button>
            </motion.div>
        </div>
    );
};