import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

type Props = { projects: Project[] };

// Block colours, built from the portfolio theme:
// lime glow, cream (menu card), mint (menu card gradient), forest, charcoal.
// Cycles automatically, so adding a project in projects.ts needs no change here.
const palette = [
  { bg: "var(--glow)", fg: "#07070a", sub: "rgba(7,7,10,0.62)" },
  { bg: "#f4f5ef", fg: "#101012", sub: "rgba(16,16,18,0.58)" },
  { bg: "#cfe9e2", fg: "#0c1f1a", sub: "rgba(12,31,26,0.62)" },
  { bg: "#14361f", fg: "var(--glow)", sub: "rgba(244,245,239,0.68)" },
  { bg: "#17171d", fg: "#f4f5ef", sub: "rgba(244,245,239,0.6)" },
];

const condensed = '"Anton", "Bebas Neue", Impact, "Arial Narrow", sans-serif';

export function ProjectIndex({ projects }: Props) {
  return (
    <ul className="flex flex-col gap-2 sm:gap-3">
      {projects.map((p, i) => {
        const c = palette[i % palette.length];
        return (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              data-cursor="link"
              style={{ backgroundColor: c.bg, color: c.fg }}
              className="group block overflow-hidden rounded-xl px-5 py-6 outline-none ring-1 ring-white/10 transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-white sm:px-8 sm:py-8"
            >
              {/* Always-visible row */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                  <span
                    className="pt-2 text-xs uppercase tracking-[0.24em]"
                    style={{ color: c.sub }}
                  >
                    {p.index}
                  </span>
                  <h2
                    style={{ fontFamily: condensed }}
                    className="break-words text-[clamp(2.5rem,7.5vw,6.5rem)] font-normal uppercase leading-[0.92] tracking-[-0.005em]"
                  >
                    {p.title}
                  </h2>
                </div>

                <div
                  className="hidden shrink-0 items-start gap-6 pt-2 text-right text-xs uppercase tracking-[0.22em] sm:flex"
                  style={{ color: c.sub }}
                >
                  <div className="flex flex-col gap-1">
                    <span>{p.tag}</span>
                    <span>{p.year}</span>
                  </div>
                  <span
                    aria-hidden
                    className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: c.fg }}
                  >
                    ↗
                  </span>
                </div>
              </div>

              {/* Opens on hover / keyboard focus; always open on touch screens */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                <div className="min-h-0 overflow-hidden">
                  <div className="grid gap-6 pt-6 md:grid-cols-[1fr_auto] md:items-end">
                    <div className="max-w-xl">
                      <p
                        className="mb-3 text-xs uppercase tracking-[0.22em] sm:hidden"
                        style={{ color: c.sub }}
                      >
                        {p.tag} · {p.year}
                      </p>
                      <p className="font-serif text-xl italic leading-snug sm:text-2xl">
                        {p.blurb}
                      </p>
                      <span
                        className="mt-5 inline-block border-b pb-0.5 text-xs uppercase tracking-[0.22em]"
                        style={{ borderColor: c.fg }}
                      >
                        View project ↗
                      </span>
                    </div>

                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="aspect-[4/3] w-full rounded-lg object-cover md:w-72"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
