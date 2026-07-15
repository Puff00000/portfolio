import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { WebGLBackground } from "@/components/webgl-background";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GlassNav } from "@/components/glass-nav";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          404 / Signal lost
        </p>
        <h1 className="mt-6 font-display text-7xl font-light tracking-tight">
          Off-grid.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page slipped through the cracks.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-b border-[var(--glow)] pb-0.5 font-display text-lg text-[var(--glow)] transition-opacity hover:opacity-80"
          >
            Back to intro <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-light">Something didn't load.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Try again, or head back to the intro.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border-b border-[var(--glow)] pb-0.5 font-display text-lg text-[var(--glow)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="border-b border-white/30 pb-0.5 font-display text-lg text-ink/80"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#07070a" },
      { title: "Samriddhi — Portfolio" },
      {
        name: "description",
        content:
          "Interactive portfolio of Samriddhi — product thinking, UX, data, case studies and small web experiments.",
      },
      { name: "author", content: "Samriddhi" },
      { property: "og:title", content: "Samriddhi — Portfolio" },
      {
        property: "og:description",
        content:
          "Interactive portfolio of Samriddhi — product thinking, UX, data, case studies and small web experiments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20 grid-bg opacity-70"
        />
        {/* Radial vignette */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 0%, rgba(181,255,61,0.08), transparent 60%), radial-gradient(900px 700px at 90% 90%, rgba(122,92,255,0.10), transparent 60%)",
          }}
        />
        <WebGLBackground />
        <SmoothScroll />
        <GlassNav />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
