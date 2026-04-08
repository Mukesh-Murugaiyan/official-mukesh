"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdBuild, MdArrowBack, MdWeb, MdCode, MdExtension } from "react-icons/md";
import Link from "next/link";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import ToolLayout from "@/Layout/ToolLayout";

const categories = [
  { id: "web", label: "Web Tools", icon: MdWeb },
  { id: "vscode", label: "VS Code Extensions", icon: MdCode },
  { id: "chrome", label: "Chrome Extensions", icon: MdExtension },
];

export default function ToolsPageClient() {
  const [activeCategory, setActiveCategory] = useState("web");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const filteredTools = tools.filter((tool) => tool.category === activeCategory);

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
              <MdBuild className="text-xl md:text-2xl text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">All Tools</h1>
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-16 md:w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full origin-left mb-4 md:mb-6" 
          />
          <p className="text-gray-400 max-w-2xl leading-relaxed text-xs md:text-sm mb-6 md:mb-8">
            Explore our collection of free online tools designed to speed up your workflow. 
            From image processing to developer utilities, we&apos;ve got you covered.
          </p>

          {/* Category Tabs - Mobile Scrollable UI */}
          <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
            {/* Soft fade gradients for scroll edges on mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent md:hidden pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent md:hidden pointer-events-none z-10" />
            
            <div className="flex overflow-x-auto gap-2 md:gap-3 pb-4 md:pb-0 
              scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent snap-x snap-mandatory"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap snap-center shrink-0 ${
                    activeCategory === category.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200"
                  }`}
                >
                  <category.icon className="text-sm md:text-lg" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid: 2 columns everywhere now */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pt-2"
          >
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, idx) => (
                <ToolCard key={idx} tool={tool} variants={cardVariants} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500 bg-white/5 rounded-2xl border border-white/10">
                <p>No tools found in this category yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
