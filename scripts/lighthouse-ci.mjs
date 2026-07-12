#!/usr/bin/env node
/**
 * Monthly Lighthouse check — SEO category target 100.
 * Requires Chrome/Chromium. Run on production after deploy.
 *
 * Usage:
 *   npm run lighthouse
 *   node scripts/lighthouse-ci.mjs https://sakuraschoolsimulator.net
 */
import { spawnSync } from "node:child_process";

const siteUrl = (
  process.argv[2] ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sakuraschoolsimulator.net"
).replace(/\/$/, "");

const categories = ["seo", "performance", "accessibility", "best-practices"];
const args = [
  "lighthouse",
  siteUrl,
  "--only-categories=" + categories.join(","),
  "--form-factor=mobile",
  "--output=json",
  "--output=html",
  "--output-path=./lighthouse-report",
  "--chrome-flags=--headless --no-sandbox",
  "--quiet",
];

console.log(`Running Lighthouse (mobile) on ${siteUrl}...\n`);

const result = spawnSync("npx", args, {
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  console.error(
    "\nLighthouse failed. Install Chrome or run manually:\n" +
      `  npx lighthouse ${siteUrl} --view`
  );
  process.exit(result.status ?? 1);
}

console.log("\nReports written to lighthouse-report.report.json / .html");
console.log("Schedule: run monthly or after major deploys (GitHub Actions cron optional).");
