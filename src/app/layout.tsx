import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider, themeInitScript } from "@/components/site/theme-provider";
import { ViewProvider } from "@/components/site/view-provider";
import { GetBookModalProvider } from "@/components/site/get-book-modal";

// Fraunces — variable display serif, heavy optical sizes for the title
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Inter — body and UI
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://victorlevans.com"; // placeholder — see OPEN-ITEMS

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Generational Curse Breaker | Victor L. Evans",
    template: "%s | Victor L. Evans",
  },
  description:
    "A true account of a family's fight for justice. Thirty years of documentation. Six demands. The record of Carrie Evans's legacy and the fight to reclaim it.",
  keywords: [
    "Victor L. Evans",
    "The Generational Curse Breaker",
    "true story family memoir",
    "undue influence will contests",
    "financial exploitation disabled adults",
    "guardianship failures",
    "Adult Protective Services failures",
    "Black family homeownership Washington D.C.",
    "Langdon Northeast D.C. history",
  ],
  authors: [{ name: "Victor L. Evans" }],
  creator: "Victor L. Evans",
  publisher: "Victor L. Evans",
  applicationName: "The Generational Curse Breaker",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "The Generational Curse Breaker — Victor L. Evans",
    title: "The Generational Curse Breaker | Victor L. Evans",
    description:
      "A true account of a family's fight for justice. Thirty years of documentation. Six demands. Read the record.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Generational Curse Breaker — book cover and title",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Generational Curse Breaker | Victor L. Evans",
    description:
      "A true account of a family's fight for justice. Thirty years of documentation. Six demands. Read the record.",
    images: ["/og-image.jpg"],
  },
  category: "books",
  other: {
    "book:author": "Victor L. Evans",
    "book:release_date": "2025",
    "book:tag": "nonfiction",
  },
};

// JSON-LD structured data — Book, Person, WebSite, BreadcrumbList, FAQPage
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "The Generational Curse Breaker — Victor L. Evans",
      description:
        "Author site for Victor L. Evans. A true account of a family's fight for justice.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Victor L. Evans",
      givenName: "Victor",
      familyName: "Evans",
      jobTitle: "Author",
      description:
        "Retired United States Army veteran. Two master's degrees (Public Administration; Human Resources Management). Author of The Generational Curse Breaker. Based in Odenton, Maryland.",
      knowsAbout: [
        "undue influence",
        "elder and disabled adult financial exploitation",
        "guardianship law",
        "veteran advocacy",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Odenton",
        addressRegion: "MD",
        addressCountry: "US",
      },
      alumniOf: "United States Army",
    },
    {
      "@type": "Book",
      "@id": `${SITE_URL}/#book`,
      name: "The Generational Curse Breaker",
      subtitle:
        "A Family's Battle Against Undue Influence, Systemic Neglect, and the Theft of Carrie Evans's Legacy",
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
      bookEdition: "First Edition",
      datePublished: "2025",
      bookFormat: "https://schema.org/Hardcover",
      genre: ["Nonfiction", "Memoir", "True Crime", "Legal"],
      description:
        "A nonfiction account of one family's thirty-year fight against undue influence, systemic neglect, and the theft of Carrie Evans's legacy. The book ends with six formal demands for justice.",
      publisher: { "@type": "Organization", name: "Victor L. Evans" },
      // isbn and offers intentionally omitted — see /docs/OPEN-ITEMS.md
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is The Generational Curse Breaker about?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is a nonfiction account of the Evans family of Washington, D.C. — the home at 2905 Mills Avenue N.E., the displacement after a fire, a will the author alleges was drafted under undue influence, the isolation of his disabled sister Phyllis, the deaths of his brothers, and thirty years of correspondence with federal and D.C. agencies. The book closes with six formal demands for justice.",
          },
        },
        {
          "@type": "Question",
          name: "Who is the book for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Families of people with developmental disabilities, attorneys, social workers, judges, legislators, and law enforcement — anyone who needs to understand what financial exploitation of a vulnerable adult looks like when it happens slowly, behind closed doors, with paperwork that appears legitimate on its face.",
          },
        },
        {
          "@type": "Question",
          name: "Who is Phyllis Lorraine Evans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The author's twin sister, born May 15, 1960 at Freedman's Hospital in Washington, D.C. She lives with hemiplegia and right-hemisphere brain injury sustained before or during birth. The book documents her decades-long isolation from her family and alleges she has been used as a conduit for property she could not understand or manage.",
          },
        },
        {
          "@type": "Question",
          name: "What are the six demands?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An independent guardian and forensic evaluation for Phyllis; a protective order and neutral guardianship; a complete financial audit of 2905 Mills Avenue and the North Carolina land; dignified burials and headstone restoration for the brothers; accountability from the Department of Veterans Affairs; and congressional oversight of the federal and D.C. agencies the author petitioned for thirty years.",
          },
        },
        {
          "@type": "Question",
          name: "Is the author an attorney or a journalist?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Neither. Victor L. Evans is a retired United States Army veteran in his seventies with two master's degrees. He describes himself as 'not a professional writer.' The book is written from the discipline of a veteran-administrator who spent decades documenting, filing, and corresponding with every authority he could identify.",
          },
        },
        {
          "@type": "Question",
          name: "How does the author frame the allegations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The author documents. The site and the book present allegations as the author's documented account — 'the author documents,' 'according to the book.' They are not stated as the site's own findings. The author has invited correction, in court, under oath.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Two inline scripts run synchronously before paint:
  //   1. themeInitScript — sets .dark on <html> from localStorage/prefers-color-scheme
  //   2. setJsClass — adds .js so .reveal elements hide-then-reveal only with JS
  // Without these, no-JS users and static snapshots see visible content,
  // and the wrong theme flashes before hydration.
  const setJsClass = `document.documentElement.classList.add('js');`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: setJsClass }} />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ViewProvider>
            <GetBookModalProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-bg-ink focus:text-bg focus:px-4 focus:py-2 focus:label-mono"
              >
                Skip to content
              </a>
              {children}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
              <Toaster />
            </GetBookModalProvider>
          </ViewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
