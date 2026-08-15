"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathway } from "@/components/providers/PathwayProvider";
import { useSceneTransition } from "@/components/providers/SceneTransitionProvider";
import { cn } from "@/lib/utils";

export function SceneBackground() {
  const { displayPath, holding, cinematic } = useSceneTransition();
  const { selected } = usePathway();
  const isHome = displayPath === "/home";

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden [view-transition-name:scene-background]"
      aria-hidden="true"
    >
      <AnimatePresence initial={false}>
        {isHome ? (
          <motion.div
            key={`home-${selected.id}`}
            className="absolute inset-0"
            initial={cinematic ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: cinematic ? 0.8 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/sky.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_20%] brightness-[0.55] saturate-[0.8]"
            />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            className="absolute inset-0"
            initial={cinematic ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: cinematic ? 0.8 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/seer.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_20%] brightness-[0.55] saturate-[0.8]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "absolute inset-0 bg-linear-to-b from-background/30 via-background/60 to-background transition-opacity duration-500",
          holding ? "opacity-15" : "opacity-100"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,8,0.72)_100%)] transition-opacity duration-500",
          holding ? "opacity-20" : "opacity-100"
        )}
      />
    </div>
  );
}
