"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useSceneTransition } from "@/components/providers/SceneTransitionProvider";
import { cn } from "@/lib/utils";

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
    },
  },
  detectRetina: true,
};

function ParticleCanvas() {
  return (
    <Particles
      id="tsparticles"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full [view-transition-name:none]"
      options={particleOptions}
    />
  );
}

export function ParticleBackground() {
  const { holding } = useSceneTransition();

  return (
    <div
      className={cn(
        "pointer-events-none [view-transition-name:none]",
        holding && "invisible"
      )}
      aria-hidden={holding}
    >
      <ParticlesProvider init={loadSlim}>
        <ParticleCanvas />
      </ParticlesProvider>
    </div>
  );
}
