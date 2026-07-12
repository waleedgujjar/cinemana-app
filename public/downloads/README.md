# APK downloads

Stable public URL (do not change when releasing a new version):

- **URL:** `/downloads/sakura-school-simulator.apk`
- **Version:** see `src/lib/site-config.ts` (`version`, `downloadFileSizeLabel`)

## Release workflow

1. Place the new APK in `public/downloads/` (any filename).
2. Run deploy — `scripts/deploy-vps.sh` copies the newest `SAKURA_*.apk` or `sakura-school-simulator.apk` to the stable name.
3. Update `version` and `downloadFileSizeLabel` in `src/lib/site-config.ts`.
4. Optional: set WordPress ACF `downloadFileUrl` to `/downloads/sakura-school-simulator.apk`.

## Alternative API route

`/api/download` streams the same file with `Content-Disposition: attachment`. Set `downloadFile: "/api/download"` in site config if Nginx MIME rules are unavailable.
