"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="The Grimoire"
          subtitle="Arcane works forged in code — each project a testament to the craft of frontend sorcery."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-lg border ${project.border} bg-gradient-to-br ${project.gradient} p-px transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(157,78,221,0.15)]`}
            >
              <div className="relative h-full rounded-lg bg-surface/90 p-6 backdrop-blur-sm">
                <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-muted/40">
                  ◈ Tarot {String(i + 1).padStart(2, "0")}
                </div>

                <span className="font-mono text-xs text-accent-amber">
                  {project.codename}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-wide">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-surface-elevated px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-accent-cyan transition-colors hover:text-accent-violet">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </button>
                  <button className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground">
                    <GitHubIcon className="h-3.5 w-3.5" />
                    Source
                  </button>
                </div>

                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-accent-violet/5 blur-3xl transition-all duration-500 group-hover:bg-accent-violet/10" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
