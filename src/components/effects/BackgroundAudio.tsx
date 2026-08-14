"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  stopIntro,
  startMainLoop,
  stopMainLoop,
} from "@/lib/sound";

export function BackgroundAudio() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    if (isLanding) {
      stopMainLoop();
    } else {
      stopIntro();
      startMainLoop();
    }

    const onFirstGesture = () => {
      if (!isLanding) startMainLoop();
    };

    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
  }, [isLanding]);

  useEffect(() => {
    return () => {
      stopIntro();
      stopMainLoop();
    };
  }, []);

  return null;
}
