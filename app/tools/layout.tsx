import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Web & Developer Tools | Mukesh Murugaiyan",
  description:
    "A collection of free, high-performance web and developer tools including image optimizers, code formatters, and utility extensions.",
  keywords: ["web tools", "developer tools", "free online tools", "image processing", "vscode extensions"],
  openGraph: {
    title: "Free Online Web & Developer Tools | Mukesh Murugaiyan",
    description: "Boost your workflow with our developer-focused tool collection.",
    url: "https://themukesh.com/tools",
    images: [{ url: "/torchlite.png", alt: "Developer Tools" }],
  },
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
