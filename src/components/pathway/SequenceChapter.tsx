"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PathwayTarotCard } from "@/components/pathway/PathwayTarotCard";
import { usePathway } from "@/components/providers/PathwayProvider";
import { getDeveloperCopy } from "@/lib/developerJourney";
import { pathwayChoices } from "@/lib/pathways";
import { cn } from "@/lib/utils";

export type CardPlacement = "right" | "left" | "top";

export function getCardPlacement(rank: number): CardPlacement {
  const slot = rank % 3;
  if (slot === 0) return "right";
  if (slot === 2) return "left";
  return "top";
}

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
  const copy = getDeveloperCopy(rank);
  const placement = getCardPlacement(rank);
  const cardIndex = Math.max(
    0,
    pathwayChoices.findIndex((pathway) => pathway.id === selected.id)
  );
  const Heading = rank === 9 ? "h1" : "h2";

  const copyBlock = (
    <div className={cn("w-full", placement === "top" ? "max-w-3xl text-center" : "max-w-xl")}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="font-mono text-xs uppercase tracking-[0.4em] text-accent-cyan"
      >
        {copy.kicker}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.05 }}
      >
        <Heading
          className={cn(
            "mt-4 font-display font-bold tracking-wide",
            rank === 9
              ? "text-4xl md:text-6xl lg:text-7xl"
              : "text-4xl md:text-5xl lg:text-6xl"
          )}
        >
          {copy.heading}
        </Heading>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.12 }}
        className={cn(
          "mt-6 text-lg leading-relaxed text-muted",
          placement === "top" ? "mx-auto max-w-2xl" : "max-w-xl"
        )}
      >
        {copy.body}
      </motion.p>
    </div>
  );

  const card = (
    <motion.div
      className="flex shrink-0 justify-center [perspective:1400px]"
      initial={
        placement === "left"
          ? { opacity: 0, rotateY: 0, scale: 0.92 }
          : { opacity: 0, y: 28, scale: rank === 9 ? 0.82 : 0.94 }
      }
      whileInView={
        placement === "left"
          ? { opacity: 1, rotateY: 360, scale: 1 }
          : { opacity: 1, y: 0, scale: rank === 9 ? 0.9 : 1 }
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: placement === "left" ? 1.15 : 0.55,
        ease: "easeOut",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <PathwayTarotCard
        pathway={selected}
        index={cardIndex}
        rank={rank}
        active
        selected
      />
    </motion.div>
  );

  return (
    <section
      id={`sequence-${rank}`}
      className={cn(
        "relative flex min-h-screen flex-col justify-center overflow-hidden py-28",
        rank === 9 && "pt-28 pb-16"
      )}
    >
      <div className="absolute inset-0 grid-bg opacity-10" />

      {rank === 9 && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute h-64 w-64 rounded-full bg-accent-violet/10 blur-[100px] animate-pulse-glow"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute h-48 w-48 translate-x-32 translate-y-16 rounded-full bg-accent-cyan/10 blur-[80px] animate-pulse-glow"
          />
        </>
      )}

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-6",
          placement === "top" && "flex flex-col items-center gap-12",
          placement === "left" &&
            "grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14",
          placement === "right" &&
            "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14"
        )}
      >
        {placement === "top" && (
          <>
            {card}
            {copyBlock}
          </>
        )}
        {placement === "left" && (
          <>
            {card}
            {copyBlock}
          </>
        )}
        {placement === "right" && (
          <>
            {copyBlock}
            {card}
          </>
        )}
      </div>

      {children && (
        <div
          className={cn(
            "relative z-10 mt-14 w-full",
            bleed ? "" : "mx-auto max-w-7xl px-6"
          )}
        >
          {children}
        </div>
      )}

      {rank === 9 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Descend to the realm of the blessed
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
