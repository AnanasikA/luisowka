'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';

const obrazy = [
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.webp',
  '/5.webp',
  '/6.webp',
  '/7.webp',
  '/8.webp',
];

export default function Galeria() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? obrazy.length - 1 : prev - 1));
      setFade(true);
    }, 200);
  };

  const next = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === obrazy.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 200);
  };

  return (
    <section
      id="galeria"
      className="relative w-full flex flex-col justify-start bg-[#3f4a3c] text-white px-4 sm:px-6 md:px-10 py-8 sm:py-16"
    >
      {/* 🟢 Nagłówek */}
      <div className="pt-8 sm:pt-16 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#fdfbf7] mb-2 sm:mb-6 animate-fade-in-down"
          style={{ fontFamily: '"Playfair Display", serif', color: '#fdfbf7' }}
        >
          Zajrzyj do środka
        </h2>
      </div>

      {/* 🖼️ Slider */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 mb-2 sm:mb-6">
        {/* ⬅️ Lewa strzałka */}
        <button
          onClick={prev}
          className="text-2xl sm:text-3xl hover:text-[#eae7df] transition"
          aria-label="Poprzednie zdjęcie"
        >
          <FaChevronLeft />
        </button>

        {/* 🖼️ Obraz z fade */}
        <div className="relative w-full max-w-[95vw] sm:max-w-3xl md:max-w-4xl aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
          <Image
            key={index}
            src={obrazy[index]}
            alt={`Zdjęcie ${index + 1}`}
            fill
            className={clsx(
              'object-contain transition-opacity duration-500 ease-in-out',
              fade ? 'opacity-100' : 'opacity-0'
            )}
            sizes="(max-width: 768px) 95vw, (max-width: 1280px) 80vw, 1200px"
            priority
          />
        </div>

        {/* ➡️ Prawa strzałka */}
        <button
          onClick={next}
          className="text-2xl sm:text-3xl hover:text-[#eae7df] transition"
          aria-label="Następne zdjęcie"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* 📝 Podpis i opis */}
      <div className="pb-6 sm:pb-10 text-center mt-2 sm:mt-4">
        <p
          className="text-xs sm:text-sm md:text-lg tracking-wide mb-1 animate-fade-in-up delay-300"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Zdjęcie {index + 1} z {obrazy.length}
        </p>
        <p
          className="text-xs sm:text-sm md:text-base text-[#fdfbf7] max-w-md mx-auto animate-fade-in-up delay-500"
          style={{ fontFamily: '"Open Sans", sans-serif', color: '#fdfbf7' }}
        >
          Przejrzyj zdjęcia wnętrz i otoczenia Luisówki – zobacz, co czeka na Ciebie w naszym domku do wynajęcia.
        </p>
      </div>
    </section>
  );
}
