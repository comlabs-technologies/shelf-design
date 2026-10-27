"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { SOURCES, SourceGlyph, type Source } from "./ui/SourceBadge";
import { CurveDivider, DOME } from "./CurveDivider";
import { NO_MOTION, setupGsap } from "@/lib/gsap";

type Tag = {
  label: string;
  source: Source;
  /** Resting position along the dome, 0–1 of its width. */
  x: number;
  /** Extra tilt relative to the surface, in degrees. */
  tilt: number;
  /** 0 rests on the surface, 1 lies on top of a neighbour. */
  level?: number;
  /** Also shown on narrow screens, optionally at its own position and level. */
  compact?: boolean;
  cx?: number;
  clevel?: number;
};

const tags: Tag[] = [
  { label: "Voice note", source: SOURCES.voice, x: 0.03, cx: 0.02, tilt: -66, compact: true },
  { label: "Web page", source: SOURCES.chrome, x: 0.085, cx: 0.16, tilt: -8, compact: true },
  { label: "Screenshot", source: SOURCES.screenshots, x: 0.125, tilt: -22, level: 1 },
  { label: "Figma file", source: SOURCES.figma, x: 0.165, tilt: 7 },
  { label: "PDF", source: SOURCES.pdf, x: 0.232, cx: 0.34, tilt: -5, compact: true },
  { label: "Instagram post", source: SOURCES.instagram, x: 0.312, tilt: 4 },
  { label: "LinkedIn post", source: SOURCES.linkedin, x: 0.275, tilt: -12, level: 1 },
  { label: "Slack thread", source: SOURCES.slack, x: 0.415, tilt: 3 },
  { label: "X thread", source: SOURCES.x, x: 0.585, tilt: -4 },
  { label: "Notion page", source: SOURCES.notion, x: 0.665, cx: 0.55, tilt: 6, compact: true },
  { label: "Medium article", source: SOURCES.medium, x: 0.765, cx: 0.7, tilt: -6, level: 0, compact: true, clevel: 1 },
  { label: "Podcast clip", source: SOURCES.spotify, x: 0.815, tilt: 16, level: 1 },
  { label: "YouTube video", source: SOURCES.youtube, x: 0.875, cx: 0.85, tilt: -3, compact: true },
  { label: "Newsletter", source: SOURCES.substack, x: 0.965, cx: 0.975, tilt: 64, compact: true },
];

type Pose = { x: number; y: number; rot: number };

const bez = (a: number, b: number, c: number, d: number, t: number) =>
  (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;
const bezD = (a: number, b: number, c: number, d: number, t: number) =>
  3 * (1 - t) ** 2 * (b - a) + 6 * (1 - t) * t * (c - b) + 3 * t ** 2 * (d - c);

/** Point and tangent on the dome at horizontal fraction `fx`, in pixels. */
function onDome(fx: number, w: number, h: number) {
  const [p0, p1, p2, p3] = DOME;
  const target = fx * 1440;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bez(p0[0], p1[0], p2[0], p3[0], mid) < target) lo = mid;
    else hi = mid;
  }
  const t = (lo + hi) / 2;
  const sx = w / 1440;
  const sy = h / 120;
  return {
    x: bez(p0[0], p1[0], p2[0], p3[0], t) * sx,
    y: bez(p0[1], p1[1], p2[1], p3[1], t) * sy,
    dx: bezD(p0[0], p1[0], p2[0], p3[0], t) * sx,
    dy: bezD(p0[1], p1[1], p2[1], p3[1], t) * sy,
  };
}

/**
 * The dome that rises over the hero dashboard, with a pile of saved-item
 * tags that drop onto it once — "everything you save lands in one place".
 */
