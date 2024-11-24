// components/HeroSection.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    title: string;
    description: string;
    buttonText: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, buttonText }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-screen flex flex-col items-center justify-center p-6"
        >
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl leading-[5rem] md:leading-[8rem] font-extrabold tracking-tight text-transparent 
          bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
          text-center mb-4"
                style={{
                    textShadow: "0 4px 3px rgba(31,41,55,0.4)",
                }}
            >
                {title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl leading-[2rem] md:leading-[3rem] text-center max-w-2xl mb-8 text-transparent 
          bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
                {description}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Button variant="default" className="p-5 rounded-lg">
                    {buttonText}
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default HeroSection;
