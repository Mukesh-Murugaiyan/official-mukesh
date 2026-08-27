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
        staggerChildren: 0.7,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 text-center z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl flex flex-col items-center gap-10"
      >
        {/* Soft Badge */}
        <motion.div variants={itemVariants}>
          <span className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-purple-300/80 uppercase bg-purple-950/40 border border-purple-800/30 backdrop-blur-md">
            Sincere Words
          </span>
        </motion.div>

        {/* Heading "Sathi..." */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-serif font-light text-rose-100 tracking-tight drop-shadow-[0_0_25px_rgba(192,132,252,0.35)]"
        >
          {personalConfig.apology.heading}
        </motion.h2>

        {/* Apology Block Card */}
        <motion.div
          variants={itemVariants}
          className="w-full p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-purple-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="flex flex-col gap-5 text-center">
            {personalConfig.apology.lines.map((line, idx) => (
              <p
                key={idx}
                className="text-base md:text-xl text-neutral-200 font-light leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <p className="text-sm md:text-base text-purple-200/90 font-light tracking-wide italic">
              {personalConfig.apology.closingNote}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
