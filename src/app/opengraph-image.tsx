import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `Sakura School Simulator APK — Unduh Gratis`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(at 75% 15%, rgba(109,40,255,0.25), transparent 55%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#a855f7",
            fontWeight: 600,
          }}
        >
          Unduh Gratis · Android APK
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Sakura School Simulator APK
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            color: "#94a3b8",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Simulasi sekolah open-world — jelajahi, kustomisasi, dan berpetualang gratis.
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#8b5cf6",
            color: "#f8fafc",
            borderRadius: 999,
            padding: "14px 32px",
            fontSize: 24,
            fontWeight: 700,
            alignSelf: "flex-start",
          }}
        >
          Unduh APK Sekarang · {siteConfig.version}
        </div>
      </div>
    ),
    size
  );
}
