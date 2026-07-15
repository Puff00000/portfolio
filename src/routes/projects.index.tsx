import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ProjectIndex } from "@/components/project-index";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Work — Samriddhi ✲ 2026" },
      {
        name: "description",
        content:
          "Selected work by Samriddhi — web apps, case studies, AI tools, and product concepts.",
      },
      { property: "og:title", content: "Work — Samriddhi ✲ 2026" },
      {
        property: "og:description",
        content:
          "Selected work by Samriddhi — web apps, case studies, AI tools, and product concepts.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="relative px-6 pt-28 pb-16 sm:px-10 md:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted-foreground"
        >
          <Link to="/" className="hover:text-[var(--glow)]">
            ← Intro
          </Link>
          <span>Selected work ✲ 2026</span>
        </motion.div>

        <div className="mt-20 flex items-baseline justify-between sm:mt-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.28em] text-muted-foreground"
          >
            Index / {String(projects.length).padStart(2, "0")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden font-serif italic text-ink/60 sm:block"
          >
            hover to preview
          </motion.p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[clamp(3.5rem,13vw,12rem)] font-light leading-[0.88] tracking-[-0.03em]"
        >
          The <em className="font-serif italic text-[var(--glow)]">work.</em>
        </motion.h1>

        <p className="mt-6 max-w-2xl text-ink/70 sm:text-lg">
          Case studies, tools, and small experiments. Hover any row to preview.
        </p>

        <section className="mt-16 sm:mt-20">
          <ProjectIndex projects={projects} />
        </section>
      </div>
    </main>
  );
}
