"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show after a small delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    setIsVisible(false);
    
    // In a real implementation, you'd trigger Analytics/AdSense loading here
    if (choice === "accepted") {
      // Logic for enabling ad scripts can be added here without a full reload
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[9999]"
        >
          <div className="bg-[#1a1a1a]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl shadow-cyan-500/10">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-xl">🍪</span> Cookie Consent
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  We use cookies to enhance your experience, analyze site traffic, and serve personalized ads via Google AdSense. 
                  Read our <Link href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</Link> for details.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleConsent("accepted")}
                  className="flex-1 px-4 py-2 bg-cyan-500 text-black text-sm font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Accept All
                </button>
                <button
                  onClick={() => handleConsent("declined")}
                  className="px-4 py-2 bg-white/5 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
