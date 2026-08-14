"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultPathway,
  pathwayChoices,
  type PathwayChoice,
} from "@/lib/pathways";

const STORAGE_KEY = "themagiche-pathway";

type PathwayContextValue = {
  selected: PathwayChoice;
  highlighted: PathwayChoice;
  hasChosen: boolean;
  selectPathway: (id: string) => PathwayChoice | null;
  highlightPathway: (id: string) => void;
};

const PathwayContext = createContext<PathwayContextValue | null>(null);

export function PathwayProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<PathwayChoice>(defaultPathway);
  const [highlighted, setHighlighted] = useState<PathwayChoice>(defaultPathway);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const match = pathwayChoices.find((pathway) => pathway.id === stored);
    if (match) {
      setSelected(match);
      setHighlighted(match);
      setHasChosen(true);
    }
  }, []);

  const selectPathway = useCallback((id: string) => {
    const match = pathwayChoices.find((pathway) => pathway.id === id);
    if (!match) return null;
    setSelected(match);
    setHighlighted(match);
    setHasChosen(true);
    window.localStorage.setItem(STORAGE_KEY, match.id);
    return match;
  }, []);

  const highlightPathway = useCallback((id: string) => {
    const match = pathwayChoices.find((pathway) => pathway.id === id);
    if (match) setHighlighted(match);
  }, []);

  const value = useMemo(
    () => ({
      selected,
      highlighted,
      hasChosen,
      selectPathway,
      highlightPathway,
    }),
    [selected, highlighted, hasChosen, selectPathway, highlightPathway]
  );

  return (
    <PathwayContext.Provider value={value}>{children}</PathwayContext.Provider>
  );
}

export function usePathway() {
  const context = useContext(PathwayContext);
  if (!context) {
    throw new Error("usePathway must be used within PathwayProvider");
  }
  return context;
}
