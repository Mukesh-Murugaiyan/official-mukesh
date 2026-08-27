"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, HeartHandshake, Sparkles } from "lucide-react";
import { personalConfig } from "../config";

export const InteractiveMoonLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 z-10">
      <div className="max-w-3xl w-full flex flex-col items-center gap-10">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center flex flex-col items-center gap-3"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-purple-300/80 uppercase bg-purple-950/40 border border-purple-800/30 backdrop-blur-md">
            Personal Letter
          </span>
          <p className="text-xl md:text-2xl font-serif text-purple-100 font-light">
            {personalConfig.letter.previewText}
          </p>
        </motion.div>

        {/* Envelope Container */}
        <div className="w-full max-w-xl relative">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Envelope View */
              <motion.div
                key="sealed"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                onClick={() => setIsOpen(true)}
                aria-label="Open letter for Sathi"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsOpen(true);
                }}
                className="group relative w-full h-80 rounded-3xl bg-gradient-to-br from-purple-950/90 via-neutral-900/90 to-indigo-950/90 border border-purple-400/40 hover:border-purple-300/70 shadow-[0_0_55px_rgba(168,85,247,0.25)] hover:shadow-[0_0_75px_rgba(192,132,252,0.4)] backdrop-blur-2xl cursor-pointer p-8 flex flex-col items-center justify-between text-center overflow-hidden transition-all duration-500"
              >
                {/* Envelope Flap Accent */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-500/15 to-transparent pointer-events-none border-b border-purple-500/15" />

                {/* Wax Seal / Moon Emblem */}
                <div className="my-auto flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-400 p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-purple-950 flex items-center justify-center border border-purple-300/40">
                      <Moon className="w-9 h-9 text-purple-200 fill-purple-300/30 group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-purple-100 font-light tracking-wide">
                    {personalConfig.letter.envelopeTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-purple-300/70 uppercase tracking-widest group-hover:text-purple-200 transition-colors">
                  <HeartHandshake className="w-4 h-4 text-purple-400" />
                  <span>Click to open letter</span>
                </div>
              </motion.div>
            ) : (
              /* Opened Letter View */
              <motion.div
                key="opened"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full p-8 md:p-12 rounded-3xl bg-gradient-to-b from-neutral-900/95 via-neutral-950/95 to-black/95 border border-purple-500/35 backdrop-blur-2xl shadow-[0_0_65px_rgba(168,85,247,0.3)] relative overflow-hidden"
              >
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Salutation */}
                <p className="text-2xl md:text-3xl font-serif text-purple-200 font-light mb-6 tracking-wide">
                  {personalConfig.letter.salutation}
                </p>

                {/* Paragraphs */}
                <div className="flex flex-col gap-5 text-neutral-200 font-light leading-relaxed text-base md:text-lg mb-8">
                  {personalConfig.letter.bodyParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Closing */}
                <div className="pt-6 border-t border-purple-500/20 flex flex-col items-end gap-1 text-right">
                  <p className="text-sm text-neutral-400 font-light italic">
                    {personalConfig.letter.closing}
                  </p>
                  <p className="text-lg font-serif text-purple-200 font-medium tracking-wide">
                    {personalConfig.letter.signature}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
