import { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Instagram, BookOpen, Linkedin } from "lucide-react";

const items = [
  { to: "/projects", label: "works" },
  { to: "/about", label: "about" },
  { to: "/about", label: "contact" },
] as const;

const EASE = [0.65, 0, 0.35, 1] as const;

function BehanceIcon({
  size = 18,
  strokeWidth = 1.5,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.211.985 1.98 2.405 1.98 1.188 0 1.969-.512 2.25-1.32l2.169.571zm-5.082-4.14h3.735c-.075-1.107-.785-1.72-1.848-1.72-1.03 0-1.777.613-1.887 1.72zM8.667 18.5H2V5.5h6.667c2.36 0 4.16 1.087 4.16 3.517 0 1.507-.804 2.555-2.047 2.952v.05c1.605.325 2.585 1.43 2.585 3.122 0 2.4-1.827 3.759-4.698 3.759zM5.25 8.75v2.85h1.354c1.127 0 1.75-.447 1.75-1.456 0-.95-.54-1.394-1.57-1.394H5.25zm0 7.05v3.2h1.728c1.218 0 1.93-.554 1.93-1.62 0-1.03-.712-1.58-1.93-1.58H5.25z" />
    </svg>
  );
}

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
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
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
                          {it.label}
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
              { Icon: BehanceIcon, href: "https://behance.net", label: "Behance" },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: BookOpen, href: "https://medium.com", label: "Medium" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="group flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white transition-colors duration-300 hover:bg-black"
              >
                <span className="flex items-center justify-center text-black transition-colors duration-300 group-hover:text-white">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
              </motion.a>
            ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
