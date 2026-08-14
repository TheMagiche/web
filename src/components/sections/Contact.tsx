"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/data";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-violet/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          title="Send a Whisper"
          subtitle="Every great collaboration begins with a message through the fog. Reach out and let's build something extraordinary."
        />

        <div className="grid gap-12 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="rounded border border-accent-cyan/20 bg-accent-cyan/10 p-2">
                <Mail className="h-4 w-4 text-accent-cyan" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm transition-colors hover:text-accent-cyan"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded border border-accent-violet/20 bg-accent-violet/10 p-2">
                <MapPin className="h-4 w-4 text-accent-violet" />
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
                <span className="text-accent-amber">&gt;</span> Status:{" "}
                <span className="text-accent-cyan">Open to opportunities</span>
                <br />
                <span className="text-accent-amber">&gt;</span> Response time:{" "}
                <span className="text-foreground">Within 24 hours</span>
                <br />
                <span className="text-accent-amber">&gt;</span> Specialization:{" "}
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
                className="w-full rounded border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors focus:border-accent-violet/50 focus:shadow-[0_0_15px_rgba(157,78,221,0.15)]"
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
                className="w-full rounded border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors focus:border-accent-violet/50 focus:shadow-[0_0_15px_rgba(157,78,221,0.15)]"
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
                className="w-full resize-none rounded border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none transition-colors focus:border-accent-violet/50 focus:shadow-[0_0_15px_rgba(157,78,221,0.15)]"
              />
            </div>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded border border-accent-violet/40 bg-accent-violet/10 py-3 font-mono text-sm uppercase tracking-widest text-accent-violet transition-all hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:text-accent-cyan hover:shadow-[0_0_25px_rgba(0,245,212,0.2)]"
            >
              {sent ? (
                <span className="text-accent-cyan">Whisper Sent ✦</span>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Transmit Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
