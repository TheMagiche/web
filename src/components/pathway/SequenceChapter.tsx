"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathway } from "@/components/providers/PathwayProvider";
import { getSequenceStory } from "@/lib/pathways";
import { cn } from "@/lib/utils";

interface SequenceChapterProps {
  rank: number;
  children?: ReactNode;
  bleed?: boolean;
}

export function SequenceChapter({
  rank,
  children,
  bleed = false,
}: SequenceChapterProps) {
  const { selected } = usePathway();
  const story = getSequenceStory(rank, selected);

  return (
    <section
      id={`sequence-${rank}`}
      className="relative flex min-h-screen flex-col justify-center py-28"
    >
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-accent-cyan"
        >
          Sequence {rank} · {story.tier}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.05 }}
          className="mt-4 font-display text-4xl font-bold tracking-wide md:text-6xl lg:text-7xl"
        >
          {story.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.12 }}
          className="mt-3 font-mono text-[11px] uppercase tracking-[0.32em] text-accent-amber"
        >
          {story.kicker}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.18 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {story.body}
        </motion.p>
      </div>

      {children && (
        <div
          className={cn(
            "relative z-10 mt-14 w-full",
            bleed ? "" : "mx-auto max-w-6xl px-6"
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
