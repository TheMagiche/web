"use client";

import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { SequenceCardBridge } from "@/components/pathway/SequenceCardBridge";
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
        <SequenceCardBridge ranks={[9, 8, 7]}>
          <SequenceChapter rank={9} cardMode="slot" />
          <SequenceChapter rank={8} cardMode="slot" />
          <SequenceChapter rank={7} cardMode="slot">
            <About />
          </SequenceChapter>
        </SequenceCardBridge>
        <SequenceCardBridge ranks={[6, 5]}>
          <SequenceChapter rank={6} cardMode="slot" />
          <SequenceChapter rank={5} cardMode="slot">
            <Skills />
          </SequenceChapter>
        </SequenceCardBridge>
        <SequenceChapter rank={4} bleed>
          <Projects projects={projects} />
        </SequenceChapter>
        <SequenceCardBridge ranks={[3, 2]}>
          <SequenceChapter rank={3} cardMode="slot" />
          <SequenceChapter rank={2} cardMode="slot">
            <Contact />
          </SequenceChapter>
        </SequenceCardBridge>
        <SequenceChapter rank={1} />
        <SequenceChapter rank={0}>
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
        </SequenceChapter>
      </main>
      <Footer />
    </>
  );
}
