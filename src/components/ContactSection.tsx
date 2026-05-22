"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-36 md:py-52 px-6 overflow-hidden"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Ghost background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-extrabold select-none"
          style={{
            fontSize: "clamp(6rem, 18vw, 20rem)",
            color: "rgba(255,255,255,0.015)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          WORK
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "#e8ff47" }}
        >
          007 / Contact
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.08, ease: EASE_OUT }}
          className="font-display leading-[1] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            Let&apos;s Work{" "}
          </span>
          <span
            style={{
              color: "#f0f0f0",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 4rem)",
            }}
          >
            Together
          </span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE_OUT }}
          className="text-text-sec font-light leading-relaxed max-w-md"
          style={{ fontSize: "15px" }}
        >
          Currently open to full-stack roles in India or remote. Whether you
          have an enterprise project or a creative vision to bring to life,
          I&apos;d love to hear from you.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.28, ease: EASE_OUT }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          {/* Send a message */}
          <motion.a
            href="mailto:rohitpr7733@gmail.com"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] font-semibold tracking-widest uppercase transition-all duration-300"
            style={{
              backgroundColor: "#f0f0f0",
              color: "#0a0a0a",
              border: "1px solid #f0f0f0",
            }}
            whileHover={{
              scale: 1.04,
              backgroundColor: "#e8ff47",
              borderColor: "#e8ff47",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Mail icon */}
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Send a Message
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Download CV */}
          <motion.a
            href="my rr/rrr.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] font-semibold tracking-widest uppercase transition-all duration-300"
            style={{
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            whileHover={{
              scale: 1.04,
              borderColor: "rgba(232,255,71,0.45)",
              color: "#e8ff47",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Document icon */}
            <svg
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Download CV
          </motion.a>
        </motion.div>

        {/* Subtle email address */}
        <motion.a
          href="mailto:rohitpr7733@gmail.com"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.45 }}
          className="font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.2)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e8ff47")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
          }
        >
          rohitpr7733@gmail.com
        </motion.a>
      </div>
    </section>
  );
}
