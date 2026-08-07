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
    year: "2026 — now",
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
    slug: "nara-dashboard",
    name: "Nara Dashboard",
    tagline: "The platform, wearing someone else's brand",
    year: "2026 — now",
    status: "In production",
    role: "Frontend",
    summary:
      "The app every Nara business actually runs on, live at app.nara.az. Its customers get a branded storefront in their own language with passwordless phone login; the owner gets subscriptions and pauses, the daily delivery run, the recipe catalogue with macros, payroll, and analytics on revenue and churn. The screenshot is one real tenant.",
    challenge:
      "One codebase, many identities — and dense operator screens that non-technical kitchen owners read at 6am. Trilingual too: Cyrillic and Latin have different rhythm, so a layout tuned for one breaks in the other.",
    lesson:
      "Theming is an architecture problem, not a CSS problem. Once tokens flow from tenant config instead of a stylesheet, a new brand takes minutes instead of a fork.",
    metrics: [
      { label: "Login", value: "Passwordless" },
      { label: "Locales", value: "AZ · RU · EN" },
      { label: "Theming", value: "Per tenant" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "i18n"],
    href: "https://app.nara.az",
    image: "/projects/nara-dashboard.jpg",
    imageAlt: "Nara dashboard — a live tenant's branded storefront in Russian",
    accent: "#f43f5e",
  },
  {
    slug: "nara-mobile",
    name: "Nara Mobile",
    tagline: "The same product, native in your pocket",
    year: "2026 — now",
    status: "In production",
    role: "Mobile",
    summary:
      "The native Nara app for iOS and Android, built in Flutter from a single codebase. Customers browse tomorrow's menu, manage their subscription and track delivery without opening a browser.",
    challenge:
      "Coming from React and the web, Flutter meant relearning how layout works — no CSS, no DOM, a widget tree instead. Keeping the app visually consistent with the web product while respecting what each platform expects took more iterations than the web build did.",
    lesson:
      "Learning a second way to build UI made me better at the first. Constraints you cannot reach for teach you which ones you were leaning on.",
    metrics: [
      { label: "Platforms", value: "iOS · Android" },
      { label: "Codebase", value: "Single" },
      { label: "Built with", value: "Flutter" },
    ],
    stack: ["Flutter", "Dart", "REST APIs"],
    accent: "#22d3ee",
  },
  {
    slug: "bullur",
    name: "Bullur",
    tagline: "Clean food. Nothing hidden.",
    year: "2026",
    status: "In progress",
    role: "Founder · Frontend",
    summary:
      "A daily meal-plan service for Baku, currently in build. Cooked fresh each morning and delivered — with the ingredients, calories and price shown openly, which is the whole point of it. Bilingual AZ/RU, light and dark themes. Not launched yet; the link is a working preview.",
    challenge:
      "Selling transparency means the interface has to earn trust in the first three seconds. Every claim on the page needs the number behind it visible right there, without turning the layout into a spreadsheet.",
    lesson:
      "Second time around I am building far less before showing it to anyone. Nara taught me that the thing you are most sure about is the thing to test first.",
    metrics: [
      { label: "Stage", value: "Pre-launch" },
      { label: "Languages", value: "AZ · RU" },
      { label: "Plans", value: "Weekly · Monthly" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "https://bullur.vercel.app",
    image: "/projects/bullur.jpg",
    imageAlt: "Bullur — daily meal plans in Baku with fully transparent ingredients",
    accent: "#2dd4bf",
  },
  {
    slug: "portfolio",
    name: "This Portfolio",
    tagline: "You are standing in it",
    year: "2026",
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
    title: "Mobile",
    items: ["Flutter", "Dart", "iOS", "Android"],
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
    year: "Early 2026",
    title: "Client sites",
    body: "Cafés, tour operators, meal delivery, a doner shop. Real deadlines, real feedback, real people refreshing the page.",
  },
  {
    year: "Mid 2026",
    title: "Founded Nara",
    body: "Turned a repeated problem into a product: white-label software for meal-subscription businesses. Designed it, built it, shipped it.",
  },
  {
    year: "2026",
    title: "Nara in production — then Bullur",
    body: "Real businesses, real customers, real money moving through interfaces I built. Then I started the next one, and built far less before showing it to anyone.",
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
