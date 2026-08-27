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
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 text-center z-10">
      <div className="max-w-2xl w-full flex flex-col items-center gap-8">
        {/* Pulsing Moon Symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.4)] animate-pulse">
            <Moon className="w-8 h-8 text-purple-300 fill-purple-300/30" />
          </div>
        </motion.div>

        {/* Text Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex flex-col gap-3"
        >
          <p className="text-3xl md:text-4xl font-serif text-white font-light">
            {personalConfig.finalQuestion.line1}
          </p>
          <p className="text-2xl md:text-3xl font-serif text-purple-300 font-light">
            {personalConfig.finalQuestion.line2}
          </p>
          <p className="text-lg md:text-xl text-neutral-300 font-light mt-2">
            {personalConfig.finalQuestion.line3}
          </p>
          <p className="text-lg md:text-2xl text-purple-100 font-light leading-relaxed">
            {personalConfig.finalQuestion.line4}
          </p>
          <p className="text-2xl md:text-3xl font-serif text-rose-200 font-normal">
            {personalConfig.finalQuestion.line5}
          </p>

          {/* Kavithai Verse */}
          <p className="text-base md:text-lg text-purple-200/90 font-serif italic mt-4 leading-relaxed border-t border-purple-500/20 pt-4">
            "{personalConfig.finalQuestion.kavithai}"
          </p>
        </motion.div>

        {/* Buttons / Choice Options */}
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full justify-center"
            >
              {/* Option 1: Pesalam 💜 (Opens Instagram app / web chat with muki_5106) */}
              <button
                onClick={() => handleSelect("talk")}
                className="w-full sm:w-auto min-w-[210px] inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-700 via-rose-600 to-purple-600 text-white font-medium text-lg shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:shadow-[0_0_55px_rgba(192,132,252,0.6)] hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer border border-purple-400/40"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{personalConfig.finalQuestion.talkButtonText}</span>
              </button>

              {/* Option 2: Nee nalla yosi 🌙 */}
              <button
                onClick={() => handleSelect("time")}
                className="w-full sm:w-auto min-w-[210px] inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-neutral-900/80 border border-purple-500/30 text-purple-200 font-medium text-lg hover:text-white hover:border-purple-400 hover:bg-purple-950/50 hover:scale-105 active:scale-98 transition-all duration-300 backdrop-blur-xl cursor-pointer"
              >
                <Clock className="w-5 h-5 text-purple-300" />
                <span>{personalConfig.finalQuestion.timeButtonText}</span>
              </button>
            </motion.div>
          ) : (
            /* Response message state */
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
              className="p-8 rounded-3xl bg-neutral-900/90 border border-purple-500/40 backdrop-blur-2xl shadow-2xl max-w-lg w-full flex flex-col items-center gap-4 mt-4"
            >
              <Sparkles className="w-8 h-8 text-purple-300" />
              <p className="text-xl font-serif text-purple-100 font-light leading-relaxed">
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
