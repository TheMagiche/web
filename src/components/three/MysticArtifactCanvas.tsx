"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { usePathway } from "@/components/providers/PathwayProvider";
import { getPathwayThreePalette, isWebGLAvailable } from "@/lib/threeThemes";
import { cn } from "@/lib/utils";

interface MysticArtifactCanvasProps {
  className?: string;
  size?: number;
}

export function MysticArtifactCanvas({
  className,
  size = 320,
}: MysticArtifactCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selected, highlighted } = usePathway();
  const [isInteracting, setIsInteracting] = useState(false);

  const activePathway = highlighted ?? selected;
  const activeColor = activePathway.color;
  const activeSymbol = activePathway.symbol;

  const activeColorRef = useRef(activeColor);
  const activeSymbolRef = useRef(activeSymbol);

  useEffect(() => {
    activeColorRef.current = activeColor;
    activeSymbolRef.current = activeSymbol;
  }, [activeColor, activeSymbol]);

  useEffect(() => {
    if (!isWebGLAvailable()) return;
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let animationFrameId: number;

    const width = size;
    const height = size;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 175;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(60, 80, 100);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(-60, -50, -60);
    scene.add(rimLight);

    const pointGlow = new THREE.PointLight(0xffffff, 2.0, 200);
    pointGlow.position.set(0, 0, 50);
    scene.add(pointGlow);

    // --- Root Group for User 3D Rotation ---
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    const initialPalette = getPathwayThreePalette(activeColorRef.current);

    // --- Texture Loader for Pathway Emblem ---
    const textureLoader = new THREE.TextureLoader();
    let currentTexture: THREE.Texture | null = null;
    let loadedSymbolPath = "";

    // Material for the Emblem Face
    const faceMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.35,
      transparent: true,
      opacity: 0.96,
      emissive: initialPalette.primaryHex,
      emissiveIntensity: 0.25,
      side: THREE.FrontSide,
    });

    const backFaceMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.35,
      transparent: true,
      opacity: 0.96,
      emissive: initialPalette.secondaryHex,
      emissiveIntensity: 0.25,
      side: THREE.FrontSide,
    });

    const loadEmblemTexture = (path: string) => {
      if (loadedSymbolPath === path) return;
      loadedSymbolPath = path;

      textureLoader.load(
        path,
        (tex) => {
          if (isDisposed) {
            tex.dispose();
            return;
          }
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.center.set(0.5, 0.5);
          faceMaterial.map = tex;
          faceMaterial.needsUpdate = true;

          // Clone texture for back face with flipped X for mirror realism
          const backTex = tex.clone();
          backTex.wrapS = THREE.RepeatWrapping;
          backTex.repeat.x = -1;
          backTex.needsUpdate = true;
          backFaceMaterial.map = backTex;
          backFaceMaterial.needsUpdate = true;

          if (currentTexture) currentTexture.dispose();
          currentTexture = tex;
        },
        undefined,
        () => {
          // Fallback if texture fails to load
        }
      );
    };

    loadEmblemTexture(activeSymbolRef.current);

    // --- 1. Central Medallion Coin ---
    const coinThickness = 5;
    const coinRadius = 40;

    // Front Emblem Disc
    const frontDiscGeometry = new THREE.CircleGeometry(coinRadius, 64);
    const frontDisc = new THREE.Mesh(frontDiscGeometry, faceMaterial);
    frontDisc.position.z = coinThickness / 2 + 0.1;
    emblemGroup.add(frontDisc);

    // Back Emblem Disc
    const backDiscGeometry = new THREE.CircleGeometry(coinRadius, 64);
    const backDisc = new THREE.Mesh(backDiscGeometry, backFaceMaterial);
    backDisc.position.z = -(coinThickness / 2 + 0.1);
    backDisc.rotation.y = Math.PI;
    emblemGroup.add(backDisc);

    // Coin Rim / Core Cylinder
    const rimGeometry = new THREE.CylinderGeometry(
      coinRadius,
      coinRadius,
      coinThickness,
      64,
      1,
      true
    );
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Royal antique gold
      metalness: 0.92,
      roughness: 0.2,
      emissive: initialPalette.primaryHex,
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide,
    });
    const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    emblemGroup.add(rimMesh);

    // --- 2. Ornate Bezel and Runed Rings ---
    // Inner Decorative Bezel Ring
    const innerBezelGeom = new THREE.TorusGeometry(coinRadius + 0.5, 1.8, 16, 80);
    const innerBezelMat = new THREE.MeshStandardMaterial({
      color: 0xf5d77f,
      metalness: 0.95,
      roughness: 0.15,
      emissive: initialPalette.primaryHex,
      emissiveIntensity: 0.35,
    });
    const innerBezel = new THREE.Mesh(innerBezelGeom, innerBezelMat);
    emblemGroup.add(innerBezel);

    // Outer Celestial Sunburst / Occult Ring
    const outerRingGeom = new THREE.TorusGeometry(coinRadius + 14, 1.2, 16, 100);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: initialPalette.secondaryHex,
      metalness: 0.85,
      roughness: 0.25,
      emissive: initialPalette.secondaryHex,
      emissiveIntensity: 0.45,
    });
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    emblemGroup.add(outerRing);

    // Orbiting Mystic Seal Glyphs (Small Torus & Nodes)
    const glyphGroup = new THREE.Group();
    const glyphCount = 8;
    const glyphGeom = new THREE.OctahedronGeometry(2.4, 0);
    const glyphMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: initialPalette.primaryHex,
      emissiveIntensity: 0.8,
    });

    for (let i = 0; i < glyphCount; i++) {
      const angle = (i / glyphCount) * Math.PI * 2;
      const glyph = new THREE.Mesh(glyphGeom, glyphMat);
      glyph.position.set(
        Math.cos(angle) * (coinRadius + 14),
        Math.sin(angle) * (coinRadius + 14),
        0
      );
      glyph.rotation.z = angle;
      glyphGroup.add(glyph);
    }
    emblemGroup.add(glyphGroup);

    // --- 3. Swirling Astral Dust Aura ---
    const auraParticleCount = 80;
    const auraGeom = new THREE.BufferGeometry();
    const auraPositions = new Float32Array(auraParticleCount * 3);
    const auraBaseRadius = new Float32Array(auraParticleCount);
    const auraSpeeds = new Float32Array(auraParticleCount);
    const auraPhases = new Float32Array(auraParticleCount);

    for (let i = 0; i < auraParticleCount; i++) {
      const r = coinRadius + 8 + Math.random() * 26;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 20;

      auraPositions[i * 3] = Math.cos(angle) * r;
      auraPositions[i * 3 + 1] = Math.sin(angle) * r;
      auraPositions[i * 3 + 2] = z;

      auraBaseRadius[i] = r;
      auraSpeeds[i] = (Math.random() * 0.8 + 0.4) * (Math.random() > 0.5 ? 1 : -1);
      auraPhases[i] = angle;
    }

    auraGeom.setAttribute("position", new THREE.BufferAttribute(auraPositions, 3));

    const createSparkTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(240, 220, 255, 0.8)");
      grad.addColorStop(0.7, "rgba(157, 78, 221, 0.25)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const sparkTex = createSparkTexture();

    const auraMaterial = new THREE.PointsMaterial({
      color: initialPalette.primaryHex,
      size: 4,
      map: sparkTex ?? undefined,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const auraPoints = new THREE.Points(auraGeom, auraMaterial);
    emblemGroup.add(auraPoints);

    // --- Color Lerping States ---
    const curPrimary = new THREE.Color(initialPalette.primaryHex);
    const curSecondary = new THREE.Color(initialPalette.secondaryHex);
    const targetPrimary = new THREE.Color(initialPalette.primaryHex);
    const targetSecondary = new THREE.Color(initialPalette.secondaryHex);

    // --- Pointer Drag & Inertia Trackball ---
    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.003, y: 0.008 };
    const targetRotation = { x: 0.15, y: 0.35 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousPointer = { x: e.clientX, y: e.clientY };
      rotationVelocity = { x: 0, y: 0 };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointer.x;
      const deltaY = e.clientY - previousPointer.y;
      previousPointer = { x: e.clientX, y: e.clientY };

      targetRotation.y += deltaX * 0.018;
      targetRotation.x += deltaY * 0.018;

      rotationVelocity = {
        x: deltaY * 0.003,
        y: deltaX * 0.003,
      };
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Check for symbol texture update
      if (activeSymbolRef.current && activeSymbolRef.current !== loadedSymbolPath) {
        loadEmblemTexture(activeSymbolRef.current);
      }

      // Smooth color transitions
      const palette = getPathwayThreePalette(activeColorRef.current);
      targetPrimary.setHex(palette.primaryHex);
      targetSecondary.setHex(palette.secondaryHex);

      curPrimary.lerp(targetPrimary, 0.06);
      curSecondary.lerp(targetSecondary, 0.06);

      faceMaterial.emissive.copy(curPrimary);
      backFaceMaterial.emissive.copy(curSecondary);
      rimMaterial.emissive.copy(curPrimary);
      innerBezelMat.emissive.copy(curPrimary);
      outerRingMat.color.copy(curSecondary);
      outerRingMat.emissive.copy(curSecondary);
      glyphMat.emissive.copy(curPrimary);
      auraMaterial.color.copy(curPrimary);
      pointGlow.color.copy(curPrimary);

      // Rotate Outer Ring & Occult Glyphs in counter directions
      outerRing.rotation.z = elapsedTime * 0.25;
      glyphGroup.rotation.z = -elapsedTime * 0.15;

      // Pulse the emblem slightly
      const breath = 1 + Math.sin(elapsedTime * 2.0) * 0.02;
      emblemGroup.scale.set(breath, breath, breath);

      // Animate aura particles
      const posAttr = auraGeom.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      for (let i = 0; i < auraParticleCount; i++) {
        const i3 = i * 3;
        const angle = auraPhases[i] + elapsedTime * auraSpeeds[i];
        const r = auraBaseRadius[i] + Math.sin(elapsedTime * 3 + i) * 2.5;
        posArr[i3] = Math.cos(angle) * r;
        posArr[i3 + 1] = Math.sin(angle) * r;
        posArr[i3 + 2] = Math.sin(elapsedTime * 2 + i) * 6;
      }
      posAttr.needsUpdate = true;

      // Handle Inertia & Idle Auto-rotation
      if (!isDragging) {
        targetRotation.x += rotationVelocity.x;
        targetRotation.y += rotationVelocity.y;
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;

        // Base continuous gentle float & spin
        targetRotation.y += 0.008;
      }

      emblemGroup.rotation.x += (targetRotation.x - emblemGroup.rotation.x) * 0.1;
      emblemGroup.rotation.y += (targetRotation.y - emblemGroup.rotation.y) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      // Resource cleanups
      frontDiscGeometry.dispose();
      backDiscGeometry.dispose();
      rimGeometry.dispose();
      innerBezelGeom.dispose();
      outerRingGeom.dispose();
      glyphGeom.dispose();
      auraGeom.dispose();

      faceMaterial.dispose();
      backFaceMaterial.dispose();
      rimMaterial.dispose();
      innerBezelMat.dispose();
      outerRingMat.dispose();
      glyphMat.dispose();
      auraMaterial.dispose();

      if (currentTexture) currentTexture.dispose();
      if (sparkTex) sparkTex.dispose();
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [size]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center select-none",
        className
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "cursor-grab active:cursor-grabbing transition-transform duration-300",
          isInteracting && "scale-105"
        )}
        style={{ width: size, height: size }}
        title={`Drag to rotate the 3D ${activePathway.name} Pathway Emblem`}
      />
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted/60">
        ✦ {activePathway.name} Pathway Emblem · Drag to Rotate ✦
      </p>
    </div>
  );
}
