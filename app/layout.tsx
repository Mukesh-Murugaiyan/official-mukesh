import { ThemeProvider } from "@/components/theme/ThemeProvider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
// import PagePreloader from "@/components/PagePreloader";
import Footer from "@/components/Footer";
import { SEO_KEYWORDS } from "@/data/seo";
import {
  faqs,
  gameSchema,
  images,
  localBusinesses,
  softwareApplications,
} from "@/lib/seo";
import { person } from "@/lib/seo/person";
import { profilePage } from "@/lib/seo/profilePage";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  ImageJsonLd,
  LocalBusinessJsonLd,
  ProfilePageJsonLd,
  SoftwareApplicationJsonLd,
} from "next-seo";
import Providers from "./providers";
// import PagePreloader from "@/components/PagePreloader";
import Script from "next/script";
// import UsefulLinksModal from "@/components/UsefulLinksModal";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const GAID = process.env.GA_ID || "";
const GTMID = process.env.GTM_ID || "";

export const metadata: Metadata = {
  title: {
    default: "Mukesh Murugaiyan | Full Stack Developer",
    template: "%s | Mukesh Murugaiyan",
  },
  description:
    "Web, Android, iOS, and Desktop Applications Developer with experience in third-party integrations and webhook-based systems.",
  keywords: SEO_KEYWORDS,
  metadataBase: new URL("https://themukesh.com"),
  appleWebApp: {
    title: "Mukesh Murugaiyan",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  alternates: {
    canonical: "https://themukesh.com",
  },
  openGraph: {
    title: "Mukesh Murugaiyan | Full Stack Software Engineer",
    description: "Expert Web, Android, iOS, and Desktop Applications Developer. Building scalable, high-performance solutions with React, Next.js, and Node.js.",
    url: "https://themukesh.com",
    siteName: "Mukesh Murugaiyan Portfolio",
    images: [
      {
        url: "/mukesh-mg2-optimized.webp",
        width: 1200,
        height: 630,
        alt: "Mukesh Murugaiyan - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // themeColor: "#00FFF0", // Moved to viewport export
  twitter: {
    card: "summary_large_image",
    title: "Mukesh Murugaiyan | Full Stack Developer",
    description:
      "Official portfolio of Mukesh Murugaiyan | I build Web, Android, iOS & Desktop applications with modern tech stacks.",
    site: "@mukeshmurugaiyan",
    creator: "@mukeshmurugaiyan",
    images: [
      {
        url: "https://themukesh.com/mukesh-mg2-optimized.webp",
        alt: "Mukesh Murugaiyan | Full Stack Developer Portfolio",
      },
    ],
  },
  verification: {
    google: "AUY8DrfbJpplzyCMcTJNiCHYZJ34AB2NphOmTJ1_gfY",
  },
  icons: {
    icon: [
      { url: "/icon1.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#00FFF0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"
    className="light"
    style={{colorScheme:"light"}}
    suppressHydrationWarning
    >
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://acupoftee.github.io" />
        <link rel="preconnect" href="https://maps.googleapis.com" />

        {/* DNS Prefetch as fallback */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://acupoftee.github.io" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />

        {/* AdSense verification meta tag */}
        <meta name="google-adsense-account" content="ca-pub-7493262026277368" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        {/* Profile */}
        <ProfilePageJsonLd
          mainEntity={person}
          dateCreated={profilePage.dateCreated}
          dateModified={profilePage.dateModified}
        />
        {/* Software Applications */}
        {softwareApplications.map((app, i) => (
          <SoftwareApplicationJsonLd key={i} {...app} />
        ))}
        {/* Games */}
        {gameSchema.map((game, i) => (
          <SoftwareApplicationJsonLd key={i} {...(game as any)} />
        ))}
        {/* Local Business */}
        {localBusinesses.map((biz, i) => (
          <LocalBusinessJsonLd key={i} {...biz} />
        ))}
        {/* Images */}
        {images.map((img, i) => (
          <ImageJsonLd key={i} {...img} />
        ))}
        {/* FAQ */}
        <FAQJsonLd questions={faqs} />

        <BreadcrumbJsonLd
          items={[
            {
              name: "Home",
              item: "https://themukesh.com",
            },
          ]}
        />
        <GoogleTagManager gtmId={GTMID} />
        {/* <PagePreloader> */}
          <ThemeProvider>
            {/* <PopupHeader/> */}
            <Providers>{children}</Providers>
            {/* <UsefulLinksModal /> */}
            <Footer/>
          </ThemeProvider>
        {/* </PagePreloader> */}
        <Toaster richColors closeButton position="top-right" />
        <GoogleAnalytics gaId={GAID} />
         <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7493262026277368"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
