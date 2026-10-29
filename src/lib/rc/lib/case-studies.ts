// Case-study content, keyed by project slug.
// Projects without an entry here keep the simple "write-up coming soon" page.
// Edit the copy freely: it's written from your screenshots, so rewrite anything
// that isn't how you'd say it.

import lkkHome from "@/assets/projects/lkk/lkk-home.png";
import lkkBrowse from "@/assets/projects/lkk/lkk-browse.png";
import lkkListing from "@/assets/projects/lkk/lkk-listing.png";
import lkkPricing from "@/assets/projects/lkk/lkk-pricing.png";

export type SampleLocal = {
  category: string;
  title: string;
  city: string;
  hours: number;
  price: number;
};

export type CaseStudySection = {
  label: string;
  heading: string;
  body: string[];
  image?: string;
  imageAlt?: string;
  caption?: string;
  samples?: SampleLocal[];
};

export type CaseStudy = {
  intro?: string;
  links?: { label: string; url: string }[];
  sections: CaseStudySection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "lkk-web-app": {
    intro:
      "A two-sided marketplace that connects travellers with verified locals for bite-sized, in-person experiences — 2 to 8 hours, across Indian cities.",
    links: [
      { label: "Visit site", url: "https://lkk.co.in" },
      { label: "View on GitHub", url: "https://github.com/Puff00000/LKK" },
    ],
    sections: [
      {
        label: "01 — The promise",
        heading: "Put the trust question first.",
        body: [
          "LKK pairs travellers with verified locals for a street-food crawl, a market bargaining session, a sunrise walk — anything from two to eight hours.",
          "Meeting a stranger is the hard part of this product, so the landing page answers it before anything else: verified locals only, payment held until you confirm, reviewed by real travellers. Those three lines sit directly under the call to action.",
          "The hero card is a sample booking — spots, time, price, what's covered — so a visitor sees the whole offer without signing up.",
        ],
        image: lkkHome,
        imageAlt: "LKK landing page with the headline 'log kya kahenge' and a sample Jaipur booking card",
        caption: "Landing page — the promise, and a sample booking.",
      },
      {
        label: "02 — Finding a local",
        heading: "Start from what, or from where.",
        body: [
          "Browse offers two entry points: a service search (street food, bargaining, sunrise) and a city search, plus category chips and sorting for people who would rather scan than type.",
          "Every listing is a single bite-sized experience, not a guide's CV, so the page is built around choosing an activity.",
        ],
        image: lkkBrowse,
        imageAlt: "LKK browse page with service and city search and category filters",
        caption: "Browse — search, categories and sort.",
        samples: [
          { category: "Food & Drink", title: "Street food walk with Aarav", city: "Jaipur", hours: 3, price: 749 },
          { category: "Photography", title: "Jodhpur in golden light", city: "Jodhpur", hours: 2, price: 499 },
          { category: "Shopping", title: "Bargaining the old bazaar", city: "Jaipur", hours: 2, price: 499 },
          { category: "Nature", title: "Sunrise from the fort walls", city: "Jaipur", hours: 4, price: 999 },
        ],
      },
      {
        label: "03 — The decision page",
        heading: "Everything needed to say yes, on one screen.",
        body: [
          "A listing shows the category, title, duration, city and reviews at the top, then a single booking card: the price, what it covers, and one button.",
          "Under it, three reassurances answer the last-minute doubts: payment is held until the meetup is confirmed, disputes are resolved within 24 hours, and 90% of every booking goes to the local.",
          "The local's profile carries a verification status, so trust is visible before booking, and the card says it covers the local's time only, which sets cost expectations early.",
        ],
        image: lkkListing,
        imageAlt: "LKK listing page for 'Jodhpur in golden light' with a booking card",
        caption: "Listing — one booking card, three trust notes.",
      },
      {
        label: "04 — Pricing",
        heading: "One rule, no surprises.",
        body: [
          "₹499 for two hours, ₹250 for each extra hour, up to eight. The fee covers the local's time only; food, entry fees, shopping and transport are shown separately on each listing.",
          "LKK takes a 10% platform fee, with no surge pricing and no booking fees. A slider on the pricing page lets a traveller drag through the durations and watch the price scale, so the whole rule makes sense in ten seconds.",
        ],
        image: lkkPricing,
        imageAlt: "LKK pricing page with a duration slider showing ₹749 for 3 hours",
        caption: "Pricing — drag the slider to see how it scales.",
      },
      {
        label: "05 — Under the hood",
        heading: "What it's built on.",
        body: [
          "React 19 and Vite on Vercel, a FastAPI backend on Render, PostgreSQL through Supabase, Resend for email, and Razorpay for payments with server-side verification.",
          "Guides manage their own services, bank and UPI details are checked with a penny-drop verification, intro videos go through admin moderation, and payouts run through an admin queue.",
          "Trips can be created before signing up: the flow keeps its state in the browser first, so there is no signup wall before a traveller sees the product.",
          "Along the way I moved phone login off Firebase OTP and rebuilt the email templates as a branded system. Early versions ran on Node, Express and Prisma before moving to FastAPI.",
        ],
      },
    ],
  },
};
