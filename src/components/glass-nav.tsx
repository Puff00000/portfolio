import { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Instagram, Mail, BookOpen, Linkedin } from "lucide-react";

const items = [
  { to: "/projects", label: "works" },
  { to: "/about", label: "about" },
  { to: "/about", label: "contact" },
] as const;

const EASE = [0.65, 0, 0.35, 1] as const;

function HoverWord({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="inline-flex"
      variants={{ rest: {}, hover: { transition: { staggerChildren: 0.02 } } }}
    >
      {text.split("").map((ch, i) => {
        const rot = ((i * 53) % 11) - 5;
        return (
          <motion.span
            key={i}
            className="inline-block will-change-transform"
            variants={
              reduce
                ? { rest: {}, hover: {} }
                : { rest: { y: 0, rotate: 0 }, hover: { y: -8, rotate: rot } }
            }
            transition={{ type: "spring", stiffness: 380, damping: 14 }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export function GlassNav() {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [bulletY, setBulletY] = useState(0);
  const { location } = useRouterState();
  const path = location.pathname;

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Position bullet next to active item
  useEffect(() => {
    if (!open) return;
    const el = itemRefs.current[activeIdx];
    const list = listRef.current;
    if (!el || !list) return;
    const elRect = el.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    setBulletY(elRect.top - listRect.top + elRect.height / 2);
  }, [activeIdx, open]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Menu button */}
      <div className="pointer-events-auto absolute right-4 top-4 sm:right-6 sm:top-6">
        <motion.button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          animate={{ scale: hovering ? 1.05 : 1, opacity: open ? 0 : 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex select-none items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium lowercase tracking-tight text-black"
        >
          <HoverWord text="menu" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 4.5L6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Right-side floating white panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className="pointer-events-auto absolute right-4 top-4 bottom-4 sm:right-6 sm:top-6 sm:bottom-6 rounded-[32px] bg-white text-[#111111] overflow-hidden"
            style={{ width: "min(calc(100vw - 2rem), 560px)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Close top-right */}
            <div className="absolute right-8 top-8 flex items-center gap-3">
              <button
                onClick={() => setOpen(false)}
                className="text-[18px] font-normal lowercase text-[#111111]"
              >
                close
              </button>
              <motion.button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-black"
              >
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  whileHover={{ rotate: 90, opacity: 0.85 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="white"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </motion.button>
            </div>

            {/* Nav list */}
            <nav className="absolute left-8 sm:left-12 right-8 top-[38%] -translate-y-1/2">
              <ul ref={listRef} className="relative flex flex-col gap-[18px]">
                {/* Bullet indicator */}
                <motion.span
                  aria-hidden
                  className="absolute left-0 h-[10px] w-[10px] rounded-full bg-black"
                  animate={{ top: bulletY - 5, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                />
                {items.map((it, i) => {
                  const active = i === activeIdx;
                  return (
                    <motion.li
                      key={it.label}
                      ref={(el) => (itemRefs.current[i] = el)}
                      onMouseEnter={() => setActiveIdx(i)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        delay: 0.25 + i * 0.06,
                        duration: 0.5,
                        ease: EASE,
                      }}
                      className="leading-[0.92]"
                    >
                      <motion.div
                        animate={{ x: active ? 34 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      >
                        <Link
                          to={it.to}
                          className="inline-block font-sans font-semibold lowercase text-[#111111]"
                          style={{
                            fontSize: "clamp(56px, 9vw, 96px)",
                            letterSpacing: "-0.03em",
                            lineHeight: 0.92,
                          }}
                        >
                          <HoverWord text={it.label} />
                        </Link>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Email bottom-left */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="absolute left-8 sm:left-12 bottom-10 text-[16px] font-normal text-[#111111]"
            >
              <a href="mailto:samriddhi@example.com">samriddhi@example.com</a>
            </motion.div>

            {/* Social icons bottom-right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="absolute right-8 bottom-8 flex items-center gap-[14px]"
            >
              {[
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Mail, href: "mailto:samriddhi@example.com", label: "Email" },
                { Icon: BookOpen, href: "https://medium.com", label: "Medium" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black"
                >
                  <motion.span
                    whileHover={{ rotate: 8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex items-center justify-center text-white"
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
