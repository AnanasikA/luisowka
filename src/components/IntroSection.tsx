'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function ForestImageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.slide-in-left, .slide-in-right');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section className="bg-[#2e382c] text-[#fdfbf7] px-6 py-16" ref={sectionRef}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Tekst po lewej */}
        <div className="text-center md:text-left slide-in-left opacity-0 min-h-[280px] transition duration-1000">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 leading-snug"
            style={{ fontFamily: '"Playfair Display", serif',color: '#fdfbf7' }}
          >
            Zarezerwuj <span className="italic font-normal">Luisówkę</span><br />
            i poczuj spokój lasu
          </h2>
          <p
            className="text-sm md:text-base text-[#eae7df] max-w-md mx-auto md:mx-0 space-y-4"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            Wśród drzew i śpiewu ptaków czeka na Ciebie miejsce stworzone do odpoczynku. Luisówka to nie tylko domek – to przestrzeń, w której natura spotyka się z komfortem.
            <br /><br />
            Ogrzej się przy kominku, zrelaksuj w jacuzzi i pozwól sobie na chwilę prawdziwego wytchnienia. To idealna baza do wędrówek po górach i wieczornego relaksu z książką.
          </p>
        </div>

        {/* Obraz po prawej */}
        <div className="relative w-full aspect-[3/2] max-h-[360px] rounded-xl overflow-hidden shadow-xl slide-in-right opacity-0 transition duration-1000">
          <Image
            src="/15.webp"
            alt="Leśne otoczenie Luisówki"
            fill
            quality={85}
            className="object-cover object-center"
            priority
          />
        </div>

      </div>
    </section>
  );
}
