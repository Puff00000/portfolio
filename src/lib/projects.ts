import lkk from "@/assets/projects/lkk.jpg";
import zomato from "@/assets/projects/zomato.jpg";
import iceapple from "@/assets/projects/iceapple.jpg";
import validator from "@/assets/projects/validator.jpg";
import snuggle from "@/assets/projects/snuggle.jpg";
// Add this image to src/assets/projects/ BEFORE using this file,
// otherwise the build fails on a missing import.
import igTeardown from "@/assets/projects/ig-dm-teardown.jpg";

export type Project = {
  slug: string;
  index: string;
  title: string;
  tag: string;
  year: string;
  image: string;
  blurb: string;
  // Optional. If set, the block opens this link in a new tab
  // instead of the project's own page (e.g. a PDF in /public, a repo, a live site).
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "lkk-web-app",
    index: "01",
    title: "LKK Web App",
    tag: "Web app",
    year: "2025",
    image: lkk,
    blurb: "An end-to-end web application — from product framing to shipped UI.",
  },
  {
    slug: "zomato-case-study",
    index: "02",
    title: "Zomato Case Study",
    tag: "Case study",
    year: "2025",
    image: zomato,
    blurb: "A product deep-dive into Zomato — problem framing, flows, and recommendations.",
  },
  {
    slug: "theiceapple",
    index: "03",
    title: "TheIceApple",
    tag: "Concept",
    year: "2024",
    image: iceapple,
    blurb: "A small concept piece — playful branding and product thinking.",
  },
  {
    slug: "startup-validator-ai-india",
    index: "04",
    title: "Startup Validator AI India",
    tag: "AI tool",
    year: "2025",
    image: validator,
    blurb: "An AI tool for validating early-stage startup ideas in the Indian market.",
  },
  {
    slug: "snuggle",
    index: "05",
    title: "Snuggle",
    tag: "Product",
    year: "2024",
    image: snuggle,
    blurb: "A soft, companion-first product concept — warm UI and gentle interactions.",
  },
  {
    slug: "instagram-dm-search-teardown",
    index: "06",
    title: "Instagram DM Search",
    tag: "Teardown",
    year: "2026",
    image: igTeardown,
    blurb:
      "Instagram's DM search locks you into a slice of the chat. I traced why, who it hurts, and how I'd fix it.",
    href: "/teardowns/instagram-dm-search-teardown.pdf",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
