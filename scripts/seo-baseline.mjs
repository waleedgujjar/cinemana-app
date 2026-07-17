#!/usr/bin/env node
/**
 * SEO baseline checks for sakuraschoolsimulator.net
 * Usage: node scripts/seo-baseline.mjs [siteUrl]
 */
const APK_DOWNLOAD_URL =
  "https://d.apkpure.com/b/XAPK/jp.garud.ssimulator?version=latest";

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

function extractJsonLd(html) {
  const blocks = [];
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1].trim()));
    } catch {
      /* skip */
    }
  }
  return blocks;
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

    const graphs = extractJsonLd(home.text).flatMap((n) =>
      Array.isArray(n["@graph"]) ? [n, ...n["@graph"]] : [n]
    );
    const app = graphs.find((n) => n["@type"] === "SoftwareApplication");
    checks.push({
      name: "JSON-LD SoftwareApplication.downloadUrl",
      ok: app?.downloadUrl === APK_DOWNLOAD_URL,
      detail: app?.downloadUrl ?? "not found",
    });

    checks.push({
      name: "Google site verification meta tag",
      ok: home.text.includes(
        'name="google-site-verification" content="J-rRDIa0Cn9ZP0yl8a1lcHyP9xo8IbrNElCa8ncvFRY"'
      ),
      detail: home.text.includes("google-site-verification")
        ? "present"
        : "not found",
    });

    checks.push({
      name: "Homepage links to APKPure download",
      ok: home.text.includes("d.apkpure.com/b/XAPK/jp.garud.ssimulator"),
      detail: home.text.includes("d.apkpure.com")
        ? "APKPure URL found"
        : "not found",
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

    const feed = await fetchText("/feed.xml");
    checks.push({
      name: "feed.xml valid",
      ok: feed.status === 200 && feed.text.includes("<rss"),
      detail: `status ${feed.status}`,
    });

    const blog = await fetchText("/blog");
    const hasPosts = blog.text.includes("/blog/");
    const hasCmsError =
      blog.text.includes("Gagal memuat artikel") ||
      blog.text.includes("belum dikonfigurasi");
    checks.push({
      name: "Blog page loads",
      ok: blog.status === 200,
      detail: `status ${blog.status}`,
    });
    checks.push({
      name: "Blog has posts or clear status",
      ok: hasPosts || blog.text.includes("Belum ada artikel") || hasCmsError,
      detail: hasPosts
        ? "posts detected"
        : hasCmsError
          ? "CMS error shown"
          : "empty state",
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
  console.log(
    `  PageSpeed Insights: https://pagespeed.web.dev/analysis?url=${encodeURIComponent(siteUrl)}`
  );
  console.log(
    `  Rich Results Test:  https://search.google.com/test/rich-results?url=${encodeURIComponent(siteUrl)}`
  );
  console.log(
    `  Google Search Console: add property → submit ${siteUrl}/sitemap.xml\n`
  );

  process.exit(failed > 0 ? 1 : 0);
}

main();
