"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  speed?: number;
  delay?: number;
}

export function TypewriterText({
  text,
  className,
  style,
  as: Tag = "h1",
  speed = 70,
  delay = 240,
}: TypewriterTextProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let typed = 0;
    let intervalId = 0;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= text.length) window.clearInterval(intervalId);
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return (
    <Tag className={cn("relative", className)} style={style} aria-label={text}>
      <span className="invisible whitespace-pre-wrap" aria-hidden>
        {text}
      </span>
      <span className="absolute inset-0 whitespace-pre-wrap" aria-hidden>
        {text.slice(0, count)}
      </span>
    </Tag>
  );
}
