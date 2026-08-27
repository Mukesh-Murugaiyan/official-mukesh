"use client";

import React from "react";
import { motion } from "framer-motion";
import { MemoryCard } from "./MemoryCard";
import { personalConfig } from "../config";

export const PersonalStorySection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 z-10">
      <div className="max-w-5xl w-full flex flex-col items-center gap-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center flex flex-col items-center gap-4"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-purple-300/80 uppercase bg-purple-950/40 border border-purple-800/30 backdrop-blur-md">
            Emotional Reflections 💜
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-rose-100 tracking-tight">
            Reflections & Appreciation
          </h2>
          <p className="text-purple-200/70 text-sm md:text-base max-w-md font-light">
            Every memory holds value. Here are the things I reflect on most.
          </p>
        </motion.div>

        {/* Story Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {personalConfig.storyCards.map((card, index) => (
            <MemoryCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
