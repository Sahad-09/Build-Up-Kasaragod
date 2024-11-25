import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code2, Users, Globe, Database, Cloud, Lock, Sparkles } from "lucide-react";

interface HeroSectionProps {
    title: string;
    description: string;
    buttonText: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, buttonText }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Define node positions for easier path creation
    const nodes = {
        center: { x: 50, y: 50, scale: 0.02 },
        community: { x: 25, y: 33, scale: 0.015 },
        global: { x: 75, y: 67, scale: 0.01 },
        data: { x: 20, y: 70, scale: 0.012 },
        cloud: { x: 80, y: 30, scale: 0.018 },
        security: { x: 35, y: 80, scale: 0.014 },
        ai: { x: 65, y: 20, scale: 0.016 }
    };

    return (
        <div className="relative h-screen overflow-hidden bg-background">
            {/* Network Grid Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)/0.15) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Floating Network Nodes */}
            <div className="absolute inset-0 -z-5">
                {/* Central Node */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        x: mousePosition.x * nodes.center.scale,
                        y: mousePosition.y * nodes.center.scale,
                    }}
                >
                    <div className="w-24 h-24 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center animate-pulse">
                        <Code2 className="w-12 h-12 text-primary/70" />
                    </div>
                </motion.div>

                {/* Community Node */}
                <motion.div
                    className="absolute top-1/3 left-1/4"
                    animate={{
                        x: mousePosition.x * nodes.community.scale,
                        y: mousePosition.y * nodes.community.scale,
                    }}
                >
                    <div className="w-16 h-16 rounded-full border-2 border-accent/30 bg-accent/5 flex items-center justify-center animate-float">
                        <Users className="w-8 h-8 text-accent/70" />
                    </div>
                </motion.div>

                {/* Global Node */}
                <motion.div
                    className="absolute top-2/3 right-1/4"
                    animate={{
                        x: mousePosition.x * nodes.global.scale,
                        y: mousePosition.y * nodes.global.scale,
                    }}
                >
                    <div className="w-20 h-20 rounded-full border-2 border-secondary/30 bg-secondary/5 flex items-center justify-center animate-spin-slow">
                        <Globe className="w-10 h-10 text-secondary/70" />
                    </div>
                </motion.div>

                {/* Data Node */}
                <motion.div
                    className="absolute top-[70%] left-[20%]"
                    animate={{
                        x: mousePosition.x * nodes.data.scale,
                        y: mousePosition.y * nodes.data.scale,
                    }}
                >
                    <div className="w-16 h-16 rounded-full border-2 border-blue-400/30 bg-blue-400/5 flex items-center justify-center animate-float">
                        <Database className="w-8 h-8 text-blue-400/70" />
                    </div>
                </motion.div>

                {/* Cloud Node */}
                <motion.div
                    className="absolute top-[30%] right-[20%]"
                    animate={{
                        x: mousePosition.x * nodes.cloud.scale,
                        y: mousePosition.y * nodes.cloud.scale,
                    }}
                >
                    <div className="w-18 h-18 rounded-full border-2 border-purple-400/30 bg-purple-400/5 flex items-center justify-center animate-bounce-slow">
                        <Cloud className="w-9 h-9 text-purple-400/70" />
                    </div>
                </motion.div>

                {/* Security Node */}
                <motion.div
                    className="absolute top-[80%] left-[35%]"
                    animate={{
                        x: mousePosition.x * nodes.security.scale,
                        y: mousePosition.y * nodes.security.scale,
                    }}
                >
                    <div className="w-14 h-14 rounded-full border-2 border-green-400/30 bg-green-400/5 flex items-center justify-center animate-pulse">
                        <Lock className="w-7 h-7 text-green-400/70" />
                    </div>
                </motion.div>

                {/* AI Node */}
                <motion.div
                    className="absolute top-[20%] right-[35%]"
                    animate={{
                        x: mousePosition.x * nodes.ai.scale,
                        y: mousePosition.y * nodes.ai.scale,
                    }}
                >
                    <div className="w-16 h-16 rounded-full border-2 border-yellow-400/30 bg-yellow-400/5 flex items-center justify-center animate-float">
                        <Sparkles className="w-8 h-8 text-yellow-400/70" />
                    </div>
                </motion.div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full -z-1">
                    <motion.g>
                        {/* Central to all connections */}
                        {Object.entries(nodes).map(([key, node]) => {
                            if (key === 'center') return null;
                            return (
                                <motion.path
                                    key={key}
                                    d={`M ${nodes.center.x}% ${nodes.center.y}% L ${node.x}% ${node.y}%`}
                                    stroke={`hsl(var(--primary)/0.15)`}
                                    strokeWidth="1"
                                    fill="none"
                                    animate={{
                                        d: `M ${nodes.center.x + mousePosition.x * nodes.center.scale}% ${nodes.center.y + mousePosition.y * nodes.center.scale}% L ${node.x + mousePosition.x * node.scale}% ${node.y + mousePosition.y * node.scale}%`
                                    }}
                                />
                            );
                        })}

                        {/* Additional interconnections */}
                        <motion.path
                            d={`M ${nodes.community.x}% ${nodes.community.y}% L ${nodes.cloud.x}% ${nodes.cloud.y}%`}
                            stroke="hsl(var(--accent)/0.15)"
                            strokeWidth="1"
                            fill="none"
                            animate={{
                                d: `M ${nodes.community.x + mousePosition.x * nodes.community.scale}% ${nodes.community.y + mousePosition.y * nodes.community.scale}% L ${nodes.cloud.x + mousePosition.x * nodes.cloud.scale}% ${nodes.cloud.y + mousePosition.y * nodes.cloud.scale}%`
                            }}
                        />
                        <motion.path
                            d={`M ${nodes.data.x}% ${nodes.data.y}% L ${nodes.security.x}% ${nodes.security.y}%`}
                            stroke="hsl(var(--secondary)/0.15)"
                            strokeWidth="1"
                            fill="none"
                            animate={{
                                d: `M ${nodes.data.x + mousePosition.x * nodes.data.scale}% ${nodes.data.y + mousePosition.y * nodes.data.scale}% L ${nodes.security.x + mousePosition.x * nodes.security.scale}% ${nodes.security.y + mousePosition.y * nodes.security.scale}%`
                            }}
                        />
                        <motion.path
                            d={`M ${nodes.global.x}% ${nodes.global.y}% L ${nodes.ai.x}% ${nodes.ai.y}%`}
                            stroke="hsl(var(--accent)/0.15)"
                            strokeWidth="1"
                            fill="none"
                            animate={{
                                d: `M ${nodes.global.x + mousePosition.x * nodes.global.scale}% ${nodes.global.y + mousePosition.y * nodes.global.scale}% L ${nodes.ai.x + mousePosition.x * nodes.ai.scale}% ${nodes.ai.y + mousePosition.y * nodes.ai.scale}%`
                            }}
                        />
                    </motion.g>
                </svg>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative mb-4"
                >
                    <h1 className="text-6xl md:text-8xl leading-[5rem] md:leading-[8rem] font-extrabold tracking-tight text-center 
  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        {title}
                    </h1>

                    <div className="absolute -inset-x-8 inset-y-0 bg-primary/5 -skew-y-3 -z-10 rounded-xl" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl leading-[2rem] md:leading-[3rem] text-center max-w-2xl mb-8 text-muted-foreground"
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                >
                    <Button variant="default" size="lg" className="rounded-full px-8 w-full sm:w-auto">
                        {buttonText}
                        <Users className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="lg" className="rounded-full px-8 w-full sm:w-auto">
                        Explore Projects
                        <Code2 className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;