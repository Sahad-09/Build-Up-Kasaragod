import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Build Up Kasaragod - For a Better Tomorrow",
  description: "Build Up Kasaragod NGO works across 11 Divisions to strengthen governance, expand economic opportunities, and empower women in Kasaragod through local expertise and international cooperation.",
  keywords: [
    "NGO",
    "Kasaragod",
    "community development",
    "governance",
    "economic opportunity",
    "women empowerment",
    "international cooperation"
  ],
  openGraph: {
    title: "Build Up Kasaragod - For a Better Tomorrow",
    description: "An independent organization dedicated to public good and community development in Kasaragod.",
    type: "website",
    locale: "en_US",
    siteName: 'Build Up Kasaragod',
    images: [{
      url: '/logo.png',
      width: 1200,
      height: 630,
      alt: 'Build Up Kasaragod'
    }],

  },
  icons: {
    icon: [
      { url: '/logo.svg', sizes: 'any' },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUK NGO - Transforming Kasaragod",
    description: "Strengthening community through governance, economic opportunity, and international cooperation.",
  },
  alternates: {
    canonical: "https://www.buildupkasaragod.org" // Replace with actual website URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}