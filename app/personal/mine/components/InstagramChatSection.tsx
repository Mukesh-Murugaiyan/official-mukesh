"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Phone,
  Video,
  Camera,
  Mic,
  Image as ImageIcon,
  Smile,
  Plus,
  SmilePlus,
} from "lucide-react";
import { personalConfig, ChatMessage } from "../config";

export const InstagramChatSection: React.FC = () => {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatCompleted, setChatCompleted] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesList = personalConfig.instagramChat.messages;

  // Auto-play sequential chat message reveal loop
  useEffect(() => {
    if (currentIndex >= messagesList.length) {
      setChatCompleted(true);
      return;
    }

    const currentMsg = messagesList[currentIndex];
    const isSathi = currentMsg.sender === "sathi";

    // Show typing indicator if sender is Sathi
    if (isSathi) {
      setIsTyping(true);
    }

    const timer = setTimeout(
      () => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, currentMsg]);
        setCurrentIndex((prev) => prev + 1);
      },
      currentMsg.delayMs || 1500
    );

    return () => clearTimeout(timer);
  }, [currentIndex, messagesList]);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleMessages, isTyping]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 md:p-6 select-none overflow-hidden z-20">
      {/* Phone Screen Frame (Authentic Instagram DM layout optimized for mobile screens) */}
      <div className="w-full max-w-[360px] max-h-[85vh] h-[640px] rounded-[32px] bg-[#fff0f5] border-[4px] border-neutral-950/80 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden relative flex flex-col my-auto">
        {/* Instagram Header Bar */}
        <header className="px-4 py-3 bg-white/80 backdrop-blur-md flex items-center justify-between border-b border-pink-100 shadow-sm z-30 shrink-0">
          <div className="flex items-center gap-2">
            <button
              aria-label="Back"
              className="text-neutral-800 hover:text-black cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Avatar */}
            <div className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600">
              <img
                src={personalConfig.instagramChat.avatarUrl}
                alt="Moon Avatar"
                className="w-full h-full rounded-full object-cover border border-white"
              />
            </div>

            {/* Profile Name & Username */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1 font-bold text-neutral-900 text-sm">
                <span>{personalConfig.instagramChat.headerName}</span>
                <span className="text-xs text-neutral-400 font-normal">&gt;</span>
              </div>
              <span className="text-[11px] text-neutral-400 font-normal tracking-tight -mt-0.5">
                {personalConfig.instagramChat.username}
              </span>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3.5 text-neutral-800">
            <SmilePlus className="w-5 h-5 cursor-pointer hover:text-pink-600 transition-colors" />
            <Phone className="w-5 h-5 cursor-pointer hover:text-pink-600 transition-colors" />
            <Video className="w-5 h-5 cursor-pointer hover:text-pink-600 transition-colors" />
          </div>
        </header>

        {/* Floating Pink Hearts Romantic Background Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px] z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-pink-300 text-6xl opacity-20 blur-[1px] animate-pulse">
            💖
          </div>
          <div
            className="absolute top-2/3 left-10 text-rose-300 text-5xl opacity-25 blur-[1px] animate-bounce"
            style={{ animationDuration: "6s" }}
          >
            💕
          </div>
          <div className="absolute top-1/3 right-8 text-pink-400 text-4xl opacity-20 blur-[1px] animate-pulse">
            💗
          </div>
        </div>

        {/* Chat Scroll Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-3 py-4 space-y-3 relative z-10 scrollbar-none"
        >
          {visibleMessages.map((msg, index) => {
            const isMe = msg.sender === "me";
            const isLastFromSathi =
              !isMe &&
              (index === visibleMessages.length - 1 ||
                visibleMessages[index + 1]?.sender === "me");

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                {/* Reply To Header */}
                {msg.replyTo && (
                  <span className="text-[11px] text-neutral-400 font-medium px-2 mb-1">
                    {msg.replyTo}
                  </span>
                )}

                <div
                  className={`flex items-end gap-1.5 ${
                    isMe ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Sathi Avatar next to bottom message */}
                  {!isMe && (
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mb-0.5">
                      {isLastFromSathi ? (
                        <img
                          src={personalConfig.instagramChat.avatarUrl}
                          alt="Sathi avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6" />
                      )}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative max-w-[84%] px-4 py-2.5 text-[14.5px] leading-snug font-sans tracking-tight shadow-sm ${
                      isMe
                        ? "rounded-[22px] rounded-br-[5px] bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 text-white font-medium"
                        : "rounded-[22px] rounded-bl-[5px] bg-white text-neutral-900 border border-pink-100/60"
                    }`}
                  >
                    <span>{msg.text}</span>

                    {/* Emoji Reaction Badge */}
                    {msg.reaction && (
                      <span className="absolute -bottom-2 -right-1 text-base bg-white rounded-full px-1 shadow-md border border-pink-100">
                        {msg.reaction}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Sathi Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-end gap-1.5 text-left"
              >
                <img
                  src={personalConfig.instagramChat.avatarUrl}
                  alt="Sathi typing"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="px-4 py-3 rounded-[22px] rounded-bl-[5px] bg-white border border-pink-100 shadow-sm flex items-center gap-1.5">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-pink-500"
                  />
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-pink-500"
                  />
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-1.5 h-1.5 rounded-full bg-pink-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Seen Status Stamp at bottom after chat completes */}
          {chatCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-right text-[11px] text-neutral-400 font-medium pr-2 pt-1"
            >
              {personalConfig.instagramChat.seenStatus}
            </motion.div>
          )}
        </div>

        {/* Bottom Instagram Input Bar */}
        <footer className="px-3 py-2.5 bg-white/90 backdrop-blur-md border-t border-pink-100 flex items-center gap-2 z-30 shrink-0">
          <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
            <Camera className="w-4.5 h-4.5" />
          </div>

          <div className="flex-1 bg-gray-100 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-sm text-gray-400 border border-gray-200">
            <span className="flex-1 text-left text-xs">Message...</span>
            <Smile className="w-4.5 h-4.5 text-gray-400 cursor-pointer" />
          </div>

          <div className="flex items-center gap-2 text-neutral-700">
            <Mic className="w-5 h-5 cursor-pointer hover:text-pink-600" />
            <ImageIcon className="w-5 h-5 cursor-pointer hover:text-pink-600" />
            <Plus className="w-5 h-5 cursor-pointer hover:text-pink-600" />
          </div>
        </footer>
      </div>
    </div>
  );
};
