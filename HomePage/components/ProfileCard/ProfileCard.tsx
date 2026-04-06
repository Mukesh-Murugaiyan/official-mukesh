"use client";

import ProfileImage from "@/components/ProfileImage";
import { AnimatePresence, motion } from "framer-motion";
import { Courgette } from "next/font/google";
import dynamic from "next/dynamic";
import { useState } from "react";

const NeonSign = dynamic(() => import("@/components/NeonSign"), { ssr: false });
import {
  FaChevronDown,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
const courgette = Courgette({
  weight: "400",        // Only "400" is available for Courgette
  subsets: ["latin"],   // Subsets you need
  display: "swap",      // Optional
  variable: "--font-courgette", // Optional CSS variable
});
export default function ProfileCard({
  isMobile = false,
  setIsOpen,
}: {
  isMobile?: boolean;
  setIsOpen?: (value: boolean) => void;
}) {
  const [showContacts, setShowContacts] = useState(false);

  const profileData = {
    email: "contact@themukesh.com",
    linkedin: "www.linkedin.com/in/mukesh-murugaiyan",
    instagram: "https://www.instagram.com/rtr_mukesh_/",
    facebook: "https://www.facebook.com/share/17Z3SPtSSt/?mibextid=wwXIfr",
    github: "https://github.com/Mukesh-Murugaiyan",
  };

  const onSocialClick = (clickedSocial: keyof typeof profileData) => {
    const link = profileData[clickedSocial];

    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full bg-[#111111] border border-white/10 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* MAIN CARD SECTION */}
      <motion.div
        layout
        className="
        text-white
        p-6 lg:p-8
        flex gap-5 lg:gap-8
        flex-row lg:flex-col
        items-center
        transition-all duration-300
        w-full lg:w-[236px]
      "
      >
        {/* Toggle button → Mobile Only */}
        <button
          onClick={() => setShowContacts(!showContacts)}
          aria-label={showContacts ? "Close contacts" : "Show contacts"}
          className="
          absolute top-0 right-0
          w-14 h-7 sm:w-24 sm:h-8 lg:w-24 lg:h-8
          flex items-center justify-center 
          text-xs font-medium
          rounded-tr-[1.25rem] rounded-bl-[1.25rem]
          bg-gradient-to-r
          from-[hsl(190,82%,20%)] to-black
          border border-[hsl(190,82%,72%)]
          text-[hsl(190,82%,72%)]
          hover:text-white
          hover:bg-[#0f2c33]
          duration-300
          lg:hidden
          cursor-pointer
          z-20
  "
        >
          <span className="hidden sm:inline">
            {showContacts ? "Close" : "Contacts"}
          </span>
          <FaChevronDown className={`text-[100%] cursor-pointer duration-300 sm:hidden ${showContacts ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>

        {/* Profile Image */}
        <ProfileImage show={true} setIsOpen={setIsOpen} />

        {/* Name + Profession + Status */}
        <div className="text-center flex flex-col items-center">
          <NeonSign text="Mukesh" color="blue" />
          <p
            className="
              text-gray-300 text-[10px] sm:text-xs mt-2 mb-4
              bg-gray-800/60
              inline-block px-3 py-1
              rounded-full border border-gray-700
            "
          >
            Software Developer
          </p>

          {/* Status Indicators */}
          <div className="hidden lg:flex flex-col gap-1.5 w-full">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-lg p-2 py-1.5 flex items-center justify-center gap-2 w-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-medium text-gray-300">Open to work</span>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-lg p-2 py-1.5 flex items-center justify-center gap-2 w-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-[10px] font-medium text-gray-300">Freelance</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CONTACT PANEL SECTION */}
      <AnimatePresence>
        {(showContacts || !isMobile) && (
          <motion.div
            key="contact-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:block lg:w-[236px]"
          >
            <div className="p-6 pt-0 flex flex-col gap-5">
              <div className="w-full h-[1px] bg-gray-700 rounded-full p-0"></div>

              {/* EMAIL */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                  <MdEmail
                    className="text-lg"
                    style={{ color: "hsl(190, 82%, 72%)" }}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">EMAIL</p>
                  <p className="text-xs font-medium break-all">
                    <a
                      href={`mailto:${profileData?.email}?subject=Hello%20Mukesh&body=I%20visited%20your%20portfolio`}
                      className="text-xs font-medium break-all cursor-pointer"
                    >
                      {profileData?.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                  <MdLocationOn
                    className="text-lg"
                    style={{ color: "hsl(190, 82%, 72%)" }}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">LOCATION</p>
                  <p className="text-xs font-medium">Bangalore, IN</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-700 rounded-full p-0"></div>
              {/* SOCIAL */}
              <div className="flex justify-start gap-4  text-xl">
                <FaLinkedin
                  className="hover:text-blue-500 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("linkedin")}
                  aria-label="LinkedIn Profile"
                />
                <FaInstagram
                  className="hover:text-pink-500 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("instagram")}
                  aria-label="Instagram Profile"
                />
                <FaFacebookF
                  className="hover:text-blue-400 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("facebook")}
                  aria-label="Facebook Profile"
                />
                <FaGithub
                  className="hover:text-gray-400 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("github")}
                  aria-label="GitHub Profile"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
