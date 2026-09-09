import { notFound } from "next/navigation";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";
import { TransitionLink } from "@/components/ui/TransitionLink";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getDocumentSlugs("posts").map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getDocumentBySlug("posts", slug, [
    "title",
    "publishedAt",
    "content",
  ]);

  if (!post) notFound();

  return (
    <main className="relative z-10 mx-auto min-h-screen w-full max-w-3xl px-6 py-32">
      <TransitionLink
        href="/home"
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-foreground"
      >
        ← Return to the journal
      </TransitionLink>
      <article className="mt-12">
        <time
          dateTime={new Date(post.publishedAt).toISOString()}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan"
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
        <div className="mt-10 whitespace-pre-wrap border-t border-border/50 pt-8 text-lg leading-relaxed text-muted">
          {post.content}
        </div>
      </article>
    </main>
  );
}