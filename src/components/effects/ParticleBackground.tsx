"use client";

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
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.2,
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
      className="fixed inset-0 -z-10 h-full w-full"
      options={particleOptions}
    />
  );
}

export function ParticleBackground() {
  return (
    <ParticlesProvider init={loadSlim}>
      <ParticleCanvas />
    </ParticlesProvider>
  );
}
