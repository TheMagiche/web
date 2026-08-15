"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Eye } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { usePathway } from "@/components/providers/PathwayProvider";
import { useActiveSequenceRank } from "@/components/pathway/useActiveSequenceRank";
import { getSequenceTitle } from "@/lib/pathways";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import { usePathwayTheme } from "@/components/providers/usePathwayTheme";

export function Navbar() {
  const pathname = usePathname();
  const { selected, highlighted } = usePathway();
  const { theme } = usePathwayTheme();
  const activeRank = useActiveSequenceRank();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sequenceLabel =
    activeRank != null
      ? `Sequence ${activeRank} · ${getSequenceTitle(selected, activeRank)}`
      : `Sequence 0 · ${highlighted.name}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/") return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 z-60 w-full transition-all duration-300",
        scrolled ? "glass border-none py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Eye className={cn("h-5 w-5 shrink-0 transition-colors", theme.text)} />
          <span className="flex flex-col">
            <span className="font-display text-lg font-bold leading-none tracking-wider">
              {siteConfig.name}
            </span>
            <span
              className={cn(
                "mt-1 font-mono text-[9px] uppercase tracking-[0.28em] transition-colors",
                theme.text
              )}
            >
              {sequenceLabel}
            </span>
          </span>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "font-mono text-sm uppercase tracking-widest text-muted transition-colors",
                  theme.hoverText
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <TransitionLink
          href="/"
          className={cn(
            "hidden rounded px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all md:block",
            theme.text,
            theme.buttonGlow
          )}
        >
          Re-select Pathway
        </TransitionLink>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-none md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-mono text-sm uppercase tracking-widest text-muted transition-colors",
                      theme.hoverText
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <TransitionLink
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "inline-block rounded px-4 py-2 font-mono text-xs uppercase tracking-widest",
                    theme.text
                  )}
                >
                  Re-select Pathway
                </TransitionLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
