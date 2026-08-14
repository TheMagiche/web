"use client";

import { useCallback, useEffect, useMemo, useRef, type CSSProperties } from "react";
import Typewriter, { type TypewriterClass } from "typewriter-effect";
import { preloadIntro, startIntro } from "@/lib/sound";

const INTRO_DURATION_MS = 6000;

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  speed?: number;
  delay?: number;
  playIntro?: boolean;
}

export function TypewriterText({
  text,
  className,
  style,
  as: Tag = "h1",
  speed = 70,
  delay = 240,
  playIntro = false,
}: TypewriterTextProps) {
  const introStarted = useRef(false);
  const typingDelay = playIntro
    ? Math.max(1, Math.round(INTRO_DURATION_MS / Math.max(text.length, 1)))
    : speed;

  useEffect(() => {
    introStarted.current = false;
    if (playIntro) preloadIntro();
  }, [playIntro, text]);

  const onCreateTextNode = useCallback((character: string, textNode: Text) => {
    if (!introStarted.current) {
      introStarted.current = true;
      void startIntro().then((playing) => {
        if (playing) return;

        const retry = () => {
          void startIntro();
          window.removeEventListener("pointerdown", retry);
          window.removeEventListener("keydown", retry);
        };

        window.addEventListener("pointerdown", retry);
        window.addEventListener("keydown", retry);
      });
    }

    return textNode;
  }, []);

  const options = useMemo(
    () => ({
      delay: typingDelay,
      loop: false,
      cursor: "|",
      ...(playIntro ? { onCreateTextNode } : {}),
    }),
    [onCreateTextNode, playIntro, typingDelay]
  );

  const onInit = useCallback(
    (typewriter: TypewriterClass) => {
      if (playIntro) {
        typewriter.typeString(text).start();
        return;
      }

      typewriter.pauseFor(delay).typeString(text).start();
    },
    [delay, playIntro, text]
  );

  return (
    <Tag className={className} style={style} aria-label={text}>
      <Typewriter component="span" onInit={onInit} options={options} />
    </Tag>
  );
}
