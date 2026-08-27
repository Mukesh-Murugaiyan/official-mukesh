"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { personalConfig } from "../config";

export const FinalMoonEnding: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 text-center z-10 overflow-hidden">
      {/* Crescent Moon background symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="mb-8 relative"
      >
        <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-400/30 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
          <Moon className="w-10 h-10 text-purple-200 fill-purple-300/30" />
        </div>
      </motion.div>

      <div className="max-w-2xl w-full flex flex-col items-center gap-8">
        {/* Line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-2xl md:text-3xl font-serif text-neutral-400 font-light italic tracking-wide"
        >
          "{personalConfig.ending.line1}"
        </motion.p>

        {/* Line 2 */}
        <motion.h2
          initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-2xl md:text-4xl font-serif text-purple-100 font-light leading-snug tracking-tight drop-shadow-[0_0_30px_rgba(192,132,252,0.4)]"
        >
          {personalConfig.ending.line2}
        </motion.h2>

        {/* Line 3 "Goodnight, Moon 🌙" */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-2xl md:text-4xl font-serif text-rose-200 font-light tracking-wide mt-2"
        >
          {personalConfig.ending.line3}
        </motion.p>

        {/* Kavithai Verse */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2.0 }}
          className="text-base md:text-lg text-purple-200/90 font-serif italic max-w-lg leading-relaxed mt-2"
        >
          "{personalConfig.ending.kavithai}"
        </motion.p>

        {/* Glowing 💜 🌙 🦋 Motifs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2.4 }}
          className="flex items-center justify-center gap-8 text-2xl md:text-3xl mt-4"
        >
          <span className="animate-pulse" style={{ animationDuration: "3s" }}>
            💜
          </span>
          <span className="animate-pulse" style={{ animationDuration: "3s", animationDelay: "0.5s" }}>
            🌙
          </span>
          <span className="animate-pulse" style={{ animationDuration: "3s", animationDelay: "1s" }}>
            🦋
          </span>
        </motion.div>

        {/* Fade Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 3.0 }}
          className="mt-8 pt-8 border-t border-white/10 w-full max-w-sm"
        >
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            {personalConfig.ending.fadeNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
