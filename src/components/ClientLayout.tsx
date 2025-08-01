'use client';

import { useEffect, useState } from "react";
import BlockingCookieConsent from "./BlockingCookingContent";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem("cookieConsent");
    setConsent(value);
    setHasChecked(true);
  }, []);

  const isBrakZgodyPage =
    typeof window !== "undefined" && window.location.pathname === "/brak-zgody";

  if (!hasChecked) return null;

  return (
    <>
      {(consent === 'true' || isBrakZgodyPage) ? children : <BlockingCookieConsent />}
    </>
  );
}
