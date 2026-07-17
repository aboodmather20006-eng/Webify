import { motion } from "framer-motion";

/**
 * Webify — Selected Work section
 * Browser-mockup project cards with a scroll-on-hover full-page preview.
 * The scroll effect is pure CSS (see .vex-scrollframe in index.css):
 * hovering the card translates the tall screenshot upward through the frame.
 *
 * Add projects by appending to PROJECTS — drop the full-page screenshot
 * in public/projects/ and point `image` at it.
 */

const PROJECTS = [
  {
    name: "FORME",
    type: "Streetwear E-commerce",
    description: "Minimal, editorial landing page for a considered-essentials streetwear brand.",
    image: "/projects/forme.png",
    href: "#",
  },
  {
    name: "SMASH'D",
    type: "Restaurant Landing Page",
    description: "Bold, dark, appetite-driven one-pager for a smash-burger joint.",
    image: "/projects/smashd.png",
    href: "#",
  },
];

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* Mac-style browser chrome around the scrolling screenshot */
function BrowserFrame({ image, alt }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0f14] shadow-[0_0_40px_rgba(15,76,92,0.15)] transition-all duration-300 ease-out group-hover:border-white/20 group-hover:shadow-[0_0_60px_rgba(15,76,92,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
      </div>
      {/* No loading="lazy" here: Chrome never lazy-loads images inside a
          container-type:size frame (size containment hides them from the
          intersection heuristic), so they'd stay blank forever */}
      <div className="vex-scrollframe aspect-[16/11]">
        <img src={image} alt={alt} decoding="async" />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12 }}
      className="group"
    >
      <a href={project.href} className="block">
        <BrowserFrame image={project.image} alt={`${project.name} — full-page screenshot`} />

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
              <span className="text-xs uppercase tracking-[0.14em] text-teal-300/70">{project.type}</span>
            </div>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/50">{project.description}</p>
          </div>

          <span className="mb-0.5 inline-flex shrink-0 items-center gap-1.5 text-sm text-white/40 transition-colors duration-200 ease-out group-hover:text-white">
            View project
            <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </a>
    </motion.article>
  );
}

export default function WorkSection() {
  return (
    /* Transparent: the shared <SiteBackground /> provides the atmosphere */
    <section id="work" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-teal-300/70">Portfolio</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Selected Work
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">
            A few recent builds — hover a card to scroll through the full page.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 sm:mt-16 md:grid-cols-2 md:gap-10 lg:gap-12">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
