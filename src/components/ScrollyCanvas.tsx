"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// ─── Config ──────────────────────────────────────────────────────────────────
const FRAME_COUNT = 144; // frame_000 → frame_143

function getFramePath(index) {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-0.041s.png`;
}

const OVERLAY_SECTIONS = [
  {
    scrollRange: [0.0, 0.18],
    subtitle: "scroll to explore",
    headline: "Rohit\nPrajapati",
    align: "center",
  },
  {
    scrollRange: [0.28, 0.48],
    subtitle: "what I do",
    headline: "I build full-stack\nweb applications.",
    align: "left",
    fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
  },
  {
    scrollRange: [0.55, 0.75],
    subtitle: "since 2023",
    headline: "Bridging design\nand engineering.",
    align: "right",
    fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
  },
  {
    scrollRange: [0.82, 1.0],
    subtitle: "selected work",
    headline: "See the work.",
    align: "center",
  },
];

function CanvasOverlayItem({ section, scrollYProgress }) {
  const { scrollRange, subtitle, headline, align, fontSize } = section;
  const [start, end] = scrollRange;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.06, mid, end - 0.06, end],
    [0, 1, 1, 1, 0],
  );

  const y = useTransform(scrollYProgress, [start, end], ["4%", "-4%"]);

  const alignClass =
    align === "left"
      ? "items-start text-left pl-10 md:pl-16"
      : align === "right"
        ? "items-end text-right pr-10 md:pr-16"
        : "items-center text-center";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none z-10 ${alignClass} px-6`}
    >
      <p
        className="font-mono tracking-[0.3em] uppercase mb-4 text-xs md:text-sm"
        style={{ color: "#e8ff47" }}
      >
        {subtitle}
      </p>
      <h2
        className="font-display font-extrabold leading-[0.9] tracking-tighter text-text-pri"
        style={{
          fontSize: fontSize ?? "clamp(2.5rem, 6vw, 6rem)",
          whiteSpace: "pre-line",
          textShadow: "0 2px 40px rgba(0,0,0,0.8)",
        }}
      >
        {headline}
      </h2>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ScrollyCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const frameCounterRef = useRef(null);
  const progressLineRef = useRef(null);
  // track DPR-scaled canvas dims to avoid redundant resize
  const canvasSizeRef = useRef({ w: 0, h: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Canvas draw (object-fit: cover) ────────────────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    // Only resize the canvas backing store when dimensions actually change
    if (
      canvasSizeRef.current.w !== targetW ||
      canvasSizeRef.current.h !== targetH
    ) {
      canvas.width = targetW;
      canvas.height = targetH;
      ctx.scale(dpr, dpr);
      canvasSizeRef.current = { w: targetW, h: targetH };
    }

    ctx.clearRect(0, 0, displayW, displayH);

    // Object-fit: cover — scale to fill, center crop
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.max(displayW / imgW, displayH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const offsetX = (displayW - drawW) / 2;
    const offsetY = (displayH - drawH) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // ── Preload all frames ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    // Pre-allocate array so indices stay correct even during async load
    const images = new Array(FRAME_COUNT);
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFramePath(i);

      const onFirstFrame = () => {
        if (!cancelled && imagesRef.current.length === 0) {
          imagesRef.current = images;
          drawFrame(0);
        }
      };

      img.onload = () => {
        if (cancelled) return;
        if (i === 0) onFirstFrame();
        loadedCount++;
        if (loadedCount >= FRAME_COUNT) {
          // All loaded — assign and redraw current frame cleanly
          imagesRef.current = images;
          drawFrame(currentFrameRef.current);
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
      };

      images[i] = img;
    }

    // Draw frame 0 immediately if it's already cached
    if (images[0]?.complete && images[0].naturalWidth > 0) {
      imagesRef.current = images;
      drawFrame(0);
    }

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  // ── Resize handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      // Reset cached size so drawFrame recalculates DPR dimensions
      canvasSizeRef.current = { w: 0, h: 0 };
      if (imagesRef.current.length > 0) {
        drawFrame(currentFrameRef.current);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // ── Scroll → frame mapping ──────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetFrame = Math.min(
      Math.floor(latest * FRAME_COUNT),
      FRAME_COUNT - 1,
    );

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
    }

    // Update frame counter via direct DOM mutation — no re-render
    if (frameCounterRef.current) {
      frameCounterRef.current.textContent = `${String(targetFrame).padStart(3, "0")} / ${String(FRAME_COUNT - 1).padStart(3, "0")}`;
    }

    // Update progress line via direct DOM mutation
    if (progressLineRef.current) {
      progressLineRef.current.style.transform = `scaleY(${latest})`;
    }
  });

  return (
    <section
      ref={containerRef}
      id="hero-scroll"
      className="relative"
      style={{ height: "500vh", backgroundColor: "#0a0a0a" }}
    >
      {/* Sticky viewport — 100vh, stays fixed while parent scrolls */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        {/* Canvas — fills full viewport, draws frames via cover logic */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block", backgroundColor: "#0a0a0a" }}
        />

        {/* Radial vignette — deepens edges for cinematic feel */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at center, transparent 30%, rgba(10,10,10,0.7) 100%)",
          }}
        />

        {/* Top fade — blends canvas into navbar/bg */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.6) 50%, transparent 100%)",
          }}
        />

        {/* Bottom fade — blends canvas into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.6) 50%, transparent 100%)",
          }}
        />

        {/* Text overlay sections */}
        {OVERLAY_SECTIONS.map((section, i) => (
          <CanvasOverlayItem
            key={i}
            section={section}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Bottom center: vertical scroll progress line */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-16 pointer-events-none z-20"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            ref={progressLineRef}
            className="absolute top-0 left-0 w-full h-full origin-top"
            style={{
              backgroundColor: "#e8ff47",
              transform: "scaleY(0)",
              transition: "transform 0.05s linear",
            }}
          />
        </div>

        {/* Top-right: real-time frame counter */}
        <div className="absolute top-6 right-6 z-20 font-mono text-[10px] tracking-[0.25em] text-text-sec select-none">
          <span ref={frameCounterRef}>
            000 / {String(FRAME_COUNT - 1).padStart(3, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
