import { Metadata } from "next";
import ToolsPageClient from "./ToolsPageClient";

export const metadata: Metadata = {
  title: "Free Online Web & Developer Tools | Mukesh Murugaiyan",
  description:
    "Explore a collection of free, high-performance web and developer tools including image background removers, croppers, and social media downloaders designed for modern workflows.",
  keywords: ["web tools", "developer tools", "free online tools", "image processing", "vscode extensions", "instagram downloader", "pinterest downloader"],
  openGraph: {
    title: "Free Online Web & Developer Tools | Mukesh Murugaiyan",
    description: "Boost your workflow with our developer-focused tool collection. Fast, free, and secure online utilities.",
    url: "https://themukesh.com/tools",
    siteName: "TheMukesh",
    images: [{ url: "https://themukesh.com/mukesh-mg2-optimized.webp", alt: "Developer Tools" }],
  },
  alternates: {
    canonical: "https://themukesh.com/tools",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
