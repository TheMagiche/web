"use client";

import { motion } from "framer-motion";
import { getPathwayTheme } from "@/lib/pathwayTheme";
import type { PathwayColor } from "@/lib/pathways";
import { cn } from "@/lib/utils";

interface MysticalCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: PathwayColor;
  delay?: number;
}

export function MysticalCard({
  children,
  className,
  glowColor = "violet",
  delay = 0,
}: MysticalCardProps) {
  const theme = getPathwayTheme(glowColor);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "glass relative overflow-hidden rounded-lg border border-border p-6 transition-all duration-300",
        theme.hoverGlow,
        className
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-violet/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent-cyan/5 blur-2xl" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
