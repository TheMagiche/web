"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { grimoireArcana } from "@/lib/data";
import { getSequenceStory, type PathwayChoice } from "@/lib/pathways";
import { getPathwayTheme } from "@/lib/pathwayTheme";

interface PathwayTarotCardProps {
  pathway: PathwayChoice;
  index: number;
  rank?: number;
  selected?: boolean;
  active?: boolean;
  onSelect?: () => void;
}

export function PathwayTarotCard({
  pathway,
  index,
  rank,
  selected = false,
  active = false,
  onSelect,
}: PathwayTarotCardProps) {
  const arcana = grimoireArcana[index % grimoireArcana.length];
  const theme = getPathwayTheme(pathway.color);
  const interactive = Boolean(onSelect);
  const story = rank != null ? getSequenceStory(rank, pathway) : null;

  const face = (
    <div
      className={cn(
        "relative h-112 w-68 overflow-hidden rounded-xl border-2 bg-linear-to-b p-1.75 transition-shadow duration-500 sm:h-128 sm:w-76",
        theme.cardBorder,
        theme.cardGradient,
        theme.cardGlow,
        (selected || active) && `ring-2 ${theme.ring}`
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-amber-500/20 bg-surface/95">
        <span className={cn("pointer-events-none absolute left-2 top-2", theme.textSoft)}>
          ⌜
        </span>
        <span className={cn("pointer-events-none absolute right-2 top-2", theme.textSoft)}>
          ⌝
        </span>
        <span className={cn("pointer-events-none absolute bottom-2 left-2", theme.textSoft)}>
          ⌞
        </span>
        <span className={cn("pointer-events-none absolute bottom-2 right-2", theme.textSoft)}>
          ⌟
        </span>

        <header className="px-5 pt-6 text-center">
          <p
            className={cn(
              "font-display text-sm tracking-[0.35em]",
              theme.text
            )}
          >
            {story ? `Sequence ${rank}` : `✦ ${arcana.roman} ✦`}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70">
            {story ? story.tier : arcana.name}
          </p>
        </header>

        <div className="relative mx-6 my-3 flex flex-1 flex-col items-center justify-center">
          <div
            className={
              story
                ? "relative z-10 h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32"
                : "relative z-10 h-40 w-40 overflow-hidden rounded-full"
            }
          >
            <Image
              src={pathway.symbol}
              alt=""
              fill
              sizes="128px"
              className="object-cover mix-blend-screen"
            />
          </div>
          {story && (
            <p className="mt-4 max-h-28 overflow-hidden px-1 text-center text-[11px] leading-relaxed text-muted/90">
              {story.body}
            </p>
          )}
        </div>

        <footer className={cn("mx-4 mb-4 rounded-md border bg-surface-elevated/80 px-4 py-3 text-center", theme.borderSoft)}>
          <p className="font-display text-xl font-bold tracking-wide">
            {story ? story.title : pathway.name}
          </p>
          <p className={cn("mt-1 font-mono text-[10px] uppercase tracking-widest", theme.text)}>
            {story
              ? `Sequence ${rank} · ${story.title}`
              : `Sequence 0 · ${pathway.name}`}
          </p>
        </footer>
      </div>
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
    className: "pathway-draw-card",
  } as const;

  if (interactive) {
    return (
      <motion.button
        type="button"
        onClick={onSelect}
        aria-label={`Draw the ${pathway.name} pathway`}
        aria-pressed={selected}
        whileHover={{ y: -8 }}
        {...motionProps}
      >
        {face}
      </motion.button>
    );
  }

  return <motion.div {...motionProps}>{face}</motion.div>;
}
