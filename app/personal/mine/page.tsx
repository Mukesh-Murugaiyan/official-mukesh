"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MoonBackground = dynamic(
  () => import("./components/MoonBackground").then((m) => m.MoonBackground),
  { ssr: false }
);

const ButterflyPointerTrail = dynamic(
  () =>
    import("./components/ButterflyPointerTrail").then(
      (m) => m.ButterflyPointerTrail
    ),
  { ssr: false }
);

const TapStoryStage = dynamic(
  () => import("./components/TapStoryStage").then((m) => m.TapStoryStage),
  { ssr: false }
);

export default function PersonalMinePage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="w-full h-[100dvh] overflow-hidden bg-[#030208] text-white" />
    );
  }

  return (
    <main className="w-full h-[100dvh] overflow-hidden bg-[#030208] text-white selection:bg-purple-600 selection:text-white relative">
      {/* Moonlit Purple Backdrop & Ambient Particles */}
      <MoonBackground />

      {/* Interactive Butterfly Trail Following Pointer/Touch */}
      <ButterflyPointerTrail />

      {/* Tap-Anywhere Single-Screen Cinematic Experience */}
      <TapStoryStage />
    </main>
  );
}
