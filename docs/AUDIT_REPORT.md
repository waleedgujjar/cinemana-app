# Full-Stack Audit Report — Sakura School Simulator

**Date:** 2026-07-13  
**Production URL:** https://sakuraschoolsimulator.net  
**CMS:** https://cms.sakuraschoolsimulator.net/graphql

---

## Production Readiness Score

| Area | Before | After |
|------|--------|-------|
| APK downloads | 4/10 | 9/10 |
| Blog integration | 3/10 | 8/10 |
| SEO / sitemap / RSS | 8/10 | 9/10 |
| Revalidation | 7/10 | 9/10 |
| Deployment scripts | 7/10 | 9/10 |
| **Overall** | **5.8/10** | **8.8/10** |

Remaining 1.2 points require manual VPS/WordPress steps (SSL, APK upload, plugin install).

---

## Task 1 — APK Download Fixes

### Issue 1: Wrong download path

- **Cause:** `site-config.ts` pointed to `/downloads/sakura-school-simulator.apk` (placeholder alias), not the real SAKURA file.
- **Fix:** Created `APK_DOWNLOAD_PATH` constant with exact filename; all buttons use it via `siteConfig.downloadFile`.
- **File:** `src/lib/download-config.ts`, `src/lib/site-config.ts`
- **Code:**
  ```ts
  export const APK_FILENAME =
    "SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk";
  export const APK_DOWNLOAD_PATH = `/downloads/${APK_FILENAME}` as const;
  ```

### Issue 2: Unnecessary `/api/download` route

- **Cause:** API route loaded 254MB into memory; no component referenced it.
- **Fix:** Deleted route; static file serving via `public/downloads/` + Nginx/Next headers.
- **File:** `src/app/api/download/route.ts` (deleted)

### Issue 3: WhatsNew ignored CMS siteConfig

- **Cause:** `whats-new.tsx` hardcoded `fallbackSiteSettings`; `page.tsx` did not pass `siteConfig`.
- **Fix:** Added `siteConfig` prop; homepage passes `settings.siteConfig`.
- **File:** `src/components/sections/whats-new.tsx`, `src/app/page.tsx`

### Issue 4: Stale docs/scripts

- **Cause:** SEO scripts and deploy script referenced stable alias path.
- **Fix:** Updated `scripts/seo-baseline.mjs`, `scripts/validate-jsonld.mjs`, `scripts/deploy-vps.sh`, `public/downloads/README.md`, `docs/SEO_AND_DOWNLOAD.md`.
- **File:** Multiple (see above)

### Issue 5: Git placeholder vs real binary

- **Cause:** GitHub 100MB limit; repo cannot store 254MB APK.
- **Fix:** `.gitignore` excludes real APK; deploy script fails if file missing on VPS.
- **File:** `.gitignore`, `scripts/deploy-vps.sh`

---

## Task 2 — Blog Integration Fixes

### Issue 6 (CRITICAL): SEO fragment breaks post queries

- **Cause:** `POST_CARD_FRAGMENT` required `seo { ...SeoFields }` on `PostTypeSEO`, which needs `add-wpgraphql-seo` + Rank Math. Without plugin, all list/detail queries failed.
- **Fix:** Split into `POST_CARD_BASE_FRAGMENT` (no SEO) and `POST_CARD_FRAGMENT` (with SEO). Fetchers use `executeWithSeoFallback()` — tries SEO query first, falls back to base on SEO field errors.
- **File:** `src/lib/wordpress/queries.ts`, `src/lib/wordpress/fetchers.ts`, `src/lib/wordpress/errors.ts`

### Issue 7 (CRITICAL): Silent GraphQL failures on `/blog`

- **Cause:** `getPosts()` catch block returned empty list; UI showed "Belum ada artikel" for CMS errors.
- **Fix:** Added `fetchStatus` and `fetchMessage` to `WpPostsResult`. Blog page shows distinct messages for `not_configured`, `graphql_error`, and genuinely empty.
- **File:** `src/lib/content-types.ts`, `src/lib/wordpress/fetchers.ts`, `src/app/blog/page.tsx`

### Issue 8 (HIGH): Category/tag GraphQL variable bug

- **Cause:** `$slug: [String]` used for both `categoryName: $slug` and `category(id: $slug, idType: SLUG)` — invalid GraphQL.
- **Fix:** Split variables: `$categoryNames: [String]` + `$categorySlug: ID!` (same pattern for tags).
- **File:** `src/lib/wordpress/queries.ts`, `src/lib/wordpress/fetchers.ts`

### Issue 9 (HIGH): Deploy script false-positive GraphQL test

- **Cause:** Deploy tested `{ posts { slug title } }` without `seo` — passed while app queries failed.
- **Fix:** Deploy now runs full query with `seo { title }`; warns if SEO plugin missing, fails on other errors.
- **File:** `scripts/deploy-vps.sh`

### Issue 10 (MEDIUM): ISR revalidate inconsistency

- **Cause:** Routes hardcoded `3600`; graphql client used `env.WORDPRESS_REVALIDATE_SECONDS`. Next.js cannot use imported values in `export const revalidate`.
- **Fix:** Documented alignment in `src/lib/revalidate.ts`; routes use literal `3600`; graphql fetch uses env.
- **File:** `src/lib/revalidate.ts`, all blog routes

