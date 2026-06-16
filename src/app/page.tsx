"use client";

import { useEffect, useState } from "react";
import SceneWrapper from "@/components/3d/SceneWrapper";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Resume from "@/components/sections/Resume";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [systemTime, setSystemTime] = useState("");
  const [activeSec, setActiveSec] = useState("HERO");

  useEffect(() => {
    // 1. Mouse movement listener for spotlight cards & HUD
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      
      const cards = document.querySelectorAll(".card-border");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    // 2. Scroll listener for HUD
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section
      const sections = ["about", "skills", "services", "experience", "projects", "contact"];
      let current = "HERO";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4) {
            current = section.toUpperCase();
          }
        }
      }
      setActiveSec(current);
    };

    // 3. Digital clock
    const updateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {/* 3D Canvas Background */}
      <SceneWrapper />

      {/* Cyber Overlays */}
      <div className="cyber-grid" />
      <div className="crt-overlay" />

      {/* Telemetry HUD Overlays */}
      <div className="fixed top-20 right-6 z-30 hidden lg:flex flex-col items-end text-[10px] font-mono text-white/40 select-none pointer-events-none space-y-1">
        <div className="flex items-center gap-1.5 text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] led-indicator shadow-[0_0_8px_#00F0FF]" />
          <span>SYS.STATUS: CORE_ACTIVE</span>
        </div>
        <div>{"SECTOR: R_MINA // 29A"}</div>
        <div>TIME: <span className="text-[#00F0FF]">{systemTime}</span></div>
      </div>

      <div className="fixed bottom-6 left-6 z-30 hidden lg:flex flex-col text-[10px] font-mono text-white/40 select-none pointer-events-none space-y-0.5">
        <div>CURSOR COORDINATES</div>
        <div className="text-white/60">X: <span className="text-[#00F0FF]">{coords.x}</span> {"// Y: "}<span className="text-[#00F0FF]">{coords.y}</span></div>
      </div>

      <div className="fixed bottom-6 right-6 z-30 hidden lg:flex flex-col items-end text-[10px] font-mono text-white/40 select-none pointer-events-none space-y-0.5">
        <div>INDEX VALUE: <span className="text-white/60 font-medium">{scrollY}px</span></div>
        <div>FOCUS AREA: <span className="text-[#8B5CF6] font-semibold">{activeSec}</span></div>
      </div>

      {/* Page Content */}
      <main className="flex min-h-screen flex-col overflow-hidden relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <Projects />
        <Achievements />
        <Resume />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

