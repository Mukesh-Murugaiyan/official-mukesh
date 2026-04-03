"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  Link as LinkIcon,
  RefreshCw,
  Trash2,
  Check,
  Zap,
  Info,
  Youtube,
  Image as ImageIcon,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Link from 'next/link';
import ToolHeader from "@/components/ToolHeader";
import ToolSEOSection from "@/components/ToolSEOSection";
import { toolSEOData } from "@/data/toolSEOContent";

export default function ThumbnailClient() {
  const seoData = toolSEOData["youtube-thumbnail-downloader"];
  const [url, setUrl] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<{ quality: string, url: string, resolution: string }[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const [errorStatus, setError] = useState<string | null>(null);

  const extractThumbnailData = (youtubeUrl: string) => {
    setError(null);
    if (!youtubeUrl) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);

    if (match && match[2].length === 11) {
      videoId = match[2];
    } else if (youtubeUrl.includes("shorts/")) {
        const parts = youtubeUrl.split("shorts/");
        videoId = parts[1]?.substring(0, 11);
    }

    if (!videoId) {
      setError("Invalid YouTube URL. Please check the link and try again.");
      return;
    }

    setIsProcessing(true);
    setThumbnails(null);

    // YouTube's thumbnail patterns
    const qualities = [
      { quality: "MaxRes (4K/HD)", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, resolution: "1280x720" },
      { quality: "Standard (SD)", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, resolution: "640x480" },
      { quality: "High Quality (HQ)", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, resolution: "480x360" },
      { quality: "Medium Quality (MQ)", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, resolution: "320x180" },
      { quality: "Default", url: `https://img.youtube.com/vi/${videoId}/default.jpg`, resolution: "120x90" },
    ];

    setTimeout(() => {
      setThumbnails(qualities);
      setIsProcessing(false);
    }, 600);
  };

  const downloadImage = async (imgUrl: string, quality: string) => {
    try {
      // Use existing proxy endpoint from the IG-downloader to avoid CORS if possible
      const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(imgUrl)}`;
      
      const a = document.createElement("a");
      a.href = proxyUrl;
      a.download = `youtube-thumbnail-${quality.replace(/\s/g, "-").toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setDownloaded(quality);
      setTimeout(() => setDownloaded(null), 2000);
    } catch (err) {
      window.open(imgUrl, "_blank");
    }
  };

  const resetState = () => {
    setUrl("");
    setThumbnails(null);
    setError(null);
  };

  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 lg:p-8 flex flex-col gap-4 mb-8";
  const btnPrimaryClass = "py-3 px-6 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2";
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12 text-white min-h-screen">
      
      {/* 🚀 [TOP_AD] placeholder */}
      <div className="w-full h-20 sm:h-24 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-8 rounded-2xl overflow-hidden shadow-inner font-mono text-xs uppercase tracking-widest">
        [TOP_AD]
      </div>

      <div className="flex flex-col gap-6">

        {/* 1. Header Block */}
        <ToolHeader 
          title="YouTube Thumbnail Downloader"
          description="Instantly download any YouTube video thumbnail in all available qualities (4K, Ultra HD, HQ). Supports Shorts and regular videos."
          icon={<Youtube className="w-6 h-6 text-red-500" />}
          gradient={{ from: "red-500", to: "orange-600" }}
        />

        {errorStatus && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold flex items-center gap-2 mb-4">
             <Info className="w-4 h-4" /> {errorStatus}
          </div>
        )}

        {/* 3. Main Workspace */}
        <div className={`w-full ${cardBaseClass} min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden mb-0`}>
            
            {!thumbnails && !isProcessing ? (
                /* URL Input Component */
                <div className="w-full max-w-2xl flex flex-col items-center gap-8 py-10">
                    <div className="w-24 h-24 rounded-full bg-red-600/20 flex items-center justify-center animate-pulse">
                         <LinkIcon className="w-10 h-10 text-red-500" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">Ready to download?</h3>
                        <p className="text-gray-500 text-sm">Simply paste your YouTube Video or Shorts link below</p>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-4 px-4 sm:px-0">
                       <input 
                         type="text"
                         className="flex-1 px-6 py-4 bg-[#1a1a1a] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-medium"
                         placeholder="https://www.youtube.com/watch?v=..."
                         value={url}
                         onChange={(e)=>setUrl(e.target.value)}
                       />
                       <button 
                        onClick={() => extractThumbnailData(url)}
                        className={`${btnPrimaryClass} !bg-red-600 !text-white hover:!bg-red-500 shadow-lg shadow-red-600/20`}
                       >
                           Get Thumbnails
                       </button>
                    </div>
                </div>
            ) : isProcessing ? (
                <div className="flex flex-col items-center gap-6">
                    <RefreshCw className="w-16 h-16 text-red-500 animate-spin" />
                    <p className="text-gray-400 font-medium font-mono text-center">ANALYZING VIDEO ID... <br/><span className="text-xs text-red-500/60 uppercase">Connecting to YouTube API Servers</span></p>
                </div>
            ) : thumbnails ? (
                /* Thumbnail Results Component */
                <div className="w-full flex flex-col gap-10 p-2 sm:p-0">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h3 className="text-xl font-bold">Extraction Results</h3>
                        <button onClick={resetState} className="text-xs text-red-500/60 hover:text-red-500 flex items-center gap-2 uppercase tracking-widest font-bold transition-all">
                             <Trash2 className="w-4 h-4" /> Reset
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {thumbnails.map((thumb, idx) => (
                             <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden group hover:border-red-600/50 transition-all relative shadow-xl">
                                 <div className="relative aspect-video w-full">
                                    <Image 
                                      src={thumb.url} 
                                      alt={thumb.quality} 
                                      fill 
                                      className="object-cover"
                                      unoptimized 
                                    />
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                                        {thumb.resolution}
                                    </div>
                                 </div>
                                 <div className="p-4 flex flex-col gap-3">
                                    <h4 className="font-bold text-sm text-gray-200">{thumb.quality}</h4>
                                    <div className="flex gap-2">
                                        <button 
                                          onClick={() => downloadImage(thumb.url, thumb.quality)}
                                          className="flex-1 py-1.5 rounded-lg bg-red-600 text-[11px] font-bold text-white hover:bg-red-500 transition-all flex items-center justify-center gap-2"
                                        >
                                            {downloaded === thumb.quality ? <Check className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                                            {downloaded === thumb.quality ? "Saved" : "Download"}
                                        </button>
                                        <a 
                                          href={thumb.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10"
                                          aria-label="View original"
                                        >
                                            <ExternalLink className="w-3 h-3 text-gray-400" />
                                        </a>
                                    </div>
                                 </div>
                             </div>
                        ))}
                    </div>
                </div>
            ) : null}

        </div>

        {/* 5. Tool SEO Section */}
        <div className="w-full bg-[#0a0a0a] mt-12">
          <ToolSEOSection {...seoData} />
        </div>

      </div>
    </div>
  );
}
