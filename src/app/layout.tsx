import type { Metadata } from "next";
import { Cinzel, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { PathwayProvider } from "@/components/providers/PathwayProvider";
import {
  SceneContent,
  SceneTransitionProvider,
} from "@/components/providers/SceneTransitionProvider";
import { SceneBackground } from "@/components/effects/SceneBackground";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { BackgroundAudio } from "@/components/effects/BackgroundAudio";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "theMagiche | Frontend Developer & Interface Alchemist",
  description:
    "Frontend developer crafting immersive web experiences at the intersection of code and mystery. React, Next.js, motion design.",
  keywords: [
    "frontend developer",
    "React",
    "Next.js",
    "theMagiche",
    "web developer",
    "UI/UX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="scanline-overlay min-h-full bg-background font-sans text-foreground">
        <div className="noise-overlay" />
        <PathwayProvider>
          <SceneTransitionProvider>
            <SceneBackground />
            <BackgroundAudio />
            <SceneContent>
              <ParticleBackground />
              <Navbar />
              {children}
            </SceneContent>
          </SceneTransitionProvider>
        </PathwayProvider>
      </body>
    </html>
  );
}
