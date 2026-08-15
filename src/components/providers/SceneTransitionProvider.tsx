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
import { cn } from "@/lib/utils";

const HOLD_MS = 2000;

type SceneTransitionContextValue = {
  holding: boolean;
  cinematic: boolean;
  displayPath: string;
  navigate: (href: string) => void;
};

const SceneTransitionContext = createContext<SceneTransitionContextValue | null>(
  null
);

export function SceneTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [holding, setHolding] = useState(false);
  const [cinematic, setCinematic] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);
  const pendingRef = useRef(false);
  const holdTimerRef = useRef<number>(0);

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
    (href: string) => {
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

      pendingRef.current = true;
      setDisplayPath(href);
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
            key="spectator-warning"
            className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <p className="font-display text-center text-2xl font-semibold tracking-[0.18em] text-foreground drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] md:text-4xl">
              Beware of the spectator
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
