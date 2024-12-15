"use client";

import React from 'react';
import { Menu, UserPlus } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const menuItems = [
        { title: "About Us", href: "/about-us" },
        { title: "Events", href: "/events" },
        { title: "Scholarship", href: "/scholarship" },
        { title: "Contact", href: "/contact" },
        { title: "Donate", href: "/donate-us" },
    ];

    return (
        <nav className="border-b p-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center p-3">
                        <Link href="/" className="text-xl font-bold hover:underline">
                            <Image
                                src="/logo-SVG.svg"
                                width={100}
                                height={100}
                                alt='Logo'
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menuItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        <NavigationMenuLink
                                            href={item.href}
                                            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            {item.title}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        {/* New Member Section */}
                        <div className="relative">
                            <Link
                                href="/membership-form"
                                className="text-white bg-primary px-4 py-2 rounded-3xl text-sm font-medium 
                                animate-pulse-custom hover:scale-110 transform transition
                                hover:shadow-lg hover:shadow-primary/50
                                group relative overflow-hidden flex items-center gap-2"
                            >
                                <UserPlus className="h-5 w-5" />
                                <span className="relative z-10">New Member</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[240px]">
                                <div className="flex flex-col gap-4 mt-8">
                                    {menuItems.map((item) => (
                                        <SheetClose asChild key={item.title}>
                                            <a
                                                href={item.href}
                                                className="px-4 py-2 text-sm font-medium rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                {item.title}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <SheetClose asChild>
                                        <Link
                                            href="/membership-form"
                                            className="text-white bg-primary px-4 py-2 rounded-full text-sm font-medium 
                                            animate-pulse-custom hover:scale-110 transform transition
                                            hover:shadow-lg hover:shadow-primary/50
                                            group relative overflow-hidden flex items-center gap-2"
                                        >
                                            <UserPlus className="h-5 w-5" />
                                            <span className="relative z-10">New Member</span>
                                        </Link>
                                    </SheetClose>
                                </div>
                                <SheetTitle className="hidden">
                                    <VisuallyHidden.Root className='border border-red-900'>x</VisuallyHidden.Root>
                                </SheetTitle>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;