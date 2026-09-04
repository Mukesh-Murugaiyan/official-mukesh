"use client";

import React, { useState } from "react";
import {
  MdZoomIn,
  MdZoomOut,
  MdFitScreen,
  MdDownload,
  MdPrint,
  MdStyle,
  MdCheck,
  MdAutoAwesome,
} from "react-icons/md";
import { CV } from "@/lib/cv/types";
import { cssTokens } from "@/lib/cv/styleTokens";
import { TemplateId, RESUME_TEMPLATES } from "./types";

interface CvPreviewPaneProps {
  cv: CV;
  activeTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  onDownloadDocx: () => void;
  onDownloadPdf: () => void;
  isGeneratingDocx: boolean;
}

export default function CvPreviewPane({
  cv,
  activeTemplate,
  onSelectTemplate,
  onDownloadDocx,
  onDownloadPdf,
  isGeneratingDocx,
}: CvPreviewPaneProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);

  const { personal, summary, skills, experience, projects, education } = cv;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 140));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 65));
  const handleZoomFit = () => setZoomLevel(100);

  const currentTemplate =
    RESUME_TEMPLATES.find((t) => t.id === activeTemplate) || RESUME_TEMPLATES[0];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Floating Preview Toolbar */}
      <div className="sticky top-20 z-30 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-lg">
        {/* Template Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsTemplateMenuOpen(!isTemplateMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-100 text-xs font-semibold border border-slate-700 transition-all"
          >
            <MdStyle className="text-emerald-400 text-sm" />
            <span>{currentTemplate.name}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono uppercase">
              {activeTemplate}
            </span>
          </button>

          {isTemplateMenuOpen && (
            <div className="absolute left-0 top-full mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1.5 flex items-center gap-1.5">
                <MdAutoAwesome className="text-amber-400" />
                Select Resume Template
              </div>
              {RESUME_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    onSelectTemplate(tmpl.id);
                    setIsTemplateMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2 ${
                    activeTemplate === tmpl.id
                      ? "bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span>{tmpl.name}</span>
                      {tmpl.badge && (
                        <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded font-semibold">
                          {tmpl.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {tmpl.tagline}
                    </p>
                  </div>
                  {activeTemplate === tmpl.id && <MdCheck className="text-base shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/80">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Zoom Out"
          >
            <MdZoomOut className="text-sm" />
          </button>
          <span className="text-xs font-mono font-semibold text-slate-300 px-1.5 min-w-[3rem] text-center">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Zoom In"
          >
            <MdZoomIn className="text-sm" />
          </button>
          <button
            type="button"
            onClick={handleZoomFit}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors ml-1"
            title="Reset Zoom (100%)"
          >
            <MdFitScreen className="text-sm" />
          </button>
        </div>

        {/* Quick Export CTAs */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1"
            title="Print / Export PDF"
          >
            <MdPrint className="text-sm text-slate-300" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            type="button"
            onClick={onDownloadDocx}
            disabled={isGeneratingDocx}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            title="Download Editable Word Document (.docx)"
          >
            <MdDownload className="text-sm" />
            <span>{isGeneratingDocx ? "..." : ".docx"}</span>
          </button>
        </div>
      </div>

      {/* Real Document Sheet Container */}
      <div className="flex-1 overflow-auto bg-slate-950/60 rounded-2xl p-4 sm:p-8 border border-slate-800/80 flex justify-center items-start min-h-[700px]">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease",
            fontFamily: activeTemplate === "classic" ? cssTokens.fontFamily : currentTemplate.fontFamily,
          }}
          className={`w-[210mm] min-h-[297mm] bg-white text-slate-900 p-[18mm] shadow-2xl rounded-sm transition-all text-[10pt] leading-[1.45] print:shadow-none print:p-0 select-text ${currentTemplate.previewClass}`}
        >
          {/* Template Style 1: Classic ATS Serif (Matching Uploaded Images Exactly) */}
          {activeTemplate === "classic" && (
            <div className="space-y-3.5 text-slate-900" style={{ fontFamily: cssTokens.fontFamily }}>
              {/* Header Section */}
              <div className="border-b border-gray-300 pb-2 mb-3 text-center">
                <h1
                  className="font-bold uppercase tracking-tight mb-0.5"
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
                    className="font-normal mb-1"
                    style={{
                      color: cssTokens.mutedText,
                      fontSize: "11pt",
                      fontFamily: cssTokens.fontFamily,
                    }}
                  >
                    {personal.title}
                  </p>
                )}
                <div
                  className="flex flex-wrap justify-center items-center gap-1.5 text-center text-xs"
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

              {/* Summary */}
              {summary && (
                <div>
                  <h2
                    className="font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
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

              {/* Technical Skills */}
              {skills && skills.length > 0 && (
                <div>
                  <h2
                    className="font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
                    style={{
                      color: cssTokens.sectionHeading,
                      borderColor: cssTokens.sectionHeading,
                      fontSize: "11pt",
                      fontFamily: cssTokens.fontFamily,
                    }}
                  >
                    CORE SKILLS
                  </h2>
                  <ul className="list-disc list-outside ml-5 space-y-0.5">
                    {skills.map((skill, idx) => {
                      const itemsStr = Array.isArray(skill.items)
                        ? skill.items.join(", ")
                        : skill.items;
                      if (!skill.category && !itemsStr) return null;
                      return (
                        <li key={idx} className="text-justify leading-relaxed" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                          <span className="font-bold">{skill.category}: </span>
                          <span>{itemsStr}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Work Experience */}
              {experience && experience.length > 0 && (
                <div>
                  <h2
                    className="font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
                    style={{
                      color: cssTokens.sectionHeading,
                      borderColor: cssTokens.sectionHeading,
                      fontSize: "11pt",
                      fontFamily: cssTokens.fontFamily,
                    }}
                  >
                    PROFESSIONAL EXPERIENCE
                  </h2>
                  <div className="space-y-2.5">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                          <span>{exp.role}</span>
                          <span className="italic font-normal text-gray-700 text-right ml-4 shrink-0">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        {exp.company && (
                          <div className="italic text-gray-700 font-normal" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                            {exp.company} {exp.location ? `| ${exp.location}` : ""}
                          </div>
                        )}
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="list-disc list-outside ml-5 space-y-0.5 mt-0.5">
                            {exp.bullets.map((bullet, bIdx) => (
                              bullet.trim() ? (
                                <li key={bIdx} className="text-justify leading-relaxed" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                                  {bullet}
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
                <div>
                  <h2
                    className="font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
                    style={{
                      color: cssTokens.sectionHeading,
                      borderColor: cssTokens.sectionHeading,
                      fontSize: "11pt",
                      fontFamily: cssTokens.fontFamily,
                    }}
                  >
                    KEY PROJECTS
                  </h2>
                  <div className="space-y-2.5">
                    {projects.map((proj, idx) => {
                      const techStr = Array.isArray(proj.techStack)
                        ? proj.techStack.join(", ")
                        : proj.techStack;
                      return (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between items-baseline font-bold" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                            <span>{proj.title}</span>
                            <span className="italic font-normal text-gray-700 text-right ml-4 shrink-0">
                              {proj.startDate} – {proj.endDate}
                            </span>
                          </div>
                          {techStr && (
                            <div className="italic text-gray-700 text-justify font-normal" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                              {techStr}
                            </div>
                          )}
                          {proj.bullets && proj.bullets.length > 0 && (
                            <ul className="list-disc list-outside ml-5 space-y-0.5 mt-0.5">
                              {proj.bullets.map((bullet, bIdx) => (
                                bullet.trim() ? (
                                  <li key={bIdx} className="text-justify leading-relaxed" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
                                    {bullet}
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
                    className="font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
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
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-baseline" style={{ fontSize: "10pt", fontFamily: cssTokens.fontFamily }}>
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
          )}

          {/* Template Style 2: Claude AI Modern */}
          {activeTemplate === "claude" && (
            <div className="space-y-4 font-sans text-slate-900 text-[9.5pt]">
              {/* Claude Header Banner */}
              <div className="border-b-2 border-indigo-600 pb-3 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-extrabold text-indigo-950 tracking-tight flex items-center gap-2">
                    <span>{personal.fullName || "MUKESH MURUGAIYAN"}</span>
                  </h1>
                  <p className="text-xs font-bold text-indigo-600 tracking-wide uppercase mt-0.5">
                    {personal.title || "React Native Developer + MERN Stack"}
                  </p>
                </div>
                <div className="text-right text-[8.5pt] text-slate-600 font-medium space-y-0.5">
                  <div>{personal.email}</div>
                  <div>{personal.phone} | {personal.location}</div>
                  <div className="text-indigo-600 font-semibold">{personal.portfolioUrl}</div>
                </div>
              </div>

              {/* Executive Summary */}
              {summary && (
                <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100/80">
                  <h2 className="text-[9pt] font-extrabold uppercase tracking-wider text-indigo-900 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-indigo-600 rounded-full"></span>
                    Executive Summary
                  </h2>
                  <p className="text-xs text-slate-800 leading-relaxed text-justify">
                    {summary}
                  </p>
                </div>
              )}

              {/* Tech Stack & Core Competencies */}
              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-[9pt] font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
                    <span className="w-1.5 h-3 bg-indigo-600 rounded-full"></span>
                    Tech Stack & Core Competencies
                  </h2>
                  <div className="space-y-1.5">
                    {skills.map((cat, idx) => (
                      <div key={idx} className="flex items-baseline gap-2 text-xs">
                        <span className="font-bold text-indigo-950 w-36 shrink-0">
                          {cat.category}:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {cat.items.map((item, iIdx) => (
                            <span
                              key={iIdx}
                              className="bg-indigo-50/80 border border-indigo-200/60 text-indigo-950 font-mono px-2 py-0.5 rounded text-[8.5pt]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Professional Experience */}
              {experience && experience.length > 0 && (
                <div className="space-y-2.5">
                  <h2 className="text-[9pt] font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
                    <span className="w-1.5 h-3 bg-indigo-600 rounded-full"></span>
                    Professional Experience
                  </h2>
                  {experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-extrabold text-indigo-950 text-xs">
                          {exp.role}{" "}
                          <span className="text-indigo-600 font-semibold">
                            — {exp.company}
                          </span>
                        </h3>
                        <span className="text-[8.5pt] font-mono text-slate-500 font-medium">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="text-[8.5pt] italic text-slate-500">
                          {exp.location}
                        </div>
                      )}
                      {exp.bullets && (
                        <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-800">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="text-justify leading-relaxed">
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Key Projects */}
              {projects && projects.length > 0 && (
                <div className="space-y-2.5">
                  <h2 className="text-[9pt] font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
                    <span className="w-1.5 h-3 bg-indigo-600 rounded-full"></span>
                    Featured Technical Projects
                  </h2>
                  {projects.map((p, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-baseline font-bold text-xs text-indigo-950">
                        <span>{p.title}</span>
                        <span className="text-[8.5pt] font-mono text-slate-500 font-normal">
                          {p.startDate} – {p.endDate}
                        </span>
                      </div>
                      {p.techStack && (
                        <div className="text-[8.5pt] font-mono text-indigo-700 italic">
                          Stack: {p.techStack.join(", ")}
                        </div>
                      )}
                      {p.bullets && (
                        <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-800">
                          {p.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="text-justify leading-relaxed">
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <div>
                  <h2 className="text-[9pt] font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 border-b border-indigo-100 pb-1 mb-1.5">
                    <span className="w-1.5 h-3 bg-indigo-600 rounded-full"></span>
                    Education & Credentials
                  </h2>
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-slate-900">
                        {edu.degree} — <span className="font-normal text-slate-700">{edu.institution}</span>
                      </span>
                      <span className="text-[8.5pt] font-mono text-slate-500">
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Template Style 3: Modern Linear */}
          {activeTemplate === "linear" && (
            <div className="space-y-5 text-slate-900">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {personal.fullName || "MUKESH MURUGAIYAN"}
                  </h1>
                  <p className="text-sm font-semibold text-emerald-600 mt-0.5">
                    {personal.title || "Full Stack Engineer"}
                  </p>
                </div>
                <div className="text-right text-[9pt] text-slate-600 space-y-0.5">
                  <div>{personal.email}</div>
                  <div>{personal.phone}</div>
                  <div>{personal.location}</div>
                  <div className="text-emerald-700 font-medium">
                    {personal.portfolioUrl}
                  </div>
                </div>
              </div>

              {summary && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  <p className="text-xs text-slate-800 leading-relaxed">{summary}</p>
                </div>
              )}

              {skills && skills.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Core Stack & Technologies
                  </h2>
                  <div className="space-y-1.5">
                    {skills.map((cat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="font-bold text-slate-900 w-36 shrink-0">
                          {cat.category}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {cat.items.map((item, iIdx) => (
                            <span
                              key={iIdx}
                              className="bg-slate-100 border border-slate-200 text-slate-800 px-2 py-0.5 rounded text-[9pt]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {experience && experience.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Work Experience
                  </h2>
                  <div className="space-y-3.5 pl-3 border-l-2 border-slate-200">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="relative pl-3">
                        <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-slate-900 text-xs">
                            {exp.role}{" "}
                            <span className="text-emerald-700 font-normal">
                              @ {exp.company}
                            </span>
                          </h3>
                          <span className="text-[9pt] font-mono text-slate-500">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        {exp.bullets && (
                          <ul className="mt-1 space-y-1 text-xs text-slate-700">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 text-sm leading-none">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects && projects.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Featured Projects
                  </h2>
                  <div className="grid grid-cols-1 gap-2.5">
                    {projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg"
                      >
                        <div className="flex justify-between items-baseline font-bold text-xs">
                          <span>{proj.title}</span>
                          <span className="text-[9pt] text-slate-500 font-mono">
                            {proj.startDate} – {proj.endDate}
                          </span>
                        </div>
                        <div className="text-[9pt] text-emerald-700 font-mono my-0.5">
                          {proj.techStack.join(" • ")}
                        </div>
                        {proj.bullets && (
                          <ul className="text-[9pt] text-slate-700 space-y-0.5">
                            {proj.bullets.map((b, bIdx) => (
                              <li key={bIdx}>- {b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {education && education.length > 0 && (
                <div className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Education
                  </h2>
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="font-semibold">{edu.degree}, {edu.institution}</span>
                      <span className="text-slate-500 font-mono text-[9pt]">
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Template Style 4: Minimal Mono */}
          {activeTemplate === "minimal" && (
            <div className="space-y-4 font-mono text-slate-900 text-[9.5pt]">
              <div className="border-b border-slate-400 pb-3">
                <h1 className="text-xl font-bold tracking-tight">
                  {personal.fullName || "MUKESH MURUGAIYAN"}
                </h1>
                <p className="text-xs text-slate-600 font-semibold">{personal.title}</p>
                <div className="text-[8.5pt] text-slate-500 mt-1 flex flex-wrap gap-2">
                  <span>{personal.email}</span>
                  <span>|</span>
                  <span>{personal.phone}</span>
                  <span>|</span>
                  <span>{personal.location}</span>
                  {personal.portfolioUrl && (
                    <>
                      <span>|</span>
                      <span>{personal.portfolioUrl}</span>
                    </>
                  )}
                </div>
              </div>

              {summary && (
                <div>
                  <div className="text-[8.5pt] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    {"// SUMMARY"}
                  </div>
                  <p className="text-xs leading-relaxed">{summary}</p>
                </div>
              )}

              {skills && skills.length > 0 && (
                <div>
                  <div className="text-[8.5pt] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    {"// SKILLS"}
                  </div>
                  {skills.map((cat, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-bold">{cat.category}: </span>
                      <span>{cat.items.join(" / ")}</span>
                    </div>
                  ))}
                </div>
              )}

              {experience && experience.length > 0 && (
                <div>
                  <div className="text-[8.5pt] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    {"// EXPERIENCE"}
                  </div>
                  <div className="space-y-3">
                    {experience.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-bold text-xs">
                          <span>
                            [{exp.role}] @ {exp.company}
                          </span>
                          <span className="text-[8.5pt] font-normal text-slate-500">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        {exp.bullets && (
                          <ul className="mt-1 space-y-0.5 text-[9pt]">
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx}>* {b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects && projects.length > 0 && (
                <div>
                  <div className="text-[8.5pt] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    {"// PROJECTS"}
                  </div>
                  <div className="space-y-2">
                    {projects.map((p, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-bold text-xs">
                          <span>{p.title}</span>
                          <span className="text-[8.5pt] font-normal text-slate-500">
                            {p.startDate} - {p.endDate}
                          </span>
                        </div>
                        {p.techStack && (
                          <div className="text-[8.5pt] text-slate-600 font-normal">
                            Stack: {p.techStack.join(", ")}
                          </div>
                        )}
                        {p.bullets && (
                          <ul className="text-[9pt] space-y-0.5">
                            {p.bullets.map((b, bIdx) => (
                              <li key={bIdx}>* {b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {education && education.length > 0 && (
                <div>
                  <div className="text-[8.5pt] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    {"// EDUCATION"}
                  </div>
                  {education.map((e, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span>
                        {e.degree}, {e.institution}
                      </span>
                      <span className="text-[8.5pt] text-slate-500">
                        {e.startYear} - {e.endYear}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Template Style 5: Technical Developer */}
          {activeTemplate === "technical" && (
            <div className="space-y-4 text-slate-900">
              <div className="bg-slate-900 text-white p-4 rounded-md flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-black tracking-tight text-white">
                    {personal.fullName || "MUKESH MURUGAIYAN"}
                  </h1>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">
                    {personal.title}
                  </p>
                </div>
                <div className="text-right text-[8.5pt] font-mono text-slate-300 space-y-0.5">
                  <div>{personal.email}</div>
                  <div>{personal.phone}</div>
                  <div>{personal.location}</div>
                  <div className="text-emerald-400">{personal.portfolioUrl}</div>
                </div>
              </div>

              {summary && (
                <p className="text-xs text-slate-800 leading-relaxed border-l-2 border-slate-900 pl-3">
                  {summary}
                </p>
              )}

              {skills && skills.length > 0 && (
                <div className="border border-slate-200 rounded p-3 bg-slate-50/50">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                    Technical Capabilities
                  </h2>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {skills.map((cat, idx) => (
                      <div key={idx}>
                        <div className="font-bold text-slate-900 text-[9pt]">
                          {cat.category}
                        </div>
                        <div className="text-slate-700 text-[8.5pt]">
                          {cat.items.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {experience && experience.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                    Engineering Experience
                  </h2>
                  {experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-baseline font-bold text-xs">
                        <span>
                          {exp.role} <span className="text-slate-600 font-normal">at {exp.company}</span>
                        </span>
                        <span className="text-[8.5pt] font-mono text-slate-500">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc list-inside text-xs text-slate-800 space-y-0.5">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {projects && projects.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                    Key Projects & Systems
                  </h2>
                  {projects.map((p, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between font-bold text-xs">
                        <span>{p.title}</span>
                        <span className="text-[8.5pt] font-mono text-slate-500">
                          {p.startDate} – {p.endDate}
                        </span>
                      </div>
                      <div className="text-[8.5pt] font-mono text-blue-700">
                        {p.techStack.join(" | ")}
                      </div>
                      {p.bullets && (
                        <ul className="list-disc list-inside text-xs text-slate-800 mt-0.5">
                          {p.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {education && education.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1">
                    Education
                  </h2>
                  {education.map((e, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span>
                        <strong className="text-slate-900">{e.degree}</strong> — {e.institution}
                      </span>
                      <span className="text-[8.5pt] text-slate-500 font-mono">
                        {e.startYear} – {e.endYear}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
