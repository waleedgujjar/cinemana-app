import { readFile } from "fs/promises";
import path from "path";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "downloads",
    siteConfig.downloadSaveName
  );

  const buffer = await readFile(filePath);

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": `attachment; filename="${siteConfig.downloadSaveName}"`,
      "Cache-Control": "public, max-age=86400",
      "Content-Length": String(buffer.byteLength),
    },
  });
}
