"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, MessageCircle, Clock, Sparkles } from "lucide-react";
import { personalConfig } from "../config";

interface FinalMoonQuestionProps {
  onChoiceSelected: (choice: "talk" | "time") => void;
}

export const FinalMoonQuestion: React.FC<FinalMoonQuestionProps> = ({
  onChoiceSelected,
}) => {
  const [selected, setSelected] = useState<"talk" | "time" | null>(null);

  const handleSelect = (choice: "talk" | "time") => {
    setSelected(choice);
    onChoiceSelected(choice);

    if (choice === "talk") {
      const username =
        personalConfig.finalQuestion.contactAction.instagramUsername ||
        "muki_5106";
      const appUrl = `instagram://user?username=${username}`;
      const webUrl = `https://ig.me/m/${username}`;

      // Open Instagram app if installed on mobile device, fallback to web chat
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = appUrl;
        setTimeout(() => {
          window.open(webUrl, "_blank");
        }, 600);
      } else {
        window.open(webUrl, "_blank");
      }
    }
  };

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-4 py-3 text-center z-10 my-auto overflow-hidden">
      <div className="max-w-xl w-full flex flex-col items-center gap-3.5 md:gap-6 max-h-[80vh] overflow-y-auto scrollbar-none py-2">
        {/* Pulsing Moon Symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="relative shrink-0"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-400/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse">
            <Moon className="w-6 h-6 md:w-8 md:h-8 text-purple-300 fill-purple-300/30" />
          </div>
        </motion.div>

        {/* Text Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="flex flex-col gap-1.5 md:gap-2.5"
        >
          <p className="text-2xl md:text-4xl font-serif text-white font-light">
            {personalConfig.finalQuestion.line1}
          </p>
          <p className="text-xl md:text-3xl font-serif text-purple-300 font-light">
            {personalConfig.finalQuestion.line2}
          </p>
          <p className="text-sm md:text-xl text-neutral-300 font-light mt-1">
            {personalConfig.finalQuestion.line3}
          </p>
          <p className="text-base md:text-2xl text-purple-100 font-light leading-relaxed">
            {personalConfig.finalQuestion.line4}
          </p>
          <p className="text-xl md:text-3xl font-serif text-rose-200 font-normal mt-1">
            {personalConfig.finalQuestion.line5}
          </p>

          {/* Kavithai Verse */}
          <p className="text-xs md:text-lg text-purple-200/90 font-serif italic mt-2 md:mt-4 leading-relaxed border-t border-purple-500/20 pt-2.5">
            "{personalConfig.finalQuestion.kavithai}"
          </p>
        </motion.div>

        {/* Buttons / Choice Options */}
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 mt-2 w-full justify-center shrink-0"
            >
              {/* Option 1: Pesalam 💜 (Opens Instagram app / web chat with muki_5106) */}
              <button
                onClick={() => handleSelect("talk")}
                className="w-full sm:w-auto min-w-[190px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-purple-700 via-rose-600 to-purple-600 text-white font-medium text-base shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:shadow-[0_0_50px_rgba(192,132,252,0.6)] hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer border border-purple-400/40"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>{personalConfig.finalQuestion.talkButtonText}</span>
              </button>

              {/* Option 2: Nee nalla yosi 🌙 */}
              <button
                onClick={() => handleSelect("time")}
                className="w-full sm:w-auto min-w-[190px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-neutral-900/80 border border-purple-500/30 text-purple-200 font-medium text-base hover:text-white hover:border-purple-400 hover:bg-purple-950/50 hover:scale-105 active:scale-98 transition-all duration-300 backdrop-blur-xl cursor-pointer"
              >
                <Clock className="w-4.5 h-4.5 text-purple-300" />
                <span>{personalConfig.finalQuestion.timeButtonText}</span>
              </button>
            </motion.div>
          ) : (
            /* Response message state */
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="p-6 rounded-2xl md:rounded-3xl bg-neutral-900/90 border border-purple-500/40 backdrop-blur-2xl shadow-2xl max-w-md w-full flex flex-col items-center gap-3 mt-2"
            >
              <Sparkles className="w-7 h-7 text-purple-300" />
              <p className="text-base md:text-xl font-serif text-purple-100 font-light leading-relaxed">
                {selected === "talk"
                  ? personalConfig.finalQuestion.talkResponseMessage
                  : personalConfig.finalQuestion.timeResponseMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
