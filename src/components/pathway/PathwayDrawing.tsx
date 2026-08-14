"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TypewriterText } from "@/components/effects/TypewriterText";
import { PathwayTarotCard } from "@/components/pathway/PathwayTarotCard";
import { usePathway } from "@/components/providers/PathwayProvider";
import { siteConfig } from "@/lib/data";
import { getPathwayTheme } from "@/lib/pathwayTheme";
import { pathwayChoices } from "@/lib/pathways";
import { playPaperSlide } from "@/lib/sound";
import { cn } from "@/lib/utils";

export function PathwayDrawing() {
  const router = useRouter();
  const { selected, hasChosen, selectPathway, highlightPathway } = usePathway();
  const [activeIndex, setActiveIndex] = useState(0);
  const dragOrigin = useRef<number | null>(null);

  const active = pathwayChoices[activeIndex] ?? pathwayChoices[0];
  const previous = pathwayChoices[activeIndex - 1];
  const next = pathwayChoices[activeIndex + 1];
  const theme = getPathwayTheme(active.color);

  const goToIndex = useCallback((index: number) => {
    const next = Math.max(0, Math.min(pathwayChoices.length - 1, index));
    if (next === activeIndex) return;
    playPaperSlide();
    setActiveIndex(next);
    const pathway = pathwayChoices[next];
    if (pathway) highlightPathway(pathway.id);
  }, [activeIndex, highlightPathway]);

  const handleSelect = useCallback(
    (id: string) => {
      playPaperSlide();
      selectPathway(id);
      router.push("/home");
    },
    [router, selectPathway]
  );

  useEffect(() => {
    highlightPathway(active.id);
  }, [active.id, highlightPathway]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToIndex(activeIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToIndex(activeIndex + 1);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        handleSelect(active.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active.id, activeIndex, goToIndex, handleSelect]);

  const onPointerDown = (event: React.PointerEvent) => {
    dragOrigin.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (dragOrigin.current == null) return;
    const delta = event.clientX - dragOrigin.current;
    dragOrigin.current = null;
    if (delta > 50) goToIndex(activeIndex - 1);
    if (delta < -50) goToIndex(activeIndex + 1);
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-16 pt-28">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[minmax(22rem,40rem)_1fr] lg:gap-10">
        <header className="text-left">
          <motion.p
            key={`${active.id}-kicker`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "font-mono text-xs uppercase tracking-[0.45em] transition-colors",
              theme.text
            )}
          >
            {siteConfig.name}
          </motion.p>
          <TypewriterText
            text="Become my blessed"
            delay={500}
            className="mt-5 font-display text-4xl font-bold tracking-wide text-foreground md:text-6xl lg:text-7xl"
            style={{ textShadow: theme.titleShadow }}
          />
          <motion.p
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-sm leading-relaxed text-muted md:text-base"
          >
            {active.description}
          </motion.p>
          <p
            className={cn(
              "mt-4 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors",
              theme.text
            )}
          >
            Sequence 0 · {active.name}
            {hasChosen && selected.id === active.id ? " · Drawn" : ""}
          </p>
          <button
            type="button"
            onClick={() => handleSelect(active.id)}
            className={cn(
              "mt-8 rounded border px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all",
              theme.border,
              theme.bg,
              theme.text,
              theme.borderHover,
              theme.bgHover,
              theme.buttonGlow
            )}
          >
            Draw this card
          </button>
        </header>

        <div
          className="relative flex h-120ms-center justify-center sm:h-136"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {previous && (
            <div className="pointer-events-auto absolute left-0 z-0 origin-center translate-x-[-35%] scale-[0.72] opacity-40 transition-all duration-300 hover:opacity-60">
              <PathwayTarotCard
                pathway={previous}
                index={activeIndex - 1}
                onSelect={() => goToIndex(activeIndex - 1)}
              />
            </div>
          )}

          <div className="relative z-10">
            <PathwayTarotCard
              pathway={active}
              index={activeIndex}
              active
              selected={selected.id === active.id && hasChosen}
              onSelect={() => handleSelect(active.id)}
            />
          </div>

          {next && (
            <div className="pointer-events-auto absolute right-0 z-0 origin-center translate-x-[35%] scale-[0.72] opacity-40 transition-all duration-300 hover:opacity-60">
              <PathwayTarotCard
                pathway={next}
                index={activeIndex + 1}
                onSelect={() => goToIndex(activeIndex + 1)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
