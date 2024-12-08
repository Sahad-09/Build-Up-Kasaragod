import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from 'react';
import { motion } from 'framer-motion';

export const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('success');
        setEmail('');
        // In real implementation, you would handle the newsletter signup here
    };

    return (
        <div className="py-24">
            <div className="container mx-auto px-4 ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <Mail className="w-12 h-12 mx-auto mb-6 text-[#FBAA18]" />
                    <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
                    <p className="text-xl mb-8 text-muted-foreground">
                        Subscribe to our newsletter for updates on community initiatives,
                        upcoming events, and success stories.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <div className="flex-1">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="h-12 px-8"
                            >
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4"
                        >
                            <Alert>
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertDescription>
                                    Thank you for subscribing! Welcome to our community.
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
