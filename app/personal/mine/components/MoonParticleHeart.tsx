"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalConfig } from "../config";

interface Particle {
  x: number;
  y: number;
  starX: number;
  starY: number;
  moonX: number;
  moonY: number;
  heartX: number;
  heartY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const MoonParticleHeart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<"stars" | "moon" | "heart">("stars");

  useEffect(() => {
    // Phase timing sequence: stars -> moon (3.5s) -> heart (8.5s)
    const t1 = setTimeout(() => setPhase("moon"), 3500);
    const t2 = setTimeout(() => setPhase("heart"), 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    const height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const count = Math.min(Math.floor(width / 3.5), 300);
    const centerX = width / 2;
    const centerY = height / 2 - 10;

    const generateMoonPoints = (n: number, scale: number) => {
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const r1 = scale * 12;
        const mx = centerX + Math.cos(a) * r1 - scale * 3;
        const my = centerY + Math.sin(a) * r1;
        points.push({ x: mx, y: my });
      }
      return points;
    };

    const generateHeartPoints = (n: number, scale: number) => {
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );
        points.push({
          x: centerX + hx * scale,
          y: centerY + hy * scale,
        });
      }
      return points;
    };

    const scale = Math.min(width, height) > 600 ? 10.5 : 7.5;
    const moonPts = generateMoonPoints(count, scale);
    const heartPts = generateHeartPoints(count, scale);

    const colors = [
      "rgba(192, 132, 252, ", // Lavender
      "rgba(244, 63, 94, ",   // Rose
      "rgba(168, 85, 247, ",  // Purple
      "rgba(217, 70, 239, ",  // Fuchsia
    ];

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const starX = centerX + (Math.random() - 0.5) * width * 0.85;
      const starY = centerY + (Math.random() - 0.5) * height * 0.85;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x: starX,
        y: starY,
        starX,
        starY,
        moonX: moonPts[i]?.x || centerX,
        moonY: moonPts[i]?.y || centerY,
        heartX: heartPts[i]?.x || centerX,
        heartY: heartPts[i]?.y || centerY,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2,
        alpha: 0.4 + Math.random() * 0.5,
        color,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        let targetX = p.starX;
        let targetY = p.starY;

        if (phase === "moon") {
          targetX = p.moonX;
          targetY = p.moonY;
        } else if (phase === "heart") {
          targetX = p.heartX;
          targetY = p.heartY;
        }

        const floatX = Math.sin(time + targetY * 0.03) * 2;
        const floatY = Math.cos(time + targetX * 0.03) * 2;

        const dx = targetX + floatX - p.x;
        const dy = targetY + floatY - p.y;

        p.vx += dx * 0.02;
        p.vy += dy * 0.02;
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(168,85,247,0.6)";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [phase]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 z-10 overflow-hidden">
      {/* Canvas Particle Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Center Overlay Typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative z-10 text-center max-w-lg p-8 rounded-3xl bg-black/50 border border-purple-500/25 backdrop-blur-md shadow-2xl flex flex-col items-center gap-3"
      >
        <p className="text-2xl md:text-3xl font-serif text-purple-100 font-light tracking-wide">
          {personalConfig.particleHeart.moonCenterText}
        </p>

        <AnimatePresence mode="wait">
          {phase === "heart" && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl text-purple-300"
            >
              {personalConfig.particleHeart.heartCenterEmoji}
            </motion.span>
          )}
        </AnimatePresence>

        <p className="text-sm md:text-base text-purple-200/80 font-serif italic mt-2 leading-relaxed">
          "{personalConfig.particleHeart.kavithai}"
        </p>
      </motion.div>
    </section>
  );
};
