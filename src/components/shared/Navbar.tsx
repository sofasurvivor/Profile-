"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = ["about", "skills", "services", "experience", "projects", "contact"];
      let current = "hero";
      
      // If we are at the top of the page, force hero
      if (window.scrollY < 100) {
        current = "hero";
      } else {
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the section is past the middle of the screen
            if (rect.top < window.innerHeight * 0.35) {
              current = section;
            }
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "SERVICES", href: "#services", id: "services" },
    { name: "EXPERIENCE", href: "#experience", id: "experience" },
    { name: "PROJECTS", href: "#projects", id: "projects" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setActiveSection(id);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "/");
    setActiveSection("hero");
  };

  return (
    <motion.header
      className={`fixed top-4 w-full z-40 transition-all duration-300 px-4`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className={`flex items-center justify-between h-14 rounded-full border transition-all duration-300 px-6 ${
          isScrolled 
            ? "bg-black/45 backdrop-blur-md border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)]" 
            : "bg-black/20 backdrop-blur-sm border-white/5"
        }`}>
          <Link 
            href="/" 
            onClick={handleLogoClick}
            className="text-xs font-mono font-bold tracking-[0.2em] text-[#00F0FF] hover:opacity-80 transition-opacity"
          >
            R_MINA // CORE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`relative text-[10px] font-mono font-medium tracking-widest transition-colors py-1.5 px-1 ${
                    isActive ? "text-[#00F0FF]" : "text-white/40 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] shadow-[0_0_8px_#00F0FF]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl md:hidden overflow-hidden mt-2 p-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[10px] font-mono tracking-widest ${
                      isActive ? "text-[#00F0FF]" : "text-white/60 hover:text-white"
                    }`}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleNavClick(e, link.href, link.id);
                    }}
                  >
                    {"// "}{link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
