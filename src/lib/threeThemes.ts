import * as THREE from "three";
import type { PathwayColor } from "@/lib/pathways";

export interface PathwayThreePalette {
  primaryHex: number;
  primaryStr: string;
  secondaryHex: number;
  secondaryStr: string;
  tertiaryHex: number;
  tertiaryStr: string;
  glowHex: number;
  particleColor1: THREE.Color;
  particleColor2: THREE.Color;
  particleColor3: THREE.Color;
}

export const pathwayThreePalettes: Record<PathwayColor, PathwayThreePalette> = {
  violet: {
    primaryHex: 0x9d4edd,
    primaryStr: "#9d4edd",
    secondaryHex: 0x00f5d4,
    secondaryStr: "#00f5d4",
    tertiaryHex: 0xf0a500,
    tertiaryStr: "#f0a500",
    glowHex: 0xc77dff,
    particleColor1: new THREE.Color(0x9d4edd),
    particleColor2: new THREE.Color(0x00f5d4),
    particleColor3: new THREE.Color(0xf0a500),
  },
  cyan: {
    primaryHex: 0x00f5d4,
    primaryStr: "#00f5d4",
    secondaryHex: 0x00bbf9,
    secondaryStr: "#00bbf9",
    tertiaryHex: 0x9d4edd,
    tertiaryStr: "#9d4edd",
    glowHex: 0x70e000,
    particleColor1: new THREE.Color(0x00f5d4),
    particleColor2: new THREE.Color(0x00bbf9),
    particleColor3: new THREE.Color(0x9d4edd),
  },
  amber: {
    primaryHex: 0xf0a500,
    primaryStr: "#f0a500",
    secondaryHex: 0xff006e,
    secondaryStr: "#ff006e",
    tertiaryHex: 0x9d4edd,
    tertiaryStr: "#9d4edd",
    glowHex: 0xffb703,
    particleColor1: new THREE.Color(0xf0a500),
    particleColor2: new THREE.Color(0xff006e),
    particleColor3: new THREE.Color(0x9d4edd),
  },
  rose: {
    primaryHex: 0xff006e,
    primaryStr: "#ff006e",
    secondaryHex: 0x9d4edd,
    secondaryStr: "#9d4edd",
    tertiaryHex: 0x00f5d4,
    tertiaryStr: "#00f5d4",
    glowHex: 0xff5c8d,
    particleColor1: new THREE.Color(0xff006e),
    particleColor2: new THREE.Color(0x9d4edd),
    particleColor3: new THREE.Color(0x00f5d4),
  },
  gray: {
    primaryHex: 0xb8bec9,
    primaryStr: "#b8bec9",
    secondaryHex: 0x64748b,
    secondaryStr: "#64748b",
    tertiaryHex: 0x9d4edd,
    tertiaryStr: "#9d4edd",
    glowHex: 0xe2e8f0,
    particleColor1: new THREE.Color(0xb8bec9),
    particleColor2: new THREE.Color(0x64748b),
    particleColor3: new THREE.Color(0x9d4edd),
  },
  scarlet: {
    primaryHex: 0xe32636,
    primaryStr: "#e32636",
    secondaryHex: 0xff6b2c,
    secondaryStr: "#ff6b2c",
    tertiaryHex: 0xf0a500,
    tertiaryStr: "#f0a500",
    glowHex: 0xff4d6d,
    particleColor1: new THREE.Color(0xe32636),
    particleColor2: new THREE.Color(0xff6b2c),
    particleColor3: new THREE.Color(0xf0a500),
  },
  azure: {
    primaryHex: 0x5ba3ff,
    primaryStr: "#5ba3ff",
    secondaryHex: 0x00f5d4,
    secondaryStr: "#00f5d4",
    tertiaryHex: 0x2f6fed,
    tertiaryStr: "#2f6fed",
    glowHex: 0x80bfff,
    particleColor1: new THREE.Color(0x5ba3ff),
    particleColor2: new THREE.Color(0x00f5d4),
    particleColor3: new THREE.Color(0x2f6fed),
  },
  orange: {
    primaryHex: 0xff6b2c,
    primaryStr: "#ff6b2c",
    secondaryHex: 0xf0a500,
    secondaryStr: "#f0a500",
    tertiaryHex: 0xe32636,
    tertiaryStr: "#e32636",
    glowHex: 0xff8c42,
    particleColor1: new THREE.Color(0xff6b2c),
    particleColor2: new THREE.Color(0xf0a500),
    particleColor3: new THREE.Color(0xe32636),
  },
  "light-gold": {
    primaryHex: 0xf0d78a,
    primaryStr: "#f0d78a",
    secondaryHex: 0xe0b422,
    secondaryStr: "#e0b422",
    tertiaryHex: 0xf0a500,
    tertiaryStr: "#f0a500",
    glowHex: 0xffe8a3,
    particleColor1: new THREE.Color(0xf0d78a),
    particleColor2: new THREE.Color(0xe0b422),
    particleColor3: new THREE.Color(0xf0a500),
  },
  "dark-red": {
    primaryHex: 0xa11d1d,
    primaryStr: "#a11d1d",
    secondaryHex: 0xe32636,
    secondaryStr: "#e32636",
    tertiaryHex: 0x9d4edd,
    tertiaryStr: "#9d4edd",
    glowHex: 0xc1121f,
    particleColor1: new THREE.Color(0xa11d1d),
    particleColor2: new THREE.Color(0xe32636),
    particleColor3: new THREE.Color(0x9d4edd),
  },
  cream: {
    primaryHex: 0xefe4c4,
    primaryStr: "#efe4c4",
    secondaryHex: 0xf0a500,
    secondaryStr: "#f0a500",
    tertiaryHex: 0x00f5d4,
    tertiaryStr: "#00f5d4",
    glowHex: 0xfff3d6,
    particleColor1: new THREE.Color(0xefe4c4),
    particleColor2: new THREE.Color(0xf0a500),
    particleColor3: new THREE.Color(0x00f5d4),
  },
  golden: {
    primaryHex: 0xe0b422,
    primaryStr: "#e0b422",
    secondaryHex: 0xf0a500,
    secondaryStr: "#f0a500",
    tertiaryHex: 0xff6b2c,
    tertiaryStr: "#ff6b2c",
    glowHex: 0xffd000,
    particleColor1: new THREE.Color(0xe0b422),
    particleColor2: new THREE.Color(0xf0a500),
    particleColor3: new THREE.Color(0xff6b2c),
  },
  blue: {
    primaryHex: 0x2f6fed,
    primaryStr: "#2f6fed",
    secondaryHex: 0x00f5d4,
    secondaryStr: "#00f5d4",
    tertiaryHex: 0x9d4edd,
    tertiaryStr: "#9d4edd",
    glowHex: 0x4cc9f0,
    particleColor1: new THREE.Color(0x2f6fed),
    particleColor2: new THREE.Color(0x00f5d4),
    particleColor3: new THREE.Color(0x9d4edd),
  },
  "light-red": {
    primaryHex: 0xff7a7a,
    primaryStr: "#ff7a7a",
    secondaryHex: 0xff006e,
    secondaryStr: "#ff006e",
    tertiaryHex: 0xf0a500,
    tertiaryStr: "#f0a500",
    glowHex: 0xffa8a8,
    particleColor1: new THREE.Color(0xff7a7a),
    particleColor2: new THREE.Color(0xff006e),
    particleColor3: new THREE.Color(0xf0a500),
  },
};

export function getPathwayThreePalette(color: PathwayColor): PathwayThreePalette {
  return pathwayThreePalettes[color] ?? pathwayThreePalettes.violet;
}

export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function hasReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
