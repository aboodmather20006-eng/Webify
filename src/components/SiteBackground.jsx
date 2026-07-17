/**
 * Webify — shared page atmosphere
 * One continuous background behind ALL sections: black base (set on <body> /
 * the page wrapper), starfield, and the teal/blue-gray glow blobs that used
 * to live inside the hero card.
 *
 * Glow anchoring (page is hero = 100vh + portfolio below):
 * - blue-gray counterweight: top-right of the hero viewport (unchanged)
 * - teal horizon haze: centered behind the hero headline (50vh, unchanged)
 * - primary teal bloom: centered ON the hero/portfolio boundary (100vh) —
 *   this is what erases the seam; it reads as the hero's bottom-left glow
 *   from above and as the portfolio's ambient light from below
 * - soft teal accent: bottom-right of the page, so the atmosphere resolves
 *   naturally regardless of how tall the portfolio grows
 */
export default function SiteBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Starfield spans the entire page height */}
      <div className="vex-stars vex-stars-1" />
      <div className="vex-stars vex-stars-2" />

      {/* Blue-gray (#1a2b3d) counterweight, top-right of the hero */}
      <div
        className="absolute -right-40 -top-40 h-[26rem] w-[26rem] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(26,43,61,0.9) 0%, transparent 68%)",
          filter: "blur(80px)",
        }}
      />

      {/* Teal horizon haze behind the hero headline */}
      <div
        className="absolute left-1/2 top-[50vh] h-[22rem] w-[52rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 opacity-25"
        style={{
          background: "radial-gradient(ellipse, rgba(15,76,92,0.7) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Primary deep-teal (#0f4c5c) bloom — bridges the hero/portfolio seam */}
      <div
        className="vex-glow absolute -left-48 top-[100vh] h-[34rem] w-[34rem] -translate-y-1/2 rounded-full sm:h-[44rem] sm:w-[44rem]"
        style={{
          background:
            "radial-gradient(circle, #0f4c5c 0%, rgba(15,76,92,0.55) 38%, rgba(15,76,92,0.18) 58%, transparent 72%)",
          filter: "blur(64px)",
        }}
      />

      {/* Faint mid-page teal drift, left side — keeps the atmosphere alive
          between the portfolio and services sections */}
      <div
        className="absolute -left-40 top-[58%] h-[28rem] w-[28rem] -translate-y-1/2 rounded-full opacity-[0.15]"
        style={{
          background: "radial-gradient(circle, #0f4c5c 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Soft teal accent, bottom-right — closes out the page */}
      <div
        className="absolute -bottom-32 -right-40 h-[30rem] w-[30rem] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #0f4c5c 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
    </div>
  );
}
