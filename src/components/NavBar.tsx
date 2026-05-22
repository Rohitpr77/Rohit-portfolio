"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const navLinks = [
  { label: "Services", href: "#what-i-do" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Work", href: "#projects" },
  { label: "Awards", href: "#awards" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

// ── Icons ────────────────────────────────────────────────────────────────────
function IconGitHub() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconResume() {
  return (
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
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

// ── Active-link dot indicator ─────────────────────────────────────────────────
function NavLink({ link, onClick, active }) {
  return (
    <motion.li variants={itemVariants} className="relative">
      <button
        onClick={() => onClick(link.href)}
        className="relative text-[13px] font-medium tracking-wide py-1.5 px-0.5 transition-colors duration-200 group"
        style={{ color: active ? "#f0f0f0" : "rgba(255,255,255,0.45)" }}
      >
        {link.label}

        {/* Underline glide */}
        <span
          className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
          style={{
            backgroundColor: "#e8ff47",
            width: active ? "100%" : "0%",
          }}
        />

        <span
          className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
          style={{ backgroundColor: "#e8ff47" }}
        />
      </button>

      {/* Active dot */}
      {active && (
        <motion.span
          layoutId="nav-active-dot"
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ backgroundColor: "#e8ff47" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.li>
  );
}

// ── Icon button (GitHub / LinkedIn) ─────────────────────────────────────────
function IconBtn({ href, label, children }) {
  return (
    <motion.a
      variants={itemVariants}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{
        color: "rgba(255,255,255,0.45)",
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.03)",
      }}
      whileHover={{
        scale: 1.08,
        borderColor: "rgba(255,255,255,0.2)",
        color: "#f0f0f0",
      }}
      whileTap={{ scale: 0.93 }}
    >
      {children}
    </motion.a>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Scroll-spy: track which section is in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Find the first section that is above the middle of the viewport
      const mid = window.innerHeight / 2;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid) current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* ── Scroll progress bar ─────────────────────────────────── */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progressScaleX, width: "100%" }}
      />

      {/* ── Main nav ───────────────────────────────────────────── */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-[999]"
        style={{
          paddingTop: "14px",
          paddingBottom: "14px",
          paddingLeft: "clamp(1.25rem, 3vw, 3.5rem)",
          paddingRight: "clamp(1.25rem, 3vw, 3.5rem)",
          backgroundColor: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition:
            "background-color 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        <div className="flex items-center justify-between gap-6 max-w-[1400px] mx-auto">
          {/* ── Logo ─────────────────────────────────────────────── */}
          <motion.a
            href="/"
            variants={itemVariants}
            aria-label="Home"
            className="flex-shrink-0 group"
          >
            <span
              className="font-display font-extrabold tracking-tight leading-none transition-colors duration-200"
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
                color: "#f0f0f0",
                letterSpacing: "-0.02em",
              }}
            >
              ROHIT
              <span style={{ color: "#e8ff47" }}>.</span>
            </span>
          </motion.a>

          {/* ── Centre links (desktop) ───────────────────────────── */}
          <motion.ul
            variants={containerVariants}
            className="hidden lg:flex items-center gap-7"
            role="list"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                onClick={handleNavClick}
                active={activeSection === link.href.replace("#", "")}
              />
            ))}
          </motion.ul>

          {/* ── Right: Resume + socials + hamburger ──────────────── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Resume button */}
            <motion.a
              variants={itemVariants}
              href="my rr/rrr.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200"
              style={{
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
              whileHover={{
                backgroundColor: "rgba(232,255,71,0.1)",
                borderColor: "rgba(232,255,71,0.4)",
                color: "#e8ff47",
              }}
              whileTap={{ scale: 0.96 }}
            >
              <IconResume />
              Resume
            </motion.a>

            {/* GitHub */}
            <div className="hidden md:block">
              <IconBtn href="https://github.com/therohitt123" label="GitHub">
                <IconGitHub />
              </IconBtn>
            </div>

            {/* LinkedIn */}
            <div className="hidden md:block">
              <IconBtn
                href="https://www.linkedin.com/in/rohit-prajapati-93ba6522b/"
                label="LinkedIn"
              >
                <IconLinkedIn />
              </IconBtn>
            </div>

            {/* ── Hamburger (mobile) ──────────────────────────────── */}
            <motion.button
              variants={itemVariants}
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative z-[1001] w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-[5px]"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-4 h-px rounded-full"
                style={{ backgroundColor: "#f0f0f0" }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />

              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                className="block w-4 h-px rounded-full"
                style={{ backgroundColor: "#f0f0f0" }}
                transition={{ duration: 0.2 }}
              />

              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="block w-4 h-px rounded-full"
                style={{ backgroundColor: "#f0f0f0" }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay ──────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 32px)" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="fixed inset-0 z-[998] flex flex-col items-center justify-center lg:hidden"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            {/* Accent glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <nav className="flex flex-col items-center gap-6 relative z-10 w-full px-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{
                    delay: i * 0.06 + 0.12,
                    duration: 0.55,
                    ease: EASE_OUT,
                  }}
                  onClick={() => handleNavClick(link.href)}
                  className="group flex items-center gap-3 font-display font-extrabold text-4xl md:text-5xl tracking-tight transition-colors duration-200 w-full justify-center"
                  style={{
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "#f0f0f0"
                        : "rgba(255,255,255,0.25)",
                  }}
                  whileHover={{ x: 8 }}
                >
                  <span
                    className="text-base font-mono font-normal tracking-[0.25em] transition-colors duration-200"
                    style={{ color: "#e8ff47" }}
                  >
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.button>
              ))}

              {/* Socials row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: navLinks.length * 0.06 + 0.2,
                  duration: 0.5,
                }}
                className="flex items-center gap-4 mt-6"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2"
                  style={{ backgroundColor: "#e8ff47", color: "#0a0a0a" }}
                >
                  <IconResume />
                  Resume
                </a>
                <a
                  href="https://github.com/rohit23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <IconGitHub />
                </a>
                <a
                  href="https://linkedin.com/in/rohit-prajapati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <IconLinkedIn />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
