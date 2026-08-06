import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SITE } from "@/lib/content";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BootSequence } from "@/components/boot-sequence";
import { SiteChrome } from "@/components/site-chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${SITE.name} — ${SITE.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Baku",
    "Azerbaijan",
    "frontend intern",
    "Rahman Zahidov",
    "Nara",
  ],
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

/** Structured data so a recruiter's search engine understands who this is. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.fullName,
  alternateName: SITE.name,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  url: SITE.url,
  address: { "@type": "PostalPlace", name: SITE.location },
  sameAs: [SITE.github, SITE.linkedin, "https://nara.az"],
  knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Frontend Development"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to content
        </a>

        <BootSequence />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiteChrome />
      </body>
    </html>
  );
}
