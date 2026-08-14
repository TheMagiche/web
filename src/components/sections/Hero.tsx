"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PathwayTarotCard } from "@/components/pathway/PathwayTarotCard";
import { usePathway } from "@/components/providers/PathwayProvider";
import { getSequenceStory, pathwayChoices } from "@/lib/pathways";

export function Hero() {
  const { selected } = usePathway();
  const cardIndex = Math.max(
    0,
    pathwayChoices.findIndex((pathway) => pathway.id === selected.id)
  );
  const story = getSequenceStory(9, selected);

  return (
    <section
      id="sequence-9"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-16"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(18rem,32rem)_1fr] lg:gap-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-accent-cyan"
          >
            Sequence 9 · {story.tier}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-5xl font-bold tracking-wide md:text-7xl lg:text-8xl"
          >
            {story.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.32em] text-accent-amber"
          >
            {story.kicker}
          </motion.p>

          <motion.p
            key={`${selected.id}-copy`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted/80"
          >
            {story.body}
          </motion.p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PathwayTarotCard
            pathway={selected}
            index={cardIndex}
            active
            selected
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Ascend
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
