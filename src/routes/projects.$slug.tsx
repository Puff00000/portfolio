import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ContactChips } from "@/components/contact-chips";
import { getProject, projects } from "@/lib/projects";

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

function ProjectDetail() {
  const { project } = Route.useLoaderData();
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
            {project.blurb}
          </motion.p>

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
        </section>

        <section className="mt-28 flex items-baseline justify-between border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Next
          </p>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            data-cursor="link"
            className="group inline-flex items-baseline gap-3 font-display text-3xl font-light transition-colors hover:text-[var(--glow)] sm:text-5xl"
          >
            {next.title}
            <span
              aria-hidden
              className="text-[var(--glow)] transition-transform group-hover:translate-x-1"
            >
              ↗
            </span>
          </Link>
        </section>

        <footer className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <ContactChips />
          <Link
            to="/projects"
            className="text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-[var(--glow)]"
          >
            ← Back to index
          </Link>
        </footer>
      </div>
    </main>
  );
}
