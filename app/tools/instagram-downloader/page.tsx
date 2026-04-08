import { Metadata } from "next";
import IGDownloader from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "Instagram Downloader - Reels, Stories & Posts",
  description: "Download Instagram Reels, Stories, and Posts in high quality for free. Our fast and secure Instagram downloader requires no login and works on all devices.",
  keywords: [
    ...SEO_KEYWORDS,
    "instagram downloader",
    "ig video download",
    "reels downloader",
    "download instagram story",
    "save instagram video",
    "free ig downloader",
    "instagram post saver",
    "download igtv"
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
    canonical: "https://themukesh.com/tools/instagram-downloader",
  },
  openGraph: {
    title: "Instagram Downloader - Reels, Stories & Posts",
    description: "Download Instagram Reels, Stories, and Posts in high quality for free. Our fast and secure Instagram downloader requires no login and works on all devices.",
    url: "https://themukesh.com/tools/instagram-downloader",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg2-optimized.webp",
        width: 1200,
        height: 630,
        alt: "Instagram Video Downloader Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Downloader - Reels, Stories & Posts",
    description: "Download Instagram Reels, Stories, and Posts in HD instantly. No app required.",
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
    "name": "Instagram Downloader",
    "url": "https://themukesh.com/tools/instagram-downloader",
    "description": "Download Instagram Reels, Stories, and Posts in high quality for free. Our fast and secure Instagram downloader requires no login and works on all devices.",
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
      <IGDownloader />

      <main className="max-w-5xl mx-auto px-4 py-20 text-gray-300">
        <article className="prose prose-invert prose-pink max-w-none space-y-8">
          <h2 className="text-3xl font-bold text-white mb-6">The Fast & Easy Way to Download Instagram Content</h2>
          <p className="leading-relaxed text-lg">
            Instagram is a hub for incredible visual inspiration, ranging from cinematic Reels to educational carousel posts. However, the platform doesn't provide a native way to save these videos and images directly to your local gallery for offline viewing. My <strong>Instagram Downloader</strong> is designed to fill that gap, providing a seamless, one-click solution to archive your favorite social media moments in high definition.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">How to Download Instagram Reels & Stories</h3>
          <p className="leading-relaxed">
            The process is straightforward and works identically across mobile and desktop devices. Follow these three simple steps:
          </p>
          <ol className="list-decimal pl-6 space-y-3 mt-4 text-gray-300">
            <li>
              <strong>Copy the URL:</strong> Open Instagram and find the Reel, Post, or Story you want to save. Tap the "Share" button and select "Copy Link".
            </li>
            <li>
              <strong>Paste & Analyze:</strong> Paste the link into the input field above. Our system automatically detects the content type and fetches the highest available quality from the Instagram CDN.
            </li>
            <li>
              <strong>Download:</strong> Click the download button. The file will be saved directly to your Downloads folder without any watermarks or quality loss.
            </li>
          </ol>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Why Use This Downloader?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
              <h4 className="text-xl text-white font-medium mb-2">No Login Required</h4>
              <p className="text-gray-400 text-sm">We never ask for your Instagram credentials. The tool works entirely through public API hooks, ensuring your account remains 100% secure.</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
              <h4 className="text-xl text-white font-medium mb-2">HD Quality Preservation</h4>
              <p className="text-gray-400 text-sm">Most screen recording methods degrade video quality. My tool fetches the original source file, preserving every pixel of the original 1080p or 4K upload.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Ethical Use & Copyright</h3>
          <p className="leading-relaxed">
            While this tool makes it easy to save content, I encourage all users to respect the intellectual property of creators. This downloader is intended for personal archival use and offline viewing. If you plan to re-share or use the downloaded content in your own projects, please ensure you have the original creator's permission and provide proper attribution.
          </p>
          
          <p className="leading-relaxed mt-8 pb-10 italic text-gray-400">
            Support the creators by liking and following their profiles on the official Instagram app!
          </p>
        </article>
      </main>
    </>
  );
};

export default Page;
