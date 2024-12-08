"use client"

import React from 'react';
import { Menu } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const menuItems = [
        { title: "Events", href: "/events" },
        { title: "Initiatives", href: "/initiatives" },
        { title: "Scholarship", href: "/scholarship" },
        { title: "About Us", href: "/about" },
        { title: "Contact", href: "/contact" },
    ];

    return (
        <nav className="border-b p-3 ">
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
                    <div className="hidden md:block ">
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
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                </div>
                                <SheetTitle className="hidden">
                                    <VisuallyHidden.Root>x</VisuallyHidden.Root>
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
