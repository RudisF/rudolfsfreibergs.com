---
name: run-rudolfsfreibergs-com
description: Run, build, smoke-test, and screenshot the rudolfsfreibergs.com Next.js site. Use when asked to start/run/preview the site, screenshot any page (home, about, work, adventures, soulful, media, blog, contact), build it, or verify routes render.
---

# Run rudolfsfreibergs.com

Next.js 14 (App Router) personal-brand site. Static pages + a few dynamic
routes (blog MDX, RSS, edge-runtime OG images, contact/subscribe API stubs).
This is a **Windows** host with **Microsoft Edge** (no `chromium-cli`).

The driver — `.claude/skills/run-rudolfsfreibergs-com/driver.mjs` — is how you
drive it: it HTTP-smoke-tests every route and screenshots pages through headless
Edge. All paths below are relative to the repo root.

> **Shell note:** `node` is **not** on the Git-bash PATH here. Use **PowerShell**
> with the PATH line shown below (this is also how the dev server is started).
> The dev server is **required** before the driver runs.

## Prerequisites

- Node at `C:\Program Files\nodejs` and Microsoft Edge at
  `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` (driver auto-detects).
- Install deps once (PowerShell):

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:APPDATA\npm;$env:PATH"; npm install
```

## Build / type-check

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:APPDATA\npm;$env:PATH"; npx tsc --noEmit
$env:PATH = "C:\Program Files\nodejs;$env:APPDATA\npm;$env:PATH"; npx next build
```

## Run (agent path) — driver

1. Start the dev server in its **own** terminal / background (long-running):

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:APPDATA\npm;$env:PATH"; npm run dev
```

Wait for `✓ Ready`. It serves http://localhost:3000 (see Gotchas if it lands on 3001).

2. Drive it (separate PowerShell):

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:APPDATA\npm;$env:PATH"; node .claude\skills\run-rudolfsfreibergs-com\driver.mjs all
```

- `driver.mjs smoke` — HTTP-check all 11 pages + `/blog/rss.xml` + the OG image route; exits non-zero on any failure.
- `driver.mjs shot /work /media` — screenshot specific route(s).
- `driver.mjs all` — smoke, then screenshot the 8 main pages (default).

Screenshots are written to `.claude/skills/run-rudolfsfreibergs-com/screenshots/`
(e.g. `home.png`, `work.png`). **Open them to confirm** — `work.png` should show
the single-line client logo strip and the "93 / Net Promoter Score" metric.

Verified output of `driver.mjs all` this session: all 13 checks `PASS`, 8 PNGs written.

## Run (human path)

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:APPDATA\npm;$env:PATH"; npm run dev
```

Open http://localhost:3000. Useless for headless verification — use the driver.

## Gotchas

- **`node` missing in Git-bash** (`exit 127`). Use PowerShell with the PATH line,
  or call the full path from bash: `"/c/Program Files/nodejs/node.exe" …`.
- **Port 3000 "stuck".** A dead `node` can hold the port; `npm run dev` then
  silently starts on **3001** and the driver (pointing at 3000) sees a stale or
  dead server. Free it, then restart:
  ```powershell
  Get-NetTCPConnection -LocalPort 3000 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
  ```
  (Or set `BASE_URL=http://localhost:3001` for the driver.)
- **Edge prints scary `ERROR:` lines** (`edge_ess`, `get_updates_processor`,
  task-manager) while screenshotting. They're telemetry/sync noise — the PNG is
  still written. The driver pipes them to null.
- **`next build` / dev must run from PowerShell**, not bash — Node isn't on the
  bash PATH. Config is `next.config.mjs` (ESM, for MDX); `next.config.ts` is
  **not** supported by Next 14.
- **OG images use the edge runtime** (`app/blog/[slug]/og/route.tsx`). The node
  runtime crashes here because the project path contains a space
  (`Claude Code testing` → `%20` breaks @vercel/og's font loader). Keep OG on edge.
- **HEIC images don't render** in any browser; the site only references JPG/PNG/webp.

## Troubleshooting

- **Driver: "Dev server not reachable at http://localhost:3000"** — the dev
  server isn't running (or is on 3001). Start it / free port 3000 (see Gotchas).
- **`driver.mjs smoke` FAIL on a route** — open that path in the human path; a
  content edit may have changed the substring the driver checks (see `ROUTES` in
  `driver.mjs`).
- **Blank/error screenshot** — the dev route 500'd; check the `npm run dev`
  terminal for the compile error and re-run after fixing.
