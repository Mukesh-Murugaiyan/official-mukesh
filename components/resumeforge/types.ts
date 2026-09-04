import { CV } from "@/lib/cv/types";

export type TemplateId = "classic" | "claude" | "linear" | "minimal" | "technical";
export type ViewMode = "editor" | "dashboard" | "templates";

export interface CvTemplate {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  previewClass: string;
  fontFamily: string;
}

export interface SavedCvDraft {
  id: string;
  title: string;
  lastModified: string;
  templateId: TemplateId;
  cvData: CV;
}

export const RESUME_TEMPLATES: CvTemplate[] = [
  {
    id: "classic",
    name: "Classic ATS Serif",
    tagline: "Times New Roman standard document format",
    description: "High-fidelity single-column serif format with tab-stop date alignment and steel-blue headers as shown in uploaded document specs.",
    badge: "Matching Image",
    previewClass: "border-slate-300 font-serif",
    fontFamily: '"Times New Roman", Times, Georgia, serif',
  },
  {
    id: "claude",
    name: "Claude AI Modern",
    tagline: "Claude AI inspired crisp typographic resume",
    description: "Ultra-clean layout generated with Claude AI aesthetic — indigo/slate accents, category pills, bold metric callouts, and max readability.",
    badge: "AI Signature",
    previewClass: "border-indigo-500/40 font-sans",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  {
    id: "linear",
    name: "Modern Linear",
    tagline: "SaaS & high-growth tech startup style",
    description: "Sleek typography, category pill badges, and structured timeline dividers for modern engineering roles.",
    badge: "Developer Choice",
    previewClass: "border-emerald-500/30 font-sans",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  {
    id: "minimal",
    name: "Minimal Mono",
    tagline: "Distraction-free typographic precision",
    description: "Subtle monochrome accents, compact spacing, and distinct header hierarchy suited for senior & staff roles.",
    previewClass: "border-zinc-400 font-mono",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  {
    id: "technical",
    name: "Technical Developer",
    tagline: "Optimized for core skills & open source",
    description: "Highlights technical stack categorization, project links, and key architecture contributions up front.",
    badge: "Code Focused",
    previewClass: "border-blue-500/30 font-sans",
    fontFamily: "Inter, system-ui, sans-serif",
  },
];
