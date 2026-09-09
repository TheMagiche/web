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

The journal is managed through the self-hosted Outstatic dashboard at
`/outstatic`. Copy `.env.example` to `.env.local`, add a GitHub OAuth app's
credentials, set the repository owner and slug, and generate an
`OST_TOKEN_SECRET` before opening the dashboard. Published documents in
`outstatic/content/posts` appear in the Sequence 7 journal and are available at
`/blog/[slug]`.

For local OAuth, configure the GitHub app with homepage
`http://localhost:3000/` and callback URL
`http://localhost:3000/api/outstatic/callback`. The bare `/api/outstatic` URL is
an internal API endpoint and is not the CMS page; use `/outstatic` to sign in.

## Deploy

Deploy on [Vercel](https://vercel.com) or any platform that supports Next.js.
