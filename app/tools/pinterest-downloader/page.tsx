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

      <main className="max-w-5xl mx-auto px-4 py-20 text-gray-300">
        <article className="prose prose-invert prose-red max-w-none space-y-8">
          <h2 className="text-3xl font-bold text-white mb-6">Download Pinterest Videos & Images in High Quality</h2>
          <p className="leading-relaxed text-lg">
            Pinterest is one of the world's largest visual discovery engines, filled with billions of "Pins" representing creative ideas, home decor, fashion, and technical DIY projects. While Pinterest allows you to "Save" pins within their app, it doesn't offer a direct way to download videos or high-resolution images to your device's local storage. My <strong>Pinterest Downloader</strong> provides a fast, free, and secure way to save any Pinterest content in its original quality.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">How to Use the Pinterest Downloader</h3>
          <p className="leading-relaxed">
            Our tool is optimized for all browsers and devices, including iOS, Android, and Desktop. Saving your favorite pins takes just a few seconds:
          </p>
          <ol className="list-decimal pl-6 space-y-3 mt-4 text-gray-300">
            <li>
              <strong>Copy the Pin Link:</strong> Find a video or image pin on Pinterest. Click the "Share" icon (or the three dots) and select "Copy Link".
            </li>
            <li>
              <strong>Paste the URL:</strong> Navigate back to this page and paste the link into the search bar above.
            </li>
            <li>
              <strong>Download:</strong> Our system will process the link and provide a direct download link to the mp4 (video) or jpg (image) file. Click "Download" to save it to your device.
            </li>
          </ol>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Key Features & Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
              <h4 className="text-xl text-white font-medium mb-2">Full HD & 4K Support</h4>
              <p className="text-gray-400 text-sm">We fetch the highest resolution version available from Pinterest's servers. Whether it's a standard pin or a high-bitrate video, you get the best quality.</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
              <h4 className="text-xl text-white font-medium mb-2">Unlimited Free Downloads</h4>
              <p className="text-gray-400 text-sm">There are no daily limits or hidden costs. You can download as many pins as you need for your mood boards or creative inspiration.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Universal Compatibility</h3>
          <p className="leading-relaxed">
            Because this tool is web-based, you don't need to install any suspicious third-party apps or browser extensions. It works perfectly on Chrome, Safari, Firefox, and even internal mobile social media browsers. Your downloads are processed through secure HTTPS protocols, ensuring your data remains private and protected.
          </p>
          
          <p className="leading-relaxed mt-8 pb-10 italic text-gray-400">
            Happy Pinning! Remember to support original creators by giving them a follow on Pinterest.
          </p>
        </article>
      </main>
    </>
  );
};

export default Page;
