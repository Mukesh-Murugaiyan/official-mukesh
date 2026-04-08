import React from 'react';
import { Metadata } from 'next';
import ImageCropperClient from './ImageCropperClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Image Cropper - Free Online Image Resizer",
  description: "Crop and resize your images online with ease. Choose from popular aspect ratios for social media and download your perfectly framed photos instantly.",
  keywords: "image cropper, photo editor online, crop image tool, free image resize, react-easy-crop, aspect ratio resizer, photo cropper, social media image resizer",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://themukesh.com/tools/image-cropper",
  },
  openGraph: {
    title: "Image Cropper - Free Online Image Resizer",
    description: "Crop and resize your images online with ease. Choose from popular aspect ratios for social media and download your perfectly framed photos instantly.",
    type: "website",
    url: "https://themukesh.com/tools/image-cropper",
    siteName: "Mukesh Murugaiyan",
    images: [{ url: "https://themukesh.com/mukesh-mg2-optimized.webp", width: 1200, height: 630, alt: "Online Image Cropper Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Cropper - Free Online Image Resizer",
    description: "Crop and resize your images securely entirely in your browser.",
    images: ["https://themukesh.com/mukesh-mg2-optimized.webp"],
  }
};

export default function ImageCropperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Cropper",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "url": "https://themukesh.com/tools/image-cropper",
    "description": "Crop and resize your images online with ease. Choose from popular aspect ratios for social media and download your perfectly framed photos instantly.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="image-cropper-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImageCropperClient />
      
      <section className="max-w-4xl mx-auto px-4 py-16 text-gray-300">
        <div className="prose prose-invert prose-cyan max-w-none">
          <h2 className="text-3xl font-bold text-white mb-6">How Our Online Image Cropper Works</h2>
          <p className="mb-4">
            Framing your pictures perfectly for social media, blogs, or profile avatars shouldn't require complex software. Our Image Cropper is designed to provide <strong>instant, high-precision cropping</strong> directly within your browser. 
          </p>
          
          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Precision Cropping with Presets</h3>
          <p className="mb-4">
            We provide a variety of preset aspect ratios tailored for modern platforms:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>1:1 (Square):</strong> Perfect for Instagram posts and profile pictures.</li>
            <li><strong>4:5 (Portrait):</strong> The ideal ratio for high-engagement Instagram feed posts.</li>
            <li><strong>16:9 (Widescreen):</strong> Great for YouTube thumbnails, Twitter headers, and blog banners.</li>
            <li><strong>Freeform:</strong> Complete control to drag and resize the crop area exactly how you want it.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Privacy-First Image Processing</h3>
          <p className="mb-4">
            Unlike many other online tools, your images are <strong>never uploaded to our servers</strong>. All processing happens locally on your device using your browser's hardware acceleration. This ensures your private photos stay private while providing a lightning-fast experience.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Pro Tips for Perfect Crops</h3>
          <p className="mb-4">
            To get the best results, use the wheel on your mouse or pinch-to-zoom on mobile to fine-tune the scale. You can also drag the image within the frame to align the subject perfectly with the "Rule of Thirds" for a more professional look.
          </p>
        </div>
      </section>
    </>
  );
}
