"use client";

import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      company: "GHARDILADO.COM",
      role: "LEAD FULL-STACK DEVELOPER",
      period: "JUN 2024 - PRESENT",
      description: "Served as Lead Full-Stack Developer for India's smartest rental platform. Engineered core PropTech solutions, built automated n8n pipelines, integrated Supabase, and optimized the listing and KYC verification workflows."
    },
    {
      company: "NWN GUJARAT",
      role: "FIELD RESEARCHER",
      period: "JAN 2024 - MAY 2024",
      description: "Conducted field surveys and compiled geographic data for project planning. Produced detailed reports using statistical tools and analysis software to provide actionable insights for data management."
    },
    {
      company: "JAWAHAR NAVODAYA VIDYALAYA TONK",
      role: "TEACHER",
      period: "NOV 2022 - APR 2023",
      description: "Applied National Education Policy (NEP) strategies for modern and inclusive education. Designed curriculum lesson plans and directed school-level academic and examination planning."
    },
    {
      company: "JAWAHAR NAVODAYA VIDYALAYA (JNV) CHHAN",
      role: "SCIENCE TEACHER",
      period: "NOV 2022 - FEB 2023",
      description: "Instructed 6th-9th grade math and science courses. Managed classroom invigilation and assemblies, evaluated assignments, and maintained the library and teacher logs."
    },
    {
      company: "KHAWAJA MODEL SCHOOL, AJMER",
      role: "PUPIL TEACHER",
      period: "MAR 2022 - APR 2022",
      description: "Created and implemented academic lesson plans, guiding pupil group studies and leading learning-focused activities during teacher training placement."
    }
  ];

  return (
    <section id="experience" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 05 // TIMELINE"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">EXPERIENCE ARCHIVE</h2>
        </motion.div>

        {/* Timeline representation */}
        <div className="relative border-l border-white/5 pl-8 ml-4 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline LED connector node */}
              <span className="absolute -left-[38px] top-1.5 w-4.5 h-4.5 rounded-full bg-black border border-white/10 flex items-center justify-center group-hover:border-[#00F0FF]/50 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00F0FF] group-hover:shadow-[0_0_8px_#00F0FF] transition-all" />
              </span>

              <div className="card-border p-8 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="absolute top-2 right-4 text-[7px] font-mono text-white/10 select-none">RECORD // EXT_{index + 1}</div>
                
                {/* Time block */}
                <div className="md:w-1/4">
                  <span className="text-[10px] font-mono text-[#00F0FF] tracking-widest uppercase bg-[#00F0FF]/5 px-2.5 py-1 rounded border border-[#00F0FF]/15">
                    {exp.period}
                  </span>
                </div>

                {/* Content block */}
                <div className="md:w-3/4">
                  <h3 className="text-base font-semibold text-white mb-1 tracking-tight font-sans uppercase">
                    {exp.role}
                  </h3>
                  <h4 className="text-xs font-mono text-white/40 tracking-wider mb-4">
                    {exp.company}
                  </h4>
                  <p className="text-white/60 font-light text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
