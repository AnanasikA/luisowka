'use client';

import Naglowek from '@/components/Naglowek';
import Hero from '@/components/Hero';
import Galeria from '@/components/Galeria';
import Udogodnienia from '@/components/Udogodnienia';
import Atrakcje from '@/components/Atrakcje';
import JakDojechac from '@/components/JakDojechac';
import MomentSection from '@/components/MomentsSection';
import Cennik from '@/components/Cennik';
import Rezerwacja from '@/components/RezerwacjaKalendarz';
import IntroSection from '@/components/IntroSection';
import Contact from '@/components/Contact';
import Stopka from '@/components/Stopka';
import CallNowSection from '@/components/CallNowSection';

import BlockingCookieConsent from '@/components/BlockingCookingContent'; // lub CookieConsent jeśli używasz zwykłego

export default function Home() {
  return (
    <main className="bg-bezowy text-lesny">
      <Naglowek />
      <Hero />
      <MomentSection />
      <Galeria />
      <Udogodnienia />
      <Atrakcje />
      <JakDojechac />
      <Cennik />
      <Rezerwacja />
      <IntroSection />
      <Contact />
      <Stopka />
      <CallNowSection />
      <BlockingCookieConsent /> {/* ← Tutaj baner zgody */}
    </main>
  );
}
