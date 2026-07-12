import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactChips } from "@/components/contact-chips";
import { ProjectIndex } from "@/components/project-index";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Samriddhi ✲ 2026" },
      {
        name: "description",
        content:
          "Selected work by Samriddhi — web apps, case studies, AI tools, and product concepts.",
      },
      { property: "og:title", content: "Projects — Samriddhi ✲ 2026" },
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
    <main className="flex min-h-screen flex-col bg-background px-6 py-8 sm:px-10 md:px-16">
      {/* Header */}
      <header className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.2em] text-ink/70">
        <Link to="/" className="transition-opacity hover:opacity-60">
          ← Samriddhi
        </Link>
        <span className="hidden sm:inline">Selected work ✲ 2026</span>
      </header>

      {/* Section label */}
      <div className="mt-16 flex items-baseline justify-between sm:mt-24">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Index / {String(projects.length).padStart(2, "0")}
        </p>
        <p className="hidden font-serif italic text-ink/60 sm:block">
          hover to preview
        </p>
      </div>

      <h1 className="mt-6 font-serif text-6xl leading-none text-ink sm:text-7xl md:text-8xl">
        Projects.
      </h1>

      {/* List */}
      <section className="mt-12 sm:mt-16">
        <ProjectIndex projects={projects} />
      </section>

      {/* Footer */}
      <footer className="mt-24 flex flex-col gap-6 border-t border-ink/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <ContactChips />
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          ✲ More case studies soon
        </p>
      </footer>
    </main>
  );
}
