import { Metadata } from "next";
import ImageBGRemover from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "AI Background Remover - Remove Image BG Instantly",
  description: "Instantly remove backgrounds from any image 100% locally in your browser. Our free AI background remover tool is fast, private, and requires no registration.",
  keywords: [
    ...SEO_KEYWORDS,
    "image background remover",
    "remove bg",
    "transparent background maker",
    "ai photo editor",
    "free background removal",
    "local AI background removal",
    "private image editor",
    "png cutout maker"
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
    canonical: "https://themukesh.com/tools/image-bg-remover",
  },
  openGraph: {
    title: "AI Background Remover - Remove Image BG Instantly",
    description: "Instantly remove backgrounds from any image 100% locally in your browser. Our free AI background remover tool is fast, private, and requires no registration.",
    url: "https://themukesh.com/tools/image-bg-remover",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg2-optimized.webp",
        width: 1200,
        height: 630,
        alt: "AI Image Background Remover Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Background Remover - Remove Image BG Instantly",
    description: "Instantly remove backgrounds from any image 100% locally in your browser.",
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
    "name": "AI Background Remover",
    "url": "https://themukesh.com/tools/image-bg-remover",
    "description": "Instantly remove backgrounds from any image 100% locally in your browser. Our free AI background remover tool is fast, private, and requires no registration.",
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
      <ImageBGRemover />
    </>
  );
};

export default Page;
