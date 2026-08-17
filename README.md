# Dealio

Dealio is a matchmaking app for businesses, professionals, and investors — connecting
people based on what they *have* and what they *need*, instead of resumes.

This app started as a single-file Claude Artifact (`legacy/dealio-app.jsx`, kept for
reference) and has been restructured here into a real, runnable project.

## Stack

- **Frontend:** Vite + React + TypeScript, SPA (no framework-level routing yet — tabs
  are managed with local state, matching the original artifact's behavior).
- **Backend:** a small Express + TypeScript proxy (`server/`) that holds the real
  `ANTHROPIC_API_KEY` and forwards AI requests to the Anthropic API. The frontend never
  talks to Anthropic directly — it calls `/api/*` on this server.

This split is required: the original artifact called `api.anthropic.com` straight from
the browser, relying on claude.ai's Artifact sandbox to transparently authenticate that
call. Outside of claude.ai that call has no credentials and is blocked by CORS, so a
real backend is mandatory for the AI features (opportunity analysis, Deal Room chat,
Goal Engine blueprint) to work at all.

## Project layout

```
src/
  theme/        design tokens (colors, gradients) + global.css
  types/        shared TypeScript types (Opportunity, Profile, Message, ...)
  data/         mock data (will later be replaced by real API calls)
  lib/          style helpers + the API client that talks to the backend proxy
  components/   small reusable pieces (Logo, DealCard, MatchChip, BottomNav, ...)
  screens/      the app's tabs/full-screen views (Home, Search, Matches, Profile, ...)
  modals/       overlay flows (Add listing, Detail + AI analysis, Verification)
  App.tsx       root component — screen routing, top-level state
  main.tsx      React entry point

server/
  src/index.ts       Express app
  src/routes/ai.ts    /api/analyze, /api/chat, /api/blueprint — proxy to Anthropic
```

## Running it locally

You need [Node.js](https://nodejs.org/) 18+ installed (this environment doesn't have
it, so `npm install` hasn't been run yet — do this on your machine).

### 1. Backend (AI proxy)

```bash
cd server
npm install
cp .env.example .env      # then edit .env and paste your real ANTHROPIC_API_KEY
npm run dev                # starts on http://localhost:8787
```

Get a key at https://console.anthropic.com/ — never commit `.env` (it's gitignored).

### 2. Frontend

In a second terminal, from the project root:

```bash
npm install
npm run dev                 # starts on http://localhost:5173
```

Vite proxies any `/api/*` request to `http://localhost:8787`, so the frontend doesn't
need to know the backend's URL in dev.

Open http://localhost:5173 — onboarding flow first, then the full app.

## What's still mocked / not production-ready

- **No database.** The feed, profile, and chat all live in React state and reset on
  refresh. Next step: persist to a real backend (Postgres/Supabase, or extend the
  Express server) instead of `useState`.
- **No auth.** Onboarding just stores a name locally; there's no real user account.
- **No routing library.** Tabs are plain state, so there are no shareable URLs / deep
  links / browser back-button support yet. Adding React Router is a natural next step.
- **Styling is all inline `style={{}}` objects**, carried over as-is from the original
  artifact to avoid visual regressions during the restructuring. Worth revisiting
  (CSS Modules / Tailwind / vanilla-extract) once the structure has settled.

## Building for production

```bash
npm run build      # frontend -> dist/
cd server && npm run build   # backend -> server/dist/
```

Deploy the backend anywhere that can hold a secret env var (Render, Fly.io, a small
VM, etc.) and the frontend as static files (Vercel, Netlify, ...), pointing
`VITE_API_BASE_URL` at the deployed backend's URL if it's not served from the same
origin/path.