export function FallingTags() {
  const wrap = useRef<HTMLDivElement>(null);
  const outer = useRef<(HTMLDivElement | null)[]>([]);
  const inner = useRef<(HTMLDivElement | null)[]>([]);
  const poses = useRef<Pose[]>([]);
  const [compact, setCompact] = useState(false);
  const [ready, setReady] = useState(false);

  // Rest every tag on the curve: lie along the tangent, lift off along the normal.
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const { gsap } = setupGsap();

    const layout = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const isCompact = w < 640;
      setCompact(isCompact);
      tags.forEach((tag, i) => {
        const node = outer.current[i];
        if (!node || (isCompact && !tag.compact)) return;
        const tw = node.offsetWidth;
        const th = node.offsetHeight;
        const level = (isCompact ? tag.clevel : undefined) ?? tag.level ?? 0;
        const p = onDome(isCompact ? (tag.cx ?? tag.x) : tag.x, w, h);
        const len = Math.hypot(p.dx, p.dy);
        const nx = p.dy / len;
        const ny = -p.dx / len;
        const tilt = (tag.tilt * Math.PI) / 180;
        const lift = th / 2 + level * th * 0.88 + (Math.abs(Math.sin(tilt)) * (tw - th)) / 2;
        const pose = {
          x: p.x + nx * lift - tw / 2,
          y: p.y + ny * lift - th / 2,
          rot: (Math.atan2(p.dy, p.dx) * 180) / Math.PI + tag.tilt,
        };
        poses.current[i] = pose;
        gsap.set(node, { x: pose.x, y: pose.y });
        gsap.set(inner.current[i], { rotation: pose.rot });
      });
      setReady(true);
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    return () => ro.disconnect();
  }, [compact]);

  // Drop once when the surface scrolls into view.
  useEffect(() => {
    if (!ready) return;
    const { gsap, ScrollTrigger } = setupGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_MOTION, () => {
      const drops = tags
        .map((tag, i) => ({ tag, i }))
        .filter(({ tag }) => !compact || tag.compact)
        .sort((a, b) => (a.tag.level ?? 0) - (b.tag.level ?? 0));
      const fall = Math.min(window.innerHeight * 0.8, 720);

      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          drops.forEach(({ tag, i }, n) => {
            const at = n * 0.055 + (tag.level ?? 0) * 0.18 + Math.random() * 0.04;
            const dur = 0.5 + Math.random() * 0.12;
            const kick = (i % 2 ? 1 : -1) * (14 + Math.random() * 10);
            const rot = poses.current[i]?.rot ?? 0;
            const mid = inner.current[i]?.parentElement;
            if (!mid) return;
            tl.fromTo(mid, { y: -fall }, { y: 0, duration: dur, ease: "power2.in" }, at)
              .fromTo(mid, { opacity: 0 }, { opacity: 1, duration: 0.14, ease: "none" }, at)
              .fromTo(inner.current[i], { rotation: rot + kick }, { rotation: rot + kick * 0.2, duration: dur, ease: "none" }, at)
              .to(inner.current[i], { rotation: rot, duration: 0.3, ease: "recall" }, at + dur);
          });
        },
      });
    });
    return () => mm.revert();
  }, [ready, compact]);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] overflow-x-clip h-[44px] sm:h-[80px] lg:h-[120px]"
    >
      <CurveDivider shape="dome" className="bottom-0" />
      {tags.map((tag, i) => (
        <div
          key={tag.label}
          ref={(n) => {
            outer.current[i] = n;
          }}
          className={clsx(
            "absolute left-0 top-0",
            compact && !tag.compact && "hidden",
            !ready && "invisible",
          )}
        >
          <div data-init>
            <div
              ref={(n) => {
                inner.current[i] = n;
              }}
            >
              <span className="tag-lift pointer-events-auto flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full bg-surface px-3 text-[12px] font-medium tracking-[-0.01em] text-ink/80 sm:h-11 sm:gap-2 sm:px-4 sm:text-[14.5px]">
                <SourceGlyph source={tag.source} colored className="h-3.5 w-3.5 text-muted-strong sm:h-4 sm:w-4" />
                {tag.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
