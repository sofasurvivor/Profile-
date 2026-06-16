"use client";

import { motion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="py-24 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="card-border p-10 md:p-16 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden"
        >
          <div className="absolute top-2 right-4 text-[7px] font-mono text-white/10 select-none">TRANSMIT // BINARY_PORT</div>
          
          <div className="mb-6 md:mb-0">
            <span className="text-[9px] font-mono text-[#00F0FF] tracking-wider block mb-2">{"// DETAILED TELEMETRY SHEET"}</span>
            <h2 className="text-2xl font-semibold mb-3 text-white uppercase tracking-tight font-sans">
              CURRICULUM VITAE
            </h2>
            <p className="text-white/60 font-light text-sm max-w-sm">
              Download the complete system ledger covering technical expertise, historical project logs, and educational nodes.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center px-6 py-3.5 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-lg hover:bg-[#00F0FF] transition-all duration-300 w-full sm:w-auto"
            >
              <Download size={12} className="mr-2" />
              DOWNLOAD_PDF
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3.5 bg-transparent text-white/60 border border-white/10 font-semibold text-xs tracking-widest uppercase rounded-lg hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            >
              PREVIEW <ArrowUpRight size={12} className="ml-1.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
