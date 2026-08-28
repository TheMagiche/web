"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { TarotCard } from "@/components/ui/TarotCard";
import { siteConfig } from "@/lib/data";
import { usePathwayTheme } from "@/components/providers/usePathwayTheme";
import { cn } from "@/lib/utils";
import type { GithubProject } from "@/lib/github";

const LOOP_COPIES = 3;

interface ProjectsProps {
  projects: GithubProject[];
}

function getSetWidth(scroller: HTMLElement, count: number) {
  const first = scroller.children[0] as HTMLElement | undefined;
  const nextSet = scroller.children[count] as HTMLElement | undefined;
  if (!first || !nextSet) return 0;
  return nextSet.offsetLeft - first.offsetLeft;
}

function loopedScrollTarget(scroller: HTMLElement, count: number) {
  const setWidth = getSetWidth(scroller, count);
  const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  if (setWidth <= 0 || maxScroll <= setWidth) return null;

  const left = scroller.scrollLeft;
  if (left <= 1) return left + setWidth;
  if (left >= setWidth * 2 || left >= maxScroll - 1) return left - setWidth;
  return null;
}

export function Projects({ projects }: ProjectsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wrappingRef = useRef(false);
  const { theme } = usePathwayTheme();

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el || projects.length === 0) return;

    const setWidth = getSetWidth(el, projects.length);
    if (setWidth <= 0) return;
    wrappingRef.current = true;
    el.scrollLeft = setWidth;
    wrappingRef.current = false;
  }, [projects.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || projects.length === 0) return;

    let isDragging = false;

    const wrap = () => {
      if (wrappingRef.current) return;
      const target = loopedScrollTarget(el, projects.length);
      if (target == null) return;

      wrappingRef.current = true;
      const snap = el.style.scrollSnapType;
      el.style.scrollSnapType = "none";
      el.scrollLeft = target;
      el.style.scrollSnapType = snap;
      wrappingRef.current = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("a, button")) return;
      isDragging = true;
      el.classList.add("cursor-grabbing");
      el.style.scrollSnapType = "none";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      el.scrollLeft -= event.movementX;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove("cursor-grabbing");
      el.style.scrollSnapType = "";
      wrap();
    };

    wrap();
    el.addEventListener("scroll", wrap, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const resize = new ResizeObserver(wrap);
    resize.observe(el);

    return () => {
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      resize.disconnect();
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
            className={cn(
              "mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors",
              theme.text,
              theme.hoverText
            )}
          >
            <GitHubIcon className="h-4 w-4" />
            github.com/{siteConfig.githubUsername}
          </a>
        </div>
      </div>
    );
  }

  const looped = Array.from({ length: LOOP_COPIES }, (_, copy) =>
    projects.map((project, index) => ({ project, index, copy }))
  ).flat();

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        tabIndex={0}
        aria-label="GitHub repositories as tarot cards"
        className="tarot-scroller flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-auto px-6 pb-10 pt-4 outline-none select-none [overflow-anchor:none]"
      >
        {looped.map(({ project, index, copy }) => (
          <div
            key={`${copy}-${project.name}`}
            className="tarot-card shrink-0 snap-center"
          >
            <TarotCard project={project} index={index} />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 px-6 text-center"
      >
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/50">
          Drag or scroll the spread — it loops
        </p>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded border px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all",
            theme.border,
            theme.text,
            theme.borderHover,
            theme.buttonGlow
          )}
        >
          <GitHubIcon className="h-4 w-4" />
          All repositories on GitHub
        </a>
      </motion.div>
    </div>
  );
}
