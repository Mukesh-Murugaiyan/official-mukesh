"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { personalConfig, MemoryJarOrb } from "../config";

export const SathiMemoryJar: React.FC = () => {
  const [selectedOrb, setSelectedOrb] = useState<MemoryJarOrb | null>(null);
  const [burstParticleCount, setBurstParticleCount] = useState<number>(0);

  const handleOrbClick = (orb: MemoryJarOrb, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrb(orb);
    setBurstParticleCount((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 py-12 text-center select-none overflow-hidden z-20">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-2 mb-4 z-20"
      >
        <span className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-purple-300/80 uppercase bg-purple-950/40 border border-purple-800/30 backdrop-blur-md">
          Secret Memory Jar 🔮
        </span>
        <h2 className="text-2xl md:text-4xl font-serif font-light text-rose-100 tracking-tight">
          Sathi-kkaaga Oru Celestial Jar
        </h2>
        <p className="text-xs md:text-sm text-purple-200/70 font-light">
          Jar-kulla floating-a irukkura memory orbs-a thodu... ✦
        </p>
      </motion.div>

      {/* Main Glass Jar Container */}
      <div className="relative w-72 h-96 md:w-80 md:h-[26rem] flex items-center justify-center z-10">
        {/* Soft Ambient Jar Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-3xl animate-pulse pointer-events-none" />

        {/* Vector SVG Glass Jar */}
        <svg viewBox="0 0 240 320" className="w-full h-full drop-shadow-[0_15px_35px_rgba(168,85,247,0.3)]">
          <defs>
            {/* Glass Gradient */}
            <linearGradient id="jarGlassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="50%" stopColor="rgba(168,85,247,0.08)" />
              <stop offset="100%" stopColor="rgba(147,51,234,0.18)" />
            </linearGradient>

            {/* Cork Lid Gradient */}
            <linearGradient id="corkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* CORK LID */}
          <path d="M 85,25 L 155,25 L 160,45 L 80,45 Z" fill="url(#corkGrad)" />
          <rect x="75" y="45" width="90" height="10" rx="3" fill="#92400e" />

          {/* GLASS NECK */}
          <path
            d="M 82,55 Q 70,75 60,100 L 60,270 Q 60,300 90,300 L 150,300 Q 180,300 180,270 L 180,100 Q 170,75 158,55 Z"
            fill="url(#jarGlassGrad)"
            stroke="rgba(192,132,252,0.4)"
            strokeWidth="3.5"
          />

          {/* GLASS REFLECTION HIGHLIGHTS */}
          <path
            d="M 75,110 C 70,160 70,220 75,260"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 165,120 C 168,170 168,210 165,240"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* 4 Floating Memory Orbs Inside Jar */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-auto">
          {personalConfig.memoryJarOrbs.map((orb, index) => {
            const orbPositions = [
              { top: "35%", left: "30%" },
              { top: "32%", left: "62%" },
              { top: "60%", left: "35%" },
              { top: "58%", left: "60%" },
            ];
            const pos = orbPositions[index];

            return (
              <motion.div
                key={orb.id}
                style={{ top: pos.top, left: pos.left }}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3 + index * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleOrbClick(orb, e)}
                aria-label={`Open memory orb ${orb.title}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-3 group"
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl shadow-[0_0_20px_rgba(192,132,252,0.8)] border border-white/40 transition-transform duration-300 backdrop-blur-md"
                  style={{ backgroundColor: orb.color }}
                >
                  <span>{orb.icon}</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono tracking-widest text-purple-200 bg-black/80 px-2 py-0.5 rounded border border-purple-500/30">
                  {orb.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Glassmorphic Memory Card Modal when an Orb is tapped */}
      <AnimatePresence>
        {selectedOrb && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrb(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Memory Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, y: 15, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-neutral-900/95 border border-purple-500/40 p-8 shadow-[0_0_60px_rgba(192,132,252,0.35)] text-center text-white z-10 flex flex-col items-center gap-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedOrb(null)}
                aria-label="Close orb modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-purple-200 hover:text-white hover:scale-110 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tagline */}
              <span className="px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-purple-300 uppercase bg-purple-950/60 border border-purple-800/40">
                {selectedOrb.tagline}
              </span>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-serif text-rose-100 font-light tracking-wide">
                {selectedOrb.title}
              </h3>

              {/* Content */}
              <p className="text-neutral-200 font-light leading-relaxed text-base md:text-lg">
                {selectedOrb.content}
              </p>

              {/* Kavithai Verse */}
              <div className="w-full pt-4 border-t border-purple-500/20 mt-2">
                <p className="text-base text-purple-200 font-serif italic leading-relaxed">
                  "{selectedOrb.kavithai}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
