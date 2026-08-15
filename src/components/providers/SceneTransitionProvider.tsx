"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { navigateWithViewTransition } from "@/lib/viewTransition";
import { cn } from "@/lib/utils";

const HOLD_MS = 1000;

type SceneTransitionContextValue = {
  holding: boolean;
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
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    if (holding && pathname === displayPath) {
      const reveal = window.setTimeout(() => setHolding(false), 80);
      return () => window.clearTimeout(reveal);
    }
  }, [displayPath, holding, pathname]);

  const navigate = useCallback(
    (href: string) => {
      setDisplayPath(href);
      setHolding(true);

      window.setTimeout(() => {
        navigateWithViewTransition(() => {
          router.push(href);
        });
      }, HOLD_MS);
    },
    [router]
  );

  return (
    <SceneTransitionContext.Provider
      value={{ holding, displayPath: holding ? displayPath : pathname, navigate }}
    >
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
