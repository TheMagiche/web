"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { usePathway } from "@/components/providers/PathwayProvider";
import { usePathwayTheme } from "@/components/providers/usePathwayTheme";
import { cn } from "@/lib/utils";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";

const socialLinks = [
  { icon: GitHubIcon, href: siteConfig.github, label: "GitHub" },
  { icon: LinkedInIcon, href: siteConfig.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: siteConfig.twitter, label: "Twitter" },
];

export function Footer() {
  const { selected } = usePathway();
  const { theme } = usePathwayTheme();

  return (
    <footer className="relative border-t border-border bg-surface/50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="font-display text-lg font-bold tracking-wider">
              {siteConfig.name}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              Sequence 0 · {selected.name} Pathway
            </p>
            <a
              href="/"
              className={cn(
                "mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.28em] transition-colors",
                theme.text,
                theme.hoverText
              )}
            >
              Reselect Pathway
            </a>
          </motion.div>

          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "text-muted transition-colors",
                  theme.hoverText
                )}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-8 text-center">
          <p className="font-mono text-xs text-muted/60">
            &ldquo;In the depths of the digital fog, clarity emerges through
            code.&rdquo;
          </p>
          <p className="font-mono text-xs text-muted/40">
            © {new Date().getFullYear()} {siteConfig.name}. All mysteries
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
