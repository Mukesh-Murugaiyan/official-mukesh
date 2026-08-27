"use client";

import React, { useEffect, useRef } from "react";

interface SingleButterflyCompanionProps {
  stageIndex: number;
}

interface ButterflyPhysics {
  x: number;
  y: number;
  heading: number; // heading angle in radians
  speed: number;   // forward flight speed (px/frame)
  angle: number;   // rendered orientation angle in degrees
  wingPhase: number;
  phase: "wandering" | "attracted" | "perched";
  targetX: number | null;
  targetY: number | null;
  idleTime: number;
  lastStageIndex: number;
}

// Stage-specific unique perching landing targets
const PERCH_TARGETS = [
  { xRatio: 0.56, yRatio: 0.38 },  // Stage 0: Intro Moon
  { xRatio: 0.638, yRatio: 0.405 }, // Stage 1: Sathi Name 'i'
  { xRatio: 0.60, yRatio: 0.26 },  // Stage 2: Apology Badge
  { xRatio: 0.72, yRatio: 0.24 },  // Stage 3: Instagram Chat Header
  { xRatio: 0.66, yRatio: 0.32 },  // Stage 4: Why Moon Tip
  { xRatio: 0.54, yRatio: 0.42 },  // Stage 5: Particle Heart Center
  { xRatio: 0.62, yRatio: 0.36 },  // Stage 6: Letter Seal
  { xRatio: 0.60, yRatio: 0.65 },  // Stage 7: Final Choice Button
  { xRatio: 0.66, yRatio: 0.46 },  // Stage 8: Goodnight Ending
];

// Utility: shortest angle difference in radians
function angleDiffRad(target: number, current: number): number {
  let diff = (target - current) % (2 * Math.PI);
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;
  return diff;
}

// Utility: shortest angle difference in degrees
function angleDiffDeg(target: number, current: number): number {
  let diff = (target - current) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
}

