"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const roles = [
  "Full Stack Developer",
  "React.js Engineer",
  "Node.js Backend Dev",
  "UI/UX Enthusiast",
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/rohit23" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rohit-prajapati" },
  { label: "Email", href: "mailto:rohit7333@gmail.com" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

export default function HeroIntro() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 lg:px-20 grid-bg overflow-hidden"
    >
      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 28% 62%, rgba(232,255,71,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 80% 30%, rgba(120,80,255,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Section counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-28 left-6 md:left-14 lg:left-20 font-mono text-[10px] tracking-[0.3em] text-text-sec uppercase"
      >
        001 / Hero
      </motion.div>

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute top-28 right-6 md:right-14 lg:right-20 flex items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: "#e8ff47" }}
        />

        <span className="font-mono text-[10px] tracking-[0.2em] text-text-sec uppercase hidden sm:block">
          Open to Work — 2025
        </span>
        <span className="font-mono text-[9px] tracking-[0.15em] text-text-sec uppercase sm:hidden">
          Open
        </span>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl w-full mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Role ticker */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-4"
        >
          <span
            className="h-px w-8 flex-shrink-0"
            style={{ backgroundColor: "rgba(232,255,71,0.5)" }}
          />

          <div
            className="h-5 overflow-hidden font-mono text-[11px] tracking-[0.3em] uppercase"
            style={{ color: "#e8ff47" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-110%", opacity: 0 }}
                transition={{ duration: 0.42, ease: EASE_OUT }}
                className="block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Display headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold leading-[0.87] tracking-tighter text-text-pri"
            style={{ fontSize: "clamp(4rem, 11vw, 10rem)" }}
          >
            Rohit
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold leading-[0.87] tracking-tighter gradient-text-accent"
            style={{ fontSize: "clamp(4rem, 11vw, 10rem)" }}
          >
            Prajapati.
          </motion.h1>
        </div>

        {/* Subtext + social links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20"
        >
          <p className="max-w-xs text-text-sec text-sm md:text-base leading-relaxed font-light">
            Full Stack Developer building scalable web applications with
            React.js, Node.js, and MongoDB. Based in Jhalawar, Rajasthan.
          </p>

          <div className="flex items-center gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="font-mono text-[10px] tracking-[0.22em] text-text-sec hover:text-text-pri transition-colors duration-200 uppercase relative group"
              >
                {s.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "#e8ff47" }}
                />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-text-sec">
          Scroll
        </span>
        <div
          className="relative w-px h-14 overflow-hidden rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{ backgroundColor: "#e8ff47" }}
            animate={{
              height: ["0%", "100%", "0%"],
              top: ["0%", "0%", "100%"],
            }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.3,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
