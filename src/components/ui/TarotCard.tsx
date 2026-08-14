"use client";

import Image from "next/image";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import { grimoireArcana, outsiderSymbols } from "@/lib/data";
import type { GithubProject } from "@/lib/github";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Vue: "#41b883",
  Dart: "#00B4AB",
  Python: "#3572A5",
};

const glowShadow = {
  violet: "hover:shadow-[0_0_40px_rgba(157,78,221,0.35)]",
  cyan: "hover:shadow-[0_0_40px_rgba(0,245,212,0.28)]",
  amber: "hover:shadow-[0_0_40px_rgba(240,165,0,0.28)]",
  rose: "hover:shadow-[0_0_40px_rgba(255,0,110,0.28)]",
};

const ink = {
  violet: "text-accent-violet",
  cyan: "text-accent-cyan",
  amber: "text-accent-amber",
  rose: "text-accent-rose",
};

interface TarotCardProps {
  project: GithubProject;
  index: number;
}

export function TarotCard({ project, index }: TarotCardProps) {
  const arcana = grimoireArcana[index % grimoireArcana.length];
  const symbol = outsiderSymbols[index % outsiderSymbols.length];

  return (
    <article
      className={cn(
        "group relative h-[460px] w-[280px] transition-transform duration-500",
        index % 2 === 0 ? "rotate-1 hover:rotate-0" : "-rotate-1 hover:rotate-0",
        "hover:-translate-y-3"
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-xl border-2 bg-gradient-to-b p-[7px] transition-shadow duration-500",
          project.border,
          project.gradient,
          glowShadow[project.glow]
        )}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-amber-500/20 bg-surface/95">
          <CornerOrnaments />

          <header className="px-5 pt-5 text-center">
            <p
              className={cn(
                "font-display text-sm tracking-[0.35em]",
                ink[project.glow]
              )}
            >
              ✦ {arcana.roman} ✦
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70">
              {arcana.name}
            </p>
          </header>

          <div className="relative mx-5 my-3 flex flex-1 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-accent-violet/15" />
            <div className="absolute inset-4 rounded-full border border-accent-amber/10" />
            <div className="relative z-10 h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={symbol}
                alt={`${arcana.name} outsider symbol`}
                fill
                sizes="128px"
                className="object-cover mix-blend-screen"
              />
            </div>
          </div>

          <footer className="relative mx-3 mb-3 rounded-md border border-accent-amber/15 bg-surface-elevated/80 px-4 py-3 text-center">
            <h3 className="font-display text-lg font-bold leading-tight tracking-wide">
              {project.name}
            </h3>
            <p className="mt-1 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-amber">
              {project.language && (
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      languageColors[project.language] ?? "#9d4edd",
                  }}
                />
              )}
              {project.language ?? "Arcane"}
            </p>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="mt-2 flex items-center justify-center gap-3 font-mono text-[11px] text-muted">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-accent-amber" />
                {project.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                {project.forks}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4">
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-accent-cyan transition-colors hover:text-accent-violet"
                >
                  <ExternalLink className="h-3 w-3" />
                  Demo
                </a>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
              >
                <GitHubIcon className="h-3 w-3" />
                Source
              </a>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}

function CornerOrnaments() {
  return (
    <>
      <span className="pointer-events-none absolute left-2 top-2 font-display text-[10px] text-accent-amber/50">
        ⌜
      </span>
      <span className="pointer-events-none absolute right-2 top-2 font-display text-[10px] text-accent-amber/50">
        ⌝
      </span>
      <span className="pointer-events-none absolute bottom-2 left-2 font-display text-[10px] text-accent-amber/50">
        ⌞
      </span>
      <span className="pointer-events-none absolute bottom-2 right-2 font-display text-[10px] text-accent-amber/50">
        ⌟
      </span>
    </>
  );
}
