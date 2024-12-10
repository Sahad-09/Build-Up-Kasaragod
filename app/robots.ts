import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_METADATA_BASE;

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
