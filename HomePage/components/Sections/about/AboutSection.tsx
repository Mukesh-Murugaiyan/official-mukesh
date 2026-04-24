import { ColourfulText } from "@/components/animation/ColourfulText";
import { motion } from "framer-motion";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { SiElectron, SiFirebase, SiKotlin, SiMongodb, SiNextdotjs, SiSocketdotio } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export default function AboutSection({ id }: { id?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } as const, // Smoother and faster
    },
  };

  const skills = [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" aria-label="React" />, color: "#61DAFB" },
    { name: "Next", icon: <SiNextdotjs className="text-white" aria-label="Next.js" />, color: "#FFFFFF" },
    { name: "Node", icon: <FaNodeJs className="text-[#339933]" aria-label="Node.js" />, color: "#339933" },
    { name: "RN", icon: <TbBrandReactNative className="text-[#61DAFB]" aria-label="React Native" />, color: "#61DAFB" },
    { name: "Electron", icon: <SiElectron className="text-[#47848F]" aria-label="Electron" />, color: "#47848F" },
    { name: "Kotlin", icon: <SiKotlin className="text-[#7F52FF]" aria-label="Kotlin" />, color: "#7F52FF" },
    { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" aria-label="Firebase" />, color: "#FFCA28" },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" aria-label="MongoDB" />, color: "#47A248" },
    { name: "WS", icon: <SiSocketdotio className="text-white" aria-label="Socket.io" />, color: "#FFFFFF" },
  ];

  return (
    <section id={id || "about"} className="p-6" aria-labelledby="about-heading">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ willChange: "transform, opacity" }}
      >

        <motion.div
          className="flex items-center gap-3 mb-2"
        >
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <MdPerson className="text-xl text-cyan-400" />
          </div>
          <h2 id="about-heading" className="text-2xl font-bold text-white tracking-tight uppercase tracking-wider">About Me</h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-5 origin-left"
        />

        <motion.p className="text-gray-300 leading-relaxed">
          I’m <ColourfulText text="Mukesh" fontSize={28} glowStrength={24} />, Full Stack Software Engineer with 3.9+ years of experience building scalable web, mobile, and desktop
          applications using React.js, Node.js, and React Native. Expert in real-time systems and high-performance
          architectures, delivering production-ready solutions with WebSockets, REST APIs, and end-to-end system
          design.
        </motion.p>

        <motion.ul
          variants={itemVariants}
          className="hidden lg:flex flex-wrap gap-2 mt-6 text-sm text-gray-300"
        >
          {skills.map((skill) => (
            <motion.li
              key={skill.name}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: `0 0 20px ${skill.color}33`,
                borderColor: `${skill.color}66`
              }}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-full border border-white/10 transition-colors cursor-default"
            >
              {skill.icon}
              {skill.name}
            </motion.li>
          ))}
        </motion.ul>

        <div className="lg:hidden mt-6 overflow-hidden relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

          <motion.div
            className="flex gap-2 w-max px-2"
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300 whitespace-nowrap"
              >
                {skill.icon}
                {skill.name}
              </div>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
