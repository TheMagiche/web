import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getDocumentSlugs("marks-journals").map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const post = getDocumentBySlug("marks-journals", slug, [
    "title",
    "publishedAt",
    "content",
  ]);

  if (!post) notFound();

  return (
    <main className="relative z-10 mx-auto min-h-screen w-full max-w-3xl px-6 py-32 md:px-12">
      <TransitionLink
        href="/home"
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-foreground"
      >
        ← Return to the journal
      </TransitionLink>
      <article className="blog-parchment blog-scroll mt-12 overflow-y-auto rounded-sm border p-6 md:p-10">
        <time
          dateTime={new Date(post.publishedAt).toISOString()}
          className={cn("font-mono text-[10px] uppercase")}
        >
          {new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(post.publishedAt))}
        </time>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-wide text-foreground md:text-6xl">
          {post.title}
        </h1>
        <div className="blog-content mt-10 border-t border-border/50 pt-8 text-lg leading-relaxed text-muted">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </article>
    </main>
  );
}