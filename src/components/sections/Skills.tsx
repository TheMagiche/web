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
      {displayedPotions.map((site, i) => {
        const theme = getPathwayTheme(site.color as PathwayColor);
        const href = site.url ?? "#";
        const previewSrc = `/websites/${site.image}`;

        return (
          <MysticalCard
            key={site.name}
            glowColor={site.color as PathwayColor}
            delay={i * 0.1}
          >
            <h3 className="mt-4 font-display text-xl font-bold tracking-wide">
              {site.name}
            </h3>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-1 inline-block font-mono text-xs transition-colors hover:underline",
                theme.text
              )}
            >
              {site.domain} ↗
            </a>

            <div
              className={cn(
                "group relative mt-4 overflow-hidden rounded-md border",
                theme.borderSoft
              )}
            >
              <div
                className={cn(
                  "relative aspect-video w-full overflow-hidden",
                  theme.bg
                )}
              >
                <Image
                  src={previewSrc}
                  alt={`${site.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top opacity-90 mix-blend-screen blur-[0px] saturate-110 scale-105"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/55" />
              </div>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "absolute inset-0 z-20 flex items-center justify-center bg-background/60 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  theme.text
                )}
              >
                <span className="rounded border border-current px-3 py-1">
                  Enter the Relic ↗
                </span>
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {site.skills.map((skill) => (
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
          </MysticalCard>
        );
      })}
    </div>
  );
}
