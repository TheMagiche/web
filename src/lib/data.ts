export const siteConfig = {
  name: "theMagiche",
  title: "Frontend Developer & Interface Alchemist",
  tagline: "Weaving digital incantations through React & Next.js",
  description:
    "Frontend developer crafting immersive web experiences at the intersection of code and mystery.",
  email: "magiche.mc@gmail.com",
  github: "https://github.com/TheMagiche",
  githubUsername: "TheMagiche",
  linkedin: "https://linkedin.com/in/themagiche",
  twitter: "https://twitter.com/themagiche",
};

export const hiddenRepos = ["web", "myweb"];

export const outsiderSymbols = [
  "/outsider/Eternal_Edict_Symbol2.webp",
  "/outsider/Chaos_Mist_Symbol2.webp",
  "/outsider/Second_Law_Symbol2.webp",
  "/outsider/Patriarch_Symbol2.webp",
  "/outsider/Condenser_Symbol2.webp",
  "/outsider/Tail-Devourer_Symbol2.webp",
  "/outsider/Eternal_Aeon_Symbol2.webp",
  "/outsider/Everlasting_Symbol2.webp",
  "/outsider/Chaos_Primogenitor_Symbol2.webp",
] as const;

export const potions = [
  {
    name: "Codex Potion",
    sequence: "Sequence 9 → Sequence 0",
    domain: "Frontend Architecture",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "violet",
    symbol: outsiderSymbols[0],
  },
  {
    name: "Fluidity Potion",
    sequence: "Sequence 8 → Sequence 1",
    domain: "Motion & Interaction",
    skills: ["Framer Motion", "GSAP", "Three.js", "WebGL"],
    color: "cyan",
    symbol: outsiderSymbols[1],
  },
  {
    name: "Optimizer Potion",
    sequence: "Sequence 7 → Sequence 2",
    domain: "Performance & Optimization",
    skills: ["Core Web Vitals", "SSR/SSG", "Bundle Analysis", "Caching"],
    color: "amber",
    symbol: outsiderSymbols[2],
  },
  {
    name: "Designer Potion",
    sequence: "Sequence 6 → Sequence 3",
    domain: "Design Systems",
    skills: ["Component Libraries", "Storybook", "Figma", "Accessibility"],
    color: "rose",
    symbol: outsiderSymbols[3],
  },
];

export const navLinks = [
  { label: "Origin", href: "/home#sequence-7" },
  { label: "Potions", href: "/home#sequence-5" },
  { label: "Grimoire", href: "/home#sequence-4" },
  { label: "Contact", href: "/home#sequence-2" },
];

export const grimoireArcana = [
  { roman: "0", name: "The Fool", symbol: "/pathways/Fool_Symbol2.webp" },
  { roman: "VI", name: "The Lovers", symbol: "/pathways/Error_Symbol2.webp" },
  { roman: "I", name: "The Magician", symbol: "/pathways/Door_Symbol2.webp" },
  { roman: "XVII", name: "The Star", symbol: "/pathways/Darkness_Symbol2.webp" },
  { roman: "XXI", name: "The World", symbol: "/pathways/Mother_Symbol2.webp" },
  { roman: "IV", name: "The Emperor", symbol: "/pathways/Black_Emperor_Symbol2.webp" },
  { roman: "XVI", name: "The Tower", symbol: "/pathways/White_Tower_Symbol2.webp" },
  { roman: "III", name: "The Empress", symbol: "/pathways/Demoness_Symbol2.webp" },
  { roman: "VII", name: "The Chariot", symbol: "/pathways/Red_Priest_Symbol2.webp" },
  { roman: "VIII", name: "Strength", symbol: "/pathways/Twilight_Giant_Symbol2.webp" },
  { roman: "IX", name: "The Hermit", symbol: "/pathways/Hermit_Symbol2.webp" },
  { roman: "X", name: "Wheel of Fortune", symbol: "/pathways/Wheel_of_Fortune_Symbol2.webp" },
  { roman: "XI", name: "Justice", symbol: "/pathways/Visionary_Symbol2.webp" },
  { roman: "XX", name: "Judgement", symbol: "/pathways/Justiciar_Symbol2.webp" },
  { roman: "XII", name: "The Hanged Man", symbol: "/pathways/Hanged_Man_Symbol2.webp" },
  { roman: "XIII", name: "Death", symbol: "/pathways/Death_Symbol2.webp" },
  { roman: "II", name: "The High Priestess", symbol: "/pathways/Paragon_Symbol2.webp" },
  { roman: "XV", name: "The Devil", symbol: "/pathways/Abyss_Symbol2.webp" },
  { roman: "V", name: "The Hierophant", symbol: "/pathways/Tyrant_Symbol2.webp" },
  { roman: "XIX", name: "The Sun", symbol: "/pathways/Sun_Symbol2.webp" },
  { roman: "XVIII", name: "The Moon", symbol: "/pathways/Moon_Symbol2.webp" },
  { roman: "XIV", name: "Temperance", symbol: "/pathways/Chained_Symbol2.webp" },
] as const;

