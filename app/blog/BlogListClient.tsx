"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MdOutlineArticle, MdArrowBack } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import ToolLayout from "@/Layout/ToolLayout";
import { MdArrowOutward } from "react-icons/md";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function BlogListClient() {
  return (
    <ToolLayout>
      <div className="flex flex-col gap-6 md:gap-8 pb-10">
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group w-max"
        >
          <MdArrowBack className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <MdOutlineArticle className="text-xl md:text-2xl text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Build • Break • Learn</h1>
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-16 md:w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full origin-left mb-4 md:mb-6" 
          />
          <p className="text-gray-400 max-w-2xl leading-relaxed text-xs md:text-sm mb-8">
            Sharing what we build, what breaks, and what we learn along the way. 
            Insights, tutorials, and technical updates from the development world.
          </p>
        </div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
          >
            {blogs.map((blog) => (
              <motion.div key={blog.id} variants={cardVariants}>
                <Link href={`/blog/${blog.slug}`} className="group block h-full">
                  <div className="relative bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col h-full">
                    {/* Image Area */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />

                      {/* Tags */}
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-medium text-cyan-400 uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight line-clamp-2">
                          {blog.title}
                        </h2>
                        <MdArrowOutward className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shrink-0 text-lg" />
                      </div>

                      <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-grow line-clamp-3">
                        {blog.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-[9px] text-gray-500 font-medium uppercase tracking-widest">
                          {blog.date}
                        </span>
                        <div className="text-[10px] font-bold text-cyan-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                          READ MORE
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
