import { Lang } from "@/lib/i18n";

// Bandiere disegnate in SVG (niente emoji: rese identiche su ogni sistema).
export function Flag({ code, className = "" }: { code: Lang; className?: string }) {
  const common = "block rounded-[2px] " + className;
  switch (code) {
    case "it":
      return (
        <svg viewBox="0 0 24 16" className={common} width={22} height={15} aria-hidden>
          <rect width="8" height="16" fill="#008C45" />
          <rect x="8" width="8" height="16" fill="#F4F5F0" />
          <rect x="16" width="8" height="16" fill="#CD212A" />
        </svg>
      );
    case "fr":
      return (
        <svg viewBox="0 0 24 16" className={common} width={22} height={15} aria-hidden>
          <rect width="8" height="16" fill="#0055A4" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#EF4135" />
        </svg>
      );
    case "de":
      return (
        <svg viewBox="0 0 24 16" className={common} width={22} height={15} aria-hidden>
          <rect width="24" height="5.34" fill="#000000" />
          <rect y="5.34" width="24" height="5.33" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </svg>
      );
    case "es":
      return (
        <svg viewBox="0 0 24 16" className={common} width={22} height={15} aria-hidden>
          <rect width="24" height="16" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </svg>
      );
    case "en":
      return (
        <svg viewBox="0 0 24 16" className={common} width={22} height={15} aria-hidden>
          <clipPath id="ukclip">
            <rect width="24" height="16" rx="2" />
          </clipPath>
          <g clipPath="url(#ukclip)">
            <rect width="24" height="16" fill="#012169" />
            <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="3.2" />
            <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.6" />
            <rect x="9.5" width="5" height="16" fill="#FFFFFF" />
            <rect y="5.5" width="24" height="5" fill="#FFFFFF" />
            <rect x="10.5" width="3" height="16" fill="#C8102E" />
            <rect y="6.5" width="24" height="3" fill="#C8102E" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
