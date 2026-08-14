"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TarotCard } from "@/components/ui/TarotCard";
import { siteConfig } from "@/lib/data";
import type { GithubProject } from "@/lib/github";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  projects: GithubProject[];
}

export function Projects({ projects }: ProjectsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, projects.length]);

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

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".tarot-card");
    const delta = (card?.offsetWidth ?? 280) + 24;
    el.scrollBy({ left: direction * delta, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative py-32">
      <div className="px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="The Grimoire"
            subtitle="Draw a card from the GitHub spread — each tarot is a repository, waiting to be turned."
          />
        </div>
      </div>

      {projects.length === 0 ? (
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
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous tarot card"
            className={cn(
              "absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur-sm transition-all md:flex",
              canScrollLeft
                ? "hover:border-accent-violet/50 hover:text-accent-cyan"
                : "cursor-not-allowed opacity-30"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Next tarot card"
            className={cn(
              "absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur-sm transition-all md:flex",
              canScrollRight
                ? "hover:border-accent-violet/50 hover:text-accent-cyan"
                : "cursor-not-allowed opacity-30"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-24" />

          <div
            ref={scrollerRef}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollByCard(-1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollByCard(1);
              }
            }}
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
        </div>
      )}

      {projects.length > 0 && (
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
      )}
    </section>
  );
}
