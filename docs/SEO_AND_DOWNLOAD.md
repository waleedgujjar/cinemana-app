# Download + SEO operations

## Nginx APK MIME (CloudPanel)

1. CloudPanel → **Sites** → `sakuraschoolsimulator.net` → **Vhost** → **Custom config**
2. Paste contents of [`deploy/nginx/apk-download.conf`](../deploy/nginx/apk-download.conf)
3. Reload Nginx: `sudo systemctl reload nginx`
4. Verify: `curl -sI https://sakuraschoolsimulator.net/downloads/sakura-school-simulator.apk | grep -i content`

Expected headers:

- `Content-Type: application/vnd.android.package-archive`
- `Content-Disposition: attachment`

Next.js also sets APK headers via `next.config.ts` when traffic hits the Node app directly.

## Google Search Console

1. Add property: `https://sakuraschoolsimulator.net`
2. Verify via DNS TXT or HTML file
3. Submit sitemap: `https://sakuraschoolsimulator.net/sitemap.xml`
4. Monitor **Core Web Vitals** and **Page indexing** weekly

## Automated checks

```bash
npm run seo:baseline      # canonical, robots, sitemap, APK 200
npm run seo:jsonld        # SoftwareApplication.downloadUrl
npm run lighthouse        # full Lighthouse mobile report (needs Chrome)
```

## WordPress ACF

In CMS site settings, set:

- `downloadFileUrl`: `/downloads/sakura-school-simulator.apk`
- `downloadFileName`: `Sakura School Simulator APK`
- `version`: `v1.048.03` (match `site-config.ts`)

## Core Web Vitals targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

Use GSC → Experience → Core Web Vitals after 28 days of traffic.
