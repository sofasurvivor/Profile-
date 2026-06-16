"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      title: "TECHNOLOGY",
      skills: [
        { name: "Web Development", level: 95 },
        { name: "Software Architecture", level: 90 },
        { name: "AI Integration", level: 85 },
        { name: "Process Automation", level: 95 },
      ]
    },
    {
      title: "BUSINESS & OPERATIONS",
      skills: [
        { name: "Client Management", level: 90 },
        { name: "Stakeholder Relations", level: 85 },
        { name: "Strategic Communication", level: 90 },
        { name: "Team Leadership", level: 80 },
      ]
    },
    {
      title: "FINANCE & RESEARCH",
      skills: [
        { name: "Technical Analysis", level: 85 },
        { name: "Portfolio Management", level: 75 },
        { name: "Data Analysis", level: 90 },
        { name: "Market Research", level: 85 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 02 // CAPABILITIES"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">EXPERTISE MATRIX</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="card-border p-6 rounded-2xl flex flex-col justify-between"
            >
              <div className="absolute top-2 right-4 text-[7px] font-mono text-white/10 select-none">MX_MATRIX // CH_{catIdx}</div>
              <div>
                <h3 className="text-xs font-mono font-semibold tracking-wider text-white/80 mb-8 pb-3 border-b border-white/5">
                  {"// "}{category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-[11px] font-mono text-white/60 mb-2">
                        <span>{skill.name.toUpperCase()}</span>
                        <span className="text-[#00F0FF]">{skill.level}%</span>
                      </div>
                      {/* Glow meter track */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] rounded-full shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
