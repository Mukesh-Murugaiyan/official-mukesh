"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon } from "lucide-react";
import { personalConfig } from "../config";

interface CinematicIntroProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Ultra-slow, smooth cinematic sequence timing
    const t1 = setTimeout(() => setStep(1), 1800);  // Step 1: Kavithai line
    const t2 = setTimeout(() => setStep(2), 5500);  // Step 2: "Sathi-kkaaga."
    const t3 = setTimeout(() => setStep(3), 9500);  // Step 3: Moon & "En Moon 🌙"
    const t4 = setTimeout(() => setStep(4), 13500); // Step 4: "Ulle vaa..." button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center select-none z-10">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="line1"
            initial={{ opacity: 0, y: 25, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(18px)" }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-xl"
          >
            <p className="text-xl md:text-3xl font-light tracking-widest text-purple-200/90 font-serif italic leading-relaxed">
              "{personalConfig.intro.line1}"
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="for-sathi"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(18px)" }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-xl"
          >
            <h1 className="text-3xl md:text-6xl font-serif font-light tracking-wide text-rose-100 drop-shadow-[0_0_40px_rgba(192,132,252,0.45)]">
              {personalConfig.intro.forText}
            </h1>
          </motion.div>
        )}

        {(step === 3 || step === 4) && (
          <motion.div
            key="moon-reveal"
            initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-2xl flex flex-col items-center gap-6"
          >
            {/* Subtle Crescent Moon Visual */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative w-20 h-20 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl" />
              <Moon className="w-14 h-14 text-purple-200 fill-purple-300/30 drop-shadow-[0_0_25px_rgba(192,132,252,0.7)]" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
              {personalConfig.intro.moonTitle}
            </h2>

            <AnimatePresence>
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }}
                  className="mt-8"
                >
                  <button
                    onClick={onEnter}
                    aria-label="Enter story"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-950/70 via-rose-950/60 to-indigo-950/70 border border-purple-500/40 text-purple-100 text-base md:text-lg tracking-widest uppercase font-medium shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_65px_rgba(192,132,252,0.5)] hover:border-purple-400/70 hover:scale-105 active:scale-98 transition-all duration-500 backdrop-blur-2xl cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-purple-300 group-hover:rotate-12 transition-transform duration-500" />
                    <span>{personalConfig.intro.enterButtonText}</span>
                    <span className="text-purple-300/80 group-hover:scale-110 transition-transform duration-500">
                      💜
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
