"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const links = [
    { name: "GITHUB", url: "https://github.com/sofasurvivor", icon: FaGithub, label: "@sofasurvivor" },
    { name: "LINKEDIN", url: "https://www.linkedin.com/in/rahul-m-380344210", icon: FaLinkedin, label: "@rahul-m" },
    { name: "EMAIL", url: "mailto:rahulmina72@gmail.com", icon: Mail, label: "rahulmina72@gmail.com" },
  ];

  return (
    <section id="contact" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 06 // TERMINATION NODE"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">ESTABLISH CONNECTION</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-border p-10 md:p-16 rounded-3xl text-center max-w-2xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-4 left-6 text-[8px] font-mono text-white/20 select-none">GATEWAY // ENVELOPE_ONLINE</div>
          <div className="absolute top-4 right-6 text-[8px] font-mono text-[#00F0FF]/40 led-indicator font-semibold">▲ READY</div>

          <h3 className="text-2xl font-semibold text-white mb-6 uppercase tracking-tight font-sans">
            Let&apos;s build the future.
          </h3>
          <p className="text-white/60 font-light text-sm leading-relaxed mb-10 max-w-md mx-auto">
            I am currently open to consulting contracts, process automation projects, and collaborative software architecture designs.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href="mailto:rahulmina72@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-lg hover:bg-[#00F0FF] transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_20px_rgba(0,240,255,0.3)] w-full sm:w-auto"
            >
              <Mail size={14} className="mr-2" />
              SEND EMAIL DIRECTLY
            </a>

            {/* Social Link matrix */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-8 border-t border-white/5 w-full">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.name === "EMAIL" ? undefined : "_blank"}
                    rel={link.name === "EMAIL" ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center justify-center gap-2 text-[10px] font-mono text-white/40 hover:text-[#00F0FF] transition-colors px-4 h-[44px] border border-white/5 hover:border-[#00F0FF]/30"
                  >
                    <Icon size={12} />
                    <span>{link.name}: {link.label.toUpperCase()}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