export const SingleButterflyCompanion: React.FC<SingleButterflyCompanionProps> = ({
  stageIndex,
}) => {
  const butterflyRef = useRef<HTMLDivElement | null>(null);
  const wingRef = useRef<HTMLDivElement | null>(null);

  // Persistent Physics State across all React re-renders and section changes
  const physicsRef = useRef<ButterflyPhysics>({
    x: 0,
    y: 0,
    heading: -Math.PI / 4, // initial heading angle (-45 deg)
    speed: 0.85,
    angle: -45,
    wingPhase: 0,
    phase: "wandering",
    targetX: null,
    targetY: null,
    idleTime: 0,
    lastStageIndex: stageIndex,
  });

  // Handle stageIndex changes without resetting butterfly position
  useEffect(() => {
    const p = physicsRef.current;

    // Reset idle timer for new stage
    p.idleTime = 0;
    p.lastStageIndex = stageIndex;

    // If butterfly was perched, launch it into gentle flight from current (x,y)
    if (p.phase === "perched") {
      p.phase = "wandering";
      p.targetX = null;
      p.targetY = null;
      p.heading = p.heading + (Math.random() - 0.5) * 0.8;
      p.speed = 0.85;
    }

    // Special behavior: Navigating to Interactive Letter section (Stage 6)
    if (stageIndex === 6) {
      p.phase = "attracted";
      p.targetX = window.innerWidth * PERCH_TARGETS[6].xRatio;
      p.targetY = window.innerHeight * PERCH_TARGETS[6].yRatio;
    }
  }, [stageIndex]);

  // Main 60fps Steering Physics & Animation Loop
  useEffect(() => {
    const p = physicsRef.current;

    // Initial position on mount (centered default)
    if (p.x === 0 && p.y === 0) {
      p.x = window.innerWidth * 0.5;
      p.y = window.innerHeight * 0.35;
    }

    let animId: number;
    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      p.idleTime += dt * 1000;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // 5-second stage-specific unique landing attraction logic
      if (p.idleTime > 5000 && p.phase !== "perched") {
        p.phase = "attracted";
        const targetConfig = PERCH_TARGETS[stageIndex] || PERCH_TARGETS[0];
        p.targetX = width * targetConfig.xRatio;
        p.targetY = height * targetConfig.yRatio;
      }

      // Heading-driven Flight Dynamics
      if (p.phase === "wandering") {
        // Ultra-smooth heading drift (zero jitter, strictly forward flight)
        const headingDrift = Math.sin(now * 0.0006) * 0.004 + (Math.random() - 0.5) * 0.005;
        p.heading += headingDrift;

        // Smooth speed variations between 0.65 and 1.1px/frame
        p.speed = 0.85 + Math.sin(now * 0.001) * 0.22;

        // Gentle Viewport Boundary Steering
        const marginX = width * 0.12;
        const marginY = height * 0.12;

        if (p.x < marginX) p.heading += angleDiffRad(0, p.heading) * 0.03;
        if (p.x > width - marginX) p.heading += angleDiffRad(Math.PI, p.heading) * 0.03;
        if (p.y < marginY) p.heading += angleDiffRad(Math.PI / 2, p.heading) * 0.03;
        if (p.y > height - marginY) p.heading += angleDiffRad(-Math.PI / 2, p.heading) * 0.03;

        // Move Position strictly forward along heading
        p.x += Math.cos(p.heading) * p.speed;
        p.y += Math.sin(p.heading) * p.speed;

        // Render Angle Interpolation
        const targetRenderAngle = (p.heading * 180) / Math.PI + 45;
        p.angle += angleDiffDeg(targetRenderAngle, p.angle) * 0.05;
      } else if (p.phase === "attracted" && p.targetX !== null && p.targetY !== null) {
        // Curved approach path towards stage target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 22) {
          // Perch on target!
          p.phase = "perched";
        } else {
          // Calculate desired heading towards target + subtle swaying arc
          const directAngle = Math.atan2(dy, dx);
          const sway = Math.sin(now * 0.0025) * 0.35;
          const desiredHeading = directAngle + sway;

          p.heading += angleDiffRad(desiredHeading, p.heading) * 0.03;
          p.speed = Math.min(1.1, dist * 0.015 + 0.45);

          p.x += Math.cos(p.heading) * p.speed;
          p.y += Math.sin(p.heading) * p.speed;

          const targetRenderAngle = (p.heading * 180) / Math.PI + 45;
          p.angle += angleDiffDeg(targetRenderAngle, p.angle) * 0.05;
        }
      } else if (p.phase === "perched" && p.targetX !== null && p.targetY !== null) {
        // Perched state: settle smoothly on target and face top-right (-45 deg)
        p.x += (p.targetX - p.x) * 0.08;
        p.y += (p.targetY - p.y) * 0.08;

        const targetRenderAngle = -45; // Facing top-right when perched
        p.angle += angleDiffDeg(targetRenderAngle, p.angle) * 0.06;
      }

      // Wing Flap Rate
      const flapRate = p.phase === "perched" ? 0.05 : 0.18;
      p.wingPhase += flapRate;

      // Render DOM updates directly via refs (Zero React re-renders)
      if (butterflyRef.current) {
        butterflyRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.angle}deg)`;
      }

      if (wingRef.current) {
        const wingScale = Math.abs(Math.sin(p.wingPhase));
        const scaleVal = 0.4 + wingScale * 0.6;
        wingRef.current.style.transform = `scaleX(${scaleVal})`;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [stageIndex]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <div
        ref={butterflyRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center will-change-transform"
      >
        {/* Soft Violet Backlight Glow */}
        <div className="absolute w-8 h-8 rounded-full bg-purple-400/40 blur-md animate-pulse pointer-events-none" />

        {/* Vector Butterfly Element */}
        <div
          ref={wingRef}
          className="relative text-2xl select-none filter drop-shadow-[0_0_12px_rgba(192,132,252,0.85)] will-change-transform"
        >
          🦋
        </div>
      </div>
    </div>
  );
};
