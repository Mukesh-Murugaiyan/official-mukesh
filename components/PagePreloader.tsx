"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode, useMemo } from "react";

export default function PagePreloader({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isHome) return;
    const timer = setTimeout(() => setLoading(false), 2100);
    return () => clearTimeout(timer);
  }, [isHome]);

  const bubbleStyles = useMemo(() => {
    if (!mounted) return [];
    return [...Array(6)].map(() => ({
      width: Math.random() * 200 + 100,
      height: Math.random() * 200 + 100,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
  }, [mounted]);

  if (!isHome) {
    return <>{children}</>;
  }

  const pathVariants: Variants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0,
      }
    }
  };

  const bubbleVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="preloader-bubbly"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: "circOut" }
            }}
          >
            {mounted && bubbleStyles.map((style, i) => (
              <motion.div
                key={i}
                variants={bubbleVariants}
                animate="animate"
                className="absolute rounded-full bg-[#00FFF0]/5 blur-xl"
                style={{
                  width: style.width,
                  height: style.height,
                  top: style.top,
                  left: style.left,
                }}
              />
            ))}

            <div className="relative z-20 flex flex-col items-center">
              <svg
                width="200"
                height="120"
                viewBox="0 0 200 120"
                fill="none"
                style={{ filter: "drop-shadow(0 0 15px rgba(0,255,240,0.4))" }}
              >
                  <motion.path
                  d="M40 90V30C40 30 45 20 55 20C65 20 75 40 75 40C75 40 85 20 95 20C105 20 110 30 110 30V90"
                  stroke="#00FFF0"
                  strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  variants={pathVariants}
                  initial="initial"
                  animate="animate"
                  />

                  <motion.path
                  d="M130 90C130 90 170 100 170 75C170 50 130 60 130 35C130 10 170 20 170 20"
                    stroke="#ffffff"
                  strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  variants={pathVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.6 }}
                  />
              </svg>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 text-[#00FFF0] font-medium tracking-[0.5em] text-sm uppercase"
              >
                Welcome Devs
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#00FFF0] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
