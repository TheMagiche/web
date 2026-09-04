"use client";

import { motion } from "framer-motion";
import { Eye, Code2, Layers, Container, Cloud, Server, Rocket } from "lucide-react";
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

const devOpsSkills = [
  {
    icon: Container,
    title: "Containerization",
    description: "Encapsulating spells in portable vessels",
    tools: ["Docker", "Docker Compose", "Containerd", "Podman"],
  },
  {
    icon: Cloud,
    title: "Cloud Platforms",
    description: "Summoning power from the ethereal realms",
    tools: ["AWS (EC2, S3, RDS)", "DigitalOcean", "Vultr", "Hetzner"],
  },
  {
    icon: Server,
    title: "VPS & Bare Metal",
    description: "Commanding the iron foundations directly",
    tools: ["Ubuntu/Debian", "Nginx", "Systemd", "SSH Hardening"],
  },
  {
    icon: Rocket,
    title: "Deployment & CI/CD",
    description: "Automating the ritual of release",
    tools: ["Coolify", "GitHub Actions", "GitLab CI", "Watchtower"],
  },
];

export function About() {
  const { selected } = usePathway();

  return (
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
        — Sequence 0 of the {selected.name} Pathway. I treat every project as
        a mystical undertaking. From the {selected.sequenceName} sequence to
        this seat of authority, I bring clarity to complex interfaces through
        clean architecture, deliberate motion, and obsessive attention to
        detail.
      </p>
      <p className="leading-relaxed text-muted/80">
        With expertise spanning React, Next.js, and the entire modern
        frontend stack, I craft digital experiences that don't just
        function — they{" "}
        <em className="text-accent-violet not-italic">resonate</em>. Whether
        it's a blazing-fast e-commerce platform or an immersive data
        dashboard, I approach each challenge as a new pathway to ascend.
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

      {/* DevOps & Infrastructure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 pt-6 border-t border-border/50"
      >
        <h3 className="font-display text-lg font-semibold tracking-wide text-gradient">
          Infrastructure & DevOps
        </h3>
        <p className="text-sm text-muted/80">
          From local cauldrons to cloud citadels — orchestrating the foundations that
          keep the spells running.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {devOpsSkills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="group relative rounded-xl border border-border/50 bg-surface-elevated/50 p-4 transition-all hover:border-accent-violet/50 hover:bg-accent-violet/5"
            >
              <div className="rounded-lg border border-accent-violet/20 bg-accent-violet/10 p-3">
                <skill.icon className="h-6 w-6 text-accent-violet" />
              </div>
              <h4 className="mt-3 font-medium tracking-wide">{skill.title}</h4>
              <p className="mt-1 text-xs text-muted/70">{skill.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted/60"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Traits() {
  return (
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
  );
}
