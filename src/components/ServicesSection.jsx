import { motion } from "framer-motion";
import useSlideOffset from "../hooks/useSlideOffset.js";

/**
 * Webify — Services section ("What We Do")
 * Vertical list of service blocks that zig-zag into view on scroll:
 * odd blocks slide in from the left, even from the right (once only).
 * Sits on the shared <SiteBackground /> — no background of its own.
 */

const SERVICES = [
  {
    title: "Website Design",
    description:
      "Design-first marketing sites with strong typography and motion. Built to make a brand feel inevitable, not just presentable.",
  },
  {
    title: "E-commerce Development",
    description:
      "Fast, conversion-minded storefronts — from product grid to checkout. Clean builds that stay easy to grow and maintain.",
  },
  {
    title: "Landing Pages",
    description:
      "High-converting one-pagers for launches, campaigns, and products. One message, one action, zero distractions.",
  },
  {
    title: "Brand Identity",
    description:
      "Logos, type systems, and visual language that carry across every touchpoint — so the site, deck, and socials all feel like one company.",
  },
];

/* Strong, confident ease-out — same family as the rest of the site */
const EASE = [0.16, 1, 0.3, 1];

const header = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* dir is +1 (from right) or -1 (from left); offset shrinks on mobile */
const makeBlock = (offset) => ({
  hidden: (dir) => ({ opacity: 0, x: dir * offset }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.09, delayChildren: 0.1 },
  },
});

/* Inner elements (number → title → description) trail the block slightly */
const child = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};


function ServiceBlock({ service, index, block }) {
  const dir = index % 2 === 0 ? -1 : 1; // 1st from left, 2nd from right, ...
  return (
    <motion.article
      custom={dir}
      variants={block}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm transition-colors duration-300 ease-out hover:border-white/[0.16] sm:p-10 ${
        dir === 1 ? "md:ml-auto" : "md:mr-auto"
      }`}
    >
      <motion.p
        variants={child}
        className="font-display bg-gradient-to-b from-teal-300/60 to-teal-300/10 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.p>
      <motion.h3
        variants={child}
        className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl"
      >
        {service.title}
      </motion.h3>
      <motion.p variants={child} className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
        {service.description}
      </motion.p>
    </motion.article>
  );
}

export default function ServicesSection() {
  const offset = useSlideOffset(100, 44);
  const block = makeBlock(offset);

  return (
    /* Transparent: the shared <SiteBackground /> provides the atmosphere */
    <section id="services" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={header}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-teal-300/70">Services</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
            From first sketch to shipped product — everything a brand needs to look and perform like it means it.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-8 sm:mt-20 sm:gap-12">
          {SERVICES.map((service, i) => (
            <ServiceBlock key={service.title} service={service} index={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
