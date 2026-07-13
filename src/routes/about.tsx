import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ContactChips } from "@/components/contact-chips";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Samriddhi ✲ 2026" },
      {
        name: "description",
        content:
          "About Samriddhi — product thinker with a taste for asking better questions.",
      },
      { property: "og:title", content: "About — Samriddhi ✲ 2026" },
      {
        property: "og:description",
        content:
          "About Samriddhi — product thinker with a taste for asking better questions.",
      },
    ],
  }),
  component: About,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-serif text-4xl">Something didn't load.</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-6 border-b border-[var(--glow)] pb-1 font-serif text-2xl text-[var(--glow)]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      Not found
    </div>
  ),
});

function About() {
  return (
    <main className="relative min-h-screen px-6 pt-32 pb-16 sm:px-10 md:px-16">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.28em] text-muted-foreground"
        >
          ✲ About / 01
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-light leading-[0.9] tracking-[-0.03em]"
        >
          Curious by <em className="font-serif italic text-[var(--glow)]">default.</em>
        </motion.h1>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl leading-snug text-ink/85 sm:text-3xl"
          >
            I'm Samriddhi — new to product thinking, but not to noticing what's
            off. My favourite habit: question the obvious answer first.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 text-sm leading-relaxed text-ink/70"
          >
            <p>
              I move between research, UX, data and small web experiments.
              I like editorial layouts, moody palettes, tools that respect
              your attention, and products that respect your time.
            </p>
            <p>
              Right now I'm looking for product roles where curiosity is a
              feature, not a bug.
            </p>
          </motion.div>
        </div>

        <section className="mt-24 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {[
            { k: "Focus", v: "Product · UX · Data" },
            { k: "Based", v: "India — remote-friendly" },
            { k: "Status", v: "Open to roles" },
          ].map((r) => (
            <div key={r.k}>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {r.k}
              </p>
              <p className="mt-2 font-display text-2xl">{r.v}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <ContactChips />
          <Link
            to="/projects"
            className="group inline-flex items-baseline gap-3 border-b border-[var(--glow)] pb-1 font-display text-xl text-[var(--glow)]"
          >
            See the work
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
