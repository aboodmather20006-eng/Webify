import { useEffect, useState } from "react";

/**
 * Responsive slide-in offset for scroll entrance animations.
 * Lazy init matters: Framer Motion computes the hidden pose at mount,
 * so the offset must be correct on the FIRST render — a post-mount
 * effect correction would be too late.
 */
export default function useSlideOffset(desktop = 100, mobile = 44, query = "(max-width: 639px)") {
  const [offset, setOffset] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(query).matches ? mobile : desktop
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setOffset(mq.matches ? mobile : desktop);
    update(); // sync now — the viewport may have changed between first render and this effect
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [desktop, mobile, query]);
  return offset;
}
