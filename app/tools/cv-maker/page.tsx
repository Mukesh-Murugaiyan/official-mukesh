import type { Metadata } from "next";
import CvMakerClient from "./CvMakerClient";

export const metadata: Metadata = {
  title: "Free CV Maker & Resume Builder — Export Editable Word (.docx) & PDF",
  description:
    "Build professional, ATS-friendly resumes online for free. Features live HTML preview, OOXML tab-stop date alignment, justified text formatting, and direct editable Word (.docx) download.",
  keywords: [
    "CV Maker",
    "CV Builder",
    "Free Resume Maker",
    "Editable Word CV Generator",
    "docx Resume Builder",
    "ATS Resume Generator",
    "Professional Resume Template",
    "Online CV Generator Free",
    "Developer Resume Maker",
    "Mukesh Murugaiyan tools",
    "Free online CV creator",
    "Tab stop date alignment resume",
    "Justified text CV maker",
  ],
  authors: [{ name: "Mukesh Murugaiyan", url: "https://themukesh.com" }],
  creator: "Mukesh Murugaiyan",
  publisher: "Mukesh Murugaiyan",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free CV Maker & Resume Builder — Export Editable Word (.docx) & PDF",
    description:
      "Create professional, editable Word (.docx) documents with exact OOXML layout, tab-stop date alignment, justified body text, and navy headers.",
    url: "https://themukesh.com/tools/cv-maker",
    type: "website",
    siteName: "Mukesh Murugaiyan",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg2-optimized.webp",
        alt: "CV Maker & Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CV Maker & Resume Builder — Export Editable Word (.docx) & PDF",
    description:
      "Create professional, editable Word (.docx) documents with live HTML preview and OOXML tab-stop dates.",
  },
  alternates: {
    canonical: "https://themukesh.com/tools/cv-maker",
  },
};

export default function CvMakerServerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CV Maker & Resume Builder",
    url: "https://themukesh.com/tools/cv-maker",
    description:
      "Build professional, ATS-friendly resumes online for free. Features live HTML preview, OOXML tab-stop date alignment, justified text formatting, and direct editable Word (.docx) download.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "Mukesh Murugaiyan",
      url: "https://themukesh.com",
    },
  };

  const sampleCvJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Sample Full Stack Engineer Resume Template",
    url: "https://themukesh.com/tools/cv-maker",
    author: {
      "@type": "Person",
      name: "Mukesh Murugaiyan",
    },
    headline: "Professional Senior Full Stack Engineer CV",
    text: "Dynamic and results-driven Senior Full Stack Engineer with over 6 years of experience architecting high-performance web applications, cloud microservices, and interactive developer tools.",
    about: [
      "Frontend Development",
      "Backend & Cloud",
      "Node.js",
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "docx.js",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sampleCvJsonLd) }}
      />
      <CvMakerClient />
    </>
  );
}
