"use client";

import { useEffect, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
      density: { enable: true },
    },
    color: {
      value: ["#9d4edd", "#00f5d4", "#f0a500"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: "top",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#9d4edd",
      opacity: 0.08,
      width: 1,
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: ["attract", "grab"],
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      attract: {
        distance: 180,
        duration: 0.4,
        easing: "ease-out-quad",
        factor: 2.4,
        maxSpeed: 2.5,
        speed: 1.4,
      },
      grab: {
        distance: 150,
        links: {
          opacity: 0.28,
          color: "#00f5d4",
        },
      },
      push: {
        quantity: 8,
      },
    },
  },
  detectRetina: true,
};

function ParticleCanvas() {
  return (
    <Particles
      id="tsparticles"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      options={particleOptions}
    />
  );
}

type Burst = {
  id: number;
  x: number;
  y: number;
};

function ClickBursts() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const onClick = (event: PointerEvent) => {
      const id = event.timeStamp;
      setBursts((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== id));
      }, 700);
    };

    window.addEventListener("pointerdown", onClick);
    return () => window.removeEventListener("pointerdown", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="mouse-burst absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/70"
          style={{ left: burst.x, top: burst.y }}
        />
      ))}
    </div>
  );
}

export function ParticleBackground() {
  return (
    <ParticlesProvider init={loadSlim}>
      <ParticleCanvas />
      <ClickBursts />
    </ParticlesProvider>
  );
}
