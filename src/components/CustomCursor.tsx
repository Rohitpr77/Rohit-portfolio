"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Spring physics for the ring — slightly laggy for fluid feel
  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  // Direct DOM mutation for the dot — zero latency
  const handleMouseMove = useCallback(
    (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }

      ringX.set(x);
      ringY.set(y);

      if (!isVisible) setIsVisible(true);
    },
    [ringX, ringY, isVisible],
  );

  const handleMouseOver = useCallback((e) => {
    const target = e.target;
    const interactive = target.closest("a, button, [data-cursor]");
    if (interactive) {
      setIsHovering(true);
      const text = interactive.dataset.cursorText ?? "";
      setCursorText(text);
    } else {
      setIsHovering(false);
      setCursorText("");
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  return (
    <>
      {/* Dot — instant follow, mix-blend-mode: difference */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
        }}
      />

      {/* Ring — spring-animated, shows cursor text on data-cursor-text hover */}
      <motion.div
        className="cursor-ring"
        style={{
          left: ringX,
          top: ringY,
          width: isHovering ? "56px" : "36px",
          height: isHovering ? "56px" : "36px",
          borderColor: isHovering
            ? "rgba(232, 255, 71, 0.85)"
            : "rgba(232, 255, 71, 0.45)",
          opacity: isVisible ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
        }}
      >
        {cursorText && (
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e8ff47",
              fontFamily: "monospace",
              fontWeight: 700,
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
