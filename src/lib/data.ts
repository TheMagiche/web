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

export const pathways = [
  {
    name: "Seer Pathway",
    sequence: "Sequence 9 → Sequence 0",
    domain: "Frontend Architecture",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "violet",
    symbol: outsiderSymbols[0],
  },
  {
    name: "Artificer Pathway",
    sequence: "Sequence 8 → Sequence 1",
    domain: "Motion & Interaction",
    skills: ["Framer Motion", "GSAP", "Three.js", "WebGL"],
    color: "cyan",
    symbol: outsiderSymbols[1],
  },
  {
    name: "Hunter Pathway",
    sequence: "Sequence 7 → Sequence 2",
    domain: "Performance & Optimization",
    skills: ["Core Web Vitals", "SSR/SSG", "Bundle Analysis", "Caching"],
    color: "amber",
    symbol: outsiderSymbols[2],
  },
  {
    name: "Reader Pathway",
    sequence: "Sequence 6 → Sequence 3",
    domain: "Design Systems",
    skills: ["Component Libraries", "Storybook", "Figma", "Accessibility"],
    color: "rose",
    symbol: outsiderSymbols[3],
  },
];

export const navLinks = [
  { label: "Origin", href: "/home#sequence-7" },
  { label: "Pathways", href: "/home#sequence-5" },
  { label: "Grimoire", href: "/home#sequence-4" },
  { label: "Contact", href: "/home#sequence-2" },
];

export const grimoireArcana = [
  { roman: "0", name: "The Fool", symbol: "/pathways/Fool_Symbol2.webp" },
  { roman: "I", name: "The Magician", symbol: "/pathways/Door_Symbol2.webp" },
  { roman: "II", name: "The High Priestess", symbol: "/pathways/Darkness_Symbol2.webp" },
  { roman: "III", name: "The Empress", symbol: "/pathways/Mother_Symbol2.webp" },
  { roman: "IV", name: "The Emperor", symbol: "/pathways/Black_Emperor_Symbol2.webp" },
  { roman: "V", name: "The Hierophant", symbol: "/pathways/White_Tower_Symbol2.webp" },
  { roman: "VI", name: "The Lovers", symbol: "/pathways/Demoness_Symbol2.webp" },
  { roman: "VII", name: "The Chariot", symbol: "/pathways/Red_Priest_Symbol2.webp" },
  { roman: "VIII", name: "Strength", symbol: "/pathways/Twilight_Giant_Symbol2.webp" },
  { roman: "IX", name: "The Hermit", symbol: "/pathways/Hermit_Symbol2.webp" },
  { roman: "X", name: "Wheel of Fortune", symbol: "/pathways/Visionary_Symbol2.webp" },
  { roman: "XI", name: "Justice", symbol: "/pathways/Justiciar_Symbol2.webp" },
  { roman: "XII", name: "The Hanged Man", symbol: "/pathways/Hanged_Man_Symbol2.webp" },
  { roman: "XIII", name: "Death", symbol: "/pathways/Death_Symbol2.webp" },
  { roman: "XIV", name: "Temperance", symbol: "/pathways/Paragon_Symbol2.webp" },
  { roman: "XV", name: "The Devil", symbol: "/pathways/Abyss_Symbol2.webp" },
  { roman: "XVI", name: "The Tower", symbol: "/pathways/Tyrant_Symbol2.webp" },
  { roman: "XVII", name: "The Star", symbol: "/pathways/Sun_Symbol2.webp" },
  { roman: "XVIII", name: "The Moon", symbol: "/pathways/Moon_Symbol2.webp" },
  { roman: "XIX", name: "The Sun", symbol: "/pathways/Chained_Symbol2.webp" },
  { roman: "XX", name: "Judgement", symbol: "/pathways/Error_Symbol2.webp" },
] as const;
