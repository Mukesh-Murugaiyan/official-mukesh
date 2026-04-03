"use client";

import React from "react";
import {
  Check,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface ToolSEOSectionProps {
  toolName: string;
  accentColor: string; // e.g. "red-600", "cyan-400"
  intro: string[];
  steps: { title: string; description: string; icon: any }[];
  features: string[];
  detailedSection: {
    title: string;
    paragraphs: string[];
  };
  faqs: { q: string; a: string }[];
  relatedTools: { name: string; description: string; url: string; color: string }[];
}

export default function ToolSEOSection({
  toolName,
  accentColor,
  intro,
  steps,
  features,
  detailedSection,
  faqs,
  relatedTools,
}: ToolSEOSectionProps) {
  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 lg:p-8 flex flex-col gap-4 mb-8";
  const accentBg = `bg-${accentColor}/10`;
  const accentBorder = `border-${accentColor}/20`;
  const accentText = `text-${accentColor}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      
      {/* 🚀 [TOP_AD] */}
      <div className="w-full h-24 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-12 rounded-2xl overflow-hidden shadow-inner">
        [TOP_AD]
      </div>

      <div className="flex flex-col gap-6">

        {/* 1. Introduction Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
           <div className="flex flex-col gap-5 text-gray-300 text-sm lg:text-base leading-relaxed">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
           </div>
           <div className={`${accentBg} ${accentBorder} border rounded-3xl p-8 flex flex-col items-center justify-center text-center`}>
                <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 ${accentText}`}>
                   <Check className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-white mb-2 uppercase tracking-widest">{toolName} Optimization</h4>
                <p className="text-xs text-gray-400 max-w-[200px]">Professional tools designed for maximum efficiency and speed.</p>
           </div>
        </div>

        {/* 2. Middle Ad */}
        <div className="w-full h-32 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-12 rounded-3xl overflow-hidden shadow-inner font-mono text-xs uppercase tracking-widest">
            [MIDDLE_AD]
        </div>

        {/* 3. Steps & Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className={cardBaseClass + " !mb-0"}>
                 <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                    <Check className={`w-6 h-6 ${accentText}`} /> Key Features
                 </h2>
                 <ul className="space-y-4 text-sm lg:text-base text-gray-400">
                    {features.map((feat, i) => (
                      <li key={i} className="flex gap-3">
                        <div className={`h-2 w-2 rounded-full mt-2 shrink-0 bg-${accentColor}`} /> 
                        {feat}
                      </li>
                    ))}
                 </ul>
            </div>

            <div className={cardBaseClass + " !mb-0"}>
                 <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                    <Check className={`w-6 h-6 ${accentText}`} /> How to use?
                 </h2>
                 <div className="space-y-6">
                    {steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className={`p-3 h-fit rounded-xl bg-white/5 border border-white/10 ${accentText}`}>
                           <step.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white mb-1">{step.title}</h4>
                          <p className="text-xs text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    ))}
                 </div>
            </div>
        </div>

        {/* 4. Detailed Content Section */}
        <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 underline decoration-white/10">{detailedSection.title}</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-sm lg:text-base">
                {detailedSection.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
        </div>

        {/* 5. FAQ Section */}
        <div className="mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <HelpCircle className={`w-7 h-7 ${accentText}`} /> Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <h4 className="font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{faq.q}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* 6. Internal Linking Section */}
        <div className={cardBaseClass}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-gray-400" /> Related Tools You Might Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedTools.map((tool, i) => (
                  <a 
                    key={i} 
                    href={tool.url}
                    className={`p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-${tool.color} transition-all group`}
                  >
                      <h4 className={`font-bold text-sm mb-2 text-${tool.color} underline decoration-white/10 group-hover:decoration-current`}>
                        {tool.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed">{tool.description}</p>
                  </a>
                ))}
            </div>
        </div>

        {/* 7. Bottom Ad & CTA */}
        <div className="flex flex-col gap-8 items-center text-center py-12">
            <div className="w-full h-24 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 rounded-2xl overflow-hidden">
                [BOTTOM_AD]
            </div>
            
            <div className="max-w-xl">
                <h3 className={`text-4xl font-black mb-4 italic text-white tracking-tighter uppercase`}>Try <span className={accentText}>{toolName}</span> Now!</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Experience professional grade tools right in your browser. Fast, secure, and 100% free.</p>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="py-4 px-10 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition-all shadow-xl hover:shadow-2xl"
                >
                    Get Started Now
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}
