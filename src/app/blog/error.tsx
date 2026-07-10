"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="section-padding pt-28">
      <div className="section-container text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Terjadi kesalahan
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gagal memuat konten blog. Silakan coba lagi.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Coba Lagi</Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Kembali ke Blog</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
