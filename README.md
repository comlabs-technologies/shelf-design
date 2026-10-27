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

## Before launch

- `components/sections/BetaVoices.tsx` holds **placeholder** social proof (`BETA_COUNT`, the two quotes and the founder note). Replace with real, attributable beta feedback — the count is reused in the final CTA.
- The "~1 hr vs seconds" comparison in the Why Recall section is illustrative; swap in a measured figure when you have one.
- Source logos come from `simple-icons` (CC0). Slack and LinkedIn aren't distributed there, so those two marks come from Font Awesome Free brands, which is licensed CC BY 4.0 — keep the attribution comment in `components/ui/SourceBadge.tsx`.

## Shadow system

Tokens live in `app/globals.css` (`--shadow-sm|md|lg|float|focus`, button and field shadows) with matching Tailwind `shadow-*` utilities. Use them by role:

- `.btn-press` — primary buttons: lifted, rise 2px on hover, sink 1px on press
- `.tag-lift` — tags, pills and source badges
- `.ui-focus` — the one selected state in a mockup (active result, selected collection, extension save)
- `.field-inset` — inputs (inset, lime focus ring)
- `shadow-float` — the floating header capsule
