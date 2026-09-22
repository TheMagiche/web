"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InteractiveCardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max rotation in degrees (e.g. 14)
  glareColor?: string;
  disabled?: boolean;
}

export function InteractiveCardTilt({
  children,
  className,
  maxTilt = 12,
  glareColor = "rgba(255, 255, 255, 0.15)",
  disabled = false,
}: InteractiveCardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normX = (x - centerX) / centerX; // -1 to 1
      const normY = (y - centerY) / centerY; // -1 to 1

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setRotateX(-normY * maxTilt);
        setRotateY(normX * maxTilt);
        setGlarePos({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 0.85,
        });
      });
    },
    [disabled, maxTilt]
  );

  const handlePointerEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setRotateX(0);
      setRotateY(0);
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative will-change-transform [perspective:1000px] select-none",
        className
      )}
    >
      <div
        className="relative h-full w-full transition-transform ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? "scale3d(1.03, 1.03, 1.03) translateZ(12px)" : "scale3d(1, 1, 1)"
          }`,
          transitionDuration: isHovered ? "150ms" : "500ms",
        }}
      >
        {children}

        {/* Dynamic Holographic Foil & Specular Sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden mix-blend-color-dodge transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor} 0%, rgba(157, 78, 221, 0.12) 35%, rgba(0, 245, 212, 0.08) 60%, transparent 80%)`,
          }}
          aria-hidden="true"
        />

        {/* Subtle iridescent rainbow diagonal gradient */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `linear-gradient(${
              (rotateX + rotateY) * 10 + 135
            }deg, rgba(255,0,110,0.2) 0%, rgba(0,245,212,0.2) 50%, rgba(157,78,221,0.2) 100%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
