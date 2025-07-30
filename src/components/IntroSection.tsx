'use client';

import Image from 'next/image';

export default function ForestImageSection() {
  return (
    <section className="bg-[#2e382c] text-[#fdfbf7] px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Tekst po lewej */}
        <div className="text-center md:text-left">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 leading-snug"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Zarezerwuj <span className="italic font-normal">Luisówkę</span><br />
            i poczuj spokój lasu
          </h2>
          <p
            className="text-base md:text-lg max-w-xl"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            Odpocznij z dala od zgiełku. Leśna okolica, śpiew ptaków, jacuzzi, kominek i prywatna przestrzeń tylko dla Ciebie.
            W Luisówce czeka na Ciebie cisza, natura i wszystko, czego potrzeba do regeneracji ciała i ducha.
          </p>
        </div>

        {/* Obraz po prawej */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/28.webp"
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
