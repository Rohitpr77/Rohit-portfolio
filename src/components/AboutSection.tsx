"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "5+", label: "Projects Shipped" },
  { value: "2", label: "Companies" },
  { value: "∞", label: "Cups of Coffee" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Subtle parallax on the image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left: Image column ────────────────────────────── */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="relative order-2 lg:order-1"
          >
            {/* Outer frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 scale-[1.1]"
              >
                {/* Vintage desk image replacement — richly styled placeholder */}
                <div
                  className="w-full h-full flex items-end"
                  style={{
                    background:
                      "linear-gradient(160deg, #1a1208 0%, #0d0d0a 40%, #121008 100%)",
                  }}
                >
                  {/* Keyboard / equipment silhouettes for vintage feel */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg
                      viewBox="0 0 400 300"
                      width="100%"
                      height="100%"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Monitor outline */}
                      <rect
                        x="80"
                        y="30"
                        width="240"
                        height="160"
                        rx="8"
                        stroke="#888"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="95"
                        y="45"
                        width="210"
                        height="130"
                        rx="4"
                        fill="#1a1a1a"
                      />
                      <line
                        x1="185"
                        y1="190"
                        x2="215"
                        y2="190"
                        stroke="#888"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="155"
                        y="190"
                        width="90"
                        height="10"
                        rx="4"
                        stroke="#888"
                        strokeWidth="1.5"
                      />
                      {/* Keyboard outline */}
                      <rect
                        x="60"
                        y="220"
                        width="280"
                        height="60"
                        rx="6"
                        stroke="#777"
                        strokeWidth="1.5"
                      />
                      {[...Array(10)].map((_, i) => (
                        <rect
                          key={i}
                          x={75 + i * 25}
                          y="228"
                          width="18"
                          height="12"
                          rx="3"
                          fill="#222"
                          stroke="#555"
                          strokeWidth="0.8"
                        />
                      ))}
                      {[...Array(10)].map((_, i) => (
                        <rect
                          key={i}
                          x={75 + i * 25}
                          y="245"
                          width="18"
                          height="12"
                          rx="3"
                          fill="#222"
                          stroke="#555"
                          strokeWidth="0.8"
                        />
                      ))}
                      {[...Array(10)].map((_, i) => (
                        <rect
                          key={i}
                          x={75 + i * 25}
                          y="262"
                          width="18"
                          height="12"
                          rx="3"
                          fill="#222"
                          stroke="#555"
                          strokeWidth="0.8"
                        />
                      ))}
                      {/* Joystick */}
                      <circle
                        cx="340"
                        cy="200"
                        r="20"
                        stroke="#666"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="340"
                        y1="180"
                        x2="340"
                        y2="160"
                        stroke="#666"
                        strokeWidth="2"
                      />
                      <circle
                        cx="340"
                        cy="158"
                        r="6"
                        fill="#333"
                        stroke="#666"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>

                  {/* Code lines for ambiance */}
                  <div
                    className="absolute inset-0 p-8 font-mono text-[10px] leading-5 overflow-hidden select-none pointer-events-none"
                    style={{ color: "rgba(232,255,71,0.08)" }}
                  >
                    {`const dev = new Developer({
  name: "Rohit Prajapati",
  stack: ["React", "Node", "MongoDB"],
  passion: Infinity,
  location: "Rajasthan, India",
});

async function build(idea: Idea) {
  const design = await sketch(idea);
  const code = await implement(design);
  const app = await ship(code);
  return app.impact;
}`}
                  </div>
                </div>
              </motion.div>

              {/* Inner vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at center, transparent 40%, rgba(10,10,10,0.7) 100%)",
                }}
              />
            </div>

            {/* Floating badge — "DESIGN" rotated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "#111111",
                border: "1px solid #2a2a2a",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              }}
            >
              <span
                className="font-mono text-[8px] tracking-[0.3em] uppercase"
                style={{
                  color: "#e8ff47",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                DESIGN
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Text column ───────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2"
              style={{ color: "#e8ff47" }}
            >
              005 / About
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-display font-extrabold leading-[0.9] tracking-tighter mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              About <span className="gradient-text-accent">Me</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-sec leading-relaxed mb-5 font-light"
            >
              I am a{" "}
              <span style={{ color: "#f0f0f0" }}>Full Stack Developer</span> and{" "}
              <span style={{ color: "#e8ff47" }}>Creative Engineer</span> with
              2+ years of experience building scalable web applications for
              enterprise and consumer use cases. I bridge the gap between
              aesthetic design and robust engineering.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-sec leading-relaxed mb-5 font-light"
            >
              Strong expertise in{" "}
              <span style={{ color: "#f0f0f0" }}>
                React, Node.js, and MongoDB
              </span>
              , with hands-on experience designing REST APIs, integrating
              backend services, and improving application performance and
              reliability.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-sec leading-relaxed mb-10 font-light"
            >
              Currently a final-year B.Tech student at Government Engineering
              College, Jhalawar, with contributions to high-traffic platforms at{" "}
              <span style={{ color: "#f0f0f0" }}>Nitro Digital</span> and{" "}
              <span style={{ color: "#f0f0f0" }}>Hiring Pro</span>. Open to new
              opportunities and exciting collaborations.
            </motion.p>

            {/* CTA */}
            <motion.a
              variants={itemVariants}
              href="#contact"
              className="inline-flex items-center gap-3 font-medium text-sm tracking-wide mb-14"
              style={{ color: "#e8ff47" }}
            >
              Get in touch
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.a>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="pt-7 pr-6 flex flex-col gap-1"
                  style={{
                    borderRight:
                      i < stats.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                >
                  <span
                    className="font-display font-extrabold tracking-tighter leading-none"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                      color: "#e8ff47",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-text-sec">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
