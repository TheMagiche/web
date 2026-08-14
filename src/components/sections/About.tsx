"use client";

import { motion } from "framer-motion";
import { Eye, Code2, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MysticalCard } from "@/components/ui/MysticalCard";
import { usePathway } from "@/components/providers/PathwayProvider";

const traits = [
  {
    icon: Eye,
    title: "The Observer",
    description:
      "I perceive the invisible patterns in user behavior and translate them into interfaces that feel inevitable.",
  },
  {
    icon: Code2,
    title: "The Artificer",
    description:
      "Every component is a crafted artifact — typed, tested, and tuned for performance at scale.",
  },
  {
    icon: Layers,
    title: "The Architect",
    description:
      "Building systems that scale from a single page to entire design ecosystems without losing coherence.",
  },
];

export function About() {
  const { selected } = usePathway();

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="The Origin Story"
          subtitle="Every Beyonder has a beginning. Mine started with a single line of HTML and an insatiable curiosity for what lies beyond the viewport."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-muted">
              I am{" "}
              <span className="text-gradient font-semibold">theMagiche</span>
              — a frontend developer who treats every project as a mystical
              undertaking. Like a {selected.sequenceName} navigating the fog of
              uncertainty, I
              bring clarity to complex interfaces through clean architecture,
              deliberate motion, and obsessive attention to detail.
            </p>
            <p className="leading-relaxed text-muted/80">
              With expertise spanning React, Next.js, and the entire modern
              frontend stack, I craft digital experiences that don&apos;t just
              function — they{" "}
              <em className="text-accent-violet not-italic">resonate</em>.
              Whether it&apos;s a blazing-fast e-commerce platform or an
              immersive data dashboard, I approach each challenge as a new
              pathway to ascend.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border bg-surface-elevated px-3 py-1 font-mono text-xs text-accent-cyan"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <div className="space-y-4">
            {traits.map((trait, i) => (
              <MysticalCard key={trait.title} glowColor="violet" delay={i * 0.15}>
                <div className="flex items-start gap-4">
                  <div className="rounded border border-accent-violet/20 bg-accent-violet/10 p-2">
                    <trait.icon className="h-5 w-5 text-accent-violet" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-wide">
                      {trait.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {trait.description}
                    </p>
                  </div>
                </div>
              </MysticalCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
