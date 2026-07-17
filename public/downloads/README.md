# Downloads

APK files are **not** hosted on this server.

All download buttons redirect to APKPure:

- **URL:** `https://d.apkpure.com/b/XAPK/jp.garud.ssimulator?version=latest`
- **Constant:** `APK_DOWNLOAD_URL` in `src/lib/download-config.ts`

No APK upload is required on the VPS for downloads to work.

## WordPress ACF (optional override)

Set `downloadFileUrl` to a full `https://` URL in CMS site settings. Local `/downloads/` paths are ignored and fall back to APKPure.
