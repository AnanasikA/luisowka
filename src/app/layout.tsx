import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/BlockingCookingContent";

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
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
