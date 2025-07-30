'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Stopka() {
  return (
    <motion.footer
      className="bg-[#3f4a3c] text-[#fdfbf7] py-10 px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Logo / Nazwa */}
        <div>
          <h3
            className="text-2xl font-serif font-bold"
            style={{ fontFamily: '"Playfair Display", serif', color: '#fdfbf7' }}
          >
            Luisówka
          </h3>
          <p className="text-sm mt-1">Nowa Morawa, Dolny Śląsk</p>
        </div>

        {/* Kontakt */}
        <div>
          <p className="text-sm font-semibold mb-1">Kontakt</p>
          <p className="text-sm">kontakt@luisowka.pl</p>
          <p className="text-sm">+48 123 456 789</p>
        </div>

        {/* CTA / Opis */}
        <div className="max-w-sm text-sm">
          <p>
            Odpocznij w sercu natury. Czeka na Ciebie wyjątkowy domek z jacuzzi, cisza i widoki,
            które zostają w pamięci.
          </p>
        </div>
      </div>

      {/* Pasek dolny */}
      <div className="text-center mt-8 text-xs text-[#dcd7d0] flex flex-col sm:flex-row justify-center items-center gap-2">
        <span>&copy; 2025 Luisówka – Wszystkie prawa zastrzeżone.</span>
        <span>
          Design by{' '}
          <Link
            href="https://anastasiiakupriianets.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#fdfbf7]"
          >
            Anastasiia Kupriianets
          </Link>
        </span>
      </div>
    </motion.footer>
  );
}
