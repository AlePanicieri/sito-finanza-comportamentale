"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export function SiteFooter() {
  const { t } = useLang();
  const u = t.ui;

  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-3 text-sm">
        <div className="space-y-2">
          <div className="font-bold">Finanza Comportamentale</div>
          <p className="text-xs text-muted-foreground leading-relaxed">{u.footerMission}</p>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
            {u.footerNav}
          </div>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                {u.navSimulator}
              </Link>
            </li>
            <li>
              <Link href="/simula" className="text-muted-foreground hover:text-foreground">
                {u.navTitles}
              </Link>
            </li>
            <li>
              <Link href="/crolli" className="text-muted-foreground hover:text-foreground">
                {u.footerCrashes}
              </Link>
            </li>
            <li>
              <Link href="/guide" className="text-muted-foreground hover:text-foreground">
                {u.navGuides}
              </Link>
            </li>
            <li>
              <Link href="/chi-siamo" className="text-muted-foreground hover:text-foreground">
                {u.navAbout}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
            {u.footerNotices}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{u.footerNoticesText}</p>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Finanza Comportamentale — {u.footerRights}
        </div>
      </div>
    </footer>
  );
}
