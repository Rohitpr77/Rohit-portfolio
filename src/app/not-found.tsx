import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(232,255,71,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p
          className="font-mono text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "#e8ff47" }}
        >
          404 / Not found
        </p>

        <h1
          className="font-display font-extrabold leading-none tracking-tighter gradient-text-accent"
          style={{ fontSize: "clamp(6rem, 20vw, 16rem)" }}
        >
          404
        </h1>

        <p className="text-text-sec font-light max-w-sm leading-relaxed -mt-4">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-4 px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-colors duration-200"
          style={{ backgroundColor: "#e8ff47", color: "#0a0a0a" }}
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
