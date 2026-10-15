import { createFileRoute } from "@tanstack/react-router";
import { PixelReveal } from "@/components/pixel-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samriddhi — Portfolio" },
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
    <main className="relative">
      <section className="relative flex min-h-screen flex-col justify-center px-6 py-28 sm:px-10 md:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <PixelReveal>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--glow)] shadow-[0_0_14px_var(--glow)]" />
              Portfolio
            </div>

            <h1 className="mt-10 font-display font-light leading-[0.86] tracking-[-0.035em] text-[clamp(3.5rem,14vw,14rem)]">
              <span className="block">Hi, I'm</span>
              <span className="block">
                <em className="font-serif italic text-glow text-[var(--glow)]">
                  Samriddhi.
                </em>
              </span>
            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink/80 sm:text-2xl">
              New to product thinking — but I've watched enough crime shows to
              know:{" "}
              <em className="font-serif italic text-ink">
                always question the obvious answer first.
              </em>
            </p>
          </PixelReveal>
        </div>
      </section>
    </main>
  );
}
