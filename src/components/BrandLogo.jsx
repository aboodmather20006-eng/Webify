import { useState } from "react";

/**
 * Reusable brand logo. Swap the image by changing the `src` prop (or
 * dropping a new file at /public/logo.svg) — layout never needs to change.
 * Falls back to a text wordmark if the image fails to load.
 */
export default function BrandLogo({ src = "/logo.svg", name = "Webify", className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={`font-display text-xl font-bold tracking-[-0.02em] text-white ${className}`}>
        {name.toLowerCase()}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`h-8 w-auto sm:h-9 ${className}`}
      draggable="false"
    />
  );
}
