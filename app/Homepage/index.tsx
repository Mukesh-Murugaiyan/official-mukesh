"use client";
import logo from "@/assets/images/logo.svg";
import mukesh from "@/assets/images/mukesh-mg2.png";
import MotionVariantWrapper from "@/components/MotionVariantWrapper";
import OverlayModal from "@/components/OverlayModal";
import ProfileCard from "@/HomePage/components/ProfileCard/ProfileCard";
import AboutSection from "@/HomePage/components/Sections/about/AboutSection";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import PopupHeader from "@/components/PopupHeader";
import Footer from "@/components/Footer";

// Lazy load below-the-fold sections
const ContactSection = dynamic(() => import("@/HomePage/components/Sections/contact"), { ssr: false });
const ResumeSection = dynamic(() => import("@/HomePage/components/Sections/resume"), { ssr: false });
const SkillSection = dynamic(() => import("@/HomePage/components/Sections/skills"), { ssr: false });
const ToolSection = dynamic(() => import("@/HomePage/components/Sections/Tool"), { ssr: false });
const IOS26TabMenu = dynamic(() => import("@/HomePage/components/Sections/IOS26TabMenu"), { ssr: false });
const NavigationTab = dynamic(() => import("@/HomePage/components/Sections/NavigationTab"), { ssr: false });
const DynamicQRCode = dynamic(() => import("@/components/DynamicQRCode"), { ssr: false });
const HighlightsSection = dynamic(() => import("@/HomePage/components/Sections/about/HighlightsSection"), { ssr: false });
const PortfolioSection = dynamic(() => import("@/HomePage/components/Sections/about/PortfolioSection"), { ssr: false });

