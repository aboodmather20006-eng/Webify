import { motion } from "framer-motion";
import { WHATSAPP_URL } from "../lib/site.js";

/**
 * Webify — closing CTA section
 * The last section on the homepage: one big question, one button.
 * Sits on the shared <SiteBackground /> but adds its own intensified
 * teal bloom behind the content so the page's energy peaks here.
 */

const EASE = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function CTASection() {
  return (
    /* Transparent over the shared background; extra-generous padding so the
       closing moment breathes */
    <section id="contact" className="relative px-5 py-32 sm:px-8 sm:py-44">
      {/* Intensified local glow — same palette as the page, turned up a notch */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="vex-glow absolute left-1/2 top-1/2 h-[30rem] w-[64rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, rgba(15,76,92,0.9) 0%, rgba(15,76,92,0.35) 45%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.h2
          variants={rise}
          className="font-display text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
            Ready to build
            <br className="hidden sm:block" /> your website?
          </span>
        </motion.h2>

        <motion.p variants={rise} className="mt-6 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
          No forms, no waiting — send a message and we'll take it from there.
        </motion.p>

        <motion.div variants={rise} className="mt-10">
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="vex-cta-pulse inline-flex min-h-[52px] items-center gap-3 rounded-full bg-teal-500 px-8 py-4 text-base font-semibold text-black sm:px-10"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
