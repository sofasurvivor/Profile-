"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="hero" className="min-h-screen w-full flex items-center justify-center relative px-4 md:px-6 py-24 select-none">
      
      {/* Decorative cyber grid line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <motion.div 
        className="max-w-4xl mx-auto flex flex-col items-start w-full relative z-10 p-8 md:p-16 backdrop-blur-md bg-black/45 border border-white/5 rounded-3xl glow-border-cyan shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Telemetry frame accents */}
        <div className="absolute top-4 left-4 text-[8px] font-mono text-white/20 select-none">PORTFOLIO // INTERACTIVE CORE</div>
        <div className="absolute top-4 right-4 text-[8px] font-mono text-white/20 select-none">VER 4.2.0 // R_MINA</div>
        <div className="absolute bottom-4 left-4 text-[8px] font-mono text-[#00F0FF]/40 select-none font-semibold uppercase led-indicator">▲ GRID_BOUNDS CHECKED</div>
        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 select-none">SEC_ACTIVE // LOC: IND</div>
        
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-[#00F0FF] font-mono text-[10px] tracking-[0.2em] uppercase bg-[#00F0FF]/5 px-3.5 py-1.5 rounded-full border border-[#00F0FF]/20 glow-border-cyan">
            {"// AVAILABLE FOR CONSULTING ENGAGEMENTS"}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl font-semibold tracking-tighter text-[#ffffff] leading-[0.95] mb-6 font-sans uppercase"
        >
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#8B5CF6] to-[#ec4899] glow-text-cyan">
            Autonomous
          </span> <br />
          Systems.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-white/60 max-w-2xl font-light leading-relaxed mb-10"
        >
          I am <span className="text-white font-medium">Rahul Mina</span>. An AI Generalist, Educator, and Lead Full-Stack Developer on GharDilaDo.com, specializing in building full-stack PropTech solutions, high-performance web applications (like Yuga Launchpad), and autonomous AI-native automation pipelines.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-lg hover:bg-[#00F0FF] hover:text-black transition-all duration-300 text-center shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_20px_rgba(0,240,255,0.3)]"
          >
            Deploy Project
          </a>
          <a
            href="/resume.pdf"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/10 font-semibold text-xs tracking-widest uppercase rounded-lg hover:bg-white/5 hover:border-[#00F0FF]/50 transition-all duration-300 text-center backdrop-blur-sm"
          >
            Review Resume
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="mt-16 flex items-center gap-2 text-[10px] font-mono text-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={12} className="text-[#00F0FF]" />
          <span>SCROLL TO ENTER ENVIROMENT</span>
        </motion.div>

      </motion.div>
      
    </section>
  );
}
