'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const obrazy = [
  '/start.webp',
  '/32.webp',
  '/1.webp',
  '/2.webp',
  '/3.webp',
  '/5.webp',
  '/6.webp',
  '/7.webp',
  '/8.webp',
  '/9.webp',
  '/10.webp',
  '/34.webp',
  '/35.jpg',
  '/36.webp',
  '/start(1).webp',
  '/33_resized_4x3.webp',
  '/11.webp',
  '/12.webp',
  '/13.webp',
  '/14.webp',
  '/15.webp',
  '/16.webp',
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
      id="galeria"
      className="relative w-full flex flex-col justify-start bg-[#3f4a3c] text-white px-4 sm:px-6 md:px-10 py-8 sm:py-16"
    >
      {/* 🟢 Nagłówek */}
      <div className="pt-8 sm:pt-16 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#fdfbf7] mb-2 sm:mb-6"
          style={{ fontFamily: '"Playfair Display", serif',color: '#fdfbf7' }}
        >
          Zajrzyj do środka
        </h2>
      </div>

      {/* 🖼️ Slider */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 mb-2 sm:mb-6">
        <button
          onClick={prev}
          className="text-2xl sm:text-3xl hover:text-[#eae7df] transition"
          aria-label="Poprzednie zdjęcie"
        >
          <FaChevronLeft />
        </button>

        <div
          className="relative w-full max-w-[95vw] sm:max-w-3xl md:max-w-4xl aspect-[4/3] bg-black rounded-xl overflow-hidden shadow-lg"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={obrazy[index]}
                alt={`Zdjęcie ${index + 1}`}
                fill
                quality={85}
                className="object-cover"
                sizes="(max-width: 768px) 95vw, (max-width: 1280px) 80vw, 1200px"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="text-2xl sm:text-3xl hover:text-[#eae7df] transition"
          aria-label="Następne zdjęcie"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* 📝 Opis */}
      <div className="pb-6 sm:pb-10 text-center mt-2 sm:mt-4">
        <p
          className="text-xs sm:text-sm md:text-lg tracking-wide mb-1"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Zdjęcie {index + 1} z {obrazy.length}
        </p>
        <p
          className="text-xs sm:text-sm md:text-base text-[#fdfbf7] max-w-md mx-auto"
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          Przejrzyj zdjęcia wnętrz i otoczenia Luisówki – zobacz, co czeka na Ciebie w naszym domku do wynajęcia.
        </p>
      </div>
    </section>
  );
}
