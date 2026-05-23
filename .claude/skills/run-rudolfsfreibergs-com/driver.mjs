#!/usr/bin/env node
// Driver for rudolfsfreibergs.com (Next.js 14 web app).
// Smoke-tests every route over HTTP and screenshots pages via headless
// Microsoft Edge (Chromium). Windows host — Edge stands in for chromium-cli.
//
// Usage (dev server must already be running on BASE):
//   node driver.mjs smoke          # HTTP-check every route, exit 1 on failure
//   node driver.mjs shot [route…]  # screenshot route(s) -> ./screenshots
//   node driver.mjs all            # smoke + screenshot the main pages (default)
//
// Env: BASE_URL (default http://localhost:3000)

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const HERE = dirname(fileURLToPath(import.meta.url));
const SHOTS = join(HERE, "screenshots");

const EDGE =
  [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ].find(existsSync) || null;

// path -> a substring that must appear in the rendered HTML
const ROUTES = [
  ["/", "not the destination"],
  ["/about", "Man behind the stories"],
  ["/adventures", "Where the map runs out"],
  ["/work", "turning technical work"],
  ["/soulful", "Soulful experiences"],
  ["/media", "Strategic roadmap for eCommerce"],
  ["/blog", "How I built my website"],
  ["/blog/how-i-built-my-website-on-claude-code", "How I built my website"],
  ["/contact", "Contact Rudolfs"],
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms of Service"],
];

async function serverUp() {
  try {
    const r = await fetch(BASE + "/");
    return r.status === 200;
  } catch {
    return false;
  }
}

async function smoke() {
  let fail = 0;

  for (const [path, needle] of ROUTES) {
    try {
      const r = await fetch(BASE + path);
      const body = await r.text();
      const ok = r.status === 200 && body.includes(needle);
      console.log(`${ok ? "PASS" : "FAIL"}  ${r.status}  ${path}${ok ? "" : `  (missing "${needle}")`}`);
      if (!ok) fail++;
    } catch (e) {
      console.log(`FAIL  ERR  ${path}  (${e.message})`);
      fail++;
    }
  }

  // RSS feed (XML, not HTML)
  try {
    const r = await fetch(BASE + "/blog/rss.xml");
    const body = await r.text();
    const ok = r.status === 200 && body.includes('<rss version="2.0"');
    console.log(`${ok ? "PASS" : "FAIL"}  ${r.status}  /blog/rss.xml`);
    if (!ok) fail++;
  } catch (e) {
    console.log(`FAIL  ERR  /blog/rss.xml  (${e.message})`);
    fail++;
  }

  // Per-post OG image (edge runtime, needs query params)
  try {
    const r = await fetch(
      BASE + "/blog/how-i-built-my-website-on-claude-code/og?title=Test&rt=2%20min%20read",
    );
    const ct = r.headers.get("content-type") || "";
    const ok = r.status === 200 && ct.startsWith("image/");
    console.log(`${ok ? "PASS" : "FAIL"}  ${r.status}  /blog/[slug]/og  (${ct})`);
    if (!ok) fail++;
  } catch (e) {
    console.log(`FAIL  ERR  /blog/[slug]/og  (${e.message})`);
    fail++;
  }

  console.log(fail ? `\n${fail} check(s) failed.` : `\nAll checks passed.`);
  return fail;
}

function shot(path) {
  if (!EDGE) {
    console.error("Microsoft Edge not found at the expected paths — edit EDGE in driver.mjs.");
    return false;
  }
  mkdirSync(SHOTS, { recursive: true });
  const name =
    (path === "/" ? "home" : path.replace(/^\//, "").replace(/[/?=&]/g, "_")).slice(0, 80) + ".png";
  const out = join(SHOTS, name);
  spawnSync(
    EDGE,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--window-size=1440,2400",
      `--screenshot=${out}`,
      BASE + path,
    ],
    { encoding: "utf8", timeout: 60000 },
  );
  const ok = existsSync(out);
  console.log(ok ? `shot  ${name}` : `FAIL  no screenshot for ${path}`);
  return ok;
}

const cmd = process.argv[2] || "all";
const args = process.argv.slice(3);

if (!(await serverUp())) {
  console.error(
    `Dev server not reachable at ${BASE}.\n` +
      `Start it first (PowerShell):\n` +
      `  $env:PATH = "C:\\Program Files\\nodejs;$env:APPDATA\\npm;$env:PATH"; npm run dev\n` +
      `then re-run this driver.`,
  );
  process.exit(1);
}

if (cmd === "smoke") {
  process.exit((await smoke()) ? 1 : 0);
} else if (cmd === "shot") {
  const paths = args.length ? args : ["/"];
  let ok = true;
  for (const p of paths) ok = shot(p) && ok;
  process.exit(ok ? 0 : 1);
} else if (cmd === "all") {
  const fail = await smoke();
  console.log("");
  for (const p of ["/", "/about", "/adventures", "/work", "/soulful", "/media", "/blog", "/contact"])
    shot(p);
  console.log(`\nScreenshots in ${SHOTS}`);
  process.exit(fail ? 1 : 0);
} else {
  console.log("usage: node driver.mjs [smoke | shot [route…] | all]");
  process.exit(2);
}
