"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import type { GithubProject } from "@/lib/github";

interface SiteShellProps {
  projects: GithubProject[];
}

export function SiteShell({ projects }: SiteShellProps) {
  const router = useRouter();

  useEffect(() => {
    let accumulated = 0;
    let touchStartY = 0;

    const goToLanding = () => {
      accumulated = 0;
      router.push("/");
    };

    const onWheel = (event: WheelEvent) => {
      if (window.scrollY > 4) {
        accumulated = 0;
        return;
      }
      if (event.deltaY < 0) {
        accumulated += -event.deltaY;
        if (accumulated > 90) goToLanding();
      } else {
        accumulated = 0;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (window.scrollY > 4) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      if (currentY - touchStartY > 70) goToLanding();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [router]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
