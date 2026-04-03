import PasswordGenerator from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

// SEO metadata
export const metadata = {
  title: "Password Generator - Secure & Strong Password Creator",
  description: "Generate strong, secure passwords instantly with our free online password generator. Customize length and character types to ensure maximum security for your accounts.",
  keywords: [
    ...SEO_KEYWORDS,
    "password generator",
    "strong passwords",
    "secure passwords",
    "online password tool",
    "password strength checker",
    "password manager",
    "random password creator"
  ],
  openGraph: {
    title: "Password Generator - Secure & Strong Password Creator",
    description: "Generate strong, secure passwords instantly with our free online password generator. Customize length and character types to ensure maximum security for your accounts.",
    url: "https://themukesh.com/tools/password-generator",
    siteName: "TheMukesh",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg2-optimized.webp",
        width: 1200,
        height: 630,
        alt: "Secure Password Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Secure & Strong Password Creator",
    description: "Generate strong, secure passwords instantly with our free online password generator.",
    images: ["https://themukesh.com/mukesh-mg2-optimized.webp"],
  },
};

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Password Generator",
    "url": "https://themukesh.com/tools/password-generator",
    "description": "Generate strong, secure passwords instantly with our free online password generator. Customize length and character types to ensure maximum security for your accounts.",
    "applicationCategory": "SecurityApplication",
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
      <PasswordGenerator />
    </>
  );
};

export default Page;
