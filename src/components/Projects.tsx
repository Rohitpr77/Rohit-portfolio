"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const projects = [
  {
    num: "01",
    title: "Comprehensive Video Converter",
    category: "Full Stack Application",
    description:
      "Architected and developed a full-stack video converter application managing complex media processing workflows. Designed a robust Node.js backend and integrated responsive React frontend components for a seamless, intuitive user experience.",
    tags: ["React.js", "Node.js", "FFmpeg", "MongoDB", "REST API"],
    accent: "#e8ff47",
    featured: true,
    link: "https://github.com/rohit23",
  },
  {
    num: "02",
    title: "AI RAG Chatbot",
    category: "AI / LLM Engineering",
    description:
      "Designed an intelligent AI chatbot leveraging LLMs and Retrieval-Augmented Generation (RAG) architecture to deliver accurate, context-aware responses. Organized vector databases and optimized the data retrieval pipeline to improve answer accuracy.",
    tags: ["Python", "LangChain", "Vector DB", "React.js", "REST API"],
    accent: "#60a5fa",
    link: "https://github.com/rohit23",
  },
  {
    num: "03",
    title: "SD Fitness — Gym Website",
    category: "Web Application",
    description:
      "Built a fully-featured gym business website with membership management, training schedules, and workout modules. Designed REST/APIs and connected MongoDB for efficient, scalable data handling and a fully responsive UI.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    accent: "#34d399",
    link: "https://github.com/rohit23",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`group relative ${project.featured ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: EASE_OUT }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl h-full flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        style={{ backgroundColor: "#111111", border: "1px solid #1e1e1e" }}
      >
        {/* Top accent border */}
        <motion.div
          className="absolute top-0 left-0 h-0.5 w-full origin-left z-10"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          style={{ backgroundColor: project.accent }}
        />

        {/* Ghost number */}
        <div
          className="absolute top-3 right-5 font-display font-extrabold leading-none pointer-events-none select-none"
          style={{
            fontSize: "clamp(4rem, 8vw, 8rem)",
            color: "rgba(255,255,255,0.025)",
            lineHeight: 1,
          }}
        >
          {project.num}
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 1px 0 ${project.accent}20, 0 0 80px ${project.accent}08`,
          }}
        />

        {/* Card content */}
        <div
          className={`p-7 md:p-9 ${
            project.featured ? "md:p-10 lg:p-12" : ""
          } flex flex-col h-full relative z-[1] flex-grow`}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-text-sec block mb-2">
                {project.category}
              </span>
              <h3
                className={`font-display font-extrabold tracking-tight leading-none text-text-pri group-hover:text-white transition-colors duration-200 ${
                  project.featured
                    ? "text-3xl md:text-4xl lg:text-5xl"
                    : "text-2xl md:text-3xl"
                }`}
              >
                {project.title}
              </h3>
            </div>

            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  border: `1px solid ${project.accent}45`,
                  color: project.accent,
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View ${project.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15M19.5 4.5H4.5M19.5 4.5v15"
                  />
                </svg>
              </motion.a>
            )}
          </div>

          <p className="text-sm text-text-sec leading-relaxed mb-6 font-light flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-3 py-1.5 rounded-full font-mono tracking-wide"
                style={{
                  backgroundColor: `${project.accent}12`,
                  color: project.accent,
                  border: `1px solid ${project.accent}28`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase mb-14"
          style={{ color: "#e8ff47" }}
        >
          004 / Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.08, ease: EASE_OUT }}
          className="font-display font-extrabold leading-[0.9] tracking-tighter mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Selected <span className="gradient-text-accent">work.</span>
        </motion.h2>

        {/* Grid — first card spans 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
