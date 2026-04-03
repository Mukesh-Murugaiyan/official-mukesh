import { Metadata } from "next";
import PinterestDownloader from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "Pinterest Downloader - Download Pins, Videos & Images",
  description: "Download Pinterest videos and images in high quality for free. Our fast and secure Pinterest downloader requires no login and works on all devices.",
  keywords: [
    ...SEO_KEYWORDS,
    "pinterest video downloader",
    "pinterest downloader",
    "download pinterest video",
    "pinterest image downloader",
    "download video from pinterest",
    "pinterest gif downloader",
    "pinterest story downloader",
    "save pinterest video",
    "pinterest pin downloader",
    "free pinterest video downloader",
    "pinterest reels downloader",
    "hd pinterest downloader",
    "online pinterest video downloader",
    "pinterest video saver",
    "pinterest photo downloader",
  ],
  authors: [{ name: "Mukesh" }],
  creator: "Mukesh",
  publisher: "Mukesh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://themukesh.com/tools/pinterest-downloader",
  },
  openGraph: {
    title: "Pinterest Downloader - Download Pins, Videos & Images",
    description: "Download Pinterest videos and images in high quality for free. Our fast and secure Pinterest downloader requires no login and works on all devices.",
    url: "https://themukesh.com/tools/pinterest-downloader",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg2-optimized.webp",
        width: 1200,
        height: 630,
        alt: "Pinterest Downloader Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinterest Downloader - Download Pins, Videos & Images",
    description: "Download Pinterest videos and images in high quality for free.",
    images: ["https://themukesh.com/mukesh-mg2-optimized.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pinterest Downloader",
    "url": "https://themukesh.com/tools/pinterest-downloader",
    "description": "Download Pinterest videos and images in high quality for free. Our fast and secure Pinterest downloader requires no login and works on all devices.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Mukesh",
      "url": "https://themukesh.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PinterestDownloader />
    </>
  );
};

export default Page;
