import type { Metadata } from "next";
import CSSGridGenerator from "./components/ClientPage";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "CSS Grid Generator - Visual Layout Builder",
  description: "Create responsive CSS Grid layouts visually. Drag, resize, and merge grid items to generate clean HTML and CSS code for your next web project.",
  keywords: [
    ...SEO_KEYWORDS,
    "CSS Grid Generator",
    "CSS Grid Builder",
    "Grid Layout Generator",
    "Responsive CSS Grid",
    "Visual CSS Grid Tool",
    "CSS Layout Generator",
    "Frontend Tools"
  ],
  alternates: {
    canonical: "https://themukesh.com/tools/grid-generator",
  },
  openGraph: {
    title: "CSS Grid Generator - Visual Layout Builder",
    description: "Create responsive CSS Grid layouts visually. Drag, resize, and merge grid items to generate clean HTML and CSS code for your next web project.",
    url: "https://themukesh.com/tools/grid-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Grid Generator - Visual Layout Builder",
    description: "Create responsive CSS Grid layouts visually and export clean code.",
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">
        CSS Grid Generator – Visual Grid Layout Builder
      </h1>

      <p className="sr-only">
        This CSS Grid Generator allows developers and designers to visually
        create responsive grid layouts. Drag, resize, and merge grid items and
        instantly generate clean HTML and CSS Grid code for production use.
      </p>

      <CSSGridGenerator />
    </>
  );
}