### Issue 11 (MEDIUM): Revalidation missing category/tag tags

- **Cause:** WordPress webhook only sent `site-settings`, `posts`, `faqs`.
- **Fix:** Added `categories`, `tags` to default tags; `edited_term` hook revalidates category/tag archives.
- **File:** `wordpress/mu-plugins/headless-config.php`

### Issue 12 (MEDIUM): Unprotected fetchers

- **Cause:** `getCategories`, `getTags`, `getPostsByCategory`, `getPostsByTag` could throw uncaught.
- **Fix:** All fetchers wrapped in try/catch with `console.error` and safe empty defaults.
- **File:** `src/lib/wordpress/fetchers.ts`

### Issue 13: Dead env variable

- **Cause:** `WORDPRESS_WEBHOOK_SECRET` defined but never used.
- **Fix:** Removed from `src/lib/env.ts`.
- **File:** `src/lib/env.ts`

### Issue 14: URL rewriting

- **Status:** `rewriteCmsLinks()` in `src/lib/sanitize.ts` correctly maps CMS URLs to `/blog/{slug}`. No change needed.

### Issue 15: Post status filtering

- **Status:** All queries use `status: PUBLISH`. Drafts/future/private correctly excluded. No change needed.

---

## Task 3 — SEO and Deployment Fixes

### Issue 16: feed.xml could 500

- **Cause:** No try/catch around WP fetch in RSS route.
- **Fix:** Wrapped in try/catch; returns valid empty RSS on failure.
- **File:** `src/app/feed.xml/route.ts`

### Issue 17: Deploy branch mismatch

- **Cause:** Script hardcoded `git pull origin master`.
- **Fix:** Detects current branch via `git rev-parse --abbrev-ref HEAD`.
- **File:** `scripts/deploy-vps.sh`

### Issue 18: Secrets not validated on deploy

- **Cause:** Only `WORDPRESS_GRAPHQL_URL` was checked.
- **Fix:** Validates `REVALIDATION_SECRET`, `NEXT_PUBLIC_SITE_URL`, and all required vars are non-empty.
- **File:** `scripts/deploy-vps.sh`

### Issue 19: PM2 logs directory

- **Cause:** `logs/` gitignored but not created on first deploy.
- **Fix:** `mkdir -p logs` in deploy script.
- **File:** `scripts/deploy-vps.sh`

### Issue 20: Missing favicon

- **Cause:** No `icon.tsx` or `favicon.ico`.
- **Fix:** Added dynamic `src/app/icon.tsx`.
- **File:** `src/app/icon.tsx`

### Issue 21: Duplicate RSS link in layout

- **Cause:** Manual `<link rel="alternate">` duplicated metadata `alternates.types`.
- **Fix:** Removed manual head link; metadata handles RSS discovery.
- **File:** `src/app/layout.tsx`

### Issue 22: Incomplete seo:baseline

- **Cause:** Script did not check feed.xml, JSON-LD, or blog status.
- **Fix:** Extended checks for feed, SoftwareApplication.downloadUrl, blog posts.
- **File:** `scripts/seo-baseline.mjs`, `scripts/validate-jsonld.mjs`

---

## Environment Variables (verified usage)

| Variable | Used in | Status |
|----------|---------|--------|
| `WORDPRESS_GRAPHQL_URL` | `env.ts`, `graphql.ts`, all fetchers | Required |
| `NEXT_PUBLIC_WORDPRESS_URL` | `sanitize.ts`, `mappers.ts` | Link rewrite |
| `NEXT_PUBLIC_SITE_URL` | `site-config.ts`, metadata | Build-time |
| `REVALIDATION_SECRET` | `api/revalidate/route.ts` | Must match WP |
| `WORDPRESS_PREVIEW_SECRET` | `api/preview/route.ts` | Draft preview |
| `WORDPRESS_REVALIDATE_SECONDS` | `graphql.ts` fetch cache | Default 3600 |

---

## Manual Steps Required on VPS / WordPress

1. Upload real APK to:
   `public/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk`
2. Set `.env.production` with all secrets; rebuild after `NEXT_PUBLIC_*` changes
3. Issue Let's Encrypt SSL on `cms.sakuraschoolsimulator.net`
4. Install plugins: WPGraphQL, ACF, Rank Math, add-wpgraphql-seo
5. Upload `wordpress/mu-plugins/headless-config.php`
6. Set `wp-config.php`: `HEADLESS_FRONTEND_URL`, `HEADLESS_REVALIDATION_SECRET`
7. Publish posts (status = Published)
8. Run `bash scripts/deploy-vps.sh`
9. Submit sitemap in Google Search Console

---

## Post-Deploy Verification

```bash
# GraphQL
curl -s -X POST https://cms.sakuraschoolsimulator.net/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first:3) { nodes { slug title seo { title } } } }"}'

# APK
curl -sI https://sakuraschoolsimulator.net/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk

# Automated
npm run seo:baseline
npm run seo:jsonld
```

---

## Build Status

- `npm run lint` — pass
- `npm run build` — pass (WP SSL warnings expected locally until CMS cert is fixed)
