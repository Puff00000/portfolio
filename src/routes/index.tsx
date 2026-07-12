import { createFileRoute, Link } from "@tanstack/react-router";
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

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background px-6 py-8 sm:px-10 md:px-16">
      {/* Top bar */}
      <header className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.2em] text-ink/70">
        <span>Samriddhi</span>
        <span className="hidden sm:inline">Portfolio ✲ 2026</span>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col justify-center py-16 sm:py-24">
        <div className="max-w-4xl animate-fade-in">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">
            ✲ Product · UX · Data · Case studies
          </p>
          <h1 className="mt-6 font-serif text-[15vw] leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-9xl">
            Hi, I'm <em className="italic">Samriddhi.</em>
          </h1>
          <p className="mt-8 max-w-2xl font-serif text-2xl leading-snug text-ink/80 sm:text-3xl md:text-4xl">
            New to product thinking — but I've watched enough crime shows to
            know: <em className="italic">always question the obvious answer first.</em>
          </p>

          <div className="mt-12 flex items-center gap-6">
            <Link
              to="/projects"
              className="group inline-flex items-baseline gap-3 border-b border-ink pb-1 font-serif text-2xl text-ink transition-opacity hover:opacity-70 sm:text-3xl"
            >
              See projects
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto flex flex-col gap-6 border-t border-ink/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <ContactChips />
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          ✲ Based in India · Open to product roles
        </p>
      </footer>
    </main>
  );
}
