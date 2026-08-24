import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

// Publisher ID di Google AdSense (es. "ca-pub-1234567890123456").
// Finché non è impostato nelle env, lo script pubblicitario non viene caricato.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seavessiinvestito.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Finanza Comportamentale — Simula i tuoi investimenti sui dati reali",
    template: "%s — Finanza Comportamentale",
  },
  description:
    "Simula PAC e investimenti su titoli reali con dati storici veri. Capisci i bias che distorcono le tue decisioni e impara a distinguere l'educazione finanziaria dalla fuffa.",
  keywords: [
    "finanza comportamentale",
    "simulatore PAC",
    "piano di accumulo",
    "dollar cost averaging",
    "bias cognitivi investimenti",
    "educazione finanziaria",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Finanza Comportamentale",
    title: "Finanza Comportamentale — Simula i tuoi investimenti sui dati reali",
    description:
      "Quanto avresti oggi con 500€ al mese? Simulalo sui dati storici veri e scopri i bias che ti ingannano.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        {ADSENSE_CLIENT && (
          <Script
            id="adsbygoogle-loader"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}
      </body>
    </html>
  );
}
