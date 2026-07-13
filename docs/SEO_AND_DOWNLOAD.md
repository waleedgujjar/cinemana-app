# Download + SEO operations

## APK download

- **URL:** `/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk`
- **Source constant:** `src/lib/download-config.ts` → `APK_DOWNLOAD_PATH`
- Served as static file from `public/downloads/` (no API route)

Upload the real APK to VPS before deploy. See `public/downloads/README.md`.

## Nginx APK MIME (CloudPanel)

1. CloudPanel → **Sites** → `sakuraschoolsimulator.net` → **Vhost** → **Custom config**
2. Paste contents of [`deploy/nginx/apk-download.conf`](../deploy/nginx/apk-download.conf)
3. Reload Nginx: `sudo systemctl reload nginx`
4. Verify:

```bash
curl -sI https://sakuraschoolsimulator.net/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk | grep -i content
```

## Google Search Console

1. Add property: `https://sakuraschoolsimulator.net`
2. Verify via DNS TXT or HTML file
3. Submit sitemap: `https://sakuraschoolsimulator.net/sitemap.xml`
4. Monitor **Core Web Vitals** and **Page indexing** weekly

## Automated checks

```bash
npm run seo:baseline      # canonical, robots, sitemap, feed, APK, blog
npm run seo:jsonld        # SoftwareApplication.downloadUrl
npm run lighthouse        # full Lighthouse mobile report (needs Chrome)
```

## WordPress ACF

- `downloadFileUrl`: `/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk`
- `downloadFileName`: `Sakura School Simulator APK`
- `version`: `v1.048.03`

## Core Web Vitals targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
