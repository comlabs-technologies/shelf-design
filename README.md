# Recall — landing page

Single-page marketing site for Recall, an AI workspace for saving links, notes, screenshots and ideas and finding them again in plain language.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · GSAP + ScrollTrigger (scroll choreography) · Framer Motion (small UI interactions) · Lucide icons · Geist.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Structure

- `app/` — layout, page, global styles and tokens
- `components/Header.tsx` — natural top nav that becomes a floating capsule after the hero headline
- `components/hero/` — hero copy and the live dashboard mockup (typing query, staggered results)
- `components/sections/` — search demo, capture flow, capabilities, privacy, FAQ, final CTA, footer
- `components/ui/` — logo, buttons, email form, chips, mock search field
- `hooks/` — `useTypewriter`, `useInViewOnce`
- `lib/gsap.ts` — plugin registration and the shared `recall` ease (`cubic-bezier(0.22, 1, 0.36, 1)`)

## Motion notes

- Elements that are revealed on scroll carry `data-init` (hidden only when JS runs and motion is allowed) or `data-reveal`.
- On desktop the hero dashboard pins briefly, scales to 0.96 and is covered by the curved surface of the next section.
- `prefers-reduced-motion: reduce` shows every final state immediately: no pinning, no typing, no reveals.

The email forms simulate submission client-side; connect `EmailForm`'s `submit` to a real waitlist endpoint.
