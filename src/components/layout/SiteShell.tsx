"use client";

import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import {
  ContactAltar,
  ContactCorrespondences,
  ContactRitual,
} from "@/components/sections/Contact";
import { SequenceChapter } from "@/components/pathway/SequenceChapter";
import { usePathwayTheme } from "@/components/providers/usePathwayTheme";
import { cn } from "@/lib/utils";
import type { GithubProject } from "@/lib/github";
import { TransitionLink } from "@/components/ui/TransitionLink";

interface SiteShellProps {
  projects: GithubProject[];
}

export function SiteShell({ projects }: SiteShellProps) {
  const { theme } = usePathwayTheme();

  return (
    <>
      <main className="relative z-0 isolate">
        <SequenceChapter rank={9} />
        <SequenceChapter rank={8} />
        <SequenceChapter rank={7}>
          <About />
        </SequenceChapter>
        <SequenceChapter rank={6} />
        <SequenceChapter rank={5}>
          <Skills />
        </SequenceChapter>
        <SequenceChapter rank={4} bleed>
          <Projects projects={projects} />
        </SequenceChapter>
        <SequenceChapter rank={3} />
        <SequenceChapter rank={2}>
          <ContactCorrespondences />
        </SequenceChapter>
        <SequenceChapter rank={1}>
          <ContactRitual />
        </SequenceChapter>
        <SequenceChapter rank={0}>
          <div className="space-y-8">
            <ContactAltar />
            <TransitionLink
              href="/"
              className={cn(
                "inline-block rounded border px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all",
                theme.border,
                theme.text,
                theme.borderHover,
                theme.hoverText,
                theme.buttonGlow
              )}
            >
              Reselect Pathway
            </TransitionLink>
          </div>
        </SequenceChapter>
      </main>
      <Footer />
    </>
  );
}
