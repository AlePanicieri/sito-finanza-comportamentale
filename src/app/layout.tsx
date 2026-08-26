import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/site/JsonLd";
import { LanguageProvider } from "@/components/site/LanguageProvider";
import { ADSENSE_CLIENT } from "@/lib/adsense";

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
    default: "Se Avessi Investito — Simula i tuoi investimenti sui dati reali",
    template: "%s — Se Avessi Investito",
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
    siteName: "Se Avessi Investito",
    title: "Se Avessi Investito — Simula i tuoi investimenti sui dati reali",
    description:
      "Quanto avresti oggi con 500€ al mese? Simulalo sui dati storici veri e scopri i bias che ti ingannano.",
  },
  robots: { index: true, follow: true },
  // Verifica proprietà Google Search Console (metodo tag HTML).
  verification: {
    google: "3P8V4CM8jV2UK8U3DBKL-Qiiot0nFCAUmMURs14V0Tk",
  },
  // Verifica proprietà Google AdSense: meta tag statico nel <head>,
  // renderizzato lato server (il metodo più affidabile per il crawler).
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Se Avessi Investito",
            url: SITE_URL,
            description:
              "Progetto indipendente di educazione finanziaria: simula investimenti sui dati storici reali, capisci i bias e distingui l'educazione dalla fuffa.",
            foundingDate: "2026",
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Se Avessi Investito",
            url: SITE_URL,
            inLanguage: "it-IT",
            description:
              "Simulatore di investimenti sui dati reali, guide senza fuffa e i grandi crolli della storia. Educazione finanziaria, non consulenza.",
          }}
        />
        <LanguageProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </LanguageProvider>
        <Analytics />
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
