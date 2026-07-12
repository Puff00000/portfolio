import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

type Props = { projects: Project[] };

export function ProjectIndex({ projects }: Props) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Enable cursor-follow only on non-touch, wider viewports
  useEffect(() => {
    const check = () => {
      const isTouch =
        window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
      setEnabled(!isTouch && window.innerWidth >= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  return (
    <div className="relative">
      <ul className="border-t border-ink/15">
        {projects.map((p) => (
          <li
            key={p.slug}
            onMouseEnter={() => setHovered(p)}
            onMouseLeave={() => setHovered((h) => (h?.slug === p.slug ? null : h))}
            className="group border-b border-ink/15"
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 transition-[padding,opacity] duration-300 hover:pl-3 sm:py-8 md:py-10"
              style={{
                opacity:
                  hovered && hovered.slug !== p.slug && enabled ? 0.35 : 1,
              }}
            >
              <span className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground w-8">
                {p.index}
              </span>

              <span className="min-w-0">
                <span className="block truncate font-serif text-4xl leading-none text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                  {p.title}
                </span>
                {/* Mobile inline thumbnail */}
                {!enabled && (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="mt-4 aspect-[4/3] w-full max-w-sm rounded-sm object-cover md:hidden"
                  />
                )}
              </span>

              <span className="flex shrink-0 items-baseline gap-4 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground sm:gap-8">
                <em className="not-italic hidden sm:inline text-ink/70">
                  {p.tag}
                </em>
                <span>{p.year}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-follow preview */}
      {enabled && (
        <div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
          style={{
            transform: `translate3d(${pos.x + 24}px, ${pos.y - 180}px, 0)`,
            transition: "opacity 300ms ease, scale 300ms ease",
            opacity: hovered ? 1 : 0,
            scale: hovered ? "1" : "0.96",
          }}
        >
          {hovered && (
            <img
              key={hovered.slug}
              src={hovered.image}
              alt=""
              width={1200}
              height={900}
              className="h-[340px] w-[460px] rounded-sm object-cover shadow-[0_30px_80px_-30px_rgba(13,13,13,0.35)] animate-fade-in"
            />
          )}
        </div>
      )}
    </div>
  );
}
