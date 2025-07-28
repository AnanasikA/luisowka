'use client';

import Image from 'next/image';

export default function IntroSection() {
  return (
    <section className="py-20 px-6 bg-[#fdfbf7] text-[#3f4a3c] w-full">
      <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-[1600px] mx-auto px-6">
        
        {/* Zdjęcie */}
        <div className="flex justify-center fade-up">
          <Image
            src="/domek.webp"
            alt="Domek Luisówka w górach"
            quality={80}
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full max-w-md h-auto"
          />
        </div>

        {/* Tekst */}
        <div className="text-center md:text-left fade-up-delayed">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Wynajmij <span style={{ fontFamily: '"Playfair Display", serif' }}>Luisówkę</span><br />
            i odpocznij w naturze
          </h2>
          <p className="text-base md:text-lg max-w-xl">
            Luisówka to klimatyczny domek w górach dostępny na wynajem – idealny na weekendowy wyjazd,
            urlop czy rodzinne wakacje. Oferujemy w pełni wyposażone wnętrza, prywatne jacuzzi, kominek i piękne widoki z tarasu.
            Położona z dala od zgiełku, a jednocześnie blisko szlaków i atrakcji turystycznych – Luisówka zapewnia wygodę, ciszę i kontakt z naturą.
          </p>
        </div>
      </div>
    </section>
  );
}
