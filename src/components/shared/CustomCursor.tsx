"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);

    // Scan for clickable items
    const clickables = document.querySelectorAll(
      "a, button, input, select, textarea, [role='button'], .clickable"
    );
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Rotating Crosshair Reticle */}
      <motion.div
        className="cursor-reticle fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00F0FF]/30 pointer-events-none z-50 hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 90 : 0,
          borderColor: isHovering ? "rgba(139, 92, 246, 0.5)" : "rgba(0, 240, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.1 }}
      >
        {/* Reticle Tick marks */}
        <span className="absolute top-1/2 left-0 w-1 h-[1px] bg-[#00F0FF]" />
        <span className="absolute top-1/2 right-0 w-1 h-[1px] bg-[#00F0FF]" />
        <span className="absolute top-0 left-1/2 w-[1px] h-1 bg-[#00F0FF]" />
        <span className="absolute bottom-0 left-1/2 w-[1px] h-1 bg-[#00F0FF]" />
      </motion.div>

      {/* Inner Glowing Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] rounded-full pointer-events-none z-50 hidden md:block shadow-[0_0_8px_#00F0FF]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0.5 : 1,
          opacity: isHovering ? 0.3 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.1 }}
      />
    </>
  );
}
