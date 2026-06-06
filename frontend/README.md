# Zenith
### Universal Logic Language

A minimal, editorial translator for an acoustic-first constructed language — built for Turkish speakers.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-000?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-000?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-000?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-000?style=for-the-badge)](#license)

---

## What is Zenith?

Zenith is a **constructed language (conlang)** designed around one principle: *every word must be a single, pronounceable sound cluster*. No silent letters, no borrowed etymology, no exceptions. Each morpheme is a CVC-style syllable that maps 1:1 to meaning, making the language fully reversible — any Zenith text can be reconstructed into a precise phonetic shape, and any Turkish thought can be compressed into a Zenith sequence without loss.

The web app is a translator, grammar reference, and a small editorial publication. It reads like a magazine, runs like a tool.

---

## Features

- **Bidirectional translation** — Turkish → Zenith, Zenith → Turkish
- **Tense support** — present, past, future
- **Translation history** — last few translations, persisted in `localStorage`
- **Engine status indicator** — live online/offline badge
- **Bilingual UI** — full interface localization in English and Turkish
- **Dark / Light themes** — two editorial color schemes, follows system preference on first visit
- **Sticky header** — navigable while scrolling
- **Splash screen** — one-time-per-session loading screen with progress meter
- **Cookie banner** — GDPR-style notice, dismissible, persisted in `localStorage`
- **Fully responsive** — mobile, tablet, desktop
- **SEO-friendly** — static prerendered routes, Open Graph metadata, custom favicon

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Translator — input, output, history, mode/tense controls, engine status |
| `/about` | Index — what Zenith is, design philosophy, sample sentences |
| `/rules` | Grammar — phonotactics, morphology, syntax |
| `/api-docs` | API reference — translation endpoints, request/response shapes |
| `/contact` | Contact — five channels (Instagram, X, Telegram, mail, GitHub) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router, Turbopack) | 16.2.7 |
| Runtime | [React](https://react.dev/) | 19.2.4 |
| Language | [TypeScript](https://www.typescriptlang.org/) | 5.x |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + CSS variables | v4 |
| Icons | [lucide-react](https://lucide.dev/) + [react-icons](https://react-icons.github.io/react-icons/) | 1.17 / 5.6 |
| Fonts | Geist, Geist Mono, Fraunces — via `next/font/google` | — |
| Utilities | clsx · tailwind-merge · class-variance-authority · @radix-ui/react-slot | — |
| HTTP | axios | 1.17 |

---

## Design System

### Color Palette

The UI uses two themes. Both are defined as CSS custom properties in `src/app/globals.css` and switched via the `data-theme` attribute on `<html>`. The active theme is stored in `localStorage.zenith_theme`; on first visit it follows `prefers-color-scheme`.

#### Dark (default)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background, sticky header, cookie banner |
| `--fg` | `#f5f2ec` | Primary text, inverted buttons |
| `--rule` | `#1f1d1a` | Hairline borders, dividers |
| `--mute` | `#6b6862` | Secondary text, metadata, eyebrows |
| `--accent` | `#c2410c` | Hot accent — period, dots, highlights |
| `--selection-bg` | `#f5f2ec` | Text selection background |
| `--selection-fg` | `#0a0a0a` | Text selection foreground |

#### Light (`[data-theme="light"]`)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#f5f2ec` | Cream page background |
| `--fg` | `#0a0a0a` | Ink primary text |
| `--rule` | `#d9d4ca` | Subtle warm dividers |
| `--mute` | `#6b6862` | Secondary text (same across themes) |
| `--accent` | `#c2410c` | Burnt orange (same across themes) |
| `--selection-bg` | `#0a0a0a` | Text selection background |
| `--selection-fg` | `#f5f2ec` | Text selection foreground |

The Tailwind utilities `bg-paper`, `text-ink`, `text-mute`, `border-rule`, and `text-accent` are bound to these tokens via `@theme inline`, so theme switching is a single attribute flip with no class shuffling.

### Typography

| Role | Family | Source | Notes |
|---|---|---|---|
| Display | **Fraunces** (variable, opsz + SOFT axes) | Google Fonts | `font-display` class, `letter-spacing: -0.04em`, `line-height: 0.85` |
| Body / UI | **Geist** | Vercel Fonts | Default sans, antialiased |
| Mono / Zenith | **Geist Mono** | Vercel Fonts | `font-mono-zn` class, `letter-spacing: -0.02em` |

Hero headings use `clamp()` for fluid scaling — `clamp(5rem, 18vw, 16rem)` on the home page, `clamp(3rem, 9vw, 8rem)` on sub pages. Body UI text is 14–16px with `leading-relaxed`. Eyebrow labels are `text-[10px] uppercase tracking-[0.3em]`.

### Layout Principles

- **Editorial magazine grid** — wide gutters, generous whitespace, `max-w-[1400px]` outer container
- **Hairline rules** (`1px solid var(--rule)`) instead of card shadows or heavy borders
- **Display headings at fluid scales** with negative tracking and tight leading
- **Micro-labels in uppercase** with wide tracking (0.25–0.3em)
- **Mono numerals** (`tabular-nums`) for counters, clocks, percentages
- **Sticky headers** with solid `bg-paper` — no blur, no transparency, no `overflow` traps
- **Cursor blink animation** on translated Zenith output (`▍` glyph)
- **Fade-up entrance** on splash elements and translation reveal

---

## Project Structure

```
frontend/
├── public/
│   └── zenith.png              # Brand logo (lightning Z)
├── src/
│   ├── app/
│   │   ├── globals.css         # Theme variables, keyframes, utilities
│   │   ├── layout.tsx          # Root layout · fonts · providers · splash · cookie banner
│   │   ├── page.tsx            # Home (translator)
│   │   ├── providers.tsx       # Theme + i18n providers wrapper
│   │   ├── icon.png            # Favicon
│   │   ├── about/page.tsx
│   │   ├── api-docs/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── rules/page.tsx
│   │   └── terms/page.tsx
│   ├── components/ui/
│   │   ├── zenith-chat.tsx     # Main translator UI
│   │   ├── splash-screen.tsx   # Loading screen (sessionStorage-gated)
│   │   ├── cookie-banner.tsx   # GDPR consent (localStorage-gated)
│   │   ├── page-chrome.tsx     # Shared PageHeader / PageFooter
│   │   ├── settings-bar.tsx    # EN/TR + theme toggle
│   │   ├── button.tsx          # shadcn-style button
│   │   └── textarea.tsx        # shadcn-style textarea
│   └── lib/
│       ├── i18n.tsx            # EN/TR dictionary · I18nProvider · useT()
│       ├── theme.tsx           # ThemeProvider · useTheme() · themeScript (FOUC guard)
│       └── utils.ts            # cn() helper (clsx + tailwind-merge)
├── AGENTS.md                   # Agent rules (Next.js 16 notes)
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts          # (in v4: configuration lives in globals.css)
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Development

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

The build outputs a fully static export ready for any host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

### Type-check

```bash
npx tsc --noEmit
```

### Lint

```bash
npm run lint
```

---

## Internationalization

- Two languages: **English** (default) and **Turkish**
- All strings live in `src/lib/i18n.tsx` as a typed `as const` dictionary
- `useT()` hook returns the active dictionary
- `setLang()` persists the choice to `localStorage.zenith_lang`
- An inline `<script>` in `<head>` reads the persisted language before first paint to prevent flash of unstyled language

## Theming

- Two themes: **dark** (default) and **light**
- Defined as CSS custom properties in `src/app/globals.css`
- Switched via the `data-theme` attribute on `<html>`
- `useTheme()` hook persists the choice to `localStorage.zenith_theme`
- An inline `<script>` in `<head>` reads the persisted theme before first paint and respects `prefers-color-scheme` on first visit

## Splash & Cookie Banner

Both are session/once-gated:

- **Splash** — `sessionStorage.zenith_splash_seen`. Shows once per browser tab/session. Dismissable with `Esc` / `Enter` / `Space` or the Skip button. 2s default duration with a 0.7s fade.
- **Cookies** — `localStorage.zenith_cookie_consent`. Shows until the user accepts or declines. Slides down with a 0.5s transition.

## Sticky Header

All page headers are `position: sticky; top: 0` with solid `bg-paper` and a `border-b hairline`. The body uses `overflow-x: clip` (with `hidden` fallback) so the sticky behavior is not trapped by an ancestor scroll context. Mobile hides the section/pronunciation label to keep the header compact.

---

## Brand

The lightning **Z** mark lives at `public/zenith.png` and is mirrored at `src/app/icon.png` for the favicon. It carries the same dark-plaque aesthetic as the dark theme and naturally inverts for the light theme — no separate assets needed.

---

## Roadmap

- [ ] Server-side translation API
- [ ] Audio playback for Zenith output (phonetic IPA)
- [ ] Optional user accounts (off by default)
- [ ] Additional language pairs

---

## License

MIT © 2026 Zenith

---

## Contact

See the `/contact` page in the app for direct channels, or:

- Instagram: [@gucluyumhe](https://instagram.com/gucluyumhe)
- X: [@gucluyumhe](https://x.com/gucluyumhe)
- Telegram: [@islamakhachev](https://t.me/islamakhachev)
- Mail: omeriletisimportfolyo@gmail.com
- GitHub: [sandrotonal](https://github.com/sandrotonal)
