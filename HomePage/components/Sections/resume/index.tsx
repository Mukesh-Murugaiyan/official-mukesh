"use client";
import { MdWork, MdSchool, MdTimeline } from "react-icons/md";
import { motion } from "framer-motion";

const ResumeSection = ({ id }: { id?: string }) => {
  const timeline = [
    {
      type: "section",
      title: "Experience",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdWork
            className="text-base"
            style={{ color: "hsl(190, 82%, 72%)" }}
          />
        </div>
      ),
    },
    {
      type: "item",
      title: " Full Stack Software Engineer",
      company: "ThiDiff Technologies",
      period: "Jul 2022 — Present",
      description: `Developed scalable web, mobile, and desktop applications using React.js, Node.js, Next.js, and React Native
• Built and maintained real-time systems using WebSockets for live updates, messaging, and notifications
• Designed secure RESTful APIs with JWT authentication and RBAC for role-based access
• Optimized application performance and database queries for high-concurrency usage
• Integrated third-party services including Firebase, Agora SDK, and payment systems
• Deployed and managed applications on AWS using Docker and CI/CD pipelines
• Collaborated in a team to deliver production-ready, scalable enterprise solutions
• Optimized API performance and database queries for high-concurrency and large-scale usage
• Designed reusable, scalable architecture using services, modules, and component-based structure
• Integrated AWS services and AI-based solutions including OCR and face recognition
• Mentored junior developers, conducted code reviews, and ensured best practices`,
    },
    {
      type: "section",
      title: "Education",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdSchool
            className="text-base"
            style={{ color: "hsl(190, 82%, 72%)" }}
          />
        </div>
      ),
    },
    {
      type: "item",
      title: "GreenApple Computer Education",
      company: "Software Training Institute, Mayiladuthurai, Tamil Nadu",
      period: "Mar 2022 — Jun 2022",
      description:
        "Completed a professional training program in C and C++, gaining hands-on experience in programming concepts, data structures, and problem-solving skills.",
    },
    {
      type: "item",
      title: "B.Sc. (Information Technology)",
      company: " Dharmapuram Adhinam Arts and Science College, Mayiladuthurai",
      period: "July 2019 — June 2022",
      description:
        "Built a strong foundation in programming, databases, and web technologies through hands-on projects.",
    },
  ];

  return (
    <section
      id={id || "resume"}
      className="p-6"
    >
    
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-2"
      >
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          <MdTimeline className="text-xl text-cyan-400" />
        </div>
        {/* <h2 className="text-3xl font-bold text-white">Career Snapshot</h2> */}
        <h3 className="text-2xl font-bold text-white tracking-tight uppercase tracking-wider">Career Snapshot</h3>

      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full origin-left"
      />

      <div className="flex flex-col">
        {timeline.map((item, idx) => {
          if (item.type === "section") {
            return (
              <div key={idx} className="flex relative gap-4 ml-2 mt-8">
                <div className="relative flex flex-col items-center">
                  {item.icon}
                  <div className="absolute top-[91%] w-[1px] h-[90%] bg-gray-700"></div>
                </div>

                <h3 className="text-xl font-semibold text-white pt-1">
                  {item.title}
                </h3>
              </div>
            );
          }

          // ITEM
          return (
            <div key={idx} className="flex relative gap-4 mt-6 ml-5">
              {/* Timeline Line and Dot */}
              <div className="relative flex flex-col items-center">
                <div
                  className="
                      relative 
                      w-1.5 h-1.5 
                      rounded-full 
                      bg-blue-400
                      shadow-[0_0_8px_rgba(96,165,250,0.9)]
                    "
                ></div>
                {idx !== timeline.length - 1 && (
                  <div className="absolute top-[6px] w-[1px] h-[116.5%] bg-gray-700"></div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-gray-400">{item.company}</p>
                <span className="text-sm text-[#52b3c7]">{item.period}</span>
                <p className="text-gray-400 mt-2 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResumeSection;
