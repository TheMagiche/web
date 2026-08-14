"use client";

import { usePathname } from "next/navigation";
import { usePathway } from "@/components/providers/PathwayProvider";
import { getPathwayTheme } from "@/lib/pathwayTheme";

export function usePathwayTheme() {
  const pathname = usePathname();
  const { selected, highlighted } = usePathway();
  const pathway = pathname === "/" ? highlighted : selected;
  return { pathway, theme: getPathwayTheme(pathway.color) };
}
