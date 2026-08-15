"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { PathwayTarotCard } from "@/components/pathway/PathwayTarotCard";
import { usePathway } from "@/components/providers/PathwayProvider";
import { pathwayChoices } from "@/lib/pathways";

type SlotRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type SlotMap = Record<number, SlotRect>;

type SectionRect = {
  top: number;
  height: number;
};

type SectionMap = Record<number, SectionRect>;

type BridgePose = {
  x: number;
  y: number;
  rotateY: number;
  rotateX: number;
  rotate: number;
  rank: number;
  drag?: boolean;
};

function readSlot(rank: number): SlotRect | null {
  const el = document.getElementById(`sequence-card-slot-${rank}`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  };
}

function readSection(rank: number): SectionRect | null {
  const el = document.getElementById(`sequence-${rank}`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    height: rect.height,
  };
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function center(slot: SlotRect) {
  return {
    x: slot.left + slot.width / 2,
    y: slot.top + slot.height / 2,
  };
}

function arriveAt(slot: SlotRect) {
  return slot.top - window.innerHeight * 0.38;
}

function leaveAt(section: SectionRect | undefined, arrive: number, fraction: number) {
  if (!section) return arrive;
  return Math.max(arrive, section.top + section.height * fraction);
}

function parkedPose(
  slot: SlotRect,
  scrollY: number,
  rank: number,
  offsetY = 0
): BridgePose {
  const point = center(slot);
  return {
    x: point.x,
    y: point.y + offsetY - scrollY,
    rotateY: 0,
    rotateX: 0,
    rotate: 0,
    rank,
  };
}

function dragTravel(
  fromSlot: SlotRect,
  toSlot: SlotRect,
  fromRank: number,
  toRank: number,
  local: number,
  scrollY: number
): BridgePose {
  const from = center(fromSlot);
  const to = center(toSlot);
  const lean = Math.sin(local * Math.PI) * (to.x >= from.x ? 7 : -7);
  return {
    x: from.x + (to.x - from.x) * local,
    y: from.y + (to.y - from.y) * local - scrollY,
    rotateY: 0,
    rotateX: 0,
    rotate: lean,
    rank: local >= 0.5 ? toRank : fromRank,
    drag: true,
  };
}

function poseAt(
  scrollY: number,
  ranks: number[],
  slots: SlotMap,
  sections: SectionMap
): BridgePose | null {
  if (ranks.some((rank) => !slots[rank])) return null;

  if (ranks.length === 2) {
    const fromRank = ranks[0];
    const toRank = ranks[1];
    const start = arriveAt(slots[fromRank]);
    const end = arriveAt(slots[toRank]);
    if (scrollY < start) {
      return parkedPose(slots[fromRank], scrollY, fromRank);
    }
    if (scrollY < end) {
      const local = end <= start ? 1 : clamp((scrollY - start) / (end - start));
      return dragTravel(
        slots[fromRank],
        slots[toRank],
        fromRank,
        toRank,
        local,
        scrollY
      );
    }
    return parkedPose(slots[toRank], scrollY, toRank);
  }

  const arrive8 = arriveAt(slots[8]);
  const leave8 = leaveAt(sections[8], arrive8, 0.4);
  const dropEnd = leave8 + window.innerHeight * 0.4;

  if (scrollY < arrive8) {
    const local = arrive8 <= 0 ? 1 : clamp(scrollY / arrive8);
    return dragTravel(slots[9], slots[8], 9, 8, local, scrollY);
  }

  if (scrollY < leave8) {
    return parkedPose(slots[8], scrollY, 8);
  }

  if (scrollY < dropEnd) {
    const local = clamp((scrollY - leave8) / Math.max(1, dropEnd - leave8));
    return dragTravel(slots[8], slots[7], 8, 7, local, scrollY);
  }

  return parkedPose(slots[7], scrollY, 7);
}

export function SequenceCardBridge({
  ranks,
  children,
}: {
  ranks: number[];
  children: ReactNode;
}) {
  const { selected } = usePathway();
  const slotsRef = useRef<SlotMap>({});
  const sectionsRef = useRef<SectionMap>({});
  const [ready, setReady] = useState(false);
  const [displayRank, setDisplayRank] = useState(ranks[0] ?? 9);
  const { scrollY } = useScroll();
  const x = useSpring(0, { stiffness: 160, damping: 24, mass: 0.7 });
  const y = useSpring(0, { stiffness: 160, damping: 24, mass: 0.7 });
  const rotate = useSpring(0, { stiffness: 160, damping: 24, mass: 0.7 });
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);

  const cardIndex = Math.max(
    0,
    pathwayChoices.findIndex((pathway) => pathway.id === selected.id)
  );

  const applyPose = (value: number) => {
    const pose = poseAt(value, ranks, slotsRef.current, sectionsRef.current);
    if (!pose) return;

    if (pose.drag) {
      x.set(pose.x);
      y.set(pose.y);
      rotate.set(pose.rotate);
    } else {
      x.jump(pose.x);
      y.jump(pose.y);
      rotate.jump(0);
    }
    rotateY.set(pose.rotateY);
    rotateX.set(pose.rotateX);
    setDisplayRank((current) => (current === pose.rank ? current : pose.rank));
  };

  useLayoutEffect(() => {
    const measure = () => {
      const nextSlots: SlotMap = {};
      const nextSections: SectionMap = {};
      for (const rank of ranks) {
        const slot = readSlot(rank);
        const section = readSection(rank);
        if (!slot || !section) return;
        nextSlots[rank] = slot;
        nextSections[rank] = section;
      }
      slotsRef.current = nextSlots;
      sectionsRef.current = nextSections;
      setReady(true);
      applyPose(window.scrollY);
    };

    measure();
    const frame = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);

    const observer = new ResizeObserver(measure);
    for (const rank of ranks) {
      const slotEl = document.getElementById(`sequence-card-slot-${rank}`);
      const sectionEl = document.getElementById(`sequence-${rank}`);
      if (slotEl) observer.observe(slotEl);
      if (sectionEl) observer.observe(sectionEl);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [ranks.join(","), selected.id]);

  useLayoutEffect(() => {
    return scrollY.on("change", applyPose);
  }, [scrollY]);

  return (
    <div className="relative">
      {children}
      {ready &&
        createPortal(
          <motion.div
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-55 isolate"
            style={{ x, y }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 perspective-[1600px]">
              <motion.div
                className="relative z-55 transform-3d"
                style={{
                  rotate,
                  rotateY,
                  rotateX,
                  z: 80,
                  transformPerspective: 1600,
                }}
              >
                <PathwayTarotCard
                  pathway={selected}
                  index={cardIndex}
                  rank={displayRank}
                  active
                  selected
                  instant
                />
              </motion.div>
            </div>
          </motion.div>,
          document.body
        )}
    </div>
  );
}