const HomePageClient = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen, setIsOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const scrollSpyOptions = {
    threshold: 0.4,
    rootMargin: "-10% 0px -10% 0px"
  };

  const { ref: aboutRef, inView: aboutInView } = useInView({ ...scrollSpyOptions, threshold: 0.1 });
  const { ref: resumeRef, inView: resumeInView } = useInView(scrollSpyOptions);
  const { ref: skillsRef, inView: skillsInView } = useInView({ ...scrollSpyOptions, threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView(scrollSpyOptions);
  const { ref: toolsRef, inView: toolsInView } = useInView(scrollSpyOptions);

  const { ref: navTabRef, inView: navTabInView } = useInView({
    threshold: 0,
    initialInView: true,
  });

  useEffect(() => {
    if (aboutInView) setActiveSection("about");
  }, [aboutInView]);

  useEffect(() => {
    if (resumeInView) setActiveSection("resume");
  }, [resumeInView]);

  useEffect(() => {
    if (skillsInView) setActiveSection("skills");
  }, [skillsInView]);

  useEffect(() => {
    if (contactInView) setActiveSection("contact");
  }, [contactInView]);

  useEffect(() => {
    if (toolsInView) setActiveSection("tools");
  }, [toolsInView]);

  const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Mukesh;;;;
FN:Mukesh M
ORG:Mukesh
TITLE:Full Stack Software Engineer
TEL;TYPE=CELL:+919786587013
EMAIL:contact@themukesh.com
URL:https://themukesh.com
END:VCARD`;


  return (
    <div style={{ minWidth: "40vh" }}>
      {/* ✴---Popup Header (Only visible when NavTab is hidden on Desktop)---✴ */}
      <div className="hidden lg:block">
        <PopupHeader activeSection={activeSection} visible={!navTabInView} />
      </div>

      {/* ✴---Render Modals only if active and mounted to save initial bandwidth---✴ */}
      {isOpen && (
        <OverlayModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          body={
            <Image
              src={mukesh}
              alt="Mukesh M"
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-xl shadow-lg shadow-white/20 transition-all duration-300"
              loading="lazy"
              priority={false}
            />
          }
        />
      )}

      {isQrOpen && (
        <OverlayModal
          isOpen={isQrOpen}
          setIsOpen={setIsQrOpen}
          body={
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="md:bg-[#111111] rounded-lg"
                  initial={{ scale: 1 }}
                >
                  <div className="relative w-18 h-18 rounded-md overflow-hidden">
                    <Image
                      src={logo}
                      alt="Company Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
              <DynamicQRCode
                value={vcardData}
                size={450}
                className="rounded-3xl border border-white/10 p-2 bg-white p-6 w-full h-auto"
              />
            </>
          }
        />
      )}

      <main className="text-white">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 pt-12">
          {/* Desktop | Two Column */}
          {isDesktop ? (
            <div className="hidden lg:flex gap-[2.3%]">
              {/* Left Sticky ProfileCard */}
              <div className="flex-shrink-0 sticky top-8 self-start h-fit min-h-[500px]">
                <ProfileCard setIsOpen={setIsOpen} />
              </div>

              {/* Right Scrollable Content */}
              <div className="flex-1 rounded-3xl border border-white/10 relative bg-[#111111] min-h-[800px]">
                <div ref={navTabRef}>
                  <NavigationTab activeSection={activeSection} />
                </div>


                <div className="flex flex-col">
                  <div ref={aboutRef}>
                    <AboutSection />
                    <MotionVariantWrapper variant="zoomIn" delay={0.2}>
                      <HighlightsSection />
                    </MotionVariantWrapper>
                    <MotionVariantWrapper variant="slideRight" delay={0.3}>
                      <PortfolioSection />
                    </MotionVariantWrapper>
                  </div>

                  <div ref={resumeRef}>
                    <MotionVariantWrapper variant="fadeUp" delay={0.1}>
                      <ResumeSection />
                    </MotionVariantWrapper>
                  </div>

                  <div ref={skillsRef}>
                    <MotionVariantWrapper variant="fadeUp" delay={0.1}>
                      <SkillSection />
                    </MotionVariantWrapper>
                  </div>

                  <div ref={contactRef}>
                    <MotionVariantWrapper variant="fadeUp" delay={0.1}>
                      <ContactSection setIsQrOpen={setIsQrOpen} />
                    </MotionVariantWrapper>
                  </div>

                  <div ref={toolsRef}>
                    <MotionVariantWrapper variant="fadeUp" delay={0.1}>
                      <ToolSection />
                    </MotionVariantWrapper>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile | Single Column */
            <div className="lg:hidden space-y-7 min-h-[600px]">
              <ProfileCard isMobile={true} setIsOpen={setIsOpen} />
              <div className="relative bg-[#111111] rounded-3xl border border-white/10">
                {/* Mobile Content - Rendered Directy */}
                <div ref={aboutRef}>
                  <AboutSection id="about-mobile" />
                  <MotionVariantWrapper variant="zoomIn" delay={0.1}>
                    <HighlightsSection id="highlights-mobile" />
                  </MotionVariantWrapper>
                  <MotionVariantWrapper variant="slideRight" delay={0.1}>
                    <PortfolioSection id="portfolio-mobile" />
                  </MotionVariantWrapper>
                </div>

                <div ref={resumeRef}>
                  <MotionVariantWrapper variant="fadeUp">
                    <ResumeSection id="resume-mobile" />
                  </MotionVariantWrapper>
                </div>

                <div ref={skillsRef}>
                  <MotionVariantWrapper variant="slideLeft">
                    <SkillSection id="skills-mobile" />
                  </MotionVariantWrapper>
                </div>

                <div ref={contactRef}>
                  <MotionVariantWrapper variant="rotateIn">
                    <ContactSection setIsQrOpen={setIsQrOpen} id="contact-mobile" />
                  </MotionVariantWrapper>
                </div>

                <div ref={toolsRef}>
                  <MotionVariantWrapper variant="fadeUp">
                    <ToolSection id="tools-mobile" />
                  </MotionVariantWrapper>
                </div>
              </div>

              <IOS26TabMenu activeSection={activeSection} />
            </div>
          )}
        </div>
      </main>
       {isMounted && <Footer />}
    </div>
  );
};

export default HomePageClient;
