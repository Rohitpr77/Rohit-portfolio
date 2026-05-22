"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const services = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Frontend Architecture",
    desc: "Designing scalable, maintainable, and high-performance frontend systems for enterprise applications using React, Next.js, and TypeScript.",
    accent: "#e8ff47",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
    title: "Full-Stack Development",
    desc: "Building seamless end-to-end applications with robust Node.js backend services and modern interactive user interfaces.",
    accent: "#60a5fa",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Performance Optimization",
    desc: "Identifying bottlenecks and implementing strategies across the stack to ensure lightning-fast load times and smooth interactions.",
    accent: "#f59e0b",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    title: "UI/UX Engineering",
    desc: "Translating complex design systems into pixel-perfect, accessible, and responsive digital experiences that users love.",
    accent: "#e879f9",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
    title: "Database Design",
    desc: "Architecting efficient MongoDB and relational database schemas, crafting optimized queries for maximum throughput.",
    accent: "#34d399",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
    title: "API Development",
    desc: "Designing RESTful and event-driven APIs with JWT authentication, rate limiting, and comprehensive documentation.",
    accent: "#fb7185",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.07, ease: EASE_OUT }}
      className="group relative rounded-2xl p-7 flex flex-col gap-5 overflow-hidden"
      style={{
        backgroundColor: "#111111",
        border: "1px solid #1e1e1e",
        cursor: "default",
      }}
      whileHover={{ y: -5 }}
    >
      {/* Animated top border on hover */}
      <motion.div
        className="absolute top-0 left-0 h-px w-full origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        style={{ backgroundColor: service.accent }}
      />

      {/* Subtle corner glow */}
      <div
        className="absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${service.accent}12, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${service.accent}15`,
          color: service.accent,
          border: `1px solid ${service.accent}28`,
        }}
      >
        {service.icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display font-bold text-lg text-text-pri mb-2 tracking-tight group-hover:text-white transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-sm text-text-sec font-light leading-relaxed">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatIDo() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      {/* Section divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "#e8ff47" }}
        >
          CORE CAPABILITIES
        </motion.p>

        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className="flex items-baseline gap-4 mb-16"
        >
          <h2
            className="font-display font-extrabold leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            What I <span className="gradient-text-accent">Do</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
