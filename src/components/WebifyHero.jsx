import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo.jsx";
import { WHATSAPP_URL } from "../lib/site.js";

/**
 * Webify — Hero Section
 * Minimalist, futuristic dark hero with CSS-only starfield + falling light streaks.
 * Effect styles (stars, streaks, glow keyframes) live in src/index.css.
 *
 * Usage:
 *   <WebifyHero />                                       // defaults to /logo.svg from public/
 *   <WebifyHero logoSrc="/logo.png" companyName="Webify" />
 */

/* ---------------- Animation variants ---------------- */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------------- Decorative pieces ---------------- */
/* Uniform length + start point; variation lives only in timing and brightness */
const STREAKS = [
  { left: "38%",   duration: 6.5, delay: 0.0, opacity: 0.65, mobile: false },
  { left: "44%",   duration: 5.2, delay: 2.1, opacity: 1,    mobile: true  },
  { left: "48.5%", duration: 7.8, delay: 4.4, opacity: 0.6,  mobile: true  },
  { left: "52%",   duration: 4.6, delay: 1.2, opacity: 0.9,  mobile: true  },
  { left: "56.5%", duration: 6.1, delay: 3.3, opacity: 0.75, mobile: true  },
  { left: "63%",   duration: 7.2, delay: 0.8, opacity: 0.65, mobile: false },
];

function LightStreaks() {
  return (
    /* top-16 clips the streak lane so every streak enters just below the navbar */
    <div className="absolute inset-x-0 top-16 bottom-0 z-[1] overflow-hidden" aria-hidden="true">
      {STREAKS.map((s, i) => (
        <span
          key={i}
          className={`vex-streak ${s.mobile ? "" : "hidden sm:block"}`}
          style={{
            left: s.left,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            "--streak-opacity": s.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- In-hero header: logo left, links center, CTA right ----------------
 * Plain absolute positioning inside the hero — scrolls away with the page
 * by design (no fixed positioning, no portal). */
const NAV_LINKS = [
  { label: "Portfolio", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

function HeroHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-0 z-20"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8" aria-label="Main">
        <a href="#" className="flex items-center" aria-label="Webify home">
          <BrandLogo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <motion.a
                href={href}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-sm text-white/55 transition-colors duration-200 ease-out hover:text-white"
              >
                {label}
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(255,255,255,0.28)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black sm:px-5"
        >
          Start a Chat
        </motion.a>
      </nav>
    </motion.header>
  );
}

/* ---------------- Hero ---------------- */
export default function WebifyHero() {
  return (
    /* Exactly one viewport tall, open on the shared background — no frame.
       Base color, starfield, and glows come from the shared <SiteBackground /> */
    <section className="relative h-screen overflow-hidden">
      <LightStreaks />
      <HeroHeader />

        {/*
          Everything lives in ONE centered flex column with explicit gaps,
          so headline / sub / CTAs / pill can never overlap or clip.
          pt-16 clears the fixed navbar height.
        */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 pt-16 pb-8 text-center sm:gap-8"
        >
          <motion.h1
            variants={rise}
            className="max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
              Shaping tomorrow
              <br className="hidden sm:block" /> with vision and action.
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="max-w-md font-sans text-sm leading-relaxed text-white/50 sm:text-base"
          >
            We back visionaries and craft ventures that define what comes next.
          </motion.p>

          <motion.div variants={rise} className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 34px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black"
            >
              Start a Chat
            </motion.a>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04, boxShadow: "0 0 26px rgba(15,76,92,0.55)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-full border border-white/15 bg-white/[0.02] px-7 py-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:border-white/35 hover:bg-white/[0.06]"
            >
              Explore Now
            </motion.a>
          </motion.div>

          {/* Bottom capsule tag — extra gap separates it from the CTA group as a footer-style element */}
          <motion.div variants={rise} className="mt-10 sm:mt-16">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs tracking-wide text-white/55 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300/80" aria-hidden="true" />
              Web Design. E-commerce. Branding.
            </span>
          </motion.div>
        </motion.div>
    </section>
  );
}
