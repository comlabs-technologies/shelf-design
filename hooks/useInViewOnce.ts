"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has been at least `threshold` visible — or has been
 * scrolled past (e.g. via an anchor jump), so it never stays unplayed.
 */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.6) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold || entry.boundingClientRect.top < 0) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.25, threshold, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);

  return [ref, seen] as const;
}
