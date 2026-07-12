type Props = { className?: string };

const links = [
  { label: "Email", href: "mailto:samriddhi.pn05@gmail.com", handle: "samriddhi.pn05@gmail.com" },
  { label: "Instagram", href: "https://instagram.com/_.samriddhyyy._", handle: "@_.samriddhyyy._" },
  { label: "Medium", href: "https://medium.com/@psamriddhi32", handle: "@psamriddhi32" },
];

export function ContactChips({ className = "" }: Props) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground ${className}`}
    >
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-baseline gap-2 transition-colors hover:text-ink"
          >
            <span className="uppercase tracking-[0.18em] text-xs text-ink/60 group-hover:text-ink">
              {l.label}
            </span>
            <span className="font-serif text-base italic text-ink">{l.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
