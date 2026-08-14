"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { GlitchText } from "@/components/effects/GlitchText";
import { usePathway } from "@/components/providers/PathwayProvider";
import { siteConfig } from "@/lib/data";

export function Hero() {
  const { selected } = usePathway();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
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

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-accent-amber animate-flicker" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-accent-cyan">
            Sequence 9 · {selected.sequenceName}
          </span>
          <Sparkles className="h-4 w-4 text-accent-amber animate-flicker" />
        </motion.div>

        <GlitchText
          as="h1"
          className="text-5xl font-bold md:text-7xl lg:text-8xl"
        >
          {siteConfig.name}
        </GlitchText>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 font-display text-xl tracking-wide text-muted md:text-2xl"
        >
          {siteConfig.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted/80"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded border border-accent-violet/40 bg-accent-violet/10 px-8 py-3 font-mono text-sm uppercase tracking-widest text-accent-violet transition-all hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:text-accent-cyan hover:shadow-[0_0_30px_rgba(0,245,212,0.2)]"
          >
            <span className="relative z-10">Explore the Grimoire</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="rounded border border-border px-8 py-3 font-mono text-sm uppercase tracking-widest text-muted transition-all hover:border-accent-violet/30 hover:text-foreground"
          >
            Send a Whisper
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-10 z-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent-cyan"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Descend
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
