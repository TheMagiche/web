"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sequenceRanks } from "@/lib/pathways";

export function useActiveSequenceRank() {
  const pathname = usePathname();
  const [rank, setRank] = useState(9);

  useEffect(() => {
    if (pathname !== "/home") return;

    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      let next = 9;

      for (const step of sequenceRanks) {
        const el = document.getElementById(`sequence-${step}`);
        if (el && el.offsetTop <= marker) next = step;
      }

      setRank(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return pathname === "/home" ? rank : null;
}
