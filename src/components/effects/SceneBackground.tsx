"use client";

import Image from "next/image";

export function SceneBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/sky.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%] brightness-[0.55] saturate-[0.8]"
      />

      <Image
        src="/seer.jpg"
        alt=""
        fill
        priority
        sizes="120vw"
        className="object-cover object-[center_20%] contrast-125"
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/60 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,8,0.72)_100%)]" />
    </div>
  );
}
