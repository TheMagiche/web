"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { grimoireArcana } from "@/lib/data";
import type { PathwayChoice } from "@/lib/pathways";

const palettes = [
  {
    glow: "hover:shadow-[0_0_28px_rgba(157,78,221,0.4)]",
    gradient: "from-violet-600/35 via-surface to-cyan-600/20",
    border: "border-violet-500/45",
    ink: "text-accent-violet",
  },
  {
    glow: "hover:shadow-[0_0_28px_rgba(0,245,212,0.32)]",
    gradient: "from-cyan-600/35 via-surface to-emerald-600/20",
    border: "border-cyan-500/45",
    ink: "text-accent-cyan",
  },
  {
    glow: "hover:shadow-[0_0_28px_rgba(240,165,0,0.32)]",
    gradient: "from-amber-600/35 via-surface to-rose-600/20",
    border: "border-amber-500/45",
    ink: "text-accent-amber",
  },
  {
    glow: "hover:shadow-[0_0_28px_rgba(255,0,110,0.32)]",
    gradient: "from-rose-600/35 via-surface to-violet-600/20",
    border: "border-rose-500/45",
    ink: "text-accent-rose",
  },
] as const;

interface MiniTarotCardProps {
  pathway: PathwayChoice;
  index: number;
  selected?: boolean;
  onSelect: () => void;
}

export function MiniTarotCard({
  pathway,
  index,
  selected = false,
  onSelect,
}: MiniTarotCardProps) {
  const arcana = grimoireArcana[index % grimoireArcana.length];
  const palette = palettes[index % palettes.length];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 28, rotate: index % 2 === 0 ? -8 : 8 }}
      animate={{
        opacity: 1,
        y: selected ? -8 : 0,
        rotate: selected ? 0 : index % 2 === 0 ? -2 : 2,
        scale: selected ? 1.05 : 1,
      }}
      transition={{ delay: Math.min(index * 0.03, 0.45), duration: 0.45 }}
      whileHover={{ y: -10, rotate: 0, scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Draw the ${pathway.name} pathway`}
      aria-pressed={selected}
      className="group w-[7.25rem] shrink-0 text-left sm:w-[8.25rem]"
    >
      <div
        className={cn(
          "relative h-[11.5rem] overflow-hidden rounded-lg border-2 bg-gradient-to-b p-[5px] transition-shadow duration-300 sm:h-[13rem]",
          palette.border,
          palette.gradient,
          palette.glow,
          selected && "ring-2 ring-accent-amber/70"
        )}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-md border border-amber-500/20 bg-surface/95">
          <span className="pointer-events-none absolute left-1.5 top-1 text-[8px] text-accent-amber/40">
            ⌜
          </span>
          <span className="pointer-events-none absolute right-1.5 top-1 text-[8px] text-accent-amber/40">
            ⌝
          </span>
          <span className="pointer-events-none absolute bottom-1 left-1.5 text-[8px] text-accent-amber/40">
            ⌞
          </span>
          <span className="pointer-events-none absolute bottom-1 right-1.5 text-[8px] text-accent-amber/40">
            ⌟
          </span>

          <p
            className={cn(
              "pt-2.5 text-center font-display text-[10px] tracking-[0.28em]",
              palette.ink
            )}
          >
            ✦ {arcana.roman} ✦
          </p>

          <div className="relative mx-auto my-1 h-16 w-16 overflow-hidden rounded-full sm:h-[4.5rem] sm:w-[4.5rem]">
            <Image
              src={pathway.symbol}
              alt=""
              fill
              sizes="72px"
              className="object-cover mix-blend-screen"
            />
          </div>

          <div className="mt-auto border-t border-accent-amber/15 px-1.5 py-2 text-center">
            <p className="font-display text-[11px] font-bold leading-tight tracking-wide">
              {pathway.name}
            </p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-accent-amber">
              {pathway.sequenceName}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
