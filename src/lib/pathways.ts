export type PathwayColor = "violet" | "cyan" | "amber" | "rose";

export type PathwayChoice = {
  id: string;
  name: string;
  sequenceName: string;
  sequence: string;
  description: string;
  symbol: string;
  color: PathwayColor;
};

export const pathwayChoices: PathwayChoice[] = [
  {
    id: "fool",
    name: "Fool",
    sequenceName: "Seer",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You perceive patterns others miss. Architecture, intent, and the unseen structure of an interface are yours to read.",
    symbol: "/pathways/Fool_Symbol2.webp",
    color: "violet",
  },
  {
    id: "error",
    name: "Error",
    sequenceName: "Marauder",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You steal time from complexity — refactoring, bypassing, and rewriting fate with a sleight of code.",
    symbol: "/pathways/Error_Symbol2.webp",
    color: "rose",
  },
  {
    id: "darkness",
    name: "Darkness",
    sequenceName: "Sleepless",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You keep vigil in the dark mode of the world, watching over systems that never truly rest.",
    symbol: "/pathways/Darkness_Symbol2.webp",
    color: "violet",
  },
  {
    id: "mother",
    name: "Mother",
    sequenceName: "Planter",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You cultivate design systems that grow — tokens, roots, and components that bloom into entire products.",
    symbol: "/pathways/Mother_Symbol2.webp",
    color: "cyan",
  },
  {
    id: "black-emperor",
    name: "Black Emperor",
    sequenceName: "Lawyer",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You write the laws of the interface: contracts, types, and constraints that hold the realm together.",
    symbol: "/pathways/Black_Emperor_Symbol2.webp",
    color: "violet",
  },
  {
    id: "white-tower",
    name: "White Tower",
    sequenceName: "Reader",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You decode the archives — documentation, accessibility, and the grammar of a coherent design language.",
    symbol: "/pathways/White_Tower_Symbol2.webp",
    color: "rose",
  },
  {
    id: "demoness",
    name: "Demoness",
    sequenceName: "Assassin",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You strike with precision: a single interaction, perfectly timed, that changes everything the user feels.",
    symbol: "/pathways/Demoness_Symbol2.webp",
    color: "rose",
  },
  {
    id: "red-priest",
    name: "Red Priest",
    sequenceName: "Hunter",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You hunt waste and latency, tracking Core Web Vitals until the experience runs like a drawn bow.",
    symbol: "/pathways/Red_Priest_Symbol2.webp",
    color: "amber",
  },
  {
    id: "twilight-giant",
    name: "Twilight Giant",
    sequenceName: "Warrior",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You stand at the front line of the stack — resilient, battle-tested, and built to carry weight.",
    symbol: "/pathways/Twilight_Giant_Symbol2.webp",
    color: "amber",
  },
  {
    id: "hermit",
    name: "Hermit",
    sequenceName: "Mystery Pryer",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You pry into hidden layers — shaders, motion graphs, and the occult corners of the rendering pipeline.",
    symbol: "/pathways/Hermit_Symbol2.webp",
    color: "violet",
  },
  {
    id: "visionary",
    name: "Visionary",
    sequenceName: "Spectator",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You observe the user as they move, then shape journeys that feel inevitable from the first glance.",
    symbol: "/pathways/Visionary_Symbol2.webp",
    color: "cyan",
  },
  {
    id: "justiciar",
    name: "Justiciar",
    sequenceName: "Arbiter",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You judge what belongs in the interface and what must be cut — balance, hierarchy, and fair order.",
    symbol: "/pathways/Justiciar_Symbol2.webp",
    color: "amber",
  },
  {
    id: "hanged-man",
    name: "Hanged Man",
    sequenceName: "Secrets Supplicant",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You invert the problem until a new perspective appears — suspension, patience, and a reversed view of the DOM.",
    symbol: "/pathways/Hanged_Man_Symbol2.webp",
    color: "cyan",
  },
  {
    id: "death",
    name: "Death",
    sequenceName: "Corpse Collector",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You end what no longer serves: dead code, abandoned flows, and features that must be laid to rest.",
    symbol: "/pathways/Death_Symbol2.webp",
    color: "violet",
  },
  {
    id: "paragon",
    name: "Paragon",
    sequenceName: "Savant",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You craft artifacts of motion and mechanism — tools, engines, and interactions that feel engineered by wonder.",
    symbol: "/pathways/Paragon_Symbol2.webp",
    color: "cyan",
  },
  {
    id: "abyss",
    name: "Abyss",
    sequenceName: "Criminal",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You break rules that deserve breaking — experimental UI, forbidden animations, and delightful chaos.",
    symbol: "/pathways/Abyss_Symbol2.webp",
    color: "rose",
  },
  {
    id: "tyrant",
    name: "Tyrant",
    sequenceName: "Sailor",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You command the currents of state and storm — navigation, flow, and the weather of a living application.",
    symbol: "/pathways/Tyrant_Symbol2.webp",
    color: "amber",
  },
  {
    id: "sun",
    name: "Sun",
    sequenceName: "Bard",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You illuminate the experience — clarity, warmth, and a voice that makes the product sing.",
    symbol: "/pathways/Sun_Symbol2.webp",
    color: "amber",
  },
  {
    id: "moon",
    name: "Moon",
    sequenceName: "Apothecary",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You mix subtle draughts of micro-interaction — small doses that heal confusion and soothe the user.",
    symbol: "/pathways/Moon_Symbol2.webp",
    color: "cyan",
  },
  {
    id: "chained",
    name: "Chained",
    sequenceName: "Prisoner",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You understand constraint as power — performance budgets, strict types, and beauty inside the bars.",
    symbol: "/pathways/Chained_Symbol2.webp",
    color: "violet",
  },
];

export const defaultPathway =
  pathwayChoices.find((pathway) => pathway.id === "fool") ?? pathwayChoices[0];
