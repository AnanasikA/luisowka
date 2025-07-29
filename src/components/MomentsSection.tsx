'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

  const handleScrollWithPath = (targetId: string, newPath: string) => {
    // Scroll do elementu
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // Zmień widoczny URL bez przeładowania strony
    window.history.pushState(null, '', newPath);

  };


export default function MomentsSection() {
  return (
    <section className="bg-[#fdfbf7] text-[#3f4a3c] px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Tekst po lewej */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-wider text-sm mb-2">
            Luisówka
          </p>
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
            Luisówka to przytulny domek do wynajęcia w sercu gór – idealne miejsce na romantyczny weekend, rodzinny wypoczynek czy regenerację z dala od zgiełku. Komfortowe wnętrza, leśne otoczenie i prywatność sprawiają, że każdy pobyt staje się wyjątkowym doświadczeniem.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            onClick={() => handleScrollWithPath('rezerwacja', '/rezerwacja')}
            className="px-6 py-3 rounded-full bg-[#657157] text-[#fdfbf7] font-semibold transition hover:bg-[#4c5b3c]"
          >
            Zarezerwuj pobyt →
          </motion.button>
        </motion.div>

        {/* Obrazek po prawej */}
        <motion.div
          className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Image
            src="/luisowka-zielony-domek.webp"
            alt="Luisówka w lesie"
            fill
            quality={80}
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
