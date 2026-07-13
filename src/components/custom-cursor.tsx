import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-layer cursor: precise dot + trailing glow ring.
 * Grows on hoverable elements ([data-cursor="link"] or a, button).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!isTouch);
    if (isTouch) return;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
      const t = e.target as HTMLElement | null;
      const hit = !!t?.closest?.(
        'a, button, [role="button"], [data-cursor="link"]',
      );
      setHovering(hit);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--glow)]"
      />
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 2.2 : 1,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border border-[var(--glow)]/60 mix-blend-difference"
      />
    </>
  );
}
