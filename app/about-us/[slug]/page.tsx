"use client"
import Image from 'next/image';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Trophy, User, BookOpen } from "lucide-react";
export type PageParams = {
    slug: string;
};

// Define the page props type using Next.js conventions
export type PageProps = {
    params: PageParams;
};

const patrons = [
    {
        name: "Mr. Abdul Khader Saleem",
        position: "Chief Patron",
        image: "",
        fallback: "AKS",
        bio: "Mr. Abdul Khader Saleem has been a guiding force in the community for over two decades, leading several initiatives aimed at education and welfare.",
        achievements: ["Led educational reforms", "Supported multiple charitable organizations"],
    },
    {
        name: "Shri KV Madhusudanan",
        position: "Patron",
        image: "/patron-01.jpg",
        fallback: "MA",
        bio: "Shri KV Madhusudanan joined CRPF in 1975 as a Deputy Superintendent of Police and was the topper of his batch. He rendered invaluable service in the North Eastern region and during anti-terrorist operations in Punjab. In 1991, he was selected for the SPG, where he headed the close protection team for four Prime Ministers, from Narasimha Rao to Vajpayee. On promotion to DIG, he headed the Kerala CRPF. As IG, he commanded the North Eastern sector, the largest sector of CRPF. He has completed several courses both domestically and internationally and visited over 30 countries while accompanying the Prime Ministers. Currently, he is deeply involved in managing his plantation and engaging in social service.",
        achievements: [
            "Recipient of the President's Medal for Meritorious Services",
            "Recipient of the President's Medal for Distinguished Services",
            "Commanded the largest CRPF sector in the North East",
            "Headed close protection teams for four Prime Ministers",
            "Over 30 international visits accompanying Prime Ministers",
            "Notable contributions to plantation management and social service post-retirement"
        ],
    },
    {
        name: "Mr. M T P Mohammed Kunhi",
        position: "Patron",
        image: "/patron-02.jpg",
        fallback: "KM",
        bio: "Mr. M T P Mohammed Kunhi is a prominent businessman based in the Kingdom of Saudi Arabia and the Managing Director of the Sulfex Group of Companies. Born in Trikkaripur, Kasargode District, he ventured to KSA in 1985, where he worked in various companies before establishing a successful career in retail and manufacturing. His flagship venture, Sulfex Mattress Company, located in Kannur, Kerala, manufactures high-quality mattresses with a production capacity of 2,500 units per day, exporting to various countries and holding ISO certification and ISI marks. Known for his leadership, determination, and advocacy for hard work, Mr. Mohammed Kunhi continues to excel in business and social service.",
        achievements: [
            "Founder and CMD of Sulfex Group of Companies",
            "Recipient of the 'Largest Seller of Rubberized Coir Products in India' award from the Ministry of MSME",
            "Recipient of the Social Responsibility Award from the Hon. Governor of Kerala",
            "Winner of the Chandrika Business Enclave Award",
            "Second Business Award by the Kasaragod Chamber of Commerce and Industries",
            "Led Sulfex Mattress Company to approval by the Ministry of Defence (DGQA) for quality assurance"
        ],
    },
];

const seniorOfficeBearers = [
    {
        name: "Dr. Sheikh Bava",
        position: "President",
        image: "/president.png",
        fallback: "SB",
        bio: "Dr. Sheikh Bava Mangalore, an entrepreneur and educator holding a PhD from Kalinga University, is known for his contributions to industrial development, education, and philanthropy. He is a Director at Hindustan Group of Companies and Bestgreenplates Pvt Ltd, a Partner at Venesa Industrial Complex LLP, and the Chairman of Surplus Infra Pvt Ltd. He has previously held key roles in the UAE Government-owned ADNOC Gas Processing & Distribution Plant. An advocate of hard work and effective leadership, Dr. Bava has been instrumental in promoting social welfare through various trusts and initiatives.",
        achievements: [
            "India Darshan National Integration Award (2021)",
            "State Human Services Award (2014)",
            "Pravasi Bhartiya Kerala 'Udyog Pathr' Award (2014)",
            "ADNOC Outstanding Performer Award (2010)",
            "NSS Honorary Fellow Award (1991)",
            "Founder of TAWAM and Promoter of Integrated Industrial Estate Project",
            "Board Member of Hindustan Education Trust and MAKE Welfare Trust",
            "President of multiple social welfare organizations including Bafaqi Foundation Karnataka and Britent Welfare Trust"
        ],
    },
    {
        name: "Dr. Rashmi Prakash",
        position: "General Secretary",
        image: "/generalSecretary.png",
        fallback: "RP",
        bio: "Dr. Rashmi Prakash has dedicated her career to mental health awareness, making significant strides in public policy for psychological wellbeing.",
        achievements: ["Founded mental health awareness programs", "Recipient of the National Health Service Award"],
    },
    {
        name: "Mr. Anoop K",
        position: "Treasurer",
        image: "/treasurer.png",
        fallback: "AK",
        bio: "Mr. Anoop K is an expert in financial planning and management, ensuring the proper allocation of resources in all projects.",
        achievements: ["Reformed the financial structure of several non-profits", "Awarded the Excellence in Financial Management Award"],
    },
];

