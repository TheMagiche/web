"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { usePathwayTheme } from "@/components/providers/usePathwayTheme";
import { cn } from "@/lib/utils";

export function Contact() {
  const [sent, setSent] = useState(false);
  const { theme } = usePathwayTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="grid gap-12 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className={cn("rounded border p-2", theme.borderSoft, theme.bg)}>
                <Mail className={cn("h-4 w-4", theme.text)} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Email
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
                <span className={theme.text}>&gt;</span> Status:{" "}
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

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass space-y-4 rounded-lg p-6 md:col-span-3"
          >
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Seeker of code..."
                className={cn(
                  "w-full rounded border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors",
                  theme.focus
                )}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@realm.com"
                className={cn(
                  "w-full rounded border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors",
                  theme.focus
                )}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the mystery you'd like solved..."
                className={cn(
                  "w-full resize-none rounded border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors",
                  theme.focus
                )}
              />
            </div>
            <button
              type="submit"
              className={cn(
                "group flex w-full items-center justify-center gap-2 rounded border py-3 font-mono text-sm uppercase tracking-widest transition-all",
                theme.border,
                theme.bg,
                theme.text,
                theme.borderHover,
                theme.bgHover,
                theme.buttonGlow
              )}
            >
              {sent ? (
                <span>Whisper Sent ✦</span>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Transmit Message
                </>
              )}
            </button>
          </motion.form>
    </div>
  );
}
