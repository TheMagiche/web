"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  animate?: boolean;
}

export function GlitchText({
  children,
  className,
  as: Tag = "span",
  animate = true,
}: GlitchTextProps) {
  return (
    <Tag
      className={cn(
        "relative inline-block font-display tracking-wider",
        animate && "animate-glitch",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
