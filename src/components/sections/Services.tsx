"use client";

import { motion } from "framer-motion";
import { Cpu, Code, Brain, LineChart } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "PROCESS AUTOMATION",
      icon: Cpu,
      num: "01",
      description: "End-to-end workflow automation to eliminate manual friction points and accelerate operation velocity.",
      specs: ["API Integrations", "Database Syncs", "Telegram/Slack Bots", "Cron Jobs"]
    },
    {
      title: "SOFTWARE ARCHITECTURE",
      icon: Code,
      num: "02",
      description: "High-performance full-stack architectures engineered for scale, reliability, and security.",
      specs: ["Next.js Applications", "Tauri Desktop Apps", "Rust & Go Backends", "Relational Schemas"]
    },
    {
      title: "AI & AGENT INTEGRATIONS",
      icon: Brain,
      num: "03",
      description: "Infusing custom LLMs, RAG, and multi-agent frameworks to optimize internal decision making.",
      specs: ["Vector Databases", "Agent Orchestration", "Structured LLM Extraction", "OpenAI/Gemini APIs"]
    },
    {
      title: "STRATEGIC CONSULTING",
      icon: LineChart,
      num: "04",
      description: "Advising on technological feasibility, digital transformation paths, and system design optimizations.",
      specs: ["Feasibility Audits", "Tech Stack Diagnostics", "Automation ROI Maps", "Performance Scaling"]
    }
  ];

  return (
    <section id="services" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 03 // SERVICES"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">OPERATIONAL PACKAGES</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-border p-8 rounded-2xl flex flex-col justify-between group"
              >
                <div className="absolute top-4 right-6 text-xs font-mono text-white/10 font-bold select-none">{service.num}</div>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#00F0FF]/30 transition-colors">
                      <Icon size={18} className="text-[#00F0FF]" />
                    </div>
                    <h3 className="text-sm font-mono font-semibold tracking-wider text-white">
                      {"// "}{service.title}
                    </h3>
                  </div>
                  
                  <p className="text-white/60 font-light text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {service.specs.map((spec) => (
                      <span key={spec} className="text-[9px] font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                        {spec.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
