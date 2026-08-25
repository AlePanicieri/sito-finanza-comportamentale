"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV = [
  { href: "/", label: "Simulatore" },
  { href: "/simula", label: "Titoli" },
  { href: "/crolli", label: "Crolli" },
  { href: "/guide", label: "Guide" },
];

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-primary rounded-lg p-1.5">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">Finanza Comportamentale</div>
            <div className="text-[11px] text-muted-foreground hidden sm:block">
              Simula, capisci, non farti fregare
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
