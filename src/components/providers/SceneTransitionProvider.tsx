"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  getSceneTransitionMessage,
  grimoireArcana,
  sceneTransitionsMessages,
} from "@/lib/data";
import { pathwayChoices, type PathwayChoice } from "@/lib/pathways";
import { usePathway } from "@/components/providers/PathwayProvider";
import { cn } from "@/lib/utils";

function messageForPathway(pathway: PathwayChoice) {
  const index = pathwayChoices.findIndex((item) => item.id === pathway.id);
  const tarotName = index >= 0 ? grimoireArcana[index]?.name : undefined;
  return (
    (tarotName && getSceneTransitionMessage(tarotName)) ||
    getSceneTransitionMessage(pathway.name) ||
    sceneTransitionsMessages[0]?.message ||
    ""
  );
}

const HOLD_MS = 5000;

type SceneTransitionContextValue = {
  holding: boolean;
  cinematic: boolean;
  displayPath: string;
  navigate: (href: string, pathwayId?: string) => void;
};

const SceneTransitionContext = createContext<SceneTransitionContextValue | null>(
  null
);

export function SceneTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { selected } = usePathway();
  const selectedRef = useRef(selected);
  const [holding, setHolding] = useState(false);
  const [cinematic, setCinematic] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);
  const [transitionMessage, setTransitionMessage] = useState("");
  const pendingRef = useRef(false);
  const holdTimerRef = useRef<number>(0);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    if (!holding || pathname !== displayPath || !pendingRef.current) return;

    pendingRef.current = false;
    setHolding(false);
    setCinematic(false);
  }, [displayPath, holding, pathname]);

  useEffect(() => {
    return () => window.clearTimeout(holdTimerRef.current);
  }, []);

  const navigate = useCallback(
    (href: string, pathwayId?: string) => {
      if (href !== "/home") {
        pendingRef.current = false;
        window.clearTimeout(holdTimerRef.current);
        setCinematic(false);
        setHolding(false);
        setDisplayPath(href);
        router.push(href);
        return;
      }

      if (pendingRef.current) return;

      const pathway =
        pathwayChoices.find((item) => item.id === pathwayId) ??
        selectedRef.current;

      pendingRef.current = true;
      setDisplayPath(href);
      setTransitionMessage(messageForPathway(pathway));
      setCinematic(true);
      setHolding(true);

      holdTimerRef.current = window.setTimeout(() => {
        router.push(href);
      }, HOLD_MS);
    },
    [router]
  );

  return (
    <SceneTransitionContext.Provider
      value={{
        holding,
        cinematic,
        displayPath: holding ? displayPath : pathname,
        navigate,
      }}
    >
      <AnimatePresence>
        {holding && (
          <motion.div
            key={transitionMessage}
            className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <p className="font-display max-w-2xl text-center text-sm font-semibold leading-relaxed tracking-wide text-foreground drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] md:text-lg">
              {transitionMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </SceneTransitionContext.Provider>
  );
}

export function useSceneTransition() {
  const context = useContext(SceneTransitionContext);
  if (!context) {
    throw new Error("useSceneTransition must be used within SceneTransitionProvider");
  }
  return context;
}

export function SceneContent({ children }: { children: ReactNode }) {
  const { holding } = useSceneTransition();

  return (
    <div
      className={cn(
        "transition-opacity duration-500",
        holding && "pointer-events-none opacity-0"
      )}
    >
      {children}
    </div>
  );
}
