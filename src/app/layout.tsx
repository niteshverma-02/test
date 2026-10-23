import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { metadataBase, siteDescription, siteName, siteUrl } from "@/lib/site";
import { modeScript } from "@/lib/mode-script";
import { motionScript } from "@/lib/motion-pref";
import { SiteNav } from "@/components/navigation/SiteNav";
import { TabBar } from "@/components/navigation/TabBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Intro } from "@/components/motion/Intro";
import { Cursor } from "@/components/motion/Cursor";
import { SecretCode } from "@/components/motion/SecretCode";
import { DoubleTapLike } from "@/components/motion/DoubleTapLike";
import { SparkleTrail } from "@/components/motion/SparkleTrail";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { Toaster } from "@/components/ui/Toaster";
import { ScrollTop } from "@/components/layout/ScrollTop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display face: a friendly grotesk with personality, plus an italic serif for accents.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-accent",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

// Runs before first paint: colour mode, and whether entrance animations may hide content.
const motionFlag = `try{var d=document.documentElement;d.classList.add("js");${motionScript}if(sessionStorage.getItem("intro-seen"))d.classList.add("intro-seen")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${serif.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag + modeScript }} />
      </head>
      <body className="grain pb-[calc(3.75rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Intro />
        <SiteNav />
        <TabBar />
        {children}
        <SiteFooter />
        <SmoothScroll />
        <Cursor />
        <CommandPalette />
        <Toaster />
        <ScrollTop />
        <SecretCode />
        <DoubleTapLike />
        <SparkleTrail />
      </body>
    </html>
  );
}
