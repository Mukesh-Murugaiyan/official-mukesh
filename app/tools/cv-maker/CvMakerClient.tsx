"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MdArrowBack,
  MdDownload,
  MdRefresh,
  MdCloudDone,
  MdCloudQueue,
  MdEdit,
  MdVisibility,
} from "react-icons/md";
import ToolLayout from "@/Layout/ToolLayout";
import CvEditor from "@/components/cv/CvEditor";
import CvPreview from "@/components/cv/CvPreview";
import { CV, sampleCvData } from "@/lib/cv/types";

export default function CvMakerClient() {
  const [cv, setCv] = useState<CV>(sampleCvData);
  const [isGeneratingDocx, setIsGeneratingDocx] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "idle">("idle");
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("official_mukesh_cv_maker_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.personal) {
          setCv(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load local CV draft:", e);
    }
  }, []);

  // Handle CV state changes with debounced auto-save
  const handleCvChange = (updatedCv: CV) => {
    setCv(updatedCv);
    setSaveStatus("saving");

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem("official_mukesh_cv_maker_draft", JSON.stringify(updatedCv));
        setSaveStatus("saved");
      } catch (e) {
        console.warn("Auto-save to localStorage failed:", e);
        setSaveStatus("idle");
      }
    }, 800);
  };

  const handleLoadSample = () => {
    if (window.confirm("Replace current content with sample CV template?")) {
      setCv(sampleCvData);
      localStorage.setItem("official_mukesh_cv_maker_draft", JSON.stringify(sampleCvData));
      setSaveStatus("saved");
    }
  };

  const handleReset = () => {
    if (window.confirm("Clear all CV fields?")) {
      const emptyCv: CV = {
        personal: {
          fullName: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          portfolioUrl: "",
          linkedinUrl: "",
        },
        summary: "",
        skills: [],
        experience: [],
        projects: [],
        education: [],
      };
      setCv(emptyCv);
      localStorage.removeItem("official_mukesh_cv_maker_draft");
      setSaveStatus("idle");
    }
  };

  // Generate and Download .docx
  const handleDownloadDocx = async () => {
    try {
      setIsGeneratingDocx(true);
      const res = await fetch("/api/cv/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData: cv }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate document");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const safeName = (cv.personal.fullName || "Resume")
        .trim()
        .replace(/[^a-zA-Z0-9_\-\s]/g, "")
        .replace(/\s+/g, "_");

      link.setAttribute("download", `${safeName}_CV.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading docx:", error);
      alert("Failed to generate .docx document. Please check form entries and try again.");
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  return (
    <ToolLayout>
      <div className="flex flex-col gap-6 pb-12 min-h-screen">
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm transition-colors group mb-2"
            >
              <MdArrowBack className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Tools</span>
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3"
            >
              <span>CV Maker</span>
              {saveStatus === "saved" && (
                <span className="inline-flex items-center gap-1 text-xs font-normal text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <MdCloudDone /> Draft Saved
                </span>
              )}
              {saveStatus === "saving" && (
                <span className="inline-flex items-center gap-1 text-xs font-normal text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full animate-pulse">
                  <MdCloudQueue /> Saving...
                </span>
              )}
            </motion.h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Create professional, editable Word (.docx) documents with OOXML tab-stops, justified text, and navy headers.
            </p>
          </div>

          {/* Export Action Buttons (Same Line Alignment) */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto max-w-full pb-1 shrink-0">
            <button
              onClick={handleLoadSample}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Load sample CV data"
            >
              <MdRefresh className="text-sm text-cyan-400" />
              <span>Load Sample</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all whitespace-nowrap shrink-0"
              title="Clear all fields"
            >
              Clear
            </button>

            <button
              onClick={handleDownloadDocx}
              disabled={isGeneratingDocx}
              className="px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              <MdDownload className="text-base" />
              <span>{isGeneratingDocx ? "Generating..." : "Download .docx"}</span>
            </button>
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex lg:hidden bg-white/5 p-1 rounded-xl border border-white/10 gap-1">
          <button
            onClick={() => setMobileTab("editor")}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "editor"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <MdEdit /> Form Editor
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "preview"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <MdVisibility /> Live Preview
          </button>
        </div>

        {/* Desktop Split View / Mobile Tab View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Editor Pane */}
          <div
            className={`lg:col-span-6 ${
              mobileTab === "editor" ? "block" : "hidden lg:block"
            }`}
          >
            <CvEditor cv={cv} onChange={handleCvChange} />
          </div>

          {/* Live Preview Pane */}
          <div
            className={`lg:col-span-6 sticky top-6 ${
              mobileTab === "preview" ? "block" : "hidden lg:block"
            }`}
          >
            <CvPreview cv={cv} />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
