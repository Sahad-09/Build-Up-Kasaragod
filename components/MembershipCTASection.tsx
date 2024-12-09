import { UserPlus, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Link from 'next/link';

export const MembershipCTASection = () => {
    return (
        <div className="py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <UserPlus className="w-12 h-12 mx-auto mb-6 text-[#FBAA18]" />
                    <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
                    <p className="text-xl mb-8 text-muted-foreground">
                        Become a member of Build Up Kasaragod and be part of our mission
                        to transform and uplift the Kasaragod region.
                    </p>

                    <Link href="/membership-form">
                        <Button className="h-12 px-8">
                            Become a Member
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
