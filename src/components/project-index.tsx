import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/projects";

type Props = { projects: Project[] };

export function ProjectIndex({ projects }: Props) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });
  const raf = useRef(0);

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
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        mx.set(e.clientX + 28);
        my.set(e.clientY - 200);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled, mx, my]);

  return (
    <div className="relative">
      <ul className="border-t border-white/10">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            onMouseEnter={() => setHovered(p)}
            onMouseLeave={() =>
              setHovered((h) => (h?.slug === p.slug ? null : h))
            }
            className="group border-b border-white/10"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                data-cursor="link"
                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-8 transition-all duration-500 hover:pl-4 sm:py-10 md:py-12"
                style={{
                  opacity:
                    hovered && hovered.slug !== p.slug && enabled ? 0.28 : 1,
                }}
              >
                <span className="w-10 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {p.index}
                </span>

                <span className="min-w-0">
                  <span className="block truncate font-display text-4xl font-light leading-[0.95] tracking-tight transition-colors group-hover:text-[var(--glow)] sm:text-6xl md:text-7xl lg:text-8xl">
                    {p.title}
                  </span>
                  {!enabled && (
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="mt-5 aspect-[4/3] w-full max-w-sm rounded-md object-cover md:hidden"
                    />
                  )}
                </span>

                <span className="flex shrink-0 items-baseline gap-4 text-xs uppercase tracking-[0.22em] text-muted-foreground sm:gap-8">
                  <span className="hidden sm:inline text-ink/70">{p.tag}</span>
                  <span>{p.year}</span>
                  <span
                    aria-hidden
                    className="text-[var(--glow)] transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </span>
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>

      {enabled && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {hovered && (
              <motion.div
                key={hovered.slug}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9, rotate: -3 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <img
                  src={hovered.image}
                  alt=""
                  width={1200}
                  height={900}
                  className="h-[320px] w-[440px] rounded-lg object-cover shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
                />
                <div className="absolute inset-x-3 -bottom-3 flex items-center justify-between rounded-md glass px-3 py-1.5 text-[10px] uppercase tracking-[0.22em]">
                  <span className="text-[var(--glow)]">{hovered.tag}</span>
                  <span className="text-ink/70">{hovered.year}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
