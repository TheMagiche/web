import { siteConfig } from "@/lib/data";

export function getDeveloperCopy(rank: number) {
  const copies: Record<number, { kicker: string; heading: string; body: string }> = {
    9: {
      kicker: "Welcome",
      heading: siteConfig.title,
      body: `Welcome. I am a frontend developer — Sequence 0 of this current. You drew a card and stepped onto the path. Walk the sequences with me, and I will show you how I build.`,
    },
    8: {
      kicker: "The craft",
      heading: "Making interfaces answer back",
      body: `This is where the work begins in earnest. I shape React, motion, and type until an interface feels alive — the first techniques, the first tricks of the craft, the first time a product talks back.`,
    },
    7: {
      kicker: "Origin",
      heading: "A single line of HTML",
      body: `Every builder has a beginning. Mine started with a single line of HTML and an insatiable curiosity for what lies beyond the viewport. I still treat every project as a ritual.`,
    },
    6: {
      kicker: "Practice",
      heading: "Wearing many faces",
      body: `I move between products, systems, and teams without losing the current underneath — typed, tested, and tuned for whatever the realm demands.`,
    },
    5: {
      kicker: "Potions",
      heading: "Potions of power",
      body: `Architecture, motion, performance, and design language. These are the potions I have already brewed: the stack I carry toward Sequence 0.`,
    },
    4: {
      kicker: "The work",
      heading: "Bound in the grimoire",
      body: `These repositories are the living record of problems I have solved in the fog — products, experiments, and spells committed to Git.`,
    },
    3: {
      kicker: "Sight",
      heading: "The whole spread",
      body: `I read a product as a single myth. Every component is a verse, every commit a line, the system coherent from the first glance to the last interaction.`,
    },
    2: {
      kicker: "A whisper",
      heading: "Let's build together",
      body: `If a mystery needs solving, send a whisper. I am open to collaborations, products, and new currents — frontend, interface, and motion.`,
    },
    1: {
      kicker: "The last veil",
      heading: "Close to the source",
      body: `The work is no longer a list of skills. It is a voice and a practice: immersive web experiences at the intersection of code and mystery.`,
    },
    0: {
      kicker: "Sequence 0",
      heading: siteConfig.name,
      body: `This is the seat of the current — a frontend developer who treats every project as a mystical undertaking, from the first potion to this authority.`,
    },
  };

  return (
    copies[rank] ?? {
      kicker: "The path",
      heading: siteConfig.title,
      body: siteConfig.description,
    }
  );
}
