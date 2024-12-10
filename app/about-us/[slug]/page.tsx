import Image from 'next/image';

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
        bio: "Shri KV Madhusudanan is known for his philanthropic contributions in the field of healthcare, having raised substantial funds for hospital infrastructure.",
        achievements: ["Built a state-of-the-art hospital", "Received national awards for his social work"],
    },
    {
        name: "Mr. Kunhi Mohammed",
        position: "Patron",
        image: "/patron-02.jpg",
        fallback: "KM",
        bio: "Mr. Kunhi Mohammed has been a cornerstone of several successful business ventures and social welfare projects in the region.",
        achievements: ["Founded a leading manufacturing firm", "Established a scholarship fund for underprivileged students"],
    },
];

const seniorOfficeBearers = [
    {
        name: "Dr. Sheikh Bava",
        position: "President",
        image: "/president.png",
        fallback: "SB",
        bio: "Dr. Sheikh Bava is a renowned figure in the educational sector, advocating for modern teaching methods and curriculum reforms.",
        achievements: ["Authored textbooks on contemporary education", "Promoted online learning initiatives"],
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
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-semibold">{bearer.name}</h1>
            <p className="text-lg mt-2">{bearer.position}</p>
            <div className="mt-4">
                {bearer.image ? (
                    <Image
                        src={bearer.image}
                        alt={bearer.name}
                        width={128}
                        height={128}
                        className="mx-auto"
                    />
                ) : (
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mx-auto">
                        <span className="text-xl font-semibold">{bearer.fallback}</span>
                    </div>
                )}
            </div>
            <p className="mt-4 text-gray-700">More information about {bearer.name}...</p>
            <p className="mt-2 font-medium text-gray-900">Bio:</p>
            <p>{bearer.bio}</p>
            <p className="mt-2 font-medium text-gray-900">Achievements:</p>
            <ul className="list-disc pl-6 text-left mx-auto max-w-lg">
                {bearer.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                ))}
            </ul>
        </div>
    );
}
