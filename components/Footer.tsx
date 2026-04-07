"use client";
import { motion } from "framer-motion";
import { BookOpen, Code2, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = ({ excludeRoutes }: { excludeRoutes?: string[] }) => {
  const pathname = usePathname();
  if (excludeRoutes?.includes(pathname)) return <></>;

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mx-4 my-8 pb-28 lg:pb-0"
    >
      {/* Main Container */}
      <div className="bg-[#111111] text-white p-6 md:p-12 rounded-3xl border border-white/10 max-w-[1200px] mx-auto">
        
        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4">
          
          {/* Section: Brand & Headline */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl md:text-3xl font-medium leading-snug max-w-xs md:max-w-md">
              Delivering <span className="text-cyan-400">Precision</span> and <br className="hidden md:block" />
              <span className="text-purple-500"> Performance</span> in Tech
            </h2>
            {/* Desktop-only copyright info */}
            <div className="hidden md:block text-gray-400 text-sm mt-10">
              <p>Bengalore, India</p>
              <p>Mukesh Murugiayan © 2025</p>
            </div>
          </div>

          {/* Section: Explore More */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Explore More</h3>
            <div className="flex flex-col gap-3 text-lg md:text-sm font-medium md:font-normal">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Me</Link>
              <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link>
            </div>
          </div>

          {/* Section: Socials */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-green-400 font-semibold text-sm uppercase tracking-wider">Socials</h3>
            <div className="flex flex-wrap md:flex-col gap-x-6 gap-y-4">
              <a href="https://www.linkedin.com/in/mukesh-murugaiyan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Linkedin size={18} className="text-[#0077b5]" /> <span>LinkedIn</span>
              </a>
              <a href="https://medium.com/@mukeshmurugaiyan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white text-gray-300">
                <BookOpen size={18} className="text-white" /> <span>Medium</span>
              </a>
              <a href="https://github.com/Mukesh-Murugaiyan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Github size={18} /> <span>GitHub</span>
              </a>
              <a href="https://leetcode.com/mukeshmurugaiyan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Code2 size={18} className="text-[#f59e0b]" /> <span>LeetCode</span>
              </a>
              <a href="https://twitter.com/mukeshmurugaiyan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Twitter size={18} /> <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Section: Others */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Others</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 group">
                <div className="bg-white p-2 rounded-full transition-transform group-hover:scale-105">
                  <FileText size={20} className="text-black" />
                </div>
                <span className="text-gray-300 group-hover:text-white font-medium">Resume</span>
              </a>
              <a href="mailto:contact@themukesh.com" className="flex items-center gap-3 group">
                <div className="bg-white p-2 rounded-full transition-transform group-hover:scale-105">
                  <Mail size={20} className="text-black" />
                </div>
                <span className="text-gray-300 group-hover:text-white font-medium">contact@themukesh.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Bottom Footer */}
      <div className="md:hidden flex justify-between items-center px-4 mt-4 text-xs text-gray-400 font-medium">
        <span>Mukesh Murugaiyan © 2025</span>
        <span>Bengalore, India</span>
      </div>
    </motion.footer>
  );
};

export default Footer;