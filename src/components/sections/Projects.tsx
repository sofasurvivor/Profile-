"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "GHARDILADO.COM",
      category: "PROPTECH PLATFORM",
      description: "India's smartest rental platform built from scratch to production. Solves renting workflows with smart descriptions, automated n8n pipelines, and KYC verification.",
      technologies: ["React", "Vite", "Supabase", "n8n", "Agentic AI"],
      link: "https://www.ghardilado.com"
    },
    {
      title: "TELEGRAMDRIVE",
      category: "DESKTOP APPLICATION",
      description: "Convert a Telegram account into an unlimited, secure cloud storage drive. Engineered an asynchronous file chunking pipeline and end-to-end payload encryption.",
      technologies: ["TypeScript", "Tauri", "Rust", "React", "Tokio"],
      link: "https://github.com/sofasurvivor/Telegramdrive"
    },
    {
      title: "YUGA LAUNCHPAD",
      category: "WEB APPLICATION ARCHITECTURE",
      description: "A high-frequency web launchpad architecture built to handle volatile surges. Optimized for low-latency state synchronization and web3 compatibility layers.",
      technologies: ["TypeScript", "Next.js", "Zustand", "TailwindCSS"],
      link: "https://github.com/sofasurvivor/yuga-launchpad"
    },
    {
      title: "FREQTRADE STRATEGIES",
      category: "ALGORITHMIC TRADING INFRASTRUCTURE",
      description: "A repository of quantitative crypto trading strategies, custom technical indicators, and hyperparameter optimization configurations for the Freqtrade backtesting bot.",
      technologies: ["Python", "Freqtrade", "Pandas", "NumPy", "Scikit-Learn"],
      link: "https://github.com/sofasurvivor/Freqtradestrategies"
    }
  ];

  return (
    <section id="projects" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 04 // REPOSITORIES"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">SELECTED SYSTEM DEPLOYMENTS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group card-border p-8 rounded-2xl flex flex-col justify-between relative"
            >
              <div className="absolute top-4 right-6 text-[8px] font-mono text-white/20 select-none">DEPLOYMENT // {index + 1}</div>
              
              <div>
                <span className="text-[9px] font-mono text-[#00F0FF] tracking-wider uppercase block mb-3">{"// "}{project.category}</span>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#00F0FF] transition-colors font-sans tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {project.link.includes("github.com") && (
                      <FaGithub size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    )}
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#00F0FF] transition-colors" />
                  </div>
                </div>
                
                <p className="text-white/60 font-light text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-[9px] font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                    {tech.toUpperCase()}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
