"use client";

import React from "react";
import { motion } from "framer-motion";
import { personalConfig } from "../config";

export const SathiNameReveal: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 text-center z-10 overflow-hidden">
      {/* Background Soft Moonlight Aura */}
      <div className="absolute w-[28rem] h-[28rem] rounded-full bg-gradient-to-r from-purple-600/25 via-fuchsia-600/20 to-indigo-600/25 blur-[140px] pointer-events-none animate-pulse" />

      {/* Orbiting Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-300/40 blur-[1px] animate-orbit"
            style={{
              width: `${(i % 2) + 3}px`,
              height: `${(i % 2) + 3}px`,
              top: "50%",
              left: "50%",
              animationDuration: `${8 + i * 2}s`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center gap-6 relative z-10">
        {/* Main Name Blur-to-Sharp Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(18px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative py-2"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight bg-gradient-to-r from-purple-100 via-rose-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(192,132,252,0.45)]">
            {personalConfig.nameReveal.mainName}
          </h1>
        </motion.div>

        {/* Subtitle "en Moon 🌙" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center gap-3 px-6 py-2 rounded-full border border-purple-500/25 bg-purple-950/30 backdrop-blur-md"
        >
          <span className="text-xl md:text-2xl font-serif text-purple-200 font-light tracking-wide">
            {personalConfig.nameReveal.subName}
          </span>
        </motion.div>

        {/* Romantic Kavithai Verse */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="text-base md:text-lg text-purple-200/90 font-serif italic max-w-lg mt-2 leading-relaxed"
        >
          "{personalConfig.nameReveal.kavithai}"
        </motion.p>
      </div>

      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
        .animate-orbit {
          animation: orbit infinite linear;
        }
      `}</style>
    </section>
  );
};
