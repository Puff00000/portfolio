import lkk from "@/assets/projects/lkk.jpg";
import zomato from "@/assets/projects/zomato.jpg";
import iceapple from "@/assets/projects/iceapple.jpg";
import validator from "@/assets/projects/validator.jpg";
import snuggle from "@/assets/projects/snuggle.jpg";

export type Project = {
  slug: string;
  index: string;
  title: string;
  tag: string;
  year: string;
  image: string;
  blurb: string;
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
    slug: "transaction-dq-fraud-monitor",
    index: "02",
    title: "Fraud Risk Monitor",
    tag: "Data Pipeline",
    year: "2026",
    image: zomato,
    blurb: "Fraud scores are meaningless on broken data, so I built a pipeline that checks data quality first and only then scores risk.",
  },
  {
    slug: "theiceapple",
    index: "03",
    title: "SpoonSixty",
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
    slug: "instagram-dm-search-teardown",
    index: "05",
    title: "Instagram DM Search",
    tag: "Product Teardown",
    year: "2025",
    image: snuggle,
    blurb: "Instagram's DM search locks you into a slice of the chat. I traced why, who it hurts, and how I'd fix it.",
    href: "https://docs.google.com/document/d/1GNST62V9WWO4Q1rpA0v3L9KcTfLvTUPU/edit?usp=sharing&ouid=111295531481954010613&rtpof=true&sd=true",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
