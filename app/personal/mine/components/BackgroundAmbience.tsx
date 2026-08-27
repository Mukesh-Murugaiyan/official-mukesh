"use client";

import React, { memo } from "react";

export const BackgroundAmbience: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030308]">
      {/* Dynamic ambient gradient glow spots */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-40 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(225,29,72,0.4) 0%, rgba(147,51,234,0.15) 70%, transparent 100%)",
          animationDuration: "8s",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-[140px] opacity-30 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.35) 0%, rgba(192,132,252,0.2) 60%, transparent 100%)",
          animationDuration: "12s",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] rounded-full blur-[150px] opacity-35 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(120,53,150,0.2) 65%, transparent 100%)",
          animationDuration: "10s",
          animationDelay: "4s",
        }}
      />

      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Ambient Stardust/Dust particles (Pure CSS for zero overhead) */}
      <div className="absolute inset-0">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-rose-200/30 blur-[1px] animate-float-slow"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              animationDuration: `${12 + (i % 8) * 3}s`,
              animationDelay: `${(i % 5) * 1.5}s`,
              opacity: 0.15 + (i % 4) * 0.1,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-25px) translateX(15px);
          }
        }
        .animate-float-slow {
          animation: float-slow infinite ease-in-out;
        }
      `}</style>
    </div>
  );
});

BackgroundAmbience.displayName = "BackgroundAmbience";
