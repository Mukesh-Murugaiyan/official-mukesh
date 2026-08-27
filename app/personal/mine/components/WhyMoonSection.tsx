"use client";

import React from "react";
import { motion } from "framer-motion";
import { personalConfig } from "../config";

export const WhyMoonSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 text-center z-10 overflow-hidden">
      {/* Giant Subtle SVG Crescent Moon Background Visual */}
      <div className="absolute w-[36rem] h-[36rem] md:w-[48rem] md:h-[48rem] pointer-events-none opacity-20 flex items-center justify-center animate-moon-glow">
        <svg viewBox="0 0 200 200" className="w-full h-full text-purple-300 fill-current">
          <path d="M100,10 A90,90 0 1,0 190,100 A70,70 0 1,1 100,10 Z" />
        </svg>
      </div>

      {/* Soft Backdrop Aura */}
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-purple-600/15 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl w-full flex flex-col items-center gap-10 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center gap-3 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-950/40 backdrop-blur-md"
        >
          <span className="text-xl md:text-2xl font-serif text-purple-200 font-light tracking-wide">
            {personalConfig.whyMoon.heading}
          </span>
        </motion.div>

        {/* Lines reveals */}
        <div className="flex flex-col items-center gap-6 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-2xl md:text-3xl font-serif text-purple-200/80 font-light italic"
          >
            "{personalConfig.whyMoon.line1}"
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-2xl md:text-3xl font-serif text-rose-100 font-light"
          >
            "{personalConfig.whyMoon.line2}"
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-2xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight text-white drop-shadow-[0_0_40px_rgba(192,132,252,0.45)] mt-2"
          >
            {personalConfig.whyMoon.line3}
          </motion.h2>

          {/* Kavithai Verse */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 1.8 }}
            className="text-base md:text-lg text-purple-200/90 font-serif italic mt-6 leading-relaxed border-t border-purple-500/20 pt-6 w-full"
          >
            "{personalConfig.whyMoon.kavithai}"
          </motion.p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes moon-glow {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.05) rotate(5deg);
            opacity: 0.28;
          }
        }
        .animate-moon-glow {
          animation: moon-glow 14s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};
