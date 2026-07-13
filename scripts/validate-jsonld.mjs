#!/usr/bin/env node
/**
 * Validate JSON-LD on the live homepage (SoftwareApplication.downloadUrl).
 * Usage: node scripts/validate-jsonld.mjs [siteUrl]
 */
const APK_PATH =
  "/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk";

const siteUrl = (
  process.argv[2] ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sakuraschoolsimulator.net"
).replace(/\/$/, "");

const expectedDownload = `${siteUrl}${APK_PATH}`;

function extractJsonLd(html) {
  const blocks = [];
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1].trim()));
    } catch {
      /* skip invalid JSON */
    }
  }
  return blocks;
}

function flatten(nodes) {
  const out = [];
  for (const node of nodes) {
    out.push(node);
    if (Array.isArray(node["@graph"])) out.push(...node["@graph"]);
  }
  return out;
}

async function main() {
  const res = await fetch(siteUrl, { redirect: "follow" });
  if (!res.ok) {
    console.error(`Homepage fetch failed: ${res.status}`);
    process.exit(1);
  }

  const html = await res.text();
  const graphs = flatten(extractJsonLd(html));
  const app = graphs.find((n) => n["@type"] === "SoftwareApplication");

  if (!app) {
    console.error("✗ SoftwareApplication schema not found");
    process.exit(1);
  }

  const downloadUrl = app.downloadUrl;
  const ok = downloadUrl === expectedDownload;

  console.log(ok ? "✓" : "✗", "SoftwareApplication.downloadUrl");
  console.log(`  expected: ${expectedDownload}`);
  console.log(`  actual:   ${downloadUrl ?? "(missing)"}`);

  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
