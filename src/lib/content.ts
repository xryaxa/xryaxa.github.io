/**
 * All site content lives here so copy and projects can be edited without
 * touching a single component. Add a project → it appears everywhere.
 */

export const SITE = {
  name: "Ryaxa",
  fullName: "Rahman Zahidov",
  role: "Frontend Engineer",
  location: "Baku, Azerbaijan",
  url: "https://xryaxa.github.io",
  email: "xryaxa@gmail.com",
  linkedin: "https://linkedin.com/in/rahman-zahidov-a88b3b399",
  github: "https://github.com/xryaxa",
  resume: "/Rahman_Zahidov_CV.pdf",
  tagline: "Builder. Dreamer. Frontend Engineer. Future Founder.",
  description:
    "Self-taught frontend engineer from Baku. I build products people actually use — Nara, a white-label meal-subscription platform running in production.",
} as const;

/* ------------------------------------------------------------------ boot -- */

export const BOOT_LINES = [
  { text: "initializing developer...", delay: 260 },
  { text: "loading caffeine ................ 98%", delay: 300 },
  { text: "connecting to github ... 9 repos (all private, sorry)", delay: 420 },
  { text: "scanning for bugs ............... 3 found", delay: 300 },
  { text: "fixing bugs ..................... 3 fixed", delay: 300 },
  { text: "measuring ambition .............. overflow", delay: 340 },
  { text: "compiling dreams ................ done", delay: 300 },
] as const;

