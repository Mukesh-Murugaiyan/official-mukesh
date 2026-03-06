import React from 'react';
import { Metadata } from 'next';
import ImageCropperClient from './ImageCropperClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Free Online Image Cropper – Simple, Fast & Secure',
  description: 'Easily crop, zoom, and resize your images entirely in your browser. Customize aspect ratios for social media perfectly without losing quality. 100% Client-side.',
  keywords: 'image cropper, photo editor online, crop image tool, free image resize, react-easy-crop, aspect ratio resizer, photo cropper',
  openGraph: {
    title: 'Free Online Image Cropper – Simple, Fast & Secure',
    description: 'Easily crop, zoom, and resize your images entirely in your browser without uploading to any server.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Cropper',
    description: 'Easily crop, zoom, and resize your images securely entirely in your browser.',
  }
};

export default function ImageCropperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Online Image Cropper",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": "Secure, fast, client-side online image cropper. Adjust aspect ratios and download instantly without server uploads.",
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
    </>
  );
}
