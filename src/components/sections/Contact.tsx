"use client";

import { useRef, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Sparkles } from "lucide-react";
import {
  formatHonorificChant,
  honorificName,
  ritualCorrespondences,
  siteConfig,
} from "@/lib/data";
import { playPaperSlide } from "@/lib/sound";
import { usePathwayTheme } from "@/components/providers/usePathwayTheme";
import { cn } from "@/lib/utils";
import {
  GitHubIcon,
  KoFiIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";

const correspondenceIcons: Record<string, ComponentType<{ className?: string }>> = {
  whatsapp: WhatsAppIcon,
  linkedin: LinkedInIcon,
  kofi: KoFiIcon,
  youtube: YouTubeIcon,
  github: GitHubIcon,
  twitter: TwitterIcon,
};

export function Contact() {
  const { theme } = usePathwayTheme();
  const [chanted, setChanted] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chantRun = useRef(0);

  const handleChant = async () => {
    const run = ++chantRun.current;

    try {
      await navigator.clipboard.writeText(formatHonorificChant());
    } catch {
      // The name is still chanted on the altar even if the clipboard is veiled.
    }

    playPaperSlide();
    setChanted(true);

    for (let index = 0; index < honorificName.length; index += 1) {
      if (chantRun.current !== run) return;
      setActiveLine(index);
      await new Promise((resolve) => setTimeout(resolve, 520));
    }

    if (chantRun.current !== run) return;
    setActiveLine(null);

    window.setTimeout(() => {
      if (chantRun.current === run) setChanted(false);
    }, 2800);
  };

  const handleCopyCorrespondence = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    playPaperSlide();
    setCopiedId(id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === id ? null : current));
    }, 2200);
  };

  return (
    <div className="grid gap-12 md:grid-cols-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-6 md:col-span-2"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Performing the Ritual
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            To pierce the fog and establish a connection, chant the honorific
            name thrice. Then choose a corresponding medium and state your
            prayer.
          </p>
        </div>

        <ol className="space-y-2 font-mono text-xs leading-relaxed text-muted/80">
          <li>
            <span className={theme.text}>I.</span> Chant the honorific name
          </li>
          <li>
            <span className={theme.text}>II.</span> Choose a corresponding
            medium
          </li>
          <li>
            <span className={theme.text}>III.</span> Speak the request into the
            gray fog
          </li>
        </ol>

        <div className="flex items-center gap-3">
          <div className={cn("rounded border p-2", theme.borderSoft, theme.bg)}>
            <Mail className={cn("h-4 w-4", theme.text)} />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              The Messenger
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className={cn("text-sm transition-colors", theme.hoverText)}
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={cn("rounded border p-2", theme.borderSoft, theme.bg)}>
            <MapPin className={cn("h-4 w-4", theme.text)} />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Realm
            </p>
            <p className="text-sm">Available Worldwide · Remote</p>
          </div>
        </div>

        <div className="glass rounded-lg p-4">
          <p className="font-mono text-xs leading-relaxed text-muted/70">
            <span className={theme.text}>&gt;</span> Altar:{" "}
            <span className={theme.text}>Open to opportunities</span>
            <br />
            <span className={theme.text}>&gt;</span> Response time:{" "}
            <span className="text-foreground">Within 24 hours</span>
            <br />
            <span className={theme.text}>&gt;</span> Specialization:{" "}
            <span className="text-foreground">Frontend · UI/UX · Motion</span>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-4 md:col-span-3"
      >
        <div className="glass relative overflow-hidden rounded-lg p-6">
          <span className="pointer-events-none absolute left-3 top-3 font-display text-[10px] text-accent-amber/50">
            ⌜
          </span>
          <span className="pointer-events-none absolute right-3 top-3 font-display text-[10px] text-accent-amber/50">
            ⌝
          </span>
          <span className="pointer-events-none absolute bottom-3 left-3 font-display text-[10px] text-accent-amber/50">
            ⌞
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 font-display text-[10px] text-accent-amber/50">
            ⌟
          </span>

          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            Honorific Name
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted/60">
            I implore
          </p>

          <blockquote className="mt-4 space-y-2">
            {honorificName.map((line, index) => (
              <p
                key={line}
                className={cn(
                  "font-display text-base leading-relaxed tracking-wide transition-colors duration-300 md:text-lg",
                  activeLine === index
                    ? theme.text
                    : chanted
                      ? "text-foreground"
                      : "text-muted"
                )}
              >
                {line}
                {index === honorificName.length - 1 ? "." : ";"}
              </p>
            ))}
          </blockquote>

          <button
            type="button"
            onClick={handleChant}
            className={cn(
              "group mt-6 flex w-full items-center justify-center gap-2 rounded border py-3 font-mono text-sm uppercase tracking-widest transition-all",
              theme.border,
              theme.bg,
              theme.text,
              theme.borderHover,
              theme.bgHover,
              theme.buttonGlow
            )}
          >
            {chanted ? (
              <span>The prayer has been heard ✦</span>
            ) : (
              <>
                <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                Chant Honorific Name
              </>
            )}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {ritualCorrespondences.map((item, index) => {
            const Icon = correspondenceIcons[item.id];
            const copied = copiedId === item.id;
            const content = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className={cn("rounded border p-2", theme.borderSoft, theme.bg)}>
                    {Icon ? <Icon className={cn("h-4 w-4", theme.text)} /> : null}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">
                    {item.vessel}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold tracking-wide">
                  {item.rite}
                </h3>
                <p className={cn("mt-1 font-mono text-xs", theme.text)}>
                  {copied ? "Name inscribed" : item.handle}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted/70">
                  {item.description}
                </p>
              </>
            );

            const className = cn(
              "glass w-full rounded-lg p-4 text-left transition-all duration-300",
              theme.hoverGlow,
              theme.borderHover
            );
            const label = `${item.rite}, ${item.vessel}: ${item.handle}`;

            if (item.href) {
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={className}
                >
                  {content}
                </motion.a>
              );
            }

            return (
              <motion.button
                key={item.id}
                type="button"
                aria-label={`Inscribe ${label}`}
                onClick={() =>
                  item.copyValue &&
                  handleCopyCorrespondence(item.id, item.copyValue)
                }
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={className}
              >
                {content}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
