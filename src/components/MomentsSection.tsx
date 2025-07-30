'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MomentsSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="bg-[#fdfbf7] text-[#3f4a3c] px-6 py-24 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Tekst po lewej */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-wider text-sm mb-2">Luisówka</p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Domek, który{' '}
            <span className="italic font-normal">pokochasz od pierwszego dnia</span>
          </h2>
          <p
            className="text-base md:text-lg mb-8 max-w-xl"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            Luisówka to przytulny domek do wynajęcia w sercu gór – idealne miejsce na romantyczny weekend,
            rodzinny wypoczynek czy regenerację z dala od zgiełku. Komfortowe wnętrza, leśne otoczenie i prywatność
            sprawiają, że każdy pobyt staje się wyjątkowym doświadczeniem.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-full bg-[#657157] text-[#fdfbf7] font-semibold transition hover:bg-[#4c5b3c]"
          >
            Zapytaj o dostępność →
          </motion.button>
        </motion.div>

        {/* Obrazek po prawej */}
        <motion.div
          className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
  src="/39.webp"
  alt="Luisówka w lesie"
  fill
  quality={80}
  className="object-cover object-center"
/>

        </motion.div>
      </div>

      {/* Modal z formularzem */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white text-[#3f4a3c] rounded-xl p-6 w-full max-w-md relative animate-scale-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-[#3f4a3c] hover:text-red-600"
              aria-label="Zamknij"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Wyślij zapytanie o dostępność</h3>
            <form
              action="https://formsubmit.co/kontakt@luisowka.com"
              method="POST"
              className="space-y-4"
              onSubmit={() => setTimeout(() => setShowModal(false), 2000)}
            >
              <input type="hidden" name="_subject" value="Zapytanie o dostępność – Luisówka" />
              <input
                type="text"
                name="Imię i nazwisko"
                placeholder="Imię i nazwisko"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="email"
                name="E-mail"
                placeholder="E-mail"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="tel"
                name="Telefon"
                placeholder="Telefon"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <textarea
                name="Wiadomość"
                placeholder="Termin pobytu, liczba osób, pytania..."
                rows={3}
                className="w-full border border-gray-300 p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-[#3f4a3c] text-[#fdfbf7] py-2 px-4 rounded hover:bg-[#2e382c] transition"
              >
                Wyślij zapytanie
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
