"use client";

import { motion } from "framer-motion";
import { Eye, Sparkles, Zap, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MysticalCard } from "@/components/ui/MysticalCard";
import { pathways } from "@/lib/data";

const iconMap = {
  Eye,
  Sparkles,
  Zap,
  BookOpen,
};

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
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-violet/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          title="Pathways of Power"
          subtitle="In the world of frontend development, mastery follows sequences. Each pathway represents a domain of expertise I've ascended through."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {pathways.map((pathway, i) => {
            const Icon = iconMap[pathway.icon as keyof typeof iconMap];
            const colors = colorMap[pathway.color as keyof typeof colorMap];

            return (
              <MysticalCard
                key={pathway.name}
                glowColor={pathway.color as "violet" | "cyan" | "amber" | "rose"}
                delay={i * 0.1}
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded border p-2.5 ${colors.bg} ${colors.border}`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
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
                    className={`h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan`}
                  />
                </div>
              </MysticalCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
