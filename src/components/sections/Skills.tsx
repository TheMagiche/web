"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MysticalCard } from "@/components/ui/MysticalCard";
import { potions as displayedPotions } from "@/lib/data";
import { getPathwayTheme } from "@/lib/pathwayTheme";
import type { PathwayColor } from "@/lib/pathways";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
          {displayedPotions.map((pathway, i) => {
            const theme = getPathwayTheme(pathway.color as PathwayColor);

            return (
              <MysticalCard
                key={pathway.name}
                glowColor={pathway.color as PathwayColor}
                delay={i * 0.1}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "relative h-16 w-16 overflow-hidden rounded-full border",
                      theme.borderSoft,
                      theme.bg
                    )}
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
                <p className={cn("mt-1 text-sm font-mono", theme.text)}>
                  {pathway.domain}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pathway.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className={cn(
                        "rounded border px-2.5 py-1 font-mono text-xs",
                        theme.borderSoft,
                        theme.text
                      )}
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
