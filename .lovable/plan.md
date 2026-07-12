# Samriddhi's Portfolio — Plan

A minimal editorial portfolio in Paper & Ink palette with Instrument Serif + Work Sans typography, inspired by Pacôme Pertant's site.

## Pages

### 1. Intro page (`/`)
A quiet, centered landing screen — off-white background, rich black type.

- Small top bar: "Samriddhi" (left) · "Portfolio ✲ 2026" (right)
- Large serif headline (Instrument Serif):
  *"Hi, I'm Samriddhi."*
- Sub-line (Work Sans, muted):
  *"New to product thinking — but I've watched enough crime shows to know: always question the obvious answer first."*
- Single link/CTA → **"Projects ↗"** routing to `/projects`
- Footer row with contact chips: Email · Instagram · Medium
- Subtle entrance fade/slide via framer-motion

### 2. Projects page (`/projects`) — Pacôme-style index
Full-viewport list of projects, editorial and text-first.

- Header: name on left, back-to-intro link + small "Selected work — 2026" on right
- Section label: *"Index / 05"*
- Vertical list, one row per project. Each row:
  - Left: index number (`01`, `02`…) + project title in large Instrument Serif
  - Right: short tag (`Web app`, `Case study`, `AI`, `Concept`) + year
  - Thin divider between rows; row expands slightly on hover
- **Cursor-follow hover preview:** on row hover, a large image preview appears attached to the cursor and follows mouse movement. Fades/scales on enter/leave (framer-motion, smooth spring). Only one preview visible at a time; hidden on touch devices (fallback = static thumbnail).
- Projects:
  1. LKK web app — *Web app*
  2. Zomato case study — *Case study*
  3. TheIceApple — *Concept*
  4. Startup Validator AI INDIA — *AI tool*
  5. Snuggle — *Product*
- Each row is a link to `/projects/$slug` (detail pages exist as placeholders — "Case study coming soon" — since details will be added later)
- Footer: contact chips repeated

### 3. Project detail pages (`/projects/$slug`)
Minimal placeholder scaffold for each project — title, tag, year, and a "Case study coming soon" note plus a back link. Ready to fill in later.

## Design system

- Palette (added to `src/styles.css` as tokens):
  - background `#f5f3ee`, surface `#e8e4dd`, foreground `#2d2d2d`, ink `#0d0d0d`
  - Applied to both `:root` and `.dark` (same, since site is light editorial)
- Fonts (loaded via `<link>` in `__root.tsx` head, then referenced in `@theme`):
  - Headings: **Instrument Serif** (400, italic 400)
  - Body/UI: **Work Sans** (400, 500, 600)
- Generous whitespace, hairline dividers, no shadows, no rounded cards — pure typography.

## Assets

Generate 5 project preview images (one per project) via `imagegen`, saved to `src/assets/projects/`. Style prompt shared across all: soft off-white background, editorial product/UI mockup, muted, matches Paper & Ink palette. Used as hover previews and on detail pages.

## Tech notes

- Routes: `src/routes/index.tsx` (intro), `src/routes/projects.index.tsx` (list), `src/routes/projects.$slug.tsx` (detail), plus `projects.tsx` layout returning `<Outlet />`.
- Each route sets its own `head()` with unique title, description, og:title, og:description. og:image only on detail routes (leaf), pointing at that project's image.
- Cursor-follow preview built as a small client component using `framer-motion` `useMotionValue` + `useSpring` on `mousemove`; disabled below `md` breakpoint (mobile shows a static image thumbnail inline in each row instead).
- Contact chips are a small reusable component used on both intro and projects pages.
- No backend/Cloud needed for this scope.

## Out of scope (for now)

- Actual case-study content (user will add later)
- CMS/admin
- Auth, database, forms

Ready to build on approval.