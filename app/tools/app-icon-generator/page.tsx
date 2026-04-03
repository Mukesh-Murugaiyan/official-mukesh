import React from 'react';
import { Metadata } from 'next';
import AppIconGeneratorClient from './AppIconGeneratorClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "App Icon Generator - iOS, Android & Web Icons",
  description: "Generate perfectly sized app icons for iOS, Android, and Web projects. Export Xcode-ready AppIcon sets and Android adaptive icons in seconds.",
  keywords: "app icon generator, Xcode Contents.json generator, Android adaptive icons generator, PWA icon manifest maker, iOS icon sizes, react-easy-crop, app image asset creator",
};

export default function AppIconGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "App Icon Generator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "url": "https://themukesh.com/tools/app-icon-generator",
    "description": "Generate perfectly sized app icons for iOS, Android, and Web projects. Export Xcode-ready AppIcon sets and Android adaptive icons in seconds.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="software-app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppIconGeneratorClient />
    </>
  );
}
