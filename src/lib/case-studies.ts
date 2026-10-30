// Case-study content, keyed by project slug.
// Projects without an entry here keep the simple "write-up coming soon" page.
// Edit the copy freely: it's written from your screenshots, so rewrite anything
// that isn't how you'd say it.

import lkkHome from "@/assets/projects/lkk/lkk-home.png";
import lkkBrowse from "@/assets/projects/lkk/lkk-browse.png";
import lkkListing from "@/assets/projects/lkk/lkk-listing.png";
import lkkPricing from "@/assets/projects/lkk/lkk-pricing.png";
import igCover from "@/assets/projects/ig-dm-teardown.jpg";

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
  "instagram-dm-search-teardown": {
    intro:
      "A teardown of why Instagram's DM search drops you into a locked slice of the conversation: who it hurts, the likely causes, and a three-step fix.",
    links: [
      // Paste your Google Drive share link between the quotes
      // (Share -> Anyone with the link -> Viewer -> Copy link)
      { label: "Read the full teardown (PDF)", url: "PASTE_YOUR_DRIVE_LINK_HERE" },
    ],
    sections: [
      {
        label: "01 — The bug",
        heading: "Search finds the message, then locks you in.",
        body: [
          "When you search the Instagram DM inbox and tap a result, the right message appears. But once you're inside, you can't scroll up or down past that slice of the chat. The rest of the conversation is out of reach from that entry point.",
          "WhatsApp does the opposite: it opens the full chat, highlights the match, and lets you scroll freely in both directions. The only way out on Instagram is to leave, open the chat the long way, and scroll from the top.",
        ],
        image: igCover,
        imageAlt: "Illustration of a chat where only the slice around the search result is reachable",
        caption: "The reachable slice versus the whole conversation (illustration).",
      },
      {
        label: "02 — Who it hurts",
        heading: "Hardest on people who live in their DMs.",
        body: [
          "Power users with dozens of conversations lean on search the most, so for them it's critical. Creators and small business owners come next: they dig up old brand deals, collaboration context and customer history, and the messages around a result often matter more than the result itself.",
          "Casual users and new users barely notice, since their histories are short and they rarely search.",
          "These severity levels are my judgement, not measured data.",
        ],
      },
      {
        label: "03 — Why it might happen",
        heading: "Three hypotheses, one most likely.",
        body: [
          "A. A lazy-loading bug (most likely): the chat anchors to the batch of messages that matched, but scrolling never triggers loading the neighbouring batches.",
          "B. A preview context: search results may open a lightweight, deliberately limited view that was never meant for scrolling, and nobody flagged it as a problem.",
          "C. A scroll listener that isn't wired up: the scroll input on the search-entry view may not reach the full chat's scroll container.",
          "I can't see Instagram's code, so these are hypotheses based on the behaviour I observed.",
        ],
      },
      {
        label: "04 — The benchmark",
        heading: "WhatsApp and Telegram already get this right.",
        body: [
          "Both open the full chat, highlight the match, let you scroll in either direction, step between multiple results with arrows, and support searching inside a single chat.",
          "Instagram does none of these properly: scrolling is blocked, the highlight is partial, and there is no multi-result navigation or in-chat search. The gap goes beyond one bug: several adjacent features are missing.",
          "Compared on the apps as I tested them. Features change, so recheck against current versions.",
        ],
      },
      {
        label: "05 — Three fixes",
        heading: "A quick fix, a proper fix, and a north star.",
        body: [
          "1. Fix the scroll anchor so adjacent message batches load. About 1–2 sprints, low risk, immediate relief, but no new features.",
          "2. Open search results in the full chat: scroll to the match, highlight it, allow free navigation. About 2–4 sprints, medium risk because it touches chat routing and state, and it may load more history on entry.",
          "3. Add in-chat search with up and down arrows between matches. A quarter or more of work, and it needs per-conversation indexing.",
          "My sequence: ship the first as a hotfix, plan the second for the next cycle, and put the third on the six-month roadmap. The effort figures are rough estimates.",
        ],
      },
      {
        label: "06 — Success metrics",
        heading: "How I'd know it worked.",
        body: [
          "Primary: the share of search sessions where the user scrolls after tapping a result (goal: above 60%), the search abandonment rate (goal: below 20%), and repeat search queries as a sign of frustration (goal: down by 30%).",
          "Guardrails: DM session length should rise, DM search usage should recover as trust returns, store-review sentiment about DMs should improve, and chat load time and message delivery must not regress.",
          "These are targets I'd set before shipping, not baselines taken from Instagram's data.",
        ],
      },
      {
        label: "07 — Why now",
        heading: "A small bug on a high-traffic path.",
        body: [
          "It breaks a core navigation behaviour for the heaviest users, sits on a path used constantly, and cuts against Meta's push to make DMs a business channel. WhatsApp already does it correctly, and the first fix is cheap. That makes it a clear P1.",
        ],
      },
    ],
  },
};
