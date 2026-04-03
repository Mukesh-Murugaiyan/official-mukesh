import { Metadata } from "next";
import ThumbnailClient from "./components/ThumbnailClient";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader – High Quality 4K & HD",
  description:
    "Free online tool to download YouTube thumbnails in all qualities (4K, Ultra HD, HQ, SD). Fast, secure, and compatible with Shorts. No registration needed.",
  keywords: [
    ...SEO_KEYWORDS,
    "youtube thumbnail downloader",
    "get youtube thumbnail",
    "youtube thumbnail grabber",
    "save youtube preview image",
    "youtube 4k thumbnail download",
    "hd youtube thumbnail",
    "youtube shorts thumbnail downloader",
    "free online tools"
  ],
  authors: [{ name: "Mukesh Murugaiyan" }],
  creator: "Mukesh Murugaiyan",
  publisher: "Mukesh Murugaiyan",
  alternates: {
    canonical: "https://themukesh.com/tools/youtube-thumbnail-downloader",
  },
  openGraph: {
    title: "YouTube Thumbnail Downloader – Download 4K & HD Previews",
    description: "Instantly grab high-quality thumbnails from any YouTube video or Shorts. Free, fast, and no login required.",
    url: "https://themukesh.com/tools/youtube-thumbnail-downloader",
    siteName: "TheMukesh",
    images: ["https://themukesh.com/mukesh-mg2-optimized.webp"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail Downloader – HQ & 4K Downloads",
    description: "Save YouTube video thumbnails in original quality directly to your device. Support for HD and Shorts.",
    images: ["https://themukesh.com/mukesh-mg2-optimized.webp"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YouTube Thumbnail Downloader",
    "url": "https://themukesh.com/tools/youtube-thumbnail-downloader",
    "description": "Download any YouTube video thumbnail in multiple resolutions including MaxRes (4K), HD, and SD.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Mukesh Murugaiyan",
      "url": "https://themukesh.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThumbnailClient />
    </>
  );
}
