import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ── Your links. LinkedIn stays hidden until you paste its URL. ── */
const EMAIL = "samriddhi.pn05@gmail.com";
const GITHUB = "https://github.com/Puff00000";
const LINKEDIN = "https://www.linkedin.com/in/samriddhi-pradhan-664480215"; 
/* ─────────────────────────────────────────────────────────────── */

const SOCIALS = [
  { label: "GitHub", href: GITHUB, icon: "github", external: true },
  { label: "LinkedIn", href: LINKEDIN, icon: "linkedin", external: true },
  { label: "Email (Gmail)", href: `mailto:${EMAIL}`, icon: "gmail", external: false },
] as const;

const INK = "#141414";
const PAPER = "#F7F7F2";

function Icon({ name }: { name: string }) {
  const p = { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": true } as const;
  if (name === "linkedin")
    return (
      <svg {...p} fill="currentColor">
        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3a1.96 1.96 0 100 3.92A1.96 1.96 0 005.25 3zM20.44 13.2c0-3.1-1.65-4.55-3.86-4.55-1.78 0-2.58.98-3.02 1.67V8.5h-3.38V20h3.38v-6.4c0-.34.02-.68.13-.92.27-.68.9-1.39 1.95-1.39 1.38 0 1.93 1.05 1.93 2.6V20h3.38v-6.8z" />
      </svg>
    );
  if (name === "gmail")
    return (
      <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 6.5L12 13l8.5-6.5" />
      </svg>
    );
  return (
    <svg {...p} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z" />
    </svg>
  );
}

export function GlassNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const ease = [0.22, 1, 0.36, 1] as const;
  const easeInOut = [0.65, 0, 0.35, 1] as const;

  const linkClass =
    "group relative inline-block py-0.5 text-[clamp(2.5rem,5.2vw,4.75rem)] font-light leading-[1.02] tracking-[-0.03em] outline-none " +
    "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-black/60";

  const label = (text: string) => (
    <>
      <span
        aria-hidden
        className="absolute -left-5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ background: INK }}
      />
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">
        {text}
      </span>
    </>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        data-cursor="link"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
        className="group fixed right-5 top-5 z-40 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black transition-opacity hover:opacity-85 sm:right-8 sm:top-7"
      >
        menu
        <svg
          viewBox="0 0 12 12"
          width="11"
          height="11"
          aria-hidden
          className="transition-transform duration-300 group-hover:rotate-90"
        >
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence onExitComplete={() => triggerRef.current?.focus()}>
        {open && (
          <>
            {/* dimmed + blurred page behind the card; click to close */}
            <motion.div
              key="menu-backdrop"
              aria-hidden
              className="fixed inset-0 z-[45] bg-black/45 backdrop-blur-md"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            />
            <motion.div
              key="menu-panel"
              id="site-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed bottom-3 right-3 top-3 z-50 flex w-[calc(100vw-1.5rem)] flex-col justify-between overflow-y-auto rounded-xl p-5 sm:bottom-10 sm:right-10 sm:top-10 sm:w-[clamp(380px,32vw,640px)] sm:p-8"
              style={{
                transformOrigin: "100% 0%",
                color: INK,
                background:
                  "radial-gradient(70% 55% at 92% 96%, rgba(170,226,214,0.6), rgba(170,226,214,0) 70%), " +
                  PAPER,
              }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.86, x: 40, y: -40 }}
              animate={
                reduce
                  ? { opacity: 1, transition: { duration: 0.2 } }
                  : { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 0.75, ease } }
              }
              exit={
                reduce
                  ? { opacity: 0, transition: { duration: 0.15 } }
                  : { opacity: 0, scale: 0.9, x: 28, y: -28, transition: { duration: 0.5, ease: easeInOut } }
              }
            >
              <div className="flex justify-end">
                <button
                  ref={closeRef}
                  type="button"
                  data-cursor="link"
                  onClick={close}
                  className="rounded-full border border-black/15 px-4 py-2 text-sm outline-none transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black/60"
                >
                  close ×
                </button>
              </div>

              <nav aria-label="Main" className="my-6 pl-5">
                <ul className="flex flex-col gap-1 sm:gap-2">
                  <li>
                    <Link to="/projects" onClick={close} className={linkClass} data-cursor="link">
                      {label("works")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={close} className={linkClass} data-cursor="link">
                      {label("about")}
                    </Link>
                  </li>
                  <li>
                    <a href={`mailto:${EMAIL}`} onClick={close} className={linkClass} data-cursor="link">
                      {label("contact")}
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex flex-wrap items-end justify-between gap-4 text-xs">
                <a
                  href={`mailto:${EMAIL}`}
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {EMAIL}
                </a>
                <ul className="flex items-center gap-2">
                  {SOCIALS.filter((s) => s.href).map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full outline-none transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black/60"
                        style={{ background: INK, color: PAPER }}
                      >
                        <Icon name={s.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default GlassNav;
