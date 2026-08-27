"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { personalConfig } from "../config";

export const PersonalApology: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-4 py-4 text-center z-10 my-auto overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full flex flex-col items-center gap-4 md:gap-8 max-h-[80vh] overflow-y-auto scrollbar-none py-2"
      >
        {/* Soft Badge */}
        <motion.div variants={itemVariants}>
          <span className="px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest text-purple-300/90 uppercase bg-purple-950/40 border border-purple-800/30 backdrop-blur-md">
            Sincere Words
          </span>
        </motion.div>

        {/* Heading "Sathi..." */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-serif font-light text-rose-100 tracking-tight drop-shadow-[0_0_25px_rgba(192,132,252,0.35)]"
        >
          {personalConfig.apology.heading}
        </motion.h2>

        {/* Apology Block Card (Compact padding for mobile viewports) */}
        <motion.div
          variants={itemVariants}
          className="w-full p-5 md:p-9 rounded-2xl md:rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-purple-500/25 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="flex flex-col gap-3.5 md:gap-5 text-center">
            {personalConfig.apology.lines.map((line, idx) => (
              <p
                key={idx}
                className="text-sm md:text-lg text-neutral-200 font-light leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-purple-500/20">
            <p className="text-xs md:text-base text-purple-200/90 font-light tracking-wide italic">
              {personalConfig.apology.closingNote}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
