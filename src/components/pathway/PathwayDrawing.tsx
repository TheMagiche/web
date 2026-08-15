"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypewriterText } from "@/components/effects/TypewriterText";
import { PathwayTarotCard } from "@/components/pathway/PathwayTarotCard";
import { usePathway } from "@/components/providers/PathwayProvider";
import { siteConfig } from "@/lib/data";
import { getPathwayTheme } from "@/lib/pathwayTheme";
import { pathwayChoices } from "@/lib/pathways";
import { useSceneTransition } from "@/components/providers/SceneTransitionProvider";
import { playPaperSlide } from "@/lib/sound";
import { cn } from "@/lib/utils";

export function PathwayDrawing() {
  const { navigate } = useSceneTransition();
  const { selected, hasChosen, selectPathway, highlightPathway } = usePathway();
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawing, setDrawing] = useState(false);
  const dragOrigin = useRef<number | null>(null);
  const didDrag = useRef(false);

  const active = pathwayChoices[activeIndex] ?? pathwayChoices[0];
  const previous = pathwayChoices[activeIndex - 1];
  const next = pathwayChoices[activeIndex + 1];
  const theme = getPathwayTheme(active.color);

  const goToIndex = useCallback((index: number) => {
    if (drawing) return;
    const next = Math.max(0, Math.min(pathwayChoices.length - 1, index));
    if (next === activeIndex) return;
    playPaperSlide();
    setActiveIndex(next);
    const pathway = pathwayChoices[next];
    if (pathway) highlightPathway(pathway.id);
  }, [activeIndex, drawing, highlightPathway]);

  const handleSelect = useCallback(
    (id: string) => {
      if (drawing) return;
      playPaperSlide();
      selectPathway(id);
      setDrawing(true);
      window.setTimeout(() => {
        navigate("/home");
      }, 2100);
    },
    [drawing, navigate, selectPathway]
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
    didDrag.current = false;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (dragOrigin.current == null) return;
    const delta = event.clientX - dragOrigin.current;
    dragOrigin.current = null;
    if (Math.abs(delta) <= 50) return;
    didDrag.current = true;
    if (delta > 50) goToIndex(activeIndex - 1);
    if (delta < -50) goToIndex(activeIndex + 1);
  };

  const selectCard = (id: string) => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    handleSelect(id);
  };

  return (
    <section className="relative flex h-screen flex-col overflow-hidden px-6 py-5">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <header className="relative z-10 mx-auto w-full max-w-3xl shrink-0 text-center">
        <motion.p
          key={`${active.id}-kicker`}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.45em] transition-colors md:text-xs",
            // theme.text
          )}
        >
          {siteConfig.name}
        </motion.p>
        <TypewriterText
          text="Become my blessed"
          playIntro
          className="mt-2 font-display text-2xl font-bold tracking-wide text-foreground md:text-3xl lg:text-4xl"
          style={{ textShadow: theme.titleShadow }}
        />
        <motion.p
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted md:text-sm"
        >
          {active.description}
        </motion.p>
        <p
          className={cn(
            "mt-2 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors",
            // theme.text
          )}
        >
          Sequence 0 · {active.name}
          {hasChosen && selected.id === active.id ? " · Drawn" : ""}
        </p>
      </header>

      <div
        className="relative z-10 mx-auto flex w-full max-w-4xl min-h-0 flex-1 items-center justify-center perspective-[1400px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {previous && (
          <div
            className={cn(
              "pointer-events-auto absolute left-0 z-0 origin-center translate-x-[-18%] scale-[0.72] opacity-40 transition-all duration-300 hover:opacity-60 sm:translate-x-[-8%]",
              drawing && "pointer-events-none opacity-0"
            )}
          >
            <PathwayTarotCard
              pathway={previous}
              index={activeIndex - 1}
              compact
              onSelect={() => goToIndex(activeIndex - 1)}
            />
          </div>
        )}

        <div className="relative z-10">
          <PathwayTarotCard
            pathway={active}
            index={activeIndex}
            compact
            active
            drawing={drawing}
            selected={selected.id === active.id && hasChosen}
            onSelect={() => selectCard(active.id)}
          />
        </div>

        {next && (
          <div
            className={cn(
              "pointer-events-auto absolute right-0 z-0 origin-center translate-x-[18%] scale-[0.72] opacity-40 transition-all duration-300 hover:opacity-60 sm:translate-x-[8%]",
              drawing && "pointer-events-none opacity-0"
            )}
          >
            <PathwayTarotCard
              pathway={next}
              index={activeIndex + 1}
              compact
              onSelect={() => goToIndex(activeIndex + 1)}
            />
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl shrink-0 pt-2 text-center">
        <button
          type="button"
          onClick={() => handleSelect(active.id)}
          disabled={drawing}
          className={cn(
            "rounded border px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-all disabled:opacity-40",
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
      </div>
    </section>
  );
}
