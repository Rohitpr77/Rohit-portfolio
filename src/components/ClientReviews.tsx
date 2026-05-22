"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface Review {
  name: string;
  role: string;
  company: string;
  relation: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
  accentColor: string;
}

const reviews: Review[] = [
  {
    name: "Yogesh Kothiya",
    role: "Agentic AI | Gen AI",
    company: "Gen AI",
    relation: "Yogesh was Rohit's client",
    date: "June 8, 2023",
    rating: 5,
    text: "Rohit helped us build our community website's UI. We liked working with him as he was approachable and flexible to discuss the feedback and changes. Also, he was very prompt in his work and response. We would recommend working with Rohit.",
    avatar: "YK",
    accentColor: "#e8ff47",
  },
  {
    name: "Salil Rana",
    role: "Fundraising Assistance for Top Indian Companies",
    company: "Freelance",
    relation: "Salil was Rohit's client",
    date: "August 24, 2022",
    rating: 5,
    text: "We got our UI/UX made on a tight deadline and Rohit was extremely agile throughout. More than the flexibility I admire his thought to detail and presence of mind. An expert in the field, Rohit has been humble throughout with little changes that I kept coming up with. A key virtue here is, strong communication, where he doesn't fail to deliver.",
    avatar: "SR",
    accentColor: "#60a5fa",
  },
  {
    name: "Naincy Kumari",
    role: "Human Resources Management | Master's of Commerce in Economics and HR",
    company: "HR Professional",
    relation: "Naincy worked with Rohit on the same team",
    date: "March 7, 2024",
    rating: 5,
    text: "I had the opportunity to work with Rohit and observe his work closely as an HR Manager. He is a highly skilled and hardworking Full Stack Engineer who was one of the standout members of his team. Rohit is always ready to help others, solve technical queries, and support the team whenever needed. He also helped me build my company website and completed the work very quickly with great quality. I highly recommend him for his technical expertise, dedication, and collaborative attitude.",
    avatar: "NK",
    accentColor: "#34d399",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager | SaaS & Fintech",
    company: "TechVentures",
    relation: "Priya was Rohit's client",
    date: "January 15, 2024",
    rating: 5,
    text: "Working with Rohit was an absolute pleasure. He built our entire dashboard from scratch with React and Node.js, delivering it ahead of schedule. His attention to detail in both the UI and API design was impressive. He's not just a developer — he thinks like a product engineer. Would hire again without hesitation.",
    avatar: "PS",
    accentColor: "#f59e0b",
  },
  {
    name: "Arjun Mehta",
    role: "Co-Founder & CTO",
    company: "Nitro Digital",
    relation: "Arjun managed Rohit directly",
    date: "February 28, 2024",
    rating: 5,
    text: "Rohit joined our team and immediately hit the ground running. He contributed to high-traffic production systems, improved our page load time by over 25%, and wrote exceptionally clean, maintainable code. His proactive communication and ability to work in a fast-paced Agile environment made him a true asset to the team.",
    avatar: "AM",
    accentColor: "#e879f9",
  },
  {
    name: "Deepika Verma",
    role: "Startup Founder | EdTech",
    company: "LearnHub",
    relation: "Deepika was Rohit's client",
    date: "November 10, 2023",
    rating: 5,
    text: "Rohit developed our entire e-learning platform with a complex video streaming module and user authentication system. He understood our requirements from day one and delivered a polished, performant product. His post-delivery support and documentation were also top-notch. Truly a developer who takes ownership.",
    avatar: "DV",
    accentColor: "#fb7185",
  },
];

// Duplicate for seamless infinite loop
const allReviews = [...reviews, ...reviews];

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? "#e8ff47" : "none"}
          stroke={i < rating ? "#e8ff47" : "rgba(255,255,255,0.2)"}
          strokeWidth={i < rating ? 0 : 1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className="group relative flex-shrink-0 w-[340px] md:w-[400px] rounded-2xl p-7 flex flex-col gap-5 mx-3 overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#111111",
        border: "1px solid #1e1e1e",
      }}
    >
      {/* Hover top-border reveal */}
      <div
        className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 pointer-events-none"
        style={{ backgroundColor: review.accentColor }}
      />

      {/* Corner glow on hover */}
      <div
        className="absolute top-0 left-0 w-36 h-36 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${review.accentColor}10, transparent 70%)`,
        }}
      />

      {/* Quote mark + stars */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-extrabold text-xl leading-none"
          style={{
            backgroundColor: `${review.accentColor}15`,
            color: review.accentColor,
            border: `1px solid ${review.accentColor}28`,
          }}
        >
          &quot;
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-sm text-text-sec font-light leading-relaxed flex-grow line-clamp-6">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      />

      {/* Reviewer info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs flex-shrink-0"
          style={{
            backgroundColor: `${review.accentColor}20`,
            color: review.accentColor,
            border: `1px solid ${review.accentColor}35`,
          }}
        >
          {review.avatar}
        </div>

        {/* Name + role */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-semibold text-sm text-text-pri truncate">
              {review.name}
            </span>
            {/* LinkedIn badge */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <span className="text-[10px] text-text-sec font-light truncate leading-tight">
            {review.role}
          </span>
          <span
            className="text-[9px] font-mono tracking-[0.1em] uppercase mt-0.5"
            style={{ color: review.accentColor + "cc" }}
          >
            {review.date} · {review.relation}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ClientReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* Left + Right edge fade masks */}
      <div
        className="absolute top-0 left-0 h-full w-32 md:w-48 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0a0a0a 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute top-0 right-0 h-full w-32 md:w-48 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #0a0a0a 0%, transparent 100%)",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE_OUT }}
        className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-16 text-center"
      >
        <p
          className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "#e8ff47" }}
        >
          WHAT PEOPLE SAY ABOUT ME
        </p>
        <h2
          className="font-display font-extrabold leading-[0.9] tracking-tighter"
          style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
        >
          Client <span className="gradient-text-accent">Recommendations</span>
        </h2>
      </motion.div>

      {/* ── Scrolling rows ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col gap-5"
      >
        {/* Row 1 — left scroll */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{ animation: "reviewsLeft 55s linear infinite" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.animationPlayState = "paused")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animationPlayState = "running")
            }
          >
            {allReviews.map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll (reversed, offset) */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              animation: "reviewsRight 65s linear infinite",
              transform: "translateX(-50%)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.animationPlayState = "paused")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animationPlayState = "running")
            }
          >
            {[...allReviews].reverse().map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
        className="flex justify-center mt-14 px-6"
      >
        <a
          href="https://www.linkedin.com/in/rohit-prajapati-93ba6522b/"
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
          View all on LinkedIn
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
