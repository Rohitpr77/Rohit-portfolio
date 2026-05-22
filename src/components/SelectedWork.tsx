"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const projects = [
  {
    num: "01",
    title: "SD Fitness — Gym Website",
    category: "Web Application",
    description:
      "Built a fully-featured gym business website with membership management, training schedules, and workout modules. Designed REST APIs and connected MongoDB for scalable data handling.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    accent: "#34d399",
    link: "https://github.com/Rohitpr77/SD-Fitness",
    liveLink: "https://sd-fitness-aewo.onrender.com",
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #0d2818 50%, #0a2a1a 100%)",
  },
  {
    num: "02",
    title: "Comprehensive Video Converter",
    category: "Full Stack Application",
    description:
      "Architected a full-stack video converter managing complex media processing workflows. Designed a robust Node.js backend and integrated responsive React components for a seamless user experience.",
    tags: ["React.js", "Node.js", "FFmpeg", "MongoDB", "REST API"],
    accent: "#e8ff47",
    link: "https://github.com/rohit23",
    liveLink: "",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    num: "03",
    title: "AI RAG Chatbot",
    category: "AI / LLM Engineering",
    description:
      "Designed an intelligent AI chatbot leveraging LLMs and Retrieval-Augmented Generation (RAG) architecture to deliver accurate, context-aware responses with an optimized vector data retrieval pipeline.",
    tags: ["Python", "LangChain", "Vector DB", "React.js", "REST API"],
    accent: "#60a5fa",
    link: "https://github.com/Rohitpr77/ChatApp",
    liveLink: "https://chatapp-1-etca.onrender.com",
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #1a0a2e 100%)",
  },
  {
    num: "04",
    title: "Instagram Clone",
    category: "Full Stack Application",
    description:
      "A full-featured social media platform modeled after Instagram. Includes real-time messaging, post creation, image uploads, liking, commenting, and user authentication.",
    tags: ["React.js", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    accent: "#ec4899",
    link: "https://github.com/Rohitpr77/instaGRAM-clone",
    liveLink: "https://instagram-clone-1-5708.onrender.com",
    gradient: "linear-gradient(135deg, #2a0a18 0%, #1a0510 50%, #300d20 100%)",
  },
  {
    num: "05",
    title: "Hire-In — Job Portal",
    category: "Web Application",
    description:
      "A comprehensive job board platform connecting employers and job seekers. Features advanced search filters, resume parsing, user dashboards, and application tracking.",
    tags: ["Next.js", "Javascript", "MongoDB", "Tailwind CSS"],
    accent: "#a855f7",
    link: "https://github.com/Rohitpr77/Hire-In",
    liveLink: "",
    gradient: "linear-gradient(135deg, #180a2a 0%, #10051a 50%, #200d30 100%)",
  },
];

// Decorative browser chrome for the card visual
function ProjectVisual({ project, isHovered }) {
  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      style={{ background: project.gradient }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-3 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: "#ff5f57" }}
        />
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: "#ffbd2e" }}
        />
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: "#28ca41" }}
        />
        <div
          className="ml-3 flex-1 h-5 rounded-md px-3 flex items-center"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="text-[9px] font-mono text-text-sec opacity-70 tracking-wide">
            {project.link || "https://portfolio.dev"}
          </span>
        </div>
        <span className="text-[9px] font-mono text-text-sec opacity-50">
          &#8617;
        </span>
      </div>

      {/* Content area */}
      <div className="p-5 flex flex-col gap-3">
        {/* Mock heading */}
        <div
          className="h-3 rounded-full w-2/3"
          style={{ backgroundColor: `${project.accent}50` }}
        />

        <div
          className="h-2 rounded-full w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />

        <div
          className="h-2 rounded-full w-5/6"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        />

        <div
          className="h-2 rounded-full w-4/6"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        />

        {/* Mock card row */}
        <div className="flex gap-3 mt-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-lg p-3"
              style={{
                backgroundColor: `${project.accent}10`,
                border: `1px solid ${project.accent}20`,
              }}
              animate={isHovered ? { y: [0, -3, 0] } : { y: 0 }}
              transition={{
                duration: 1.5,
                delay: i * 0.15,
                repeat: isHovered ? Infinity : 0,
              }}
            >
              <div
                className="w-5 h-5 rounded-md mb-2"
                style={{ backgroundColor: `${project.accent}30` }}
              />

              <div
                className="h-1.5 rounded-full w-full mb-1"
                style={{ backgroundColor: `${project.accent}25` }}
              />

              <div
                className="h-1.5 rounded-full w-3/4"
                style={{ backgroundColor: `${project.accent}18` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.12, ease: EASE_OUT }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#111111",
        border: "1px solid #1e1e1e",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Project visual */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <ProjectVisual project={project} isHovered={isHovered} />

        {/* Gradient overlay bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #111111, transparent)",
          }}
        />

        {/* Number badge */}
        <div
          className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.2em] px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          {project.num}
        </div>

        {/* Links */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 rounded-full flex items-center justify-center text-xs font-bold tracking-wide"
              style={{
                backgroundColor: project.accent,
                color: "#0a0a0a",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              aria-label={`View live ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </motion.a>
          )}
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: project.accent,
                color: "#0a0a0a",
              }}
              whileHover={{ scale: 1.15, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label={`View ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="13"
                height="13"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
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
      </div>

      {/* Card footer */}
      <div className="p-6 flex flex-col gap-4 flex-grow">
        {/* Category */}
        <span
          className="font-mono text-[10px] tracking-[0.28em] uppercase"
          style={{ color: project.accent }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3 className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-text-pri group-hover:text-white transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-sec font-light leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
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

      {/* Top accent on hover */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 w-full origin-left"
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        style={{ backgroundColor: project.accent }}
      />
    </motion.div>
  );
}

export default function SelectedWork() {
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
          className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "#e8ff47" }}
        >
          003 / Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.08, ease: EASE_OUT }}
          className="font-display font-extrabold leading-[0.9] tracking-tighter mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
        >
          Selected <span className="gradient-text-accent">Work</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
          className="flex justify-center mt-14"
        >
          <a
            href="https://github.com/Rohitpr77"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
            style={{
              border: "1px solid rgba(232,255,71,0.3)",
              color: "#e8ff47",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e8ff47";
              e.currentTarget.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#e8ff47";
            }}
          >
            View all on GitHub
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
