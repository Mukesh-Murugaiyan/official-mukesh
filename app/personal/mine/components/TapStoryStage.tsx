"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CinematicIntro } from "./CinematicIntro";
import { SathiNameReveal } from "./SathiNameReveal";
import { PersonalApology } from "./PersonalApology";
import { InstagramChatSection } from "./InstagramChatSection";
import { WhyMoonSection } from "./WhyMoonSection";
import { MoonParticleHeart } from "./MoonParticleHeart";
import { InteractiveMoonLetter } from "./InteractiveMoonLetter";
import { FinalMoonQuestion } from "./FinalMoonQuestion";
import { FinalMoonEnding } from "./FinalMoonEnding";
import { SingleButterflyCompanion } from "./SingleButterflyCompanion";

export const TapStoryStage: React.FC = () => {
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [choiceMade, setChoiceMade] = useState<"talk" | "time" | null>(null);

  const totalStages = 9;

  const handleNextStage = () => {
    if (stageIndex < totalStages - 1) {
      setStageIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      onClick={handleNextStage}
      className="relative w-full h-[100dvh] overflow-hidden select-none touch-manipulation cursor-pointer bg-[#030208] text-white flex flex-col items-center justify-center"
    >
      {/* Single Perching Butterfly Companion */}
      <SingleButterflyCompanion stageIndex={stageIndex} />

      {/* Main Chapter Scene Render (Ultra-smooth 1.6s reveal) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stageIndex}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full h-full flex items-center justify-center relative z-20"
        >
          {stageIndex === 0 && <CinematicIntro onEnter={handleNextStage} />}
          {stageIndex === 1 && <SathiNameReveal />}
          {stageIndex === 2 && <PersonalApology />}
          {stageIndex === 3 && <InstagramChatSection />}
          {stageIndex === 4 && <WhyMoonSection />}
          {stageIndex === 5 && <MoonParticleHeart />}
          {stageIndex === 6 && <InteractiveMoonLetter />}
          {stageIndex === 7 && (
            <div className="pointer-events-auto w-full" onClick={(e) => e.stopPropagation()}>
              <FinalMoonQuestion onChoiceSelected={(choice) => setChoiceMade(choice)} />
            </div>
          )}
          {stageIndex === 8 && <FinalMoonEnding />}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
