"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PathwayTarotCard } from "@/components/pathway/PathwayTarotCard";
import { usePathway } from "@/components/providers/PathwayProvider";
import { siteConfig } from "@/lib/data";
import { pathwayChoices } from "@/lib/pathways";

export function PathwayDrawing() {
  const router = useRouter();
  const { selected, hasChosen, selectPathway } = usePathway();
  const [activeIndex, setActiveIndex] = useState(0);
  const dragOrigin = useRef<number | null>(null);

  const active = pathwayChoices[activeIndex] ?? pathwayChoices[0];
  const previous = pathwayChoices[activeIndex - 1];
  const next = pathwayChoices[activeIndex + 1];

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(pathwayChoices.length - 1, index)));
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      selectPathway(id);
      router.push("/home");
    },
    [router, selectPathway]
  );

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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs uppercase tracking-[0.45em] text-accent-cyan"
          >
            {siteConfig.name}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-comic text-5xl font-bold leading-[1.05] tracking-wide text-foreground md:text-7xl lg:text-8xl"
            style={{
              textShadow:
                "0 0 28px rgba(157, 78, 221, 0.45), 0 0 64px rgba(0, 245, 212, 0.18)",
            }}
          >
            Become my blessed
          </motion.h1>
          <motion.p
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-sm leading-relaxed text-muted md:text-base"
          >
            {active.description}
          </motion.p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent-amber">
            Sequence 9 · {active.sequenceName}
            {hasChosen && selected.id === active.id ? " · Drawn" : ""}
          </p>
          <button
            type="button"
            onClick={() => handleSelect(active.id)}
            className="mt-8 rounded border border-accent-violet/40 bg-accent-violet/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-accent-violet transition-all hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:text-accent-cyan"
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
