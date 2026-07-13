import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const items = [
  { to: "/", label: "index" },
  { to: "/projects", label: "work" },
  { to: "/about", label: "about" },
] as const;

const LABEL = "menu";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

/**
 * Per-letter jelly hover animation. Each character animates independently
 * with slightly offset timing — restrained, editorial, alive.
 */
function JellyLabel({ text, hovering }: { text: string; hovering: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          animate={
            hovering && !reduce
              ? {
                  y: [0, -2.2, 1.4, -1.6, 0],
                  x: [0, 0.6, -0.5, 0.3, 0],
                  rotate: [0, -2.4, 1.8, -1.2, 0],
                }
              : { y: 0, x: 0, rotate: 0 }
          }
          transition={{
            duration: 1.6 + i * 0.12,
            repeat: hovering ? Infinity : 0,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function GlassNav() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { location } = useRouterState();
  const path = location.pathname;

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Menu button — anchor in top-right */}
      <div className="pointer-events-auto absolute right-4 top-4 sm:right-6 sm:top-6">
        <motion.button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => {
            setPressed(true);
            setTimeout(() => setPressed(false), 180);
            setOpen(true);
          }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          animate={{
            scale: pressed ? 0.94 : hovering ? 1.05 : 1,
            opacity: open ? 0 : 1,
          }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          style={{
            boxShadow: hovering
              ? "0 18px 60px -18px rgba(255,255,255,0.35), 0 2px 10px -2px rgba(0,0,0,0.4)"
              : "0 8px 30px -12px rgba(255,255,255,0.18), 0 1px 4px -1px rgba(0,0,0,0.3)",
          }}
          className="group flex select-none items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium lowercase tracking-tight text-black will-change-transform"
        >
          <JellyLabel text={LABEL} hovering={hovering} />
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="will-change-transform"
            animate={
              hovering
                ? { rotate: [0, -6, 4, -3, 0], y: [0, -1, 0.5, -0.4, 0] }
                : { rotate: 0, y: 0 }
            }
            transition={{
              duration: 1.8,
              repeat: hovering ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <path
              d="M2.5 4.5L6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      </div>

      {/* Expanding panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className="pointer-events-auto absolute right-4 top-4 origin-top-right overflow-hidden rounded-[28px] bg-white text-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] sm:right-6 sm:top-6"
            initial={{
              width: 128,
              height: 44,
              opacity: 0.9,
            }}
            animate={{
              width: "min(calc(100vw - 2rem), 720px)",
              height: "min(calc(100vh - 2rem), 640px)",
              opacity: 1,
            }}
            exit={{
              width: 128,
              height: 44,
              opacity: 0,
            }}
            transition={{
              duration: 0.85,
              ease: EASE_IN_OUT,
            }}
          >
            {/* Close button */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.3 }}
              whileHover={{ rotate: 90, scale: 1.08 }}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/70 transition-colors hover:text-black sm:right-6 sm:top-6"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 2l10 10M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>

            {/* Nav content */}
            <div className="flex h-full flex-col justify-between px-10 pb-12 pt-24 sm:px-16 sm:pt-28">
              <nav>
                <ul className="flex flex-col gap-3 sm:gap-5">
                  {items.map((it, i) => {
                    const active =
                      it.to === "/"
                        ? path === "/"
                        : path === it.to || path.startsWith(it.to + "/");
                    return (
                      <motion.li
                        key={it.to}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{
                          delay: 0.55 + i * 0.08,
                          duration: 0.6,
                          ease: EASE_OUT,
                        }}
                      >
                        <Link
                          to={it.to}
                          className="group relative inline-flex items-baseline gap-4 font-serif text-[clamp(2.75rem,9vw,6rem)] font-light lowercase leading-[0.95] tracking-tight"
                        >
                          <motion.span
                            className="inline-block will-change-transform"
                            whileHover={{ x: 12, opacity: 0.7 }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                          >
                            {it.label}
                          </motion.span>
                          {active && (
                            <span className="text-xs font-sans uppercase tracking-[0.3em] text-black/40">
                              ● now
                            </span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55 + items.length * 0.08, duration: 0.5 }}
                className="flex items-end justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.24em] text-black/50"
              >
                <span>Samriddhi ✲ Portfolio</span>
                <span>2026</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