/* -------------------------------------------------------------- projects -- */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  status: "Live" | "In production" | "In progress" | "You're on it";
  role: string;
  summary: string;
  challenge: string;
  lesson: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  href?: string;
  image?: string;
  imageAlt?: string;
  accent?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "nara",
    name: "Nara",
    tagline: "The software behind modern meal-prep kitchens",
    year: "2025 — now",
    status: "In production",
    role: "Founder · Frontend",
    summary:
      "A white-label platform that lets a meal-subscription business run clients, menus, deliveries, payments and payroll from one dashboard — and hand their customers a branded app in their own language. I designed it, built the frontend and shipped it to real businesses.",
    challenge:
      "One codebase has to look like a different company for every tenant. Logo, colours, domain and language all change per business, so nothing could be hardcoded — every surface reads from tenant config at runtime.",
    lesson:
      "Shipping to real businesses rewrote how I build. A bug is no longer a red squiggle, it is somebody's dinner order. I learned to design for the worst day, not the demo.",
    metrics: [
      { label: "Languages", value: "3" },
      { label: "Tenants", value: "White-label" },
      { label: "Commission taken", value: "0%" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    href: "https://nara.az",
    image: "/projects/nara.jpg",
    imageAlt: "Nara marketing site — run your meal-subscription business from one dashboard",
    accent: "#e0234e",
  },
  {
    slug: "nara-app",
    name: "Nara Customer App",
    tagline: "The same platform, wearing someone else's brand",
    year: "2025 — now",
    status: "In production",
    role: "Frontend",
    summary:
      "The customer-facing side of Nara. Every business gets this app under its own name, colours and domain — passwordless phone login, the chef's menu for tomorrow, allergies and preferences, and delivery tracking. This screenshot is one real tenant.",
    challenge:
      "Trilingual UI (Azerbaijani, Russian, English) where the type has to stay beautiful in all three — Cyrillic and Latin have different rhythm, so a layout tuned for one breaks in another.",
    lesson:
      "Theming is an architecture problem, not a CSS problem. Once tokens flow from config instead of a stylesheet, a new brand takes minutes instead of a fork.",
    metrics: [
      { label: "Login", value: "Passwordless" },
      { label: "Locales", value: "AZ · RU · EN" },
      { label: "Per-tenant theming", value: "Runtime" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "i18n"],
    href: "https://app.nara.az",
    image: "/projects/nara-app.jpg",
    imageAlt: "Nara customer app — branded tenant storefront in Russian",
    accent: "#f43f5e",
  },
  {
    slug: "nara-dashboard",
    name: "Nara Dashboard",
    tagline: "Where the kitchen actually runs the business",
    year: "2025 — now",
    status: "In production",
    role: "Frontend",
    summary:
      "The operator side: subscriptions and pauses, the daily delivery run, recipe catalogue with macros, staff payroll, and analytics on revenue, active subscribers and churn — plus Excel export, because every kitchen owner still wants a spreadsheet.",
    challenge:
      "Dense data screens that non-technical kitchen owners use at 6am. Every table had to survive being read fast, on a phone, by someone with flour on their hands.",
    lesson:
      "Talking to the people using it beats any design system. Half the good decisions here came from watching someone struggle for ten seconds.",
    metrics: [
      { label: "Analytics", value: "Revenue · Churn" },
      { label: "Export", value: "Excel" },
      { label: "Built for", value: "6am" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Charts"],
    accent: "#4c8dff",
  },
  {
    slug: "nara-mobile",
    name: "Nara Mobile",
    tagline: "Ordering without installing anything",
    year: "2025 — now",
    status: "In production",
    role: "Frontend",
    summary:
      "A Telegram Mini App so customers can order inside a chat they already have open — no App Store, no install, no password. In Azerbaijan that removes the single biggest drop-off in the funnel.",
    challenge:
      "Telegram's webview is not a browser. Viewport, safe areas, theme and back-button behaviour all come from the host app, so the UI has to adapt to a shell it does not control.",
    lesson:
      "Meet users where they already are. The best onboarding flow is the one that never asks anyone to download anything.",
    metrics: [
      { label: "Install required", value: "None" },
      { label: "Platform", value: "Telegram" },
      { label: "Auth", value: "Phone number" },
    ],
    stack: ["Telegram Mini App", "React", "TypeScript", "Tailwind CSS"],
    accent: "#22d3ee",
  },
  {
    slug: "bullur",
    name: "Bullur",
    tagline: "Next one out of the workshop",
    year: "2025",
    status: "In progress",
    role: "Founder · Frontend",
    summary:
      "An early-stage product I'm building now. Same instinct as Nara: find something people do awkwardly every day, and give it an interface worth opening.",
    challenge:
      "Starting again from an empty folder — this time with everything Nara taught me about not over-building before anyone has used it.",
    lesson:
      "Still being written. Ask me at the interview.",
    metrics: [
      { label: "Stage", value: "Building" },
      { label: "Stack", value: "TypeScript" },
      { label: "Launch", value: "Soon" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    accent: "#a78bfa",
  },
  {
    slug: "portfolio",
    name: "This Portfolio",
    tagline: "You are standing in it",
    year: "2025",
    status: "You're on it",
    role: "Everything",
    summary:
      "Built in Next.js 16, React 19, TypeScript and Tailwind v4, animated with Motion, statically exported and deployed to GitHub Pages from a public repo. Try ⌘K. Try the Konami code. Try clicking the résumé button and see if it lets you.",
    challenge:
      "Making something memorable that still scores in the nineties on Lighthouse. Every animation had to earn its bytes.",
    lesson:
      "Restraint is the hard part. The temptation is to animate everything; the craft is deciding what stays still.",
    metrics: [
      { label: "Lighthouse", value: "95+" },
      { label: "Bundle", value: "Static" },
      { label: "Easter eggs", value: "A few" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Motion"],
    href: "https://github.com/xryaxa/xryaxa.github.io",
    accent: "#4c8dff",
  },
];

/* --------------------------------------------------------------- skills -- */

export const SKILL_GROUPS = [
  {
    title: "Building",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Styling & motion",
    items: ["Tailwind CSS", "Motion", "Design systems", "Responsive UI", "Figma"],
  },
  {
    title: "Shipping",
    items: ["Git", "REST APIs", "Vercel", "GitHub Pages", "Accessibility", "SEO"],
  },
  {
    title: "Working with AI",
    items: ["Claude Code", "ChatGPT", "Prompt design", "AI-assisted review"],
  },
] as const;

/* -------------------------------------------------------------- journey -- */

export const JOURNEY = [
  {
    year: "2022",
    title: "Started university",
    body: "Geology, English sector, Baku State University. Not computer science — that part I had to go get myself.",
  },
  {
    year: "2024",
    title: "First lines of real code",
    body: "Stopped watching tutorials and started shipping badly. Everything I know traces back to that switch.",
  },
  {
    year: "2025",
    title: "Client sites",
    body: "Cafés, tour operators, meal delivery, a doner shop. Real deadlines, real feedback, real people refreshing the page.",
  },
  {
    year: "2025",
    title: "Founded Nara",
    body: "Turned a repeated problem into a product: white-label software for meal-subscription businesses. Designed it, built it, shipped it.",
  },
  {
    year: "2025",
    title: "Nara in production",
    body: "Real businesses, real customers, real money moving through an interface I built. Nothing teaches faster.",
  },
  {
    year: "Next",
    title: "Learn from people better than me",
    body: "I have taken this as far as one person can. The next jump is a professional team, a mentor, and a codebase bigger than mine.",
  },
] as const;

/* ------------------------------------------------------------------ why -- */

export const WHY = [
  {
    title: "I like the moment it becomes real",
    body: "There is a specific second when a thing stops being a layout and starts being something a stranger uses without thinking. I build for that second.",
  },
  {
    title: "Interfaces are an argument",
    body: "Every screen is telling someone what matters. Good ones make the right thing feel obvious. That is design, not decoration.",
  },
  {
    title: "I want to build a company",
    body: "Not someday — I already started. Nara is the first attempt. I want to get very good at this alongside people who already are.",
  },
] as const;
