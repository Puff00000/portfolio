import type { SVGProps } from "react";

export function MediumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="6.5" cy="12" rx="5.5" ry="5.5" />
      <ellipse cx="15.5" cy="12" rx="2.8" ry="5.2" />
      <ellipse cx="21" cy="12" rx="1.1" ry="4.5" />
    </svg>
  );
}
