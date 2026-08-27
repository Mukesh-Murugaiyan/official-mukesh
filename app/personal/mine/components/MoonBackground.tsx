"use client";

import React, { memo } from "react";

export const MoonBackground: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030208]">
      {/* Dynamic Purple & Moonlight Gradient Spot Lights */}
      <div
        className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full blur-[140px] opacity-45 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(147,51,234,0.45) 0%, rgba(192,132,252,0.2) 65%, transparent 100%)",
          animationDuration: "10s",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full blur-[160px] opacity-35 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(126,34,206,0.18) 60%, transparent 100%)",
          animationDuration: "13s",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[40rem] h-[40rem] rounded-full blur-[170px] opacity-40 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(192,132,252,0.3) 0%, rgba(88,28,135,0.25) 70%, transparent 100%)",
          animationDuration: "11s",
          animationDelay: "4s",
        }}
      />

      {/* Floating Violet Stardust particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-200/30 blur-[0.8px] animate-float-slow"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 11) % 100}%`,
              animationDuration: `${12 + (i % 6) * 3}s`,
              animationDelay: `${(i % 4) * 1.2}s`,
              opacity: 0.2 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Subtle Floating Butterfly Silhouettes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`butterfly-${i}`}
            className="absolute text-purple-300/20 text-sm animate-butterfly-float pointer-events-none select-none"
            style={{
              top: `${(i * 27 + 15) % 85}%`,
              left: `${(i * 37 + 10) % 90}%`,
              animationDuration: `${18 + i * 4}s`,
              animationDelay: `${i * 2.5}s`,
            }}
          >
            🦋
          </div>
        ))}
      </div>

      {/* Noise Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(15px, -25px, 0);
          }
        }
        @keyframes butterfly-float {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translate3d(40px, -60px, 0) rotate(15deg);
            opacity: 0.35;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0.1;
          }
        }
        .animate-float-slow {
          animation: float-slow infinite ease-in-out;
        }
        .animate-butterfly-float {
          animation: butterfly-float infinite ease-in-out;
        }
      `}</style>
    </div>
  );
});

MoonBackground.displayName = "MoonBackground";
