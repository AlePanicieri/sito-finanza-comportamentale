"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  client: string;
  slot: string;
  className?: string;
}

// Unità AdSense reale. Va usata solo quando si hanno client (publisher ID) e
// slot (ID dell'unità creata nella dashboard AdSense). Lo script loader è
// caricato una volta nel layout.
export function AdUnit({ client, slot, className = "" }: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // Se lo script non è ancora pronto, AdSense riproverà da solo.
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
