"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const awards = [
  {
    id: "award-1",
    icon: "🏆",
    title: "",
    issuer: "",
    date: "",
    accent: "#e8ff47",
  },
  {
    id: "award-2",
    icon: "🏅",
    title: "",
    issuer: "",
    date: "",
    accent: "#60a5fa",
  },
  {
    id: "award-3",
    icon: "🎖️",
    title: "",
    issuer: "",
    date: "",
    accent: "#e879f9",
  },
];

type Award = (typeof awards)[number];

function getAwardKey(award: Award, index: number) {
  return `${award.id || "award"}-${index}`;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

function AwardCard({ award, index }: { award: Award; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const hasContent = Boolean(award.title || award.issuer || award.date);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: EASE_OUT }}
      className="group relative rounded-2xl p-7 flex flex-col gap-5 overflow-hidden"
      style={{
        backgroundColor: "#111111",
        border: "1px solid #1e1e1e",
      }}
      whileHover={{ y: -5 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 1px 0 ${award.accent}20, 0 0 80px ${award.accent}06`,
        }}
      />

      {/* Top border on hover */}
      <motion.div
        className="absolute top-0 left-0 h-px w-full origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        style={{ backgroundColor: award.accent }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{
          backgroundColor: `${award.accent}12`,
          border: `1px solid ${award.accent}28`,
        }}
      >
        {award.icon}
      </div>

      {hasContent && (
        <div className="flex flex-col gap-2 flex-grow">
          {award.title && (
            <h3 className="font-display font-bold text-base md:text-lg tracking-tight text-text-pri group-hover:text-white transition-colors duration-200 leading-snug">
              {award.title}
            </h3>
          )}
          {award.issuer && (
            <p
              className="text-xs font-mono tracking-[0.12em] uppercase"
              style={{ color: award.accent }}
            >
              {award.issuer}
            </p>
          )}
          {award.date && (
            <p className="text-xs text-text-sec font-light">{award.date}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Awards() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      {/* Section divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Left: title block */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2"
              style={{ color: "#e8ff47" }}
            >
              004 / Recognition
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-display font-extrabold leading-[0.9] tracking-tighter mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Awards &amp; <br />
              <span className="gradient-text-accent">Recognition</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm text-text-sec font-light leading-relaxed max-w-xs"
            >
              Honors received for creating digital experiences and going beyond
              what&apos;s expected.
            </motion.p>
          </motion.div>

          {/* Right: award cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {awards.map((award, i) => (
              <AwardCard key={getAwardKey(award, i)} award={award} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
