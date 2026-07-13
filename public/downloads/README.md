# APK downloads

Public download URL:

- **URL:** `/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk`
- **Constant:** `APK_DOWNLOAD_PATH` in `src/lib/download-config.ts`
- **Version / size:** `src/lib/site-config.ts`

## VPS deployment

The real APK (~254 MB) cannot be stored in GitHub. Upload it to the VPS at the exact path above before running `bash scripts/deploy-vps.sh`.

```bash
# From local machine
scp public/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk \
  user@vps:/home/sakuraschoolsimulator/htdocs/sakuraschoolsimulator.net/public/downloads/
```

## WordPress ACF (optional override)

Set `downloadFileUrl` to `/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk` in CMS site settings.