export const sceneTransitionsMessages = [
  {
    pathway: "The Fool",
    message: "Although I'm also a Seer, I still have to say that, in terms of horror, terror, and bizarreness, our pathway is definitely ranked amongst the top thre",
  },
  {
    pathway: "The Lovers",
    message: "It's a trojan horse of destiny, the worm that erodes time, the loopholes in rules, the manifestation of all errors.",
  },
  {
    pathway: "The Magician",
    message: "The Apprentice Pathway that represented the concept of 'Doors', alternate worlds, and space itself...",
  },
  {
    pathway: "The Star",
    message: "The power of Concealment, command over spirits, and the ability to create realistic dreams…",
  },
  {
    pathway: "The World",
    message: "Coming from here, returning to here—this is the origin; and to return to the origin is death.",
  },
  {
    pathway: "The Emperor",
    message: "It finds loopholes in 'order' while it appears domineering",
  },
  {
    pathway: "The Tower",
    message: "We basically came to a consensus and believe that the Reader pathway represents the ‘omniscient’ part of ‘omnipotent and omniscient.’",
  },
  {
    pathway: "The Empress",
    message: "It symbolizes catastrophe and apocalypse, and also symbolizes the feminine side",
  },
  {
    pathway: "The Chariot",
    message: "Therefore, Hunters must rely more on their personal growth amidst blood, fire, chaos, and conflict. Many Hunters meet their end, using their bones to forge the Red Priest who conquers all.",
  },
  {
    pathway: "Strength",
    message: "The most terrifying Strength, the most Gigantic form, the most potent Devastation, the most unyielding Protection—together with Skill and experience, these compose individual Combat.",
  },
  {
    pathway: "The Hermit",
    message: "The Mystery Pryer pathway is different from other pathways. From time to time, it will be chased by a large amount of knowledge. It’s impossible to ignore, and there’s no way to reject it even if one can’t handle it. And when one consumes a potion to advance, the situation of being chased by knowledge becomes even more serious..",
  },
  {
    pathway: "Wheel of Fortune",
    message: "To some extent, they are the embodiment of Fate, able to travel freely in the River of Fate.",
  },
  {
    pathway: "Justice",
    message: "Be careful of the ‘Spectator’.",
  },
  {
    pathway: "The Hanged Man",
    message: "Who do you think would be most likely to develop in the direction of being omnipotent and omniscient among all the present gods?",
  },
  {
    pathway: "Death",
    message: "It’s the Beyonder pathway that governs death and partly controls the spirit world.",
  },
  {
    pathway: "The High Priestess",
    message: "The Savant pathway primarily focuses on mastering scientific knowledge, enhancing memory, intelligence, and logical reasoning abilities.",
  },
  {
    pathway: "The Devil",
    message: "The Devil pathway is highly individualistic. Unique wills, distinct hearts, and a penchant for desires all amalgamate to form the diverse nature of devils.",
  },
  {
    pathway: "The Hierophant",
    message: "However, at sea, the Storm pathway is really powerful. They’re practically mobile calamities.",
  },
  {
    pathway: "The Sun",
    message: "The Sun pathway is truly exceptional. Befitting of the pathway that governs Purification",
  },
  {
    pathway: "The Moon",
    message: "The Moon represents spirituality, plants, beauty, parts of life, parts of darkness, and parts of mystery",
  },
  {
    pathway: "The Temperance",
    message: "The mind is the prisoner of the body, and the body is the prisoner of the world. This refers to the madness that is restrained and the desire that is oppressed",
  },
  {
    pathway: "Judgement",
    message: "All living beings are equal before the law.",
  },
];

function normalizePathwayLabel(label: string) {
  return label.replace(/^the\s+/i, "").trim().toLowerCase();
}

export function getSceneTransitionMessage(pathwayLabel: string) {
  const needle = normalizePathwayLabel(pathwayLabel);
  return sceneTransitionsMessages.find(
    (entry) => normalizePathwayLabel(entry.pathway) === needle
  )?.message;
}