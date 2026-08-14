"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { TarotCard } from "@/components/ui/TarotCard";
import { siteConfig } from "@/lib/data";
import type { GithubProject } from "@/lib/github";

interface ProjectsProps {
  projects: GithubProject[];
}

export function Projects({ projects }: ProjectsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("a, button")) return;
      isDragging = true;
      startX = event.clientX;
      startScroll = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      el.scrollLeft = startScroll - (event.clientX - startX);
    };

    const onPointerUp = () => {
      isDragging = false;
      el.classList.remove("cursor-grabbing");
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [projects.length]);

  if (projects.length === 0) {
    return (
      <div className="px-6">
        <div className="glass mx-auto max-w-lg rounded-lg p-8 text-center">
          <p className="text-sm text-muted">
            The archives are veiled for now. Visit GitHub to browse the full
            grimoire.
          </p>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-cyan transition-colors hover:text-accent-violet"
          >
            <GitHubIcon className="h-4 w-4" />
            github.com/{siteConfig.githubUsername}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        tabIndex={0}
        aria-label="GitHub repositories as tarot cards"
        className="tarot-scroller flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pb-10 pt-4 outline-none select-none"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
            className="tarot-card shrink-0 snap-center"
          >
            <TarotCard project={project} index={i} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 px-6 text-center"
      >
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/50">
          Drag or scroll the spread
        </p>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-all hover:border-accent-violet/40 hover:text-accent-cyan"
        >
          <GitHubIcon className="h-4 w-4" />
          All repositories on GitHub
        </a>
      </motion.div>
    </div>
  );
}
