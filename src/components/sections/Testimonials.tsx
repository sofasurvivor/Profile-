"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Rahul's capacity to translate complex, messy business workflows into elegant, automated agent scripts is unmatched. He saved our operations department hundreds of overhead hours.",
      name: "SARAH JENKINS",
      role: "OPERATIONS DIRECTOR",
    },
    {
      quote: "The software infrastructure Rahul built handles our high-frequency surges without breaking a sweat. A rare talent who understands database optimizations and business goals equally.",
      name: "MICHAEL CHEN",
      role: "FOUNDER & CEO",
    }
  ];

  return (
    <section id="testimonials" className="py-32 relative px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-[#00F0FF] tracking-[0.2em] uppercase">{"// 07 // AUDIT RECORDS"}</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2 uppercase tracking-tight">CLIENT DEBRIEFS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-border p-8 rounded-2xl flex flex-col justify-between relative"
            >
              <div className="absolute top-2 right-4 text-[7px] font-mono text-white/10 select-none">LOG // TST_{index + 1}</div>
              
              <div className="mb-6">
                <span className="text-3xl text-[#00F0FF]/30 font-serif leading-none block mb-2">&ldquo;</span>
                <p className="text-white/70 font-light text-sm italic leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              
              <div className="border-t border-white/5 pt-4 mt-auto">
                <p className="text-[10px] font-mono font-bold text-[#00F0FF] tracking-wider">{testimonial.name}</p>
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
