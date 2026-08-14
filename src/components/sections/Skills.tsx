"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MysticalCard } from "@/components/ui/MysticalCard";
import { pathways } from "@/lib/data";
import { usePathway } from "@/components/providers/PathwayProvider";

const colorMap = {
  violet: {
    text: "text-accent-violet",
    bg: "bg-accent-violet/10",
    border: "border-accent-violet/20",
    tag: "border-accent-violet/20 text-accent-violet",
  },
  cyan: {
    text: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    border: "border-accent-cyan/20",
    tag: "border-accent-cyan/20 text-accent-cyan",
  },
  amber: {
    text: "text-accent-amber",
    bg: "bg-accent-amber/10",
    border: "border-accent-amber/20",
    tag: "border-accent-amber/20 text-accent-amber",
  },
  rose: {
    text: "text-accent-rose",
    bg: "bg-accent-rose/10",
    border: "border-accent-rose/20",
    tag: "border-accent-rose/20 text-accent-rose",
  },
};

export function Skills() {
  const { selected } = usePathway();
  const displayedPathways = pathways.map((pathway, index) =>
    index === 0
      ? {
          ...pathway,
          name: `${selected.name} Pathway`,
          sequence: `Sequence 0 · ${selected.name}`,
          symbol: selected.symbol,
          color: selected.color,
        }
      : pathway
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
          {displayedPathways.map((pathway, i) => {
            const colors = colorMap[pathway.color as keyof typeof colorMap];

            return (
              <MysticalCard
                key={pathway.name}
                glowColor={pathway.color as "violet" | "cyan" | "amber" | "rose"}
                delay={i * 0.1}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`relative h-16 w-16 overflow-hidden rounded-full border ${colors.border} ${colors.bg}`}
                  >
                    <Image
                      src={pathway.symbol}
                      alt={`${pathway.name} symbol`}
                      fill
                      sizes="64px"
                      className="object-cover mix-blend-screen"
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">
                    {pathway.sequence}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold tracking-wide">
                  {pathway.name}
                </h3>
                <p className={`mt-1 text-sm font-mono ${colors.text}`}>
                  {pathway.domain}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pathway.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className={`rounded border px-2.5 py-1 font-mono text-xs ${colors.tag}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${85 - i * 5}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full rounded-full bg-linear-to-r from-accent-violet to-accent-cyan"
                  />
                </div>
              </MysticalCard>
            );
          })}
        </div>
  );
}
