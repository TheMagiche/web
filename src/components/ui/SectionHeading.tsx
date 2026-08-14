"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16 text-center", className)}
    >
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-linear-to-r from-transparent to-accent-violet" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
          ◆
        </span>
        <div className="h-px w-12 bg-linear-to-l from-transparent to-accent-violet" />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-wide text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>
      )}
    </motion.div>
  );
}
