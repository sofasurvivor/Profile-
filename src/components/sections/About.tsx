"use client";

import { motion } from "framer-motion";
import { Terminal, Users, Cpu, Briefcase } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Core Projects", value: "50+", icon: Cpu, color: "text-[#00F0FF]" },
    { label: "Partner Clients", value: "30+", icon: Users, color: "text-[#8B5CF6]" },
    { label: "Automated Scripts", value: "100+", icon: Terminal, color: "text-[#ec4899]" },
    { label: "Operating Techs", value: "20+", icon: Briefcase, color: "text-[#10B981]" },
  ];

  return (
    <section id="about" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 01 // BACKGROUND"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">SYSTEM PROFILE</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile photo card (1 col wide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 card-border flex flex-col justify-between"
          >
            <div className="absolute top-3 right-4 text-[8px] font-mono text-white/20 z-20 select-none">SYS_IMG // RES_01</div>
            <div className="relative w-full aspect-square bg-black overflow-hidden border-b-2 border-white">
              <img
                src="/profile.jpeg"
                alt="Rahul Mina Profile Photo"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="p-5 font-mono text-xs space-y-1.5 bg-black text-white/80">
              <div className="flex justify-between"><span className="text-[#00F0FF] font-semibold">ID_REF:</span> <span className="text-white">R_MINA_99</span></div>
              <div className="flex justify-between"><span className="text-[#8B5CF6] font-semibold">CLASS:</span> <span className="text-white">AI_DEV_GEN</span></div>
              <div className="flex justify-between"><span className="text-[#ec4899] font-semibold">SECTOR:</span> <span className="text-white">PROPTECH</span></div>
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 led-indicator"></span>
                <span className="text-[10px] text-emerald-500 font-semibold tracking-wider uppercase">SYSTEMS_NORMAL</span>
              </div>
            </div>
          </motion.div>

          {/* Main profile card (2 cols wide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 card-border p-8 flex flex-col justify-between"
          >
            <div className="absolute top-3 right-4 text-[8px] font-mono text-white/10 select-none">SYS_BIO // LNK: CORE</div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">{"// THE CONVERGENCE OF EDUCATION & TECHNOLOGY"}</h3>
              <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
                <p>
                  I'm a builder, an AI-native developer, and at my core—an educator. My journey spans from teaching Science in JNV classrooms to building India's smartest rental platform, <span className="text-white font-medium">GharDilaDo.com</span>.
                </p>
                <p>
                  During my time in field research with <span className="text-white font-medium">NWN Gujarat</span>, I compiled geographic data and conducted field surveys. My classroom manager mindset helps me build systems that are intuitive, scalable, and human-centric.
                </p>
                <p>
                  As a developer, I don't just write code; I ship complete products. I built GharDilaDo from scratch using AI-native workflows, Cursor, React, Supabase, and n8n to deliver a seamless, automated renting experience that solves real user problems.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-border p-6 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-white/30 tracking-wider font-light uppercase">{stat.label}</span>
                  <Icon size={14} className={stat.color} />
                </div>
                <h4 className="text-3xl font-semibold text-white tracking-tighter mt-4">{stat.value}</h4>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
