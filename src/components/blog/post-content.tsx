import { sanitizePostContent } from "@/lib/sanitize";

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  const sanitized = sanitizePostContent(content);

  return (
    <div
      className="prose-blog max-w-none text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base [&_a]:text-primary-hover [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_img]:rounded-xl [&_li]:mb-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
