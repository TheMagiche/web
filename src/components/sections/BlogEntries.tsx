"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { usePathway } from "@/components/providers/PathwayProvider";
import { getPathwayTheme } from "@/lib/pathwayTheme";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/posts";

interface BlogEntriesProps {
  posts: BlogPost[];
}

function getExcerpt(content: string) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`[\]()!-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > 150 ? `${plainText.slice(0, 150).trim()}...` : plainText;
}

export function BlogEntries({ posts }: BlogEntriesProps) {
  const { selected } = usePathway();
  const theme = getPathwayTheme(selected.color);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <p className={cn("font-mono text-[10px] uppercase tracking-[0.35em]", theme.text)}>
            Field notes · {posts.length.toString().padStart(2, "0")} entries
          </p>
          <h3
            className="mt-2 font-display text-2xl font-semibold tracking-wide"
            style={{ textShadow: theme.titleShadow }}
          >
            The Arcane Journal
          </h3>
        </div>
        <BookOpen className={cn("hidden h-7 w-7 sm:block", theme.text)} aria-hidden="true" />
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/70 bg-surface-elevated/30 px-6 py-10 text-center">
          <p className="font-display text-lg text-muted">The journal awaits its first entry.</p>
          <p className="mt-2 text-sm text-muted/70">
            Publish a post from the Outstatic dashboard to reveal it here.
          </p>
        </div>
      ) : (
        <div className="tarot-scroller flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-5 outline-none select-none [overflow-anchor:none]">
          {posts.map((post, index) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={cn(
                "group relative w-[min(82vw,24rem)] shrink-0 snap-center rounded-lg border border-border/60 bg-surface-elevated/50 p-5 transition-all",
                theme.hoverGlow
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <time
                  dateTime={post.publishedAt}
                  className={cn("font-mono text-[10px] uppercase")}
                >
                  {new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(post.publishedAt))}
                </time>
                <ArrowUpRight
                  className={cn(
                    "h-4 w-4 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  )}
                  aria-hidden="true"
                />
              </div>
              <h4 className="mt-4 font-display text-xl font-semibold tracking-wide text-foreground">
                {post.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted/80">
                {getExcerpt(post.content) || "A new fragment from the journal."}
              </p>
              <span className={cn("mt-5 inline-block font-mono text-[10px] uppercase")}>
                Read entry
              </span>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
