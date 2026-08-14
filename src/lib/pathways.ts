export type PathwayColor = "violet" | "cyan" | "amber" | "rose";

export type SequenceTier =
  | "Low Sequence"
  | "Mid Sequence"
  | "Saint"
  | "Angel"
  | "True God";

export type PathwayChoice = {
  id: string;
  name: string;
  sequenceName: string;
  sequence: string;
  description: string;
  symbol: string;
  color: PathwayColor;
  ladder: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
};

export const sequenceRanks = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] as const;

export function getSequenceTitle(pathway: PathwayChoice, rank: number) {
  const clamped = Math.min(9, Math.max(0, Math.round(rank)));
  return pathway.ladder[9 - clamped];
}

export function getSequenceTier(rank: number): SequenceTier {
  if (rank >= 8) return "Low Sequence";
  if (rank >= 5) return "Mid Sequence";
  if (rank >= 3) return "Saint";
  if (rank >= 1) return "Angel";
  return "True God";
}

export function getSequenceStory(rank: number, pathway: PathwayChoice) {
  const title = getSequenceTitle(pathway, rank);

  const stories: Record<number, { kicker: string; body: string }> = {
    9: {
      kicker: "The introduction",
      body: `You drew the ${pathway.name} card. At Sequence 9 you are a ${title} — Low Sequence, where the fog is thickest and the first mysteries of this current come into focus. ${pathway.description}`,
    },
    8: {
      kicker: "The second potion",
      body: `Sequence 8 · ${title}. Still Low Sequence, but the fog thins. You begin to see how this pathway moves — the first real techniques, the first tricks of the craft, the first time an interface answers back.`,
    },
    7: {
      kicker: "The origin",
      body: `Sequence 7 · ${title}. Mid Sequence. This is where a Beyonder's origin is told: a single line of HTML, an insatiable curiosity, and the decision to treat every project as a ritual.`,
    },
    6: {
      kicker: "The deepening",
      body: `Sequence 6 · ${title}. Mid Sequence. Identity becomes fluid. You learn to wear the work — types, systems, and shapes that fit whatever the realm demands, without losing the current underneath.`,
    },
    5: {
      kicker: "The threshold",
      body: `Sequence 5 · ${title}. The last of the Mid Sequences. Beyond this potion lies sainthood. Here are the domains of power already walked to Sequence 0: architecture, motion, performance, and language.`,
    },
    4: {
      kicker: "The grimoire",
      body: `Sequence 4 · ${title}. Saint. The demigod threshold opens the archives. Each repository is a tarot in the spread — living spells, bound in Git, waiting to be turned.`,
    },
    3: {
      kicker: "The saint's sight",
      body: `Sequence 3 · ${title}. Still Saint. You can now read the whole spread at once: every project a card, every commit a verse, the grimoire no longer a collection but a single working myth.`,
    },
    2: {
      kicker: "The angel's door",
      body: `Sequence 2 · ${title}. Angel. You have walked far enough to speak across the fog. A whisper here reaches the authority of the ${pathway.name} Pathway.`,
    },
    1: {
      kicker: "The last veil",
      body: `Sequence 1 · ${title}. Angel, one step from godhood. You stand at the last veil before Sequence 0 — close enough to hear the current itself, and to choose whether to send a word through it.`,
    },
    0: {
      kicker: "The true god",
      body: `Sequence 0 · ${title}. The seat of the ${pathway.name} Pathway. This is the authority the card pointed toward — the end of the climb, and the source of the current you have been walking.`,
    },
  };

  const chapter = stories[rank] ?? {
    kicker: getSequenceTier(rank),
    body: `Sequence ${rank} · ${title} of the ${pathway.name} Pathway.`,
  };

  return {
    title,
    tier: getSequenceTier(rank),
    ...chapter,
  };
}

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
    ladder: [
      "Seer",
      "Clown",
      "Magician",
      "Faceless",
      "Marionettist",
      "Bizarro Sorcerer",
      "Scholar of Yore",
      "Miracle Invoker",
      "Attendant of Mysteries",
      "The Fool",
    ],
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
    ladder: [
      "Marauder",
      "Swindler",
      "Cryptologist",
      "Prometheus",
      "Dream Stealer",
      "Parasite",
      "Mentor of Deceit",
      "Trojan Horse of Destiny",
      "Worm of Time",
      "Error",
    ],
  },
  {
    id: "door",
    name: "Door",
    sequenceName: "Apprentice",
    sequence: "Sequence 9 → Sequence 0",
    description:
      "You open routes others cannot see — portals, navigation, and the hidden doors between states of an application.",
    symbol: "/pathways/Door_Symbol2.webp",
    color: "cyan",
    ladder: [
      "Apprentice",
      "Trickmaster",
      "Astrologer",
      "Scribe",
      "Traveler",
      "Secrets Sorcerer",
      "Wanderer",
      "Planeswalker",
      "Key of Stars",
      "Door",
    ],
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
    ladder: [
      "Sleepless",
      "Midnight Poet",
      "Nightmare",
      "Soul Assurer",
      "Spirit Warlock",
      "Nightwatcher",
      "Horror Bishop",
      "Servant of Concealment",
      "Knight of Misfortune",
      "Darkness",
    ],
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
    ladder: [
      "Planter",
      "Doctor",
      "Harvest Priest",
      "Biologist",
      "Druid",
      "Ancient Metallurgist",
      "Pallbearer",
      "Desolate Matriarch",
      "Naturewalker",
      "Mother",
    ],
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
    ladder: [
      "Lawyer",
      "Barbarian",
      "Briber",
      "Baron of Corruption",
      "Mentor of Disorder",
      "Earl of the Fallen",
      "Frenzied Mage",
      "Duke of Entropy",
      "Prince of Abolition",
      "Black Emperor",
    ],
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
    ladder: [
      "Reader",
      "Student of Ratiocination",
      "Detective",
      "Polymath",
      "Mysticism Magister",
      "Prophet",
      "Cognizer",
      "Wisdom Angel",
      "Omniscient Eye",
      "White Tower",
    ],
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
    ladder: [
      "Assassin",
      "Instigator",
      "Witch",
      "Pleasure",
      "Affliction",
      "Despair",
      "Unaging",
      "Catastrophe",
      "Apocalypse",
      "Demoness",
    ],
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
    ladder: [
      "Hunter",
      "Provoker",
      "Pyromaniac",
      "Conspiracist",
      "Reaper",
      "Iron-blooded Knight",
      "War Bishop",
      "Weather Warlock",
      "Conqueror",
      "Red Priest",
    ],
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
    ladder: [
      "Warrior",
      "Gladiator",
      "Weapon Master",
      "Dawn Paladin",
      "Guardian",
      "Demon Hunter",
      "Silver Knight",
      "Glory",
      "Hand of God",
      "Twilight Giant",
    ],
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
    ladder: [
      "Mystery Pryer",
      "Melee Scholar",
      "Warlock",
      "Scrolls Professor",
      "Constellist",
      "Mysticologist",
      "Clairvoyant",
      "Sage",
      "Knowledge Emperor",
      "Hermit",
    ],
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
    ladder: [
      "Spectator",
      "Telepathist",
      "Psychologist",
      "Hypnotist",
      "Dreamwalker",
      "Manipulator",
      "Dream Weaver",
      "Discerner",
      "Author",
      "Visionary",
    ],
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
    ladder: [
      "Arbiter",
      "Sheriff",
      "Interrogator",
      "Judge",
      "Disciplinary Paladin",
      "Imperative Mage",
      "Chaos Hunter",
      "Balancer",
      "Hand of Order",
      "Justiciar",
    ],
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
    ladder: [
      "Secrets Supplicant",
      "Listener",
      "Shadow Ascetic",
      "Rose Bishop",
      "Shepherd",
      "Black Knight",
      "Trinity Templar",
      "Profane Presbyter",
      "Dark Angel",
      "Hanged Man",
    ],
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
    ladder: [
      "Corpse Collector",
      "Gravedigger",
      "Spirit Medium",
      "Spirit Guide",
      "Gatekeeper",
      "Undying",
      "Ferryman",
      "Death Consul",
      "Pale Emperor",
      "Death",
    ],
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
    ladder: [
      "Savant",
      "Archaeologist",
      "Appraiser",
      "Artisan",
      "Astronomer",
      "Alchemist",
      "Arcane Scholar",
      "Knowledge Magister",
      "Illuminator",
      "Paragon",
    ],
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
    ladder: [
      "Criminal",
      "Unwinged Angel",
      "Serial Killer",
      "Devil",
      "Desire Apostle",
      "Demon",
      "Blatherer",
      "Bloody Archduke",
      "Filthy Monarch",
      "Abyss",
    ],
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
    ladder: [
      "Sailor",
      "Folk of Rage",
      "Seafarer",
      "Wind-blessed",
      "Ocean Songster",
      "Cataclysmic Interrer",
      "Sea King",
      "Calamity",
      "Thunder God",
      "Tyrant",
    ],
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
    ladder: [
      "Bard",
      "Light Suppliant",
      "Solar High Priest",
      "Notary",
      "Priest of Light",
      "Unshadowed",
      "Justice Mentor",
      "Lightseeker",
      "White Angel",
      "Sun",
    ],
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
    ladder: [
      "Apothecary",
      "Beast Tamer",
      "Vampire",
      "Potions Professor",
      "Scarlet Scholar",
      "Shaman King",
      "Summoner",
      "Life-Giver",
      "Beauty Goddess",
      "Moon",
    ],
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
    ladder: [
      "Prisoner",
      "Lunatic",
      "Werewolf",
      "Zombie",
      "Wraith",
      "Puppet",
      "Silent Disciple",
      "Ancient Bane",
      "Abomination",
      "Chained",
    ],
  },
];

export const defaultPathway =
  pathwayChoices.find((pathway) => pathway.id === "fool") ?? pathwayChoices[0];
