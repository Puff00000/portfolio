import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getProject, projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { caseStudies } from "@/lib/case-studies";
import type { CaseStudySection } from "@/lib/case-studies";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Samriddhi" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const desc = `${project.tag} · ${project.year} — ${project.blurb}`;
    return {
      meta: [
        { title: `${project.title} — Samriddhi` },
        { name: "description", content: desc },
        { property: "og:title", content: `${project.title} — Samriddhi` },
        { property: "og:description", content: desc },
        { property: "og:image", content: project.image },
        { name: "twitter:image", content: project.image },
      ],
    };
  },
  component: ProjectDetail,
});

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const study = caseStudies[project.slug];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="relative px-6 pt-28 pb-16 sm:px-10 md:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted-foreground"
        >
          <Link to="/projects" className="hover:text-[var(--glow)]">
            ← All work
          </Link>
          <Link to="/" className="hidden hover:text-[var(--glow)] sm:inline">
            Samriddhi
          </Link>
        </motion.div>

        <section className="mt-20 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-baseline gap-4 text-xs uppercase tracking-[0.24em] text-muted-foreground"
          >
            <span className="text-[var(--glow)]">{project.index}</span>
            <span>·</span>
            <span>{project.tag}</span>
            <span>·</span>
            <span>{project.year}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3rem,12vw,10rem)] font-light leading-[0.9] tracking-[-0.03em]"
          >
            {project.title}
            <em className="font-serif italic text-[var(--glow)]">.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-ink/85 sm:text-3xl"
          >
            {study?.intro ?? project.blurb}
          </motion.p>

          {/* Site / GitHub buttons (only for projects with a case study) */}
          {study?.links && study.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {study.links.map((l, i) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className={
                    i === 0
                      ? "rounded-full bg-[var(--glow)] px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#07070a] transition-transform hover:-translate-y-0.5"
                      : "rounded-full border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.22em] text-ink transition-colors hover:border-[var(--glow)] hover:text-[var(--glow)]"
                  }
                >
                  {l.label} ↗
                </a>
              ))}
            </motion.div>
          )}

          {study ? (
            /* Full case study: screenshots + thought process */
            <div className="mt-20 sm:mt-28">
              {study.sections.map((s) => (
                <Section key={s.label} section={s} />
              ))}
            </div>
          ) : (
            <>
              {/* Fallback for projects without a write-up yet: unchanged from before */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="mt-14 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={900}
                  className="w-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-20 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-[1fr_2fr]"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  ✲ Case study
                </p>
                <p className="max-w-2xl font-serif text-2xl leading-snug text-ink/75 sm:text-3xl">
                  Full write-up coming soon — problem, process, and outcomes.
                </p>
              </motion.div>
            </>
          )}
        </section>

        <NextProject next={next} />
      </div>
    </main>
  );
}

function Section({ section: s }: { section: CaseStudySection }) {
  return (
    <motion.section {...fade} className="mb-24 sm:mb-32">
      <div className="grid gap-6 border-t border-white/10 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <span className="text-[var(--glow)]">✲</span> {s.label}
        </p>
        <div>
          <h2 className="font-display text-3xl font-light leading-[1.05] tracking-tight sm:text-5xl">
            {s.heading}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-ink/70 sm:text-lg">
            {s.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {s.image && (
        <figure className="mt-10">
          <img
            src={s.image}
            alt={s.imageAlt ?? ""}
            loading="lazy"
            className="h-auto w-full rounded-2xl bg-white ring-1 ring-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]"
          />
          {s.caption && (
            <figcaption className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {s.caption}
            </figcaption>
          )}
        </figure>
      )}

      {s.samples && (
        <div className="mt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Sample listings · illustrative, not real locals
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {s.samples.map((l) => (
              <li
                key={l.title}
                className="rounded-xl p-5"
                style={{ backgroundColor: "#fffdf7", color: "#17261c" }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "#b45309" }}
                >
                  {l.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {l.title}
                </h3>
                <p className="mt-1 text-sm opacity-70">
                  {l.city} · {l.hours} hours
                </p>
                <p className="mt-6 flex items-end justify-between">
                  <span className="text-2xl font-bold" style={{ color: "#14532d" }}>
                    ₹{l.price}
                  </span>
                  <span className="text-xs opacity-60">local's time only</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
}

function NextProject({ next }: { next: Project }) {
  const inner = (
    <>
      {next.title}
      <span
        aria-hidden
        className="text-[var(--glow)] transition-transform group-hover:translate-x-1"
      >
        ↗
      </span>
    </>
  );
  const cls =
    "group inline-flex items-baseline gap-3 font-display text-3xl font-light transition-colors hover:text-[var(--glow)] sm:text-5xl";

  return (
    <section className="mt-28 flex items-baseline justify-between border-t border-white/10 pt-8">
      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
        Next
      </p>
      {next.href ? (
        // External file/link (e.g. the PDF teardown) opens in a new tab
        <a
          href={next.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className={cls}
        >
          {inner}
        </a>
      ) : (
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          data-cursor="link"
          className={cls}
        >
          {inner}
        </Link>
      )}
    </section>
  );
}
