"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MiniTarotCard } from "@/components/pathway/MiniTarotCard";
import { usePathway } from "@/components/providers/PathwayProvider";
import { siteConfig } from "@/lib/data";
import { pathwayChoices } from "@/lib/pathways";

export function PathwayDrawing() {
  const router = useRouter();
  const { selected, hasChosen, selectPathway } = usePathway();

  const handleSelect = (id: string) => {
    selectPathway(id);
    router.push("/home");
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent-cyan"
        >
          {siteConfig.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-4xl font-bold tracking-wide md:text-5xl"
        >
          Choose a Card
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-sm text-muted md:text-base"
        >
          Draw from the spread to enter the title page. Your card becomes
          Sequence 9.
        </motion.p>
        {hasChosen && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent-amber">
            Last fate · {selected.sequenceName}
          </p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="relative z-10 mt-10 flex max-w-6xl flex-wrap items-end justify-center gap-3 sm:gap-4"
      >
        {pathwayChoices.map((pathway, index) => (
          <MiniTarotCard
            key={pathway.id}
            pathway={pathway}
            index={index}
            selected={selected.id === pathway.id && hasChosen}
            onSelect={() => handleSelect(pathway.id)}
          />
        ))}
      </motion.div>
    </section>
  );
}
