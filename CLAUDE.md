# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This is a real Vite + React + TypeScript project (restructured from a single-file Claude
Artifact, `legacy/dealio-app.jsx`, kept only for reference — do not edit it). The frontend
lives at the repo root; a small Express + TypeScript backend proxy lives in `server/`.

**Node.js is not installed in this dev sandbox**, so `npm install` has not been run and the
app has not been build-verified end to end. Before trusting `npm run dev`/`build` to work,
run `npm install` (root and `server/`) on a machine with Node 18+ and fix whatever surfaces.

Commands (once dependencies are installed):
- `npm run dev` — frontend dev server (Vite, port 5173)
- `npm run build` — typecheck + production build
- `npm run lint` — ESLint
- `cd server && npm run dev` — backend AI proxy (port 8787), requires `server/.env` with `ANTHROPIC_API_KEY` (see `.env.example`)

## What this is

Dealio is a Hebrew-language (RTL), mobile-first matchmaking app UI for business
opportunities — connecting people who "have" assets (money, knowledge, audience,
connections, etc.) with people who "need" them.

## Architecture

```
src/
  theme/tokens.ts     design tokens: B (colors, incl. per-domain map B.dc keyed by
                       Hebrew category names like "בריאות","טכנולוגיה") + GRADIENTS
  theme/global.css     fonts (Fraunces/Inter/JetBrains Mono via Google Fonts), resets,
                       all @keyframes — imported once in main.tsx
  types/index.ts       shared types: Opportunity, Profile, ChatMessage, Blueprint, ...
  data/mock.ts          all mock/seed data (ASSETS, DOMAINS, FEED_DATA, ACTIVITIES,
                       USER_TYPES, GOALS, SUCCESS_STORIES, ...) — no backend/DB yet,
                       this is the in-memory source of truth threaded through props
  lib/styleHelpers.ts   btn(), domainColor(), shared fieldInput style + focus handlers
  lib/api.ts             client for the backend AI proxy (analyzeOpportunity, chatReply,
                       buildBlueprint) — the ONLY place the frontend talks to the backend
  components/           reusable pieces: shared/ (Logo, MatchChip, VerifiedBadge,
                       LiveTicker, PCard, AvatarStack), DealCard, ActivityPanel, BottomNav
  screens/               one folder per tab/full-screen view: Onboarding (+OnbStep), Home,
                       Search, Matches, Profile (+JourneyProgress), DealRoom, GoalEngine,
                       SuccessFeed
  modals/                overlay flows: AddModal, DetailModal, VerificationModal
  App.tsx                root component — owns top-level state (onboarded, tab, feed,
                       detail, chat, showAdd, showGoal, showSuccess, profile), does
                       simple tab-based routing (no router library yet) between
                       home/search/matches/goal/profile, plus full-screen overrides for
                       onboarding and the chat (DealRoom)
  main.tsx               React entry point, imports theme/global.css once

server/
  src/index.ts            Express app, CORS + JSON body parsing
  src/routes/ai.ts         POST /api/analyze, /api/chat, /api/blueprint — the only code
                       that holds ANTHROPIC_API_KEY and calls the real Anthropic API
```

**Styling convention:** everything is inline `style={{...}}` objects, no CSS classes
except the global `theme/global.css` (resets + `@keyframes`, referenced by name e.g.
`animation:"fadeUp .5s ... both"`). Use `btn()` from `lib/styleHelpers.ts` for any new
interactive element rather than hand-rolling button styles. `domainColor(domain)` looks
up `B.dc[domain]`, falling back to the signal color. This inline-styles approach was
kept as-is during the restructuring (to avoid visual regressions) — revisit only as a
deliberate, separate change.

**Layout convention:** the whole app is constrained to `maxWidth:540` and centered —
treat this as a mobile viewport, not a responsive desktop layout.

**RTL:** `direction:"rtl"` is set globally in `theme/global.css`; text content is Hebrew
throughout. Keep new UI text in Hebrew and be mindful of RTL-specific layout (e.g.
`borderLeft` is used for the "leading edge" accent stripe on cards because of RTL flow;
`marginRight:"auto"` is used where LTR code would use `marginLeft:"auto"`).

**AI integration:** `DetailModal`, `DealRoom`, and `GoalEngine` call
`analyzeOpportunity()` / `chatReply()` / `buildBlueprint()` from `src/lib/api.ts`, which
POST to `/api/analyze`, `/api/chat`, `/api/blueprint`. In dev, Vite proxies `/api/*` to
the local `server/` (see `vite.config.ts`). **Never** add a direct `fetch` to
`api.anthropic.com` from frontend code — the original artifact did this and it only
worked inside claude.ai's Artifact sandbox (no API key in the request, relying on the
sandbox to authenticate transparently); outside of that sandbox it fails on both CORS
and auth. Any new AI feature needs a new route in `server/src/routes/ai.ts` and a
corresponding client function in `src/lib/api.ts`.

## Working in this codebase

- New opportunity/user-facing fields should be added consistently across the
  `Opportunity` type (`src/types/index.ts`), `AddModal`'s `submit()` (constructs a new
  feed entry), `DealCard`, `DetailModal`, and `SearchScreen`'s filtering/highlighting
  logic — these all assume the same opportunity shape.
- `ASSETS` keys (e.g. `money`, `knowledge`) are the vocabulary used for both a user's
  `hasAssets` and an opportunity's `has`/`needs` arrays — keep new asset types added in
  `src/data/mock.ts` (`ASSETS`) and the `AssetKey` union (`src/types/index.ts`) in sync
  everywhere `ASSETS[k]` is looked up.
- State is not persisted anywhere (no localStorage, no DB) — everything resets on page
  refresh. Don't assume state survives a reload when reasoning about behavior.
- There is no auth and no routing library — `tab` in `App.tsx` is plain `useState`, not
  a URL. Don't assume deep links or browser back/forward work.
