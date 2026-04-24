import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";
import ToolLayout from "@/Layout/ToolLayout";
import { MdArrowBack } from "react-icons/md";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.image }],
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
    alternates: {
      canonical: `https://themukesh.com/blog/${slug}`,
    }
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.image,
    "datePublished": blog.date,
    "author": {
      "@type": "Person",
      "name": blog.author,
      "url": "https://themukesh.com"
    },
    "description": blog.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://themukesh.com/blog/${slug}`
    }
  };

  const backSlogans = ["Back to Build", "Back to Break", "Back to Learn"];
  const randomSlogan = backSlogans[Math.floor(Math.random() * backSlogans.length)];

  return (
    <ToolLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="flex flex-col gap-8">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group w-max"
        >
          <MdArrowBack className="group-hover:-translate-x-1 transition-transform" />
          <span>{randomSlogan}</span>
        </Link>

        {/* Hero */}
        <header>
          <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4 uppercase tracking-widest font-medium">
            <span>{blog.date}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full" />
            <span>{blog.author}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-cyan-400 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-cyan max-w-none 
          prose-headings:font-bold 
          prose-h1:text-3xl 
          prose-h2:text-2xl 
          prose-h3:text-xl 
          prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-sm
          prose-li:text-gray-400 prose-li:text-sm
          prose-strong:text-white
          prose-code:text-cyan-400 prose-code:bg-cyan-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/5 prose-pre:rounded-xl
          ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-lg">
                MM
              </div>
              <div>
                <p className="text-xs font-bold text-white">{blog.author}</p>
                <p className="text-[10px] text-gray-500"> Full Stack Software Engineer</p>
              </div>
            </div>
            
            <div className="flex gap-4">
               {/* Could add social sharing here */}
            </div>
          </div>
        </footer>
      </div>
    </ToolLayout>
  );
}
