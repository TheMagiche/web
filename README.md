# theMagiche — Personal Portfolio

A Lord of the Mysteries inspired cyberpunk portfolio built with Next.js, React, Framer Motion, and tsparticles.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Motion:** Framer Motion
- **Particles:** tsparticles
- **Icons:** Lucide React
- **Fonts:** Cinzel, Space Grotesk, JetBrains Mono
- **CMS:** Outstatic, with Markdown content committed to GitHub

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customize

- **Site content:** Edit `src/lib/data.ts` for personal info, skills, projects, and social links
- **Theme colors:** Adjust CSS variables in `src/app/globals.css`
- **Sections:** Components live in `src/components/sections/`

## Blog CMS

The journal is managed through Outstatic at `/outstatic`. Copy `.env.example` to
`.env.local`, add a GitHub OAuth app's credentials, and set the repository owner
and slug before opening the dashboard. Published documents in
`outstatic/content/posts` appear in the Sequence 7 journal and are available at
`/blog/[slug]`.

## Deploy

Deploy on [Vercel](https://vercel.com) or any platform that supports Next.js.
