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
  compact?: boolean;
  onSelect?: () => void;
}

export function PathwayTarotCard({
  pathway,
  index,
  rank,
  selected = false,
  active = false,
  compact = false,
  onSelect,
}: PathwayTarotCardProps) {
  const arcana = grimoireArcana[index % grimoireArcana.length];
  const theme = getPathwayTheme(pathway.color);
  const interactive = Boolean(onSelect);
  const story = rank != null ? getSequenceStory(rank, pathway) : null;

  const face = (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 bg-linear-to-b p-1.75 transition-shadow duration-500",
        compact
          ? "h-72 w-44 sm:h-80 sm:w-48"
          : "h-112 w-68 sm:h-128 sm:w-76",
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

        <header className={cn("text-center", compact ? "px-3 pt-4" : "px-5 pt-6")}>
          <p
            className={cn(
              "font-display tracking-[0.35em]",
              compact ? "text-xs" : "text-sm",
              theme.text
            )}
          >
            {story ? `Sequence ${rank}` : `✦ ${arcana.roman} ✦`}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70">
            {story ? story.tier : arcana.name}
          </p>
        </header>

        <div
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center",
            compact ? "mx-4 my-2" : "mx-6 my-3"
          )}
        >
          <div
            className={
              story
                ? "relative z-10 h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32"
                : compact
                  ? "relative z-10 h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28"
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

        <footer className={cn(
          "rounded-md border bg-surface-elevated/80 text-center",
          compact ? "mx-3 mb-3 px-3 py-2" : "mx-4 mb-4 px-4 py-3",
          theme.borderSoft
        )}>
          <p className={cn("font-display font-bold tracking-wide", compact ? "text-base" : "text-xl")}>
            {story ? story.title : pathway.name}
          </p>
          {/* <p className={cn("mt-1 font-mono text-[10px] uppercase tracking-widest", theme.text)}>
            {story
              ? `Sequence ${rank} · ${story.title}`
              : `Sequence 0 · ${pathway.name}`}
          </p> */}
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
