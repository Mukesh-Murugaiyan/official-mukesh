import CountUp from "@/components/CountUp";
import { AiOutlineStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";

export default function HighlightsSection({ id }: { id?: string }) {
  const highlights = [
    {
      value: 4,
      suffix: "+",
      label: "Years Experience",
      icon: <FaCode />,
      iconColor: "text-cyan-400",
      glowColor: "rgba(34, 211, 238, 0.15)"
    },
    {
      value: 6,
      suffix: "+",
      label: "Projects Developed",
      icon: <FaLaptopCode />,
      iconColor: "text-purple-400",
      glowColor: "rgba(168, 85, 247, 0.15)"
    },
    {
      value: 3,
      suffix: "+",
      label: "Production Apps",
      icon: <FaRocket />,
      iconColor: "text-orange-400",
      glowColor: "rgba(251, 146, 60, 0.15)"
    },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section id={id || "highlights"} className="p-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
          <AiOutlineStar className="text-xl text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight uppercase tracking-wider">Key Highlights</h3>
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-0.5">My Stats</p>
        </div>
      </motion.div>

      {/* Desktop Highlights Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="hidden sm:grid sm:grid-cols-3 gap-0 border border-white/10 rounded-3xl overflow-hidden bg-white/[0.01] backdrop-blur-sm"
      >
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`group relative p-8 flex flex-col items-center sm:items-start transition-all duration-500 hover:bg-white/[0.03]
              ${index !== highlights.length - 1 ? "sm:border-r border-white/10" : ""}
            `}
          >
            {/* Background Accent Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${item.glowColor}, transparent 80%)` }}
            />

            <div className="relative z-10 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl ${item.iconColor} group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 mb-6 shadow-xl`}>
                {item.icon}
              </div>

              <div className="flex items-baseline gap-1">
                <CountUp
                  value={item.value}
                  suffix={item.suffix}
                  className="text-5xl font-black text-white tracking-tighter sm:text-6xl"
                />
              </div>

              <p className="text-xs font-bold text-gray-400 mt-3 uppercase tracking-[0.2em] leading-none transition-colors duration-500 group-hover:text-gray-200">
                {item.label}
              </p>
            </div>

            {/* Animated Underline */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-${item.iconColor.split('-')[1]}-400 to-transparent group-hover:w-full transition-all duration-700 ease-in-out`} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="sm:hidden mt-8 flex flex-col gap-8 px-2"
      >
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center gap-6 group"
          >
            <div className="relative w-19 h-16 shrink-0">
              <div
                className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                style={{ background: item.glowColor.replace('0.15', '0.3') }}
              />
              <div className={`relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl ${item.iconColor} group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl`}>
                {item.icon}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <CountUp
                  value={item.value}
                  suffix={item.suffix}
                  className="text-5xl font-black text-white tracking-tighter leading-none"
                />
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mt-2 opacity-70 group-hover:opacity-100 group-hover:text-white transition-all duration-500">
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>


    </section>
  );
}