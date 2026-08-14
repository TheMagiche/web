"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Eye } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { usePathway } from "@/components/providers/PathwayProvider";
import { useActiveSequenceRank } from "@/components/pathway/useActiveSequenceRank";
import { getSequenceTitle } from "@/lib/pathways";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Navbar() {
  const pathname = usePathname();
  const { selected, highlighted } = usePathway();
  const activeRank = useActiveSequenceRank();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const onLanding = pathname === "/";
  const sequenceLabel =
    activeRank != null
      ? `Sequence ${activeRank} · ${getSequenceTitle(selected, activeRank)}`
      : `Sequence 0 · ${highlighted.name}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 shrink-0 text-accent-violet" />
          <span className="flex flex-col">
            <span className="font-display text-lg font-bold leading-none tracking-wider">
              {siteConfig.name}
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-accent-amber">
              {sequenceLabel}
            </span>
          </span>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-accent-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className={cn(
            "hidden rounded border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all md:block",
            onLanding
              ? "border-accent-cyan/50 text-accent-cyan"
              : "border-accent-amber/40 text-accent-amber hover:border-accent-cyan/50 hover:text-accent-cyan hover:shadow-[0_0_20px_rgba(0,245,212,0.2)]"
          )}
        >
          Re-select Pathway
        </Link>

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
            className="glass border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-accent-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="inline-block rounded border border-accent-amber/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent-amber"
                >
                  Re-select Pathway
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
