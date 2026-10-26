import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { metadataBase, siteDescription, siteName, siteUrl } from "@/lib/site";
import { modeScript } from "@/lib/mode-script";
import { motionScript } from "@/lib/motion-pref";
import { Header } from "@/components/report/Header";
import { Footer } from "@/components/report/Footer";
import { Cursor } from "@/components/report/Cursor";
import { Loader } from "@/components/report/Loader";
import { Spotlight } from "@/components/report/Spotlight";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";

// Geist for everything you read, Geist Mono for labels and numbers, Caveat for the hand-written notes.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  metadataBase,
  title: { default: siteName, template: `%s — ${profile.identity.name}` },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: profile.identity.name }],
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription },
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a1020",
  colorScheme: "dark light",
};

// Runs before first paint: colour mode, and whether entrance animations may hide content.
// The intro loader shows once per session, only with motion on.
const motionFlag = `try{var d=document.documentElement;d.classList.add("js");${motionScript}if(d.classList.contains("motion-ok")&&!sessionStorage.getItem("intro-seen")){sessionStorage.setItem("intro-seen","1");d.classList.add("loading");setTimeout(function(){d.classList.add("revealing")},2150);setTimeout(function(){d.classList.remove("loading","revealing")},3300)}}catch(e){}`;

// An SEO portfolio should practise what it preaches: Person + ProfessionalService structured data.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.identity.name,
      jobTitle: profile.role,
      description: profile.description,
      email: `mailto:${profile.contact.email}`,
      address: { "@type": "PostalAddress", addressCountry: profile.location.label },
      knowsAbout: profile.about.interests,
      sameAs: profile.social.flatMap((s) => (s.href ? [s.href] : [])),
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    {
      "@type": "ProfessionalService",
      name: `${profile.identity.name} — SEO, AEO & GEO`,
      description: siteDescription,
      areaServed: profile.location.label,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Search visibility services",
        itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.description } })),
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag + modeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body>
        <a href="#main" className="label sr-only z-[100] bg-fg px-5 py-3 text-[11px] text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Loader />
        <div aria-hidden className="ambient" />
        <Header />
        {children}
        <Footer />
        <SmoothScroll />
        <Cursor />
        <Spotlight />
        <CommandPalette />
        <Toaster />
      </body>
    </html>
  );
}
