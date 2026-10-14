import { useEffect, useId, useRef, useState, type ReactNode } from "react";

const SIZES = [48, 32, 20, 12, 7, 4, 2]; // block size in px, big → small

export function PixelReveal({
  children,
  stepMs = 110,
}: {
  children: ReactNode;
  stepMs?: number;
}) {
  const id = "px" + useId().replace(/:/g, "");
  const flood = useRef<SVGFEFloodElement>(null);
  const comp = useRef<SVGFECompositeElement>(null);
  const morph = useRef<SVGFEMorphologyElement>(null);
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(false);

  const apply = (s: number) => {
    flood.current?.setAttribute("x", String(s / 2));
    flood.current?.setAttribute("y", String(s / 2));
    comp.current?.setAttribute("width", String(s));
    comp.current?.setAttribute("height", String(s));
    morph.current?.setAttribute("radius", String(s / 2));
  };

  useEffect(() => {
    // Skip the animation for people who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
      setVisible(true);
      return;
    }
    let i = 0;
    apply(SIZES[0]);
    setVisible(true);
    const t = setInterval(() => {
      i++;
      if (i >= SIZES.length) {
        clearInterval(t);
        setActive(false); // remove the filter → crisp final text
        return;
      }
      apply(SIZES[i]);
    }, stepMs);
    return () => clearInterval(t);
  }, [stepMs]);

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feFlood ref={flood} x="1" y="1" width="1" height="1" />
          <feComposite ref={comp} width="2" height="2" />
          <feTile result="tiles" />
          <feComposite in="SourceGraphic" in2="tiles" operator="in" />
          <feMorphology ref={morph} operator="dilate" radius="1" />
        </filter>
      </svg>
      <div
        style={{
          filter: active ? `url(#${id})` : "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms",
        }}
      >
        {children}
      </div>
    </>
  );
}
