"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const skills = [
  { name: "React.js / Next.js", pct: 90 },
  { name: "JavaScript", pct: 92 },
  { name: "Node.js / Express.js", pct: 84 },
  { name: "MongoDB", pct: 80 },
  { name: "Tailwind CSS", pct: 88 },
  { name: "Python", pct: 70 },
];

const tools = [
  "Git / GitHub",
  "REST APIs",
  "JWT",
  "Postman",
  "Vercel",
  "Netlify",
  "Redux",
  "Socket.io",
  "Agile",
  "HTML5",
  "CSS3",
];

const approaches = [
  {
    icon: "⚡",
    title: "Performance-first",
    desc: "Reduced page load times by 25% and backend response efficiency by 20% through strategic code splitting and query optimization.",
  },
  {
    icon: "🔗",
    title: "Full-Stack mindset",
    desc: "Comfortable from React UIs to Node.js REST APIs to MongoDB schemas — I own the full development lifecycle.",
  },
  {
    icon: "🔄",
    title: "Agile & collaborative",
    desc: "Experienced in Agile sprint cycles, cross-team communication, and rapidly deploying production-ready features.",
  },
];

function SkillBar({ name, pct, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm text-text-pri font-medium">{name}</span>
        <span className="font-mono text-[11px] text-text-sec tracking-[0.1em]">
          {pct}%
        </span>
      </div>
      <div
        className="h-px relative overflow-hidden rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ backgroundColor: "#e8ff47" }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${pct}%` } : { width: "0%" }}
          transition={{
            duration: 1.3,
            delay: index * 0.1 + 0.2,
            ease: EASE_OUT,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: EASE_OUT },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
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
        <motion.p
          variants={itemVariants}
          className="font-mono text-[11px] tracking-[0.3em] uppercase mb-14"
          style={{ color: "#e8ff47" }}
        >
          003 / Skills
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="font-display font-extrabold leading-[0.9] tracking-tighter mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Built to <span className="gradient-text-accent">perform.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: skill bars */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                pct={skill.pct}
                index={i}
              />
            ))}
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-10">
            {/* Toolkit pills */}
            <motion.div variants={itemVariants}>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-sec mb-5">
                Toolkit
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="glass px-4 py-2 rounded-full text-sm text-text-sec hover:text-text-pri transition-colors duration-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Approach cards */}
            <div className="flex flex-col gap-4">
              {approaches.map((a) => (
                <motion.div
                  key={a.title}
                  variants={itemVariants}
                  className="glass rounded-2xl p-5 flex gap-4 items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <span className="text-2xl mt-0.5 flex-shrink-0">
                    {a.icon}
                  </span>
                  <div>
                    <p className="font-display font-bold text-text-pri mb-1 text-base">
                      {a.title}
                    </p>
                    <p className="text-sm text-text-sec font-light leading-relaxed">
                      {a.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
