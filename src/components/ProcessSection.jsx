import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Webify — Process section ("How We Work"), pinned horizontal scroll.
 *
 * Desktop (md+): a 350vh outer wrapper provides scroll distance; inside it a
 * `sticky top-0 h-screen` stage pins to the viewport while `useScroll` maps
 * vertical progress (0→1) onto a horizontal x translation of the card track.
 * Cards get a subtle scale/opacity boost as they pass the viewport center,
 * and a thin progress line fills underneath.
 *
 * Mobile / tablet (<768px) and prefers-reduced-motion: the pinned experience
 * is disabled entirely — a normal vertical stack (auto height, no 350vh
 * residue) with a simple fade + slide-up per card.
 *
 * Sits on the shared <SiteBackground /> — no background of its own.
 */

const STEPS = [
  {
    title: "Discovery",
    description:
      "We start by understanding the brand, its goals, and who it's for — so every decision after this has a reason behind it.",
  },
  {
    title: "Design",
    description:
      "Wireframes first, then visual direction. We iterate with you until the design feels right — not just approved.",
  },
  {
    title: "Build",
    description:
      "Clean, fast, responsive development. What we ship is what was designed, down to the motion and the details.",
  },
  {
    title: "Launch & Support",
    description:
      "Deployment, handover, and everything documented. We stay around after launch — fixes, tweaks, and honest answers.",
  },
];

const EASE = [0.16, 1, 0.3, 1];

/* Track geometry, all in vw — keep in sync with the Tailwind classes below
   (w-[62vw] on cards, gap-[5vw] and px-[10vw] on the track) */
const CARD_W = 62;
const GAP = 5;
const PAD = 10;
const TRACK_W = PAD * 2 + CARD_W * STEPS.length + GAP * (STEPS.length - 1); // 283vw
const SHIFT = TRACK_W - 100; // 183vw — last card lands flush right with PAD to spare

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update(); // sync now — the viewport may have changed between first render and this effect
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function ProcessHeader() {
  return (
    <motion.div
      /* Pure fade — this section's entrance must have zero vertical motion */
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="max-w-xl"
    >
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-teal-300/70">Process</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
        How We Work
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
        No mystery, no black box — four clear steps from first call to a site that's live and looked after.
      </p>
    </motion.div>
  );
}

/* Shared card interior: same treatment as ServicesSection, scaled up a notch
   for the large horizontal panels */
function CardBody({ step, index, large }) {
  return (
    <>
      <p
        aria-hidden="true"
        className={`font-display bg-gradient-to-b from-teal-300/60 to-teal-300/10 bg-clip-text font-semibold text-transparent ${
          large ? "text-6xl lg:text-7xl" : "text-4xl sm:text-5xl"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3
        className={`mt-4 font-display font-semibold tracking-[-0.02em] text-white ${
          large ? "text-3xl lg:text-4xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {step.title}
      </h3>
      <p className={`mt-3 max-w-xl leading-relaxed text-white/50 ${large ? "text-base lg:text-lg" : "text-sm sm:text-base"}`}>
        {step.description}
      </p>
    </>
  );
}

/* ---------------- Desktop: pinned horizontal scroll ---------------- */

function HorizontalCard({ step, index, progress }) {
  /* Progress value at which this card's center crosses the viewport center */
  const center = PAD + index * (CARD_W + GAP) + CARD_W / 2;
  const p = (center - 50) / SHIFT;
  const scale = useTransform(progress, [p - 0.2, p, p + 0.2], [0.94, 1, 0.94]);
  const opacity = useTransform(progress, [p - 0.25, p, p + 0.25], [0.5, 1, 0.5]);

  return (
    <motion.article
      style={{ scale, opacity }}
      className="w-[62vw] shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 backdrop-blur-sm lg:p-14"
    >
      <CardBody step={step} index={index} large />
    </motion.article>
  );
}

function HorizontalProcess() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${SHIFT}vw`]);

  return (
    <section id="process" ref={wrapRef} className="relative h-[350vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <ProcessHeader />
        </div>

        {/* Vertical scroll drives this track from x:0 to x:-183vw */}
        <motion.div style={{ x }} className="mt-10 flex gap-[5vw] px-[10vw] lg:mt-14">
          {STEPS.map((step, i) => (
            <HorizontalCard key={step.title} step={step} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Progress line */}
        <div className="mx-auto mt-10 h-px w-48 overflow-hidden bg-white/10 lg:mt-14" aria-hidden="true">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-teal-300/60" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Mobile / reduced motion: vertical stack ---------------- */

function StackedProcess() {
  return (
    <section id="process" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ProcessHeader />
        <div className="mt-14 flex flex-col gap-8 sm:mt-20 sm:gap-12">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.title}
              /* Horizontal slide ONLY (x + opacity, never y): each card
                 slides in from the left as it scrolls into view, once */
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm sm:p-10"
            >
              <CardBody step={step} index={i} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProcessSection() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();
  return isDesktop && !prefersReducedMotion ? <HorizontalProcess /> : <StackedProcess />;
}
