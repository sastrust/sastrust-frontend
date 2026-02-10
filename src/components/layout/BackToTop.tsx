// File: src/components/layout/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";

export default function BackToTop({
  ariaLabel,
  text,
}: {
  ariaLabel: string;
  text: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span aria-hidden="true">↑</span>
      <span>{text}</span>
    </button>
  );
}
