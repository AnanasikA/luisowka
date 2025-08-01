'use client';

import type { Metadata } from "next";
import { useEffect, useState } from "react";
import "./globals.css";
import BlockingCookieConsent from "@/components/BlockingCookingContent";

export const metadata: Metadata = {
  title: "Luisówka – domek w górach",
  description:
    "Wynajmij przytulny domek w sercu Masywu Śnieżnika. Jacuzzi, kominek, lasy i góry – na wyłączność. Zrelaksuj się w Luisówce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [consent, setConsent] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem("cookieConsent");
    setConsent(value);
    setHasChecked(true);
  }, []);

  const isBrakZgodyPage =
    typeof window !== "undefined" &&
    window.location.pathname === "/brak-zgody";

  return (
    <html lang="pl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#fdfbf7] text-[#3f4a3c] font-sans antialiased scroll-smooth"
        style={{
          fontFamily: '"Open Sans", sans-serif',
        }}
      >
        {/* Jeśli zgoda jest dana lub jesteśmy na stronie /brak-zgody – pokazuj stronę */}
        {hasChecked && (consent === 'true' || isBrakZgodyPage) ? (
          <>
            {children}
          </>
        ) : (
          <BlockingCookieConsent />
        )}
      </body>
    </html>
  );
}
