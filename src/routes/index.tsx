import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ContactChips } from "@/components/contact-chips";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samriddhi — Portfolio ✲ 2026" },
      {
        name: "description",
        content:
          "Hi, I'm Samriddhi. New to product thinking — but I've watched enough crime shows to know: always question the obvious answer first.",
      },
      { property: "og:title", content: "Samriddhi — Portfolio ✲ 2026" },
      {
        property: "og:description",
        content:
          "Product thinking, case studies, web apps, and visuals by Samriddhi.",
      },
    ],
  }),
  component: Index,
});

const marquee = [
  "Product thinking",
  "UX research",
  "Data storytelling",
  "Case studies",
  "Small web apps",
  "AI tinkering",
  "Editorial UI",
];

function Index() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col justify-between px-6 pt-28 pb-10 sm:px-10 md:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--glow)] shadow-[0_0_14px_var(--glow)]" />
            Portfolio ✲ 2026 · Live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-display font-light leading-[0.86] tracking-[-0.035em] text-[clamp(3.5rem,14vw,14rem)]"
          >
            <span className="block">Hi, I'm</span>
            <span className="block">
              <em className="font-serif italic text-glow text-[var(--glow)]">
                Samriddhi.
              </em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-10 max-w-3xl text-lg leading-relaxed text-ink/80 sm:text-2xl"
          >
            New to product thinking — but I've watched enough crime shows to know:{" "}
            <em className="font-serif italic text-ink">
              always question the obvious answer first.
            </em>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              data-cursor="link"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--glow)] px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
            >
              Enter the work
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink/80 transition-colors hover:border-white/40 hover:text-ink"
            >
              About me
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mx-auto flex w-full max-w-6xl items-end justify-between text-xs uppercase tracking-[0.24em] text-muted-foreground"
        >
          <span>Scroll ↓</span>
          <span className="hidden sm:inline">
            Real-time WebGL · Inertial scroll
          </span>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative overflow-hidden border-y border-white/10 py-6">
        <div className="flex w-[200%] animate-marquee gap-14 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((w, i) => (
            <span
              key={i}
              className="font-serif text-4xl italic text-ink/70 sm:text-6xl"
            >
              {w} <span className="text-[var(--glow)]">✲</span>
            </span>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative px-6 py-32 sm:px-10 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              ✲ Philosophy / 00
            </p>
            <h2 className="mt-6 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl">
              I make things that <em className="font-serif italic text-[var(--glow)]">notice</em> back.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6 text-ink/75"
          >
            <p className="text-lg leading-relaxed sm:text-xl">
              I work between product, UX, and data — case studies that dig into
              real problems, small web apps that ship, and interfaces that feel
              alive without being loud.
            </p>
            <p className="text-lg leading-relaxed sm:text-xl">
              Everything here is a working draft. Curiosity as a discipline.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { k: "05", v: "Projects" },
                { k: "2026", v: "Portfolio" },
                { k: "∞", v: "Questions" },
              ].map((r) => (
                <div
                  key={r.v}
                  className="glass rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                >
                  <p className="font-display text-3xl text-[var(--glow)]">
                    {r.k}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {r.v}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-24 sm:px-10 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="glass rounded-3xl p-10 sm:p-14">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl font-light leading-tight sm:text-6xl"
            >
              Ready to look at the{" "}
              <em className="font-serif italic text-[var(--glow)]">evidence</em>?
            </motion.h3>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <ContactChips />
              <Link
                to="/projects"
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--glow)] px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
              >
                See projects
                <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-6 py-8 sm:px-10 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span>© 2026 Samriddhi</span>
          <span>Built with curiosity ✲ WebGL</span>
        </div>
      </footer>
    </main>
  );
}
