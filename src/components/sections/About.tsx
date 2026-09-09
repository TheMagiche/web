"use client";

import { motion } from "framer-motion";
import { Code2, Container, Cloud, Server, Rocket, Sparkles, GitBranch, Globe } from "lucide-react";
import { usePathway } from "@/components/providers/PathwayProvider";
import { getPathwayTheme } from "@/lib/pathwayTheme";
import type { PathwayColor } from "@/lib/pathways";
import { cn } from "@/lib/utils";

const frontendSkills = [
  {
    icon: Code2,
    title: "Core Framework",
    description: "The foundation of modern digital realms",
    tools: ["React", "Next.js", "TypeScript", "Vite"],
  },
  {
    icon: Sparkles,
    title: "Styling & Design",
    description: "Weaving visual enchantments",
    tools: ["Tailwind CSS", "CSS Variables", "Design Systems", "Framer Motion"],
  },
  {
    icon: Globe,
    title: "SaaS & Fullstack",
    description: "Building scalable applications",
    tools: ["PostgreSQL", "Prisma", "Keystone", "Auth.js"],
  },
  {
    icon: GitBranch,
    title: "Tooling & Ecosystem",
    description: "The artisan's workshop",
    tools: ["ESLint", "Vitest", "Husky", "Storybook"],
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
  const theme = getPathwayTheme(selected.color as PathwayColor);

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

      {/* Frontend & Development Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 pt-6 border-t border-border/50"
      >
        <h3 className="font-display text-lg font-semibold tracking-wide"
            style={{ textShadow: theme.titleShadow }}>
          Frontend & Development Stack
        </h3>
        <p className="text-sm text-muted/80">
          Crafting the visible spells that users interact with, from the ethereal
          to the tangible.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {frontendSkills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className={cn(
                "group relative rounded-xl border border-border/50 bg-surface-elevated/50 p-4 transition-all",
                theme.hoverGlow
              )}
            >
              <div className={cn(
                "rounded-lg border p-3",
                theme.borderSoft,
                theme.bg
              )}>
                <skill.icon className={cn("h-6 w-6", theme.text)} />
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

      {/* DevOps & Infrastructure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4 pt-6 border-t border-border/50"
      >
        <h3 className="font-display text-lg font-semibold tracking-wide"
            style={{ textShadow: theme.titleShadow }}>
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
              className={cn(
                "group relative rounded-xl border border-border/50 bg-surface-elevated/50 p-4 transition-all",
                theme.hoverGlow
              )}
            >
              <div className={cn(
                "rounded-lg border p-3",
                theme.borderSoft,
                theme.bg
              )}>
                <skill.icon className={cn("h-6 w-6", theme.text)} />
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

