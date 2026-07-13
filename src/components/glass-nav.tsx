import { Link, useRouterState } from "@tanstack/react-router";

const items = [
  { to: "/", label: "Index" },
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
] as const;

export function GlassNav() {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <div className="pointer-events-auto glass flex items-center gap-1 rounded-full px-2 py-1.5 shadow-[0_10px_60px_-20px_rgba(181,255,61,0.25)]">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.18em] uppercase text-ink/90 transition-colors hover:text-[var(--glow)]"
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--glow)] shadow-[0_0_12px_var(--glow)]"
          />
          Samriddhi
        </Link>
        <span className="mx-1 h-4 w-px bg-white/10" />
        {items.map((it) => {
          const active =
            it.to === "/"
              ? path === "/"
              : path === it.to || path.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] uppercase transition-colors ${
                active
                  ? "bg-white/8 text-[var(--glow)]"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
