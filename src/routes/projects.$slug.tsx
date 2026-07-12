import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
    <main className="flex min-h-screen flex-col bg-background px-6 py-8 sm:px-10 md:px-16">
      <header className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.2em] text-ink/70">
        <Link to="/projects" className="transition-opacity hover:opacity-60">
          ← All projects
        </Link>
        <Link to="/" className="hidden transition-opacity hover:opacity-60 sm:inline">
          Samriddhi
        </Link>
      </header>

      <section className="mt-16 max-w-5xl sm:mt-24">
        <div className="flex items-baseline gap-4 font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span>{project.index}</span>
          <span>·</span>
          <span>{project.tag}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>

        <h1 className="mt-6 font-serif text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl">
          {project.title}.
        </h1>

        <p className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-ink/80 sm:text-3xl">
          {project.blurb}
        </p>

        <div className="mt-12 overflow-hidden rounded-sm">
          <img
            src={project.image}
            alt={project.title}
            width={1200}
            height={900}
            className="w-full object-cover"
          />
        </div>

        <div className="mt-16 border-t border-ink/15 pt-8">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">
            ✲ Case study
          </p>
          <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug text-ink/70 sm:text-3xl">
            Full write-up coming soon — problem, process, and outcomes.
          </p>
        </div>
      </section>

      <div className="mt-24 flex items-baseline justify-between border-t border-ink/15 pt-6">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Next
        </p>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group inline-flex items-baseline gap-3 font-serif text-2xl text-ink transition-opacity hover:opacity-70 sm:text-4xl"
        >
          {next.title}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            ↗
          </span>
        </Link>
      </div>

      <footer className="mt-16 flex flex-col gap-6 border-t border-ink/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <ContactChips />
        <Link
          to="/projects"
          className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-ink"
        >
          ← Back to index
        </Link>
      </footer>
    </main>
  );
}
