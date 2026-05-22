"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(232,255,71,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <p
          className="font-mono text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "#e8ff47" }}
        >
          Something went wrong
        </p>

        <h1
          className="font-display font-extrabold leading-none tracking-tighter"
          style={{
            fontSize: "clamp(4rem, 12vw, 10rem)",
            color: "#f0f0f0",
          }}
        >
          Error
        </h1>

        <p className="text-text-sec font-light max-w-sm leading-relaxed">
          {error.message || "An unexpected error occurred."}
        </p>

        <motion.button
          onClick={reset}
          className="mt-4 px-8 py-3 rounded-full text-sm font-medium tracking-wide"
          style={{ backgroundColor: "#e8ff47", color: "#0a0a0a" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Try again
        </motion.button>
      </motion.div>
    </div>
  );
}
