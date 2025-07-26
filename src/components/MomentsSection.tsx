'use client';

import Image from 'next/image';

export default function MomentsSection() {
  return (
    <section className="bg-[#fdfbf7] text-[#3f4a3c] px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Tekst po lewej */}
        <div>
          <p className="uppercase tracking-wider text-sm mb-2">
            Luisówka
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            Domek, który{' '}
            <span className="italic font-normal">pokochasz od pierwszego dnia</span>
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-xl" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            Luisówka to przytulny domek do wynajęcia w sercu gór – idealne miejsce na romantyczny weekend, rodzinny wypoczynek czy regenerację z dala od zgiełku. Komfortowe wnętrza, leśne otoczenie i prywatność sprawiają, że każdy pobyt staje się wyjątkowym doświadczeniem.
          </p>
          <button
            onClick={() => {
              const kontakt = document.getElementById('kontakt');
              if (kontakt) kontakt.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-[#657157] text-[#fdfbf7] font-semibold transition hover:bg-[#4c5b3c]"
          >
            Zarezerwuj pobyt →
          </button>
        </div>

        {/* Obrazek po prawej */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/luisowka-zielony-domek.jpg"
            alt="Luisówka w lesie"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
