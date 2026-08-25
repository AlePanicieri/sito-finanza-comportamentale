import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seavessiinvestito.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Espliciti (scelta: massima diffusione). OAI-SearchBot = ricerca di
      // ChatGPT; GPTBot = addestramento OpenAI; Google-Extended = Gemini/AI di
      // Google. Consentiti tutti per massimizzare visibilità e portata.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
