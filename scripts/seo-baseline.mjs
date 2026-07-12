#!/usr/bin/env node
/**
 * SEO baseline checks for sakuraschoolsimulator.net
 * Usage: node scripts/seo-baseline.mjs [siteUrl]
 */
const siteUrl = (
  process.argv[2] ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sakuraschoolsimulator.net"
).replace(/\/$/, "");

const checks = [];

async function fetchText(path) {
  const res = await fetch(`${siteUrl}${path}`, { redirect: "follow" });
  return { status: res.status, text: await res.text(), url: res.url };
}

async function main() {
  console.log(`\nSEO baseline — ${siteUrl}\n`);

  try {
    const home = await fetchText("/");
    checks.push({
      name: "Homepage returns 200",
      ok: home.status === 200,
      detail: `status ${home.status}`,
    });

    const canonicalMatch = home.text.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
    );
    const canonical = canonicalMatch?.[1] ?? null;
    checks.push({
      name: "Canonical present",
      ok: Boolean(canonical),
      detail: canonical ?? "not found",
    });
    checks.push({
      name: "Canonical uses production domain",
      ok: !canonical || canonical.startsWith(siteUrl),
      detail: canonical ?? "n/a",
    });

    const robots = await fetchText("/robots.txt");
    checks.push({
      name: "robots.txt valid",
      ok: robots.status === 200 && robots.text.includes("Sitemap:"),
      detail: robots.text.split("\n").slice(0, 4).join(" | "),
    });

    const sitemap = await fetchText("/sitemap.xml");
    checks.push({
      name: "sitemap.xml valid",
      ok: sitemap.status === 200 && sitemap.text.includes("<urlset"),
      detail: `status ${sitemap.status}`,
    });

    const apk = await fetchText("/downloads/sakura-school-simulator.apk");
    checks.push({
      name: "APK download reachable",
      ok: apk.status === 200,
      detail: `status ${apk.status}`,
    });
  } catch (error) {
    console.error("Fetch failed:", error.message);
    process.exit(1);
  }

  for (const check of checks) {
    console.log(`${check.ok ? "✓" : "✗"} ${check.name}`);
    console.log(`  ${check.detail}\n`);
  }

  const failed = checks.filter((c) => !c.ok).length;
  console.log("Manual steps:");
  console.log(`  PageSpeed Insights: https://pagespeed.web.dev/analysis?url=${encodeURIComponent(siteUrl)}`);
  console.log(`  Rich Results Test:  https://search.google.com/test/rich-results?url=${encodeURIComponent(siteUrl)}`);
  console.log(`  Google Search Console: add property → submit ${siteUrl}/sitemap.xml\n`);

  process.exit(failed > 0 ? 1 : 0);
}

main();
