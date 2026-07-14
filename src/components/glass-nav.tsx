import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Instagram, Mail, BookOpen, Linkedin } from "lucide-react";

const items = [
  { to: "/projects", label: "works" },
  { to: "/about", label: "about" },
  { to: "/about", label: "contact", hash: "contact" },
] as const;

const EASE = [0.65, 0, 0.35, 1] as const;

function JellyWord({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const letters = text.split("");
  return (
    <span className="inline-flex group cursor-pointer">
      {letters.map((ch, i) => {
        const rot = ((i * 37) % 10) - 5;
        return (
          <motion.span
            key={i}
            className="inline-block will-change-transform"
            initial={{ y: 0, rotate: 0 }}
            whileHover={{}}
            variants={
              reduce
                ? undefined
                : {
                    rest: { y: 0, rotate: 0 },
                    hover: { y: -8, rotate: rot },
                  }
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 12,
              delay: i * 0.02,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </span>
  );
}

function HoverWord({ text }: { text: string }) {
  // Wrap letters; parent hover triggers stagger via variants
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="inline-flex"
      variants={{
        rest: {},
        hover: { transition: { staggerChildren: 0.02 } },
      }}
    >
      {text.split("").map((ch, i) => {
        const rot = (((i * 53) % 11) - 5);
        return (
          <motion.span
            key={i}
            className="inline-block will-change-transform"
            variants={
              reduce
                ? { rest: {}, hover: {} }
                : {
                    rest: { y: 0, rotate: 0 },
                    hover: { y: -8, rotate: rot },
                  }
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

  return (
    <>
      {/* Menu button */}
      <div className="pointer-events-none fixed inset-0 z-50">
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

        {/* Fullscreen white floating panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              className="pointer-events-auto absolute inset-4 sm:inset-8 md:inset-10 rounded-[32px] bg-white text-[#111111] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            >
              {/* Close top-right */}
              <div className="absolute right-8 top-8 sm:right-[90px] sm:top-[50px] flex items-center gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="text-[20px] font-normal lowercase text-[#111111]"
                >
                  close
                </button>
                <motion.button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-black"
                >
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    whileHover={{ rotate: 90, opacity: 0.85 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <path
                      d="M3 3l10 10M13 3L3 13"
                      stroke="white"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </motion.button>
              </div>

              {/* Nav list left, vertically slightly above middle */}
              <nav className="absolute left-8 sm:left-[90px] top-[140px] sm:top-[170px]">
                <ul className="flex flex-col gap-[22px]">
                  {items.map((it, i) => (
                    <motion.li
                      key={it.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: EASE }}
                      className="leading-[0.92]"
                    >
                      <Link
                        to={it.to}
                        className="inline-block font-sans font-semibold lowercase text-[#111111]"
                        style={{
                          fontSize: "clamp(72px, 11vw, 118px)",
                          letterSpacing: "-0.03em",
                          lineHeight: 0.92,
                        }}
                      >
                        <HoverWord text={it.label} />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Email bottom-left */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute left-8 sm:left-[90px] bottom-[50px] sm:bottom-[60px] text-[19px] font-normal text-[#111111]"
              >
                <a href="mailto:samriddhi@example.com">samriddhi@example.com</a>
              </motion.div>

              {/* Social icons bottom-right */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute right-8 sm:right-[90px] bottom-[44px] sm:bottom-[52px] flex items-center gap-[18px]"
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
                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-black"
                  >
                    <motion.span
                      whileHover={{ rotate: 8 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="flex items-center justify-center text-white"
                    >
                      <Icon size={21} strokeWidth={1.5} />
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
