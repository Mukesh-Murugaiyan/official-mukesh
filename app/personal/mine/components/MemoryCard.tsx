"use client";

import React from "react";
import { motion } from "framer-motion";
import { StoryCardItem } from "../config";

interface MemoryCardProps {
  card: StoryCardItem;
  index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ card, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay: (index % 2) * 0.2,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative w-full rounded-3xl p-8 md:p-10 bg-gradient-to-br from-neutral-900/80 via-neutral-950/90 to-black/90 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-2xl shadow-xl hover:shadow-[0_10px_40px_rgba(168,85,247,0.18)] transition-all duration-500 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Soft Color Accent Glow */}
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: card.themeColor }}
      />

      <div>
        {/* Tagline & Motif */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs font-mono tracking-widest text-purple-300/80 uppercase">
              {card.tagline}
            </span>
          </div>
          {card.motif && (
            <span className="text-base text-purple-300/70 group-hover:scale-125 transition-transform duration-300">
              {card.motif}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif text-white font-light tracking-wide mb-4 group-hover:text-purple-100 transition-colors duration-300">
          {card.title}
        </h3>

        {/* Content */}
        <p className="text-neutral-300 font-light leading-relaxed text-base md:text-lg mb-6">
          {card.content}
        </p>
      </div>

      {/* Subtext */}
      {card.subtext && (
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span className="italic">{card.subtext}</span>
          <span className="text-purple-400/60 group-hover:text-purple-400 transition-colors">
            ✦
          </span>
        </div>
      )}
    </motion.div>
  );
};
