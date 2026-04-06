import { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog | Mukesh Murugaiyan",
  description: "Sharing what we build, what breaks, and what we learn along the way. Insights and tutorials on software engineering.",
  keywords: ["software engineering", "coding tutorials", "mukesh murugaiyan", "web development", "mobile development"],
  openGraph: {
    title: "Blog | Mukesh Murugaiyan",
    description: "Insights and tutorials on software engineering and development.",
    url: "https://themukesh.com/blog",
    siteName: "Mukesh Murugaiyan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Mukesh Murugaiyan",
    description: "Insights and tutorials on software engineering.",
  },
  alternates: {
    canonical: "https://themukesh.com/blog",
  }
};

export default function BlogPage() {
  return <BlogListClient />;
}
