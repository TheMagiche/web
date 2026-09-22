"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePathway } from "@/components/providers/PathwayProvider";
import { useSceneTransition } from "@/components/providers/SceneTransitionProvider";
import { getPathwayThreePalette, isWebGLAvailable } from "@/lib/threeThemes";
import { cn } from "@/lib/utils";

export function MysticBackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selected, highlighted } = usePathway();
  const { holding } = useSceneTransition();

  // Current active pathway color for palette interpolation
  const activeColor = (highlighted ?? selected).color;

  // Keep ref to activeColor so animation loop can lerp smoothly
  const activeColorRef = useRef(activeColor);
  useEffect(() => {
    activeColorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    if (!isWebGLAvailable()) return;
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let animationFrameId: number;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Particle System 1: Deep Astral Dust ---
    const deepStarCount = 800;
    const deepStarGeometry = new THREE.BufferGeometry();
    const deepPositions = new Float32Array(deepStarCount * 3);
    const deepScales = new Float32Array(deepStarCount);

    for (let i = 0; i < deepStarCount; i++) {
      deepPositions[i * 3] = (Math.random() - 0.5) * 1600;
      deepPositions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      deepPositions[i * 3 + 2] = (Math.random() - 0.5) * 1200 - 200;
      deepScales[i] = Math.random() * 2 + 1;
    }

    deepStarGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(deepPositions, 3)
    );
    deepStarGeometry.setAttribute(
      "scale",
      new THREE.BufferAttribute(deepScales, 1)
    );

    // Create circular glow point texture via 2D canvas
    const createStarTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(230, 240, 255, 0.8)");
      gradient.addColorStop(0.6, "rgba(160, 190, 255, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const starTexture = createStarTexture();

    const deepMaterial = new THREE.PointsMaterial({
      color: 0x8b87a0,
      size: 3,
      map: starTexture ?? undefined,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const deepStars = new THREE.Points(deepStarGeometry, deepMaterial);
    scene.add(deepStars);

    // --- Particle System 2: Mystic Constellation & Swirling Energy Particles ---
    const mysticCount = 450;
    const mysticGeometry = new THREE.BufferGeometry();
    const mysticPositions = new Float32Array(mysticCount * 3);
    const mysticBasePositions = new Float32Array(mysticCount * 3);
    const mysticColors = new Float32Array(mysticCount * 3);
    const mysticSpeeds = new Float32Array(mysticCount);
    const mysticPhases = new Float32Array(mysticCount);
    const mysticColorType = new Float32Array(mysticCount); // 0 = primary, 1 = secondary, 2 = tertiary

    const initialPalette = getPathwayThreePalette(activeColorRef.current);
    const c1 = initialPalette.particleColor1;
    const c2 = initialPalette.particleColor2;
    const c3 = initialPalette.particleColor3;

    for (let i = 0; i < mysticCount; i++) {
      const radius = 120 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * 600;

      mysticPositions[i * 3] = x;
      mysticPositions[i * 3 + 1] = y;
      mysticPositions[i * 3 + 2] = z;

      mysticBasePositions[i * 3] = x;
      mysticBasePositions[i * 3 + 1] = y;
      mysticBasePositions[i * 3 + 2] = z;

      mysticSpeeds[i] = 0.2 + Math.random() * 0.8;
      mysticPhases[i] = Math.random() * Math.PI * 2;

      const type = i % 3;
      mysticColorType[i] = type;
      const chosenColor = type === 0 ? c1 : type === 1 ? c2 : c3;
      mysticColors[i * 3] = chosenColor.r;
      mysticColors[i * 3 + 1] = chosenColor.g;
      mysticColors[i * 3 + 2] = chosenColor.b;
    }

    mysticGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(mysticPositions, 3)
    );
    mysticGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(mysticColors, 3)
    );

    const mysticMaterial = new THREE.PointsMaterial({
      size: 5,
      map: starTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const mysticPoints = new THREE.Points(mysticGeometry, mysticMaterial);
    scene.add(mysticPoints);

    // --- System 3: Celestial Occult Orbital Rings ---
    const ringGroup = new THREE.Group();
    const ringMaterial1 = new THREE.LineBasicMaterial({
      color: initialPalette.primaryHex,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const ringMaterial2 = new THREE.LineBasicMaterial({
      color: initialPalette.secondaryHex,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    const createRing = (radius: number, segments: number, mat: THREE.Material) => {
      const geom = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0)
        );
      }
      geom.setFromPoints(points);
      return new THREE.Line(geom, mat);
    };

    const ring1 = createRing(280, 128, ringMaterial1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    ringGroup.add(ring1);

    const ring2 = createRing(360, 128, ringMaterial2);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.z = Math.PI * 0.4;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    // --- Dynamic Target Colors for Smooth Lerp ---
    const currentC1 = new THREE.Color(c1);
    const currentC2 = new THREE.Color(c2);
    const currentC3 = new THREE.Color(c3);
    const targetC1 = new THREE.Color(c1);
    const targetC2 = new THREE.Color(c2);
    const targetC3 = new THREE.Color(c3);

    // --- Interaction States: Mouse & Scroll ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollZ = 0;
    let currentScrollZ = 0;

    const onPointerMove = (e: MouseEvent) => {
      // Normalized device coordinates (-1 to 1)
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(Math.max(scrollY / docHeight, 0), 1);
      // As user descends through sequence ranks, move into the cosmic plane
      targetScrollZ = scrollProgress * 150;
    };

    const onResize = () => {
      if (!container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    // Visibility change handling to save GPU cycles when unfocused
    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // --- Animation Clock ---
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Smooth scroll lerping
      currentScrollZ += (targetScrollZ - currentScrollZ) * 0.05;

      // Update Camera based on mouse & scroll
      camera.position.x = mouse.x * 60;
      camera.position.y = mouse.y * 40;
      camera.position.z = 400 - currentScrollZ;
      camera.lookAt(0, 0, 0);

      // Rotate deep stars gently
      deepStars.rotation.y = elapsedTime * 0.015;
      deepStars.rotation.x = elapsedTime * 0.008;

      // Rotate and animate orbital celestial rings
      ringGroup.rotation.z = elapsedTime * 0.03;
      ringGroup.rotation.y = mouse.x * 0.2 + elapsedTime * 0.01;
      ringGroup.rotation.x = mouse.y * 0.2;

      // Animate mystic particles
      const posAttr = mysticGeometry.attributes.position as THREE.BufferAttribute;
      const colorAttr = mysticGeometry.attributes.color as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const colorArray = colorAttr.array as Float32Array;

      // Target colors from active pathway
      const activePalette = getPathwayThreePalette(activeColorRef.current);
      targetC1.setHex(activePalette.primaryHex);
      targetC2.setHex(activePalette.secondaryHex);
      targetC3.setHex(activePalette.tertiaryHex);

      // Lerp colors toward active target
      currentC1.lerp(targetC1, 0.04);
      currentC2.lerp(targetC2, 0.04);
      currentC3.lerp(targetC3, 0.04);

      ringMaterial1.color.copy(currentC1);
      ringMaterial2.color.copy(currentC2);

      // Swirling wave motion
      for (let i = 0; i < mysticCount; i++) {
        const i3 = i * 3;
        const speed = mysticSpeeds[i];
        const phase = mysticPhases[i];
        const type = mysticColorType[i];

        // Orbit calculation
        const bx = mysticBasePositions[i3];
        const by = mysticBasePositions[i3 + 1];
        const bz = mysticBasePositions[i3 + 2];

        const wave = Math.sin(elapsedTime * speed + phase);
        const cosWave = Math.cos(elapsedTime * speed * 0.8 + phase);

        posArray[i3] = bx + wave * 15 + mouse.x * 25;
        posArray[i3 + 1] = by + cosWave * 15 + mouse.y * 25;
        posArray[i3 + 2] = bz + Math.sin(elapsedTime * 0.5 + phase) * 20;

        // Apply updated lerped colors
        const c = type === 0 ? currentC1 : type === 1 ? currentC2 : currentC3;
        colorArray[i3] = c.r;
        colorArray[i3 + 1] = c.g;
        colorArray[i3 + 2] = c.b;
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
      mysticPoints.rotation.y = -elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup handler ---
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      // Clean Three.js allocations
      deepStarGeometry.dispose();
      deepMaterial.dispose();
      mysticGeometry.dispose();
      mysticMaterial.dispose();
      ring1.geometry.dispose();
      ringMaterial1.dispose();
      ring2.geometry.dispose();
      ringMaterial2.dispose();
      if (starTexture) starTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none fixed inset-0 -z-15 overflow-hidden transition-opacity duration-700 [view-transition-name:none]",
        holding ? "opacity-20" : "opacity-100"
      )}
      aria-hidden="true"
    />
  );
}
