"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CV } from "@/lib/cv/types";
import { cssTokens } from "@/lib/cv/styleTokens";
import {
  MdClose,
  MdOpenInNew,
  MdZoomIn,
  MdZoomOut,
} from "react-icons/md";

interface CvPreviewProps {
  cv: CV;
}

export default function CvPreview({ cv }: CvPreviewProps) {
  const { personal, summary, skills, experience, projects, education } = cv;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scaledRatio, setScaledRatio] = useState<number>(0.53);
  const [modalZoom, setModalZoom] = useState<number>(0.85);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Dynamically calculate scale ratio so entire CV sheet fits inside preview box
  useEffect(() => {
    const updatePreviewScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth - 16;
        const calculated = Math.min(Math.max(containerWidth / 800, 0.38), 0.58);
        setScaledRatio(calculated);
      }
    };

    updatePreviewScale();
    window.addEventListener("resize", updatePreviewScale);
    return () => window.removeEventListener("resize", updatePreviewScale);
  }, []);

  const handleOpenModal = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      const mobileZoom = Math.min(Math.max((window.innerWidth - 32) / 800, 0.38), 0.65);
      setModalZoom(mobileZoom);
    } else {
      setModalZoom(0.85);
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Render High-Fidelity Serif Document Sheet (Matching Uploaded Images Exactly)
  const renderFullCvContent = () => (
    <div
      id="cv-printable-area"
      className="cv-page-sheet w-[800px] bg-white text-gray-900 shadow-2xl rounded-sm text-left shrink-0 my-2"
      style={{
        fontFamily: cssTokens.fontFamily,
        padding: "36pt 45pt", // 0.5in top/bottom, 0.625in left/right
        minHeight: "1050px",
        color: cssTokens.bodyText,
        fontSize: "10pt",
        lineHeight: "1.45",
      }}
    >
      {/* Header Section */}
      <div className="border-b border-gray-300 pb-2.5 mb-3.5 text-center">
        <h1
          className="font-bold tracking-tight uppercase mb-0.5"
          style={{
            color: cssTokens.nameHeading,
            fontSize: "17pt",
            lineHeight: "1.2",
            fontFamily: cssTokens.fontFamily,
          }}
        >
          {personal.fullName || "MUKESH MURUGAIYAN"}
        </h1>

        {personal.title && (
          <p
            className="font-normal mb-1.5"
            style={{
              color: cssTokens.mutedText,
              fontSize: "11pt",
              fontFamily: cssTokens.fontFamily,
            }}
          >
            {personal.title}
          </p>
        )}

        {/* Contact Line */}
        <div
          className="flex flex-wrap justify-center items-center gap-1.5 text-xs text-center"
          style={{
            color: cssTokens.mutedText,
            fontSize: "9pt",
            fontFamily: cssTokens.fontFamily,
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.email && (personal.phone || personal.location) && <span>|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.location && <span>|</span>}
          {personal.location && <span>{personal.location}</span>}

          {personal.portfolioUrl && (
            <>
              <span>|</span>
              <a
                href={personal.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-700 font-normal"
                style={{ color: cssTokens.hyperlink }}
              >
                Portfolio
              </a>
            </>
          )}

          {personal.linkedinUrl && (
            <>
              <span>|</span>
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-700 font-normal"
                style={{ color: cssTokens.hyperlink }}
              >
                LinkedIn
              </a>
            </>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wider pb-0.5 mb-2 border-b"
            style={{
              color: cssTokens.sectionHeading,
              borderColor: cssTokens.sectionHeading,
              fontSize: "11pt",
              fontFamily: cssTokens.fontFamily,
            }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-justify leading-relaxed" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
            {summary}
          </p>
        </div>
      )}

      {/* Core Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wider pb-0.5 mb-2 border-b"
            style={{
              color: cssTokens.sectionHeading,
              borderColor: cssTokens.sectionHeading,
              fontSize: "11pt",
              fontFamily: cssTokens.fontFamily,
            }}
          >
            CORE SKILLS
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-1">
            {skills.map((skill, index) => {
              const itemsStr = Array.isArray(skill.items)
                ? skill.items.join(", ")
                : skill.items;
              if (!skill.category && !itemsStr) return null;
              return (
                <li key={index} className="text-justify leading-relaxed" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                  <span className="font-bold">{skill.category}: </span>
                  <span>{itemsStr}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wider pb-0.5 mb-2 border-b"
            style={{
              color: cssTokens.sectionHeading,
              borderColor: cssTokens.sectionHeading,
              fontSize: "11pt",
              fontFamily: cssTokens.fontFamily,
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-3">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-0.5">
                {/* Title & Right-Aligned Date Row */}
                <div className="flex justify-between items-baseline font-bold" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                  <span>{exp.role}</span>
                  <span className="italic font-normal text-gray-700 text-right ml-4 shrink-0">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                {/* Company & Location (Italics) */}
                {exp.company && (
                  <div className="italic text-gray-700 font-normal" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                    {exp.company} {exp.location ? `| ${exp.location}` : ""}
                  </div>
                )}
                {/* Bullets */}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-5 space-y-0.5 mt-1">
                    {exp.bullets.map((b, bIdx) => (
                      b.trim() ? (
                        <li key={bIdx} className="text-justify leading-relaxed" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                          {b}
                        </li>
                      ) : null
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wider pb-0.5 mb-2 border-b"
            style={{
              color: cssTokens.sectionHeading,
              borderColor: cssTokens.sectionHeading,
              fontSize: "11pt",
              fontFamily: cssTokens.fontFamily,
            }}
          >
            KEY PROJECTS
          </h2>
          <div className="space-y-3">
            {projects.map((proj, index) => {
              const techStr = Array.isArray(proj.techStack)
                ? proj.techStack.join(", ")
                : proj.techStack;
              return (
                <div key={index} className="space-y-0.5">
                  {/* Title & Right-Aligned Date Row */}
                  <div className="flex justify-between items-baseline font-bold" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                    <span>{proj.title}</span>
                    <span className="italic font-normal text-gray-700 text-right ml-4 shrink-0">
                      {proj.startDate} – {proj.endDate}
                    </span>
                  </div>
                  {/* Tech Stack (Italics) */}
                  {techStr && (
                    <div className="italic text-gray-700 text-justify font-normal" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                      {techStr}
                    </div>
                  )}
                  {/* Bullets */}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-5 space-y-0.5 mt-1">
                      {proj.bullets.map((b, bIdx) => (
                        b.trim() ? (
                          <li key={bIdx} className="text-justify leading-relaxed" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                            {b}
                          </li>
                        ) : null
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div>
          <h2
            className="font-bold uppercase tracking-wider pb-0.5 mb-2 border-b"
            style={{
              color: cssTokens.sectionHeading,
              borderColor: cssTokens.sectionHeading,
              fontSize: "11pt",
              fontFamily: cssTokens.fontFamily,
            }}
          >
            EDUCATION
          </h2>
          <div className="space-y-1">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                <span>
                  <span className="font-semibold">{edu.degree}</span> — {edu.institution}
                </span>
                <span className="italic font-normal text-gray-700 text-right ml-4 shrink-0">
                  {edu.startYear} – {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Initial Scaled-Down View Container */}
      <div
        ref={previewContainerRef}
        onClick={handleOpenModal}
        className="group relative w-full flex flex-col items-center overflow-hidden p-2 sm:p-3 bg-gray-900/60 rounded-xl border border-white/10 shadow-inner h-[550px] sm:h-[640px] justify-start cursor-pointer transition-all hover:border-cyan-500/30"
        title="Click to view full screen modal"
      >
        {/* Hover Hint Overlay Badge */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-lg text-cyan-300 text-xs font-medium flex items-center gap-1.5 shadow-xl pointer-events-none">
          <MdOpenInNew /> Click to expand Full Screen
        </div>

        {/* Scaled Wrapper: Fits complete CV top to bottom */}
        <div
          className="transition-transform duration-200 origin-top flex justify-center w-full"
          style={{
            transform: `scale(${scaledRatio})`,
            marginBottom: `-${(1 - scaledRatio) * 1100}px`,
          }}
        >
          {renderFullCvContent()}
        </div>
      </div>

      {/* FULL SCREEN MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-2 sm:p-4 overflow-hidden"
          >
            {/* Modal Header Bar */}
            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between bg-gray-900/95 border border-white/15 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-2xl z-10 gap-2 sm:gap-4">
              <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-white text-xs sm:text-sm truncate">
                    Full Screen CV Preview
                  </span>
                  <span className="text-[10px] sm:text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full truncate max-w-[110px] sm:max-w-[180px]">
                    {personal.fullName || "CV"}
                  </span>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="sm:hidden p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg border border-rose-500/30 transition-all flex items-center gap-1 text-xs font-semibold shrink-0"
                  title="Close Modal"
                >
                  <MdClose className="text-base" />
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 border-t border-white/10 sm:border-0 pt-2 sm:pt-0">
                <div className="flex items-center gap-1.5 bg-black/30 border border-white/10 px-2 py-1 rounded-lg">
                  <button
                    onClick={() => setModalZoom((prev) => Math.max(prev - 0.08, 0.35))}
                    className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                    title="Zoom out"
                  >
                    <MdZoomOut className="text-base sm:text-lg" />
                  </button>
                  <span className="text-xs font-mono text-cyan-400 font-semibold w-10 text-center">
                    {Math.round(modalZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setModalZoom((prev) => Math.min(prev + 0.08, 1.5))}
                    className="p-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
                    title="Zoom in"
                  >
                    <MdZoomIn className="text-base sm:text-lg" />
                  </button>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="hidden sm:flex ml-2 p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg border border-rose-500/30 transition-all items-center gap-1 text-xs font-semibold shrink-0"
                  title="Close Modal (Esc)"
                >
                  <MdClose className="text-base" /> Close
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="w-full flex-1 overflow-auto flex flex-col items-center justify-start my-2 sm:my-4 p-2 sm:p-4">
              <div
                className="transition-transform duration-200 origin-top flex justify-center"
                style={{
                  transform: `scale(${modalZoom})`,
                  marginBottom: modalZoom < 1 ? `-${(1 - modalZoom) * 1050}px` : "0px",
                }}
              >
                {renderFullCvContent()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print Stylesheet */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-printable-area,
          .cv-page-sheet,
          .cv-page-sheet * {
            visibility: visible;
          }
          .cv-page-sheet {
            position: relative;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0.5in 0.625in !important;
            box-shadow: none !important;
            margin-bottom: 0 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
