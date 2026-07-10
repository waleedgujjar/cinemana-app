import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");
  const path = request.nextUrl.searchParams.get("path") ?? "/";

  if (!env.WORDPRESS_PREVIEW_SECRET || secret !== env.WORDPRESS_PREVIEW_SECRET) {
    return NextResponse.json({ message: "Invalid preview secret" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  if (slug) {
    redirect(`/blog/${slug}`);
  }

  redirect(path);
}
