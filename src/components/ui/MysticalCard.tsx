"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MysticalCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "violet" | "cyan" | "amber" | "rose";
  delay?: number;
}

const glowMap = {
  violet: "hover:shadow-[0_0_30px_rgba(157,78,221,0.3)] hover:border-violet-500/40",
  cyan: "hover:shadow-[0_0_30px_rgba(0,245,212,0.3)] hover:border-cyan-500/40",
  amber: "hover:shadow-[0_0_30px_rgba(240,165,0,0.3)] hover:border-amber-500/40",
  rose: "hover:shadow-[0_0_30px_rgba(255,0,110,0.3)] hover:border-rose-500/40",
};

export function MysticalCard({
  children,
  className,
  glowColor = "violet",
  delay = 0,
}: MysticalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "glass relative overflow-hidden rounded-lg border border-border p-6 transition-all duration-300",
        glowMap[glowColor],
        className
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-violet/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent-cyan/5 blur-2xl" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
