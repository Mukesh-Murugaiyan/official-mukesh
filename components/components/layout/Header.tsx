"use client";
import { useState, useEffect, useRef } from "react";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import { Moon, Sun, Menu, User } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import ProfileMenu from "@/components/ProfileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, setTheme } = useTheme();
  const lastScroll = useRef<number>(0);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const shouldHide = currentScroll > lastScroll.current && currentScroll > 80;
        setHidden(shouldHide);
        lastScroll.current = currentScroll;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed w-full p-4 bg-white dark:bg-black shadow-sm 
      flex justify-between items-center z-50"
    >
      <h1 className="text-2xl font-bold dark:text-white">Logo</h1>

      {/* Desktop */}
      <DesktopNav />

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          className="hidden md:flex"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="text-white" />
          ) : (
            <Moon className="text-white" />
          )}
        </button>

        {/* Profile Icon */}
       <ProfileMenu/>

        {/* Mobile Hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu className="text-black dark:text-white" />
        </button>
      </div>

      <MobileDrawer open={open} setOpen={setOpen} />
    </motion.header>
  );
}
