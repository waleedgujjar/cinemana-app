# Download + SEO operations

## APK download

- **URL:** `https://d.apkpure.com/b/XAPK/jp.garud.ssimulator?version=latest`
- **Source constant:** `src/lib/download-config.ts` → `APK_DOWNLOAD_URL`
- Download buttons open APKPure in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- No local APK hosting on the VPS

## Google Search Console

1. Add property: `https://sakuraschoolsimulator.net`
2. Verification meta tag is set in `src/app/layout.tsx` via Next.js metadata API
3. Submit sitemap: `https://sakuraschoolsimulator.net/sitemap.xml`
4. Monitor **Core Web Vitals** and **Page indexing** weekly

## Automated checks

```bash
npm run seo:baseline      # canonical, robots, sitemap, feed, APKPure link, GSC meta, blog
npm run seo:jsonld        # SoftwareApplication.downloadUrl → APKPure
npm run lighthouse        # full Lighthouse mobile report (needs Chrome)
```

## WordPress ACF

- `downloadFileUrl`: full `https://` URL only (local `/downloads/` paths are ignored)
- `downloadFileName`: `Sakura School Simulator APK`
- `version`: `v1.048.03`

## Core Web Vitals targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
