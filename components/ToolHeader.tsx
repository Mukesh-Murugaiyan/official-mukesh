"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ToolHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor?: string; // e.g. "cyan-400", "indigo-500", "red-500"
  gradient?: {
    from: string;
    to: string;
  };
  backUrl?: string; // default to "/tools"
}

export default function ToolHeader({
  title,
  description,
  icon,
  accentColor = "cyan-400",
  gradient,
  backUrl = "/tools",
}: ToolHeaderProps) {
  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 flex flex-col gap-4 shadow-xl";
  
  // Dynamic gradient classes
  const titleClass = gradient 
    ? `text-2xl sm:text-3xl font-extrabold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-${gradient.from} to-${gradient.to} tracking-tight`
    : "text-2xl font-bold flex items-center gap-2 text-white";

  return (
    <div className={cardBaseClass}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <h1 className={titleClass}>
            <Link 
              href={backUrl} 
              className="p-1.5 -ml-1 mr-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center justify-center shrink-0"
              title="Back to Tools"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
            <div className="flex items-center gap-2 truncate">
               <span className="shrink-0">{icon}</span>
               <span className="truncate">{title}</span>
            </div>
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
