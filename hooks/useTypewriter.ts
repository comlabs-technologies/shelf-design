"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Options {
  text: string;
  /** Typing begins when this flips to true. */
  play: boolean;
  /** Average milliseconds per character. */
  speed?: number;
  onDone?: () => void;
}

/**
 * Types `text` one character at a time. Reduced-motion users get the final
 * text immediately and `onDone` fires on the next tick.
 */
export function useTypewriter({ text, play, speed = 34, onDone }: Options) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const done = useRef(onDone);
  done.current = onDone;
  const started = useRef(false);

  useEffect(() => {
    if (!play || started.current) return;
    started.current = true;

    if (reduce) {
      setCount(text.length);
      const t = window.setTimeout(() => done.current?.(), 0);
      return () => window.clearTimeout(t);
    }

    let i = 0;
    let timer: number;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        timer = window.setTimeout(() => done.current?.(), 260);
        return;
      }
      // Slightly uneven rhythm so it reads as typing, not a ticker.
      const jitter = text[i - 1] === " " ? 1.5 : 0.75 + Math.random() * 0.6;
      timer = window.setTimeout(tick, speed * jitter);
    };
    timer = window.setTimeout(tick, 420);
    return () => window.clearTimeout(timer);
  }, [play, reduce, text, speed]);

  return { value: text.slice(0, count), finished: count >= text.length };
}
