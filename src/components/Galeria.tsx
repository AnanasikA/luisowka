'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const obrazy = [
  '/wnetrza1.jpg',
  '/wnetrza2.jpg',
  '/zewn3.jpg',
  '/zewn1.jpg',
];

export default function Galeria() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? obrazy.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === obrazy.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className="relative w-full h-screen text-white flex flex-col justify-between"
      style={{ backgroundColor: '#3f4a3c' }} // leśne tło
      id="galeria"
    >
      {/* Główny nagłówek */}
      <div className="pt-12 text-center px-4">
        <h2
          className="text-4xl md:text-6xl font-bold tracking-wide"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Zajrzyj do środka
        </h2>
      </div>

      {/* Slider z przyciskami */}
      <div className="flex items-center justify-center px-4 flex-1">
        {/* Lewo */}
        <button
          onClick={prev}
          className="text-4xl hover:text-[#fdfbf7] transition mr-4"
          aria-label="Poprzednie zdjęcie"
        >
          <FaChevronLeft />
        </button>

        {/* Obrazek główny */}
        <div className="rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full">
          <Image
            src={obrazy[index]}
            alt={`Zdjęcie ${index + 1}`}
            width={1200}
            height={800}
            className="object-cover w-full h-[500px]"
          />
        </div>

        {/* Prawo */}
        <button
          onClick={next}
          className="text-4xl hover:text-[#fdfbf7] transition ml-4"
          aria-label="Następne zdjęcie"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Podpis */}
      <div className="pb-10 text-center px-4">
        <p
          className="text-xl tracking-widest mb-2"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Zdjęcie {index + 1} z {obrazy.length}
        </p>
        <p
          className="text-sm md:text-base text-[#fdfbf7] max-w-md mx-auto"
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          Przejrzyj zdjęcia wnętrz i otoczenia Luisówki – zobacz, co czeka na Ciebie w naszym domku do wynajęcia.
        </p>
      </div>
    </section>
  );
}
