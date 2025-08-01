'use client';

import { motion } from 'framer-motion';

export default function Cennik() {
  return (
    <section id="cennik" className="bg-[#fdfbf7] text-[#3f4a3c] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Nagłówek */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Cennik
        </motion.h2>

        {/* Podtytuł */}
        <motion.p
          className="text-lg md:text-xl mb-10"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          Cena zależy od długości pobytu, liczby gości i wybranego terminu.
        </motion.p>

        {/* Karta cennika */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-8 text-left space-y-6 text-base md:text-lg"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Cena za dobę</span>
            <span>od 550 zł</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Jacuzzi (opcja dodatkowa)</span>
            <span>300 zł (jednorazowo)</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Minimalna długość pobytu</span>
            <span>2 doby</span>
          </div>
          <div className="pt-4 text-sm text-gray-600 italic">
            Skontaktuj się z nami, a przygotujemy indywidualną ofertę.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
