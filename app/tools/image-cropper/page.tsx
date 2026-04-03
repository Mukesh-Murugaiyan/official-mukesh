import React from 'react';
import { Metadata } from 'next';
import ImageCropperClient from './ImageCropperClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Image Cropper - Free Online Image Resizer",
  description: "Crop and resize your images online with ease. Choose from popular aspect ratios for social media and download your perfectly framed photos instantly.",
  keywords: "image cropper, photo editor online, crop image tool, free image resize, react-easy-crop, aspect ratio resizer, photo cropper, social media image resizer",
  openGraph: {
    title: "Image Cropper - Free Online Image Resizer",
    description: "Crop and resize your images online with ease. Choose from popular aspect ratios for social media and download your perfectly framed photos instantly.",
    type: "website",
    url: "https://themukesh.com/tools/image-cropper",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Cropper - Free Online Image Resizer",
    description: "Crop and resize your images securely entirely in your browser.",
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
    </>
  );
}