const vicePresidents = [
    {
        name: "Mrs. C. K. Zulekha Mahin",
        position: "Vice President",
        image: "/vicePresident-01.png",
        fallback: "ZM",
        bio: "Mrs. C. K. Zulekha Mahin has been a tireless advocate for women's empowerment, leading numerous campaigns aimed at education and employment for women.",
        achievements: ["Launched women empowerment programs", "Awarded for her contribution to society"],
    },
    {
        name: "Mr. Dayakara R. K.",
        position: "Vice President",
        image: "/vicePresident-02.png",
        fallback: "DRK",
        bio: "Mr. Dayakara R. K. is deeply involved in rural development and has worked extensively on improving the living conditions in remote areas.",
        achievements: ["Built rural infrastructure", "Developed sustainable farming initiatives"],
    },
    {
        name: "Mr. Abdul Nassir N. A.",
        position: "Vice President",
        image: "/vicePresident-03.png",
        fallback: "AN",
        bio: "Mr. Abdul Nassir N. A. has a background in technology and innovation, fostering numerous initiatives in the tech industry.",
        achievements: ["Founded a successful tech startup", "Introduced tech-based educational programs"],
    },
    {
        name: "Mr. Rafeek",
        position: "Vice President",
        image: "/vicePresident-04.png",
        fallback: "R",
        bio: "Mr. Rafeek is a social entrepreneur, creating initiatives that benefit local communities and provide them with better opportunities for growth.",
        achievements: ["Founded a non-profit organization", "Launched job training programs for youth"],
    },
];

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    // Helper function to find the bearer by name
    const findBearer = (slug: string) => {
        // Check each category (patrons, senior office bearers, vice presidents)
        const allBearers = [...patrons, ...seniorOfficeBearers, ...vicePresidents];
        return allBearers.find((bearer) =>
            bearer.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
    };
    const bearer = findBearer(slug);

    if (!bearer) {
        return <div>Office bearer not found</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#030712] to-[#1F2937]  flex items-center justify-center p-1">
            <Card className="w-full max-w-4xl shadow-2xl border-none">
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl">
                    {/* Profile Section - Now First on Mobile */}
                    <motion.div
                        className="p-8 bg-background flex flex-col justify-center space-y-6 order-1 md:order-2"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex justify-center mb-4">
                                        {bearer.image ? (
                                            <Image
                                                src={bearer.image}
                                                alt={bearer.name}
                                                width={150}
                                                height={150}
                                                className="rounded-full border-4 border-primary shadow-lg"
                                            />
                                        ) : (
                                            <div className="w-40 h-40 bg-secondary rounded-full flex items-center justify-center">
                                                <span className="text-4xl font-bold text-primary">
                                                    {bearer.fallback}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{bearer.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                {bearer.name}
                            </h1>
                            <p className="text-md text-muted-foreground mb-4">
                                {bearer.position}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="text-[#FBA918] w-6 h-6" />
                                <h2 className="text-xl font-semibold text-foreground">
                                    Personal Bio
                                </h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {bearer.bio}
                            </p>
                        </div>
                    </motion.div>

                    {/* Achievements Section - Now Second on Mobile */}
                    <motion.div
                        className="p-8 flex flex-col justify-center space-y-6 order-2 md:order-1"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            backgroundImage: `url('/grain.png')`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <Trophy className="text-[#FBA918] w-10 h-10" />
                            <h2 className="text-2xl font-bold text-primary-foreground">
                                Remarkable Achievements
                            </h2>
                        </div>
                        <motion.ul
                            className="space-y-3 text-primary-foreground/90"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        delayChildren: 0.3,
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {bearer.achievements.map((achievement, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start space-x-3"
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                >
                                    <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                                        {index + 1}
                                    </Badge>
                                    <span>{achievement}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
}