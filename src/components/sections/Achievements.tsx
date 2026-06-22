"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Achievements() {
  const certifications = [
    {
      title: "WRO Project & Design",
      description: "Project architecture, hardware integration, and system design standards for the World Robot Olympiad.",
      file: "/certificates/wro-project-and-design.pdf",
      category: "ROBOTICS",
      type: "PDF"
    },
    {
      title: "Motion Control Systems",
      description: "Advanced velocity feedback loops, motor kinematics, and hardware motion control algorithms.",
      file: "/certificates/motion-control.pdf",
      category: "CONTROL_SYS",
      type: "PDF"
    },
    {
      title: "Autonomous Robot Racing Car",
      description: "Computer vision navigation, path planning, and autonomous trajectory control loops.",
      file: "/certificates/autonomous-robot-racing-car.pdf",
      category: "AI_&_AUTONOMY",
      type: "PDF"
    },
    {
      title: "Introduction to Robotics",
      description: "Actuator physics, coordinate systems, sensory processing, and microcontrollers.",
      file: "/certificates/into-to-robotics.pdf",
      category: "EMBEDDED_SYS",
      type: "PDF"
    },
    {
      title: "Touch Trigger Based System",
      description: "Interrupt service routines, touch trigger sensor integrations, and collision feedback logic.",
      file: "/certificates/touch-triger-based-system.pdf",
      category: "EMBEDDED_SYS",
      type: "PDF"
    },
    {
      title: "Pre-Live Practical Mission - Day 1",
      description: "Day 1 hardware debugging, systems calibration, and validation under time constraints.",
      file: "/certificates/rm5036_Day 1 Pre Live Practical Mission Final_Certificate.png",
      category: "SYSTEM_TEST",
      type: "IMAGE"
    },
    {
      title: "Pre-Live Practical Mission - Day 2",
      description: "Day 2 validation of hardware debugging, systems calibration, and performance testing.",
      file: "/certificates/rm5036_Day 2 Pre Live Practical Mission Final_Certificate.png",
      category: "SYSTEM_TEST",
      type: "IMAGE"
    },
    {
      title: "General Knowledge Systems Test",
      description: "Electrical systems theory, mechanical physics, and core system diagnostics test.",
      file: "/certificates/rm5036_General Knowledge Test_Certificate.png",
      category: "CORE_THEORY",
      type: "IMAGE"
    },
    {
      title: "IBM Data Literacy",
      description: "IBM SkillsBuild credential validating core competencies in data analysis, interpretation, and data-driven decision making.",
      file: "/certificates/DataLiteracy_Badge20260619-32-c3j820.pdf",
      category: "DATA_SCIENCE",
      type: "PDF"
    },
    {
      title: "TCS MasterCraft DataPlus",
      description: "Appreciation certificate for successfully completing the TCS MasterCraft DataPlus Overview Course.",
      file: "/certificates/Rahul_Mina_29524.pdf",
      category: "DATA_ENG",
      type: "PDF"
    },
    {
      title: "Effective Leadership",
      description: "HP LIFE certification covering leadership strategies, ethical management, and team collaboration principles.",
      file: "/certificates/Effective Leadership.pdf",
      category: "LEADERSHIP",
      type: "PDF"
    },
    {
      title: "Business Communications",
      description: "HP LIFE certification covering effective business messaging, audience analysis, and communication channels.",
      file: "/certificates/Business Communications.pdf",
      category: "BUSINESS",
      type: "PDF"
    },
    {
      title: "Interview Skills",
      description: "TCS iON certification covering prep work, behavioral strategies, and post-interview processes.",
      file: "/certificates/Rahul_Mina_5442818.pdf",
      category: "PROFESSIONAL",
      type: "PDF"
    },
    {
      title: "Communication Skills",
      description: "TCS iON certification covering verbal/non-verbal communication, barriers, and effective professional communication.",
      file: "/certificates/Rahul__5442686.pdf",
      category: "COMMUNICATION",
      type: "PDF"
    }
  ];

  return (
    <section id="achievements" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 06 // METRICS"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">SYSTEM CREDENTIALS</h2>
        </motion.div>

        <div className="space-y-6">
          {certifications.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-8 card-border rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute top-2 right-4 text-[7px] font-mono text-white/10 select-none">CREDENTIAL // ID_X{index + 1}</div>
              
              <div className="max-w-xl pr-4">
                <h3 className="text-sm font-mono font-semibold text-white mb-2 tracking-wider group-hover:text-[#00F0FF] transition-colors">
                  {"// "}{item.title}
                </h3>
                <p className="text-white/60 font-light text-xs leading-relaxed">{item.description}</p>
              </div>
              <div className="flex items-center gap-4 mt-6 md:mt-0 shrink-0 z-10">
                <span className="text-[9px] font-mono text-[#00F0FF]/80 border border-[#00F0FF]/25 px-2.5 py-1 rounded bg-[#00F0FF]/5 select-none uppercase">
                  {item.category}
                </span>
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[10px] font-mono text-white/50 border border-white/10 hover:text-[#00F0FF] hover:border-[#00F0FF]/30 px-3 py-1.5 rounded transition-all bg-white/5 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                >
                  VIEW_{item.type} <ArrowUpRight size={10} className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
