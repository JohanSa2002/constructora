# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Type-check (tsc -b) then produce production bundle
npm run lint      # Run ESLint across the project
npm run preview   # Serve the production build locally
```

There is no test suite configured.

## Architecture

This is a **single-page marketing landing** for "Nexus", a Mexican construction / real-estate / solar-energy company, built with React 19 + TypeScript + Vite.

### Page composition

`App.tsx` is the real entry point — it composes the page as a vertical stack of sections and mounts global smooth-scroll:

```
<Navigation />          fixed overlay, theme-aware
<HeroSection />         #inicio
<AboutSection />        #nosotros
<ServicesSection />     #servicios
<ProjectsSection />     #proyectos
<TestimonialsSection /> #testimonios
<ContactSection />      #contacto
<Footer />
```

`src/pages/Home.tsx` is an unused scaffold — ignore it.

### Scroll and animation

- **Lenis** (`src/hooks/useLenis.ts`) is initialized in `App.tsx` via `useLenis()` and drives smooth scrolling. It feeds `ScrollTrigger.update` on every tick, so `scroll-behavior: auto` is set on `<html>` to prevent conflicts.
- **GSAP + ScrollTrigger** is the animation layer. `useScrollReveal` (`src/hooks/useScrollReveal.ts`) is a generic hook that animates children of a ref on scroll entry. Sections that need custom timelines call GSAP directly (e.g. `HeroSection`).
- Never call `element.scrollIntoView()` with `behavior: 'smooth'` — use `lenis.scrollTo()` or let Lenis handle it. In-page anchor clicks currently call `scrollIntoView` directly, which is a known mismatch.

### Navigation theming

`useNavTheme` reads `data-theme` attributes on section elements to decide whether the nav bar should render light or dark text. Sections with a light background must have `data-theme="light"`; dark sections use `data-theme="dark"`.

### Styling conventions

Tailwind v3 is configured with a custom `nexus.*` color palette (see `tailwind.config.js`):

| Token | Value | Use |
|---|---|---|
| `nexus-solar` | `#FFB800` | Primary accent / CTAs |
| `nexus-construction` | `#C75C2E` | Construction brand accent |
| `nexus-realstate` | `#2E7D6F` | Real-estate brand accent |
| `nexus-bg-primary` | `#0C0C0C` | Dark background |
| `nexus-bg-secondary` | `#F5F0EB` | Light section background |

Custom utility classes are defined in `src/index.css` and used throughout the codebase — **do not recreate them inline**:

- `.section-padding` — responsive vertical + horizontal padding for all sections
- `.container-nexus` — max-width 1280px centered container
- `.text-hero-title` — Playfair Display, fluid 48–120px
- `.text-section-title` — Playfair Display, fluid 36–72px
- `.text-subsection-title` — Inter, fluid 20–28px
- `.text-stat-number` — Playfair Display, fluid 48–80px
- `.text-eyebrow` — Inter 14px uppercase, letter-spacing 0.05em
- `.text-cta` — Inter 14px uppercase, letter-spacing 0.08em, semibold

Typography: **Playfair Display** (serif) for all headings and numbers; **Inter** (sans-serif) for body copy, nav, and UI.

### UI components

shadcn/ui components live in `src/components/ui/` and are imported as `@/components/ui/<name>`. The alias `@/` maps to `src/` (configured in `vite.config.ts`). These are pre-installed and should be imported rather than rebuilt.
