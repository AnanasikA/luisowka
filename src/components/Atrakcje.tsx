'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const atrakcje = [
    {
    nazwa: 'Twierdza Kłodzko (29 km)',
    opis: 'Zabytkowa fortyfikacja z podziemiami i tarasem widokowym – fascynująca podróż w przeszłość.',
    obraz: '/okolica-twierdza.webp',
  },
  {
    nazwa: 'Lądek-Zdrój – uzdrowisko (21 km)',
    opis: 'Jedno z najstarszych uzdrowisk w Europie z piękną architekturą i leczniczymi wodami.',
    obraz: '/okolica-ladek.webp',
  },
  { nazwa: 'Wyciąg krzesełkowy Bolek (1,5 km)', opis: 'Idealny na szybkie wypady narciarskie – blisko i komfortowo.', obraz: '/okolica-bolek.webp' },
  { nazwa: 'Stacja narciarska Kamienica + lokalny browar', opis: 'Trasy zjazdowe i pyszne piwo w jednym miejscu – idealne po aktywnym dniu.', obraz: '/okolica-kamienica.webp' },
  { nazwa: 'Czarna Góra (7,3 km)', opis: 'Popularny ośrodek narciarski i letni z pięknymi widokami i atrakcjami.', obraz: '/okolica-czarnagora.webp' },
  { nazwa: 'Góra Śnieżnik (5,3 km)', opis: 'Jeden z najwyższych szczytów Masywu Śnieżnika z piękną trasą i panoramą.', obraz: '/okolica-snieznik.webp' },
  { nazwa: 'Wieża widokowa na Czernicy (5,6 km)', opis: 'Malowniczy punkt widokowy z panoramą na góry.', obraz: '/okolica-czernica.webp' },
  { nazwa: 'Jaskinia Niedźwiedzia (4,5 km)', opis: 'Jedna z najpiękniejszych jaskiń w Polsce – trasa turystyczna z przewodnikiem.', obraz: '/okolica-jaskinia.webp' },
  { nazwa: 'Sky Bridge 721 – Dolní Morava (11 km)', opis: 'Najdłuższy most wiszący na świecie – widoki, których się nie zapomina.', obraz: '/okolica-skybridge.webp' },
  { nazwa: 'Czechy: Kunčice, Branná, Kladské Sedlo', opis: 'Urokliwe czeskie miejscowości i górskie szlaki warte odkrycia.', obraz: '/okolica-czechy.webp' },
  { nazwa: 'Kopalnia Złota w Złotym Stoku (33 km)', opis: 'Zabytkowa kopalnia z podziemną trasą turystyczną, muzeum i wodospadem – świetna atrakcja dla całej rodziny.', obraz: '/okolica-kopalnia.webp' }
];

export default function AtrakcjeCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth < 768 ? 1 : 3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prev = () => {
    setStartIndex((prev) =>
      prev - cardsPerPage < 0 ? atrakcje.length - cardsPerPage : prev - cardsPerPage
    );
  };

  const next = () => {
    setStartIndex((prev) =>
      prev + cardsPerPage >= atrakcje.length ? 0 : prev + cardsPerPage
    );
  };

  const widoczne = atrakcje.slice(startIndex, startIndex + cardsPerPage);

  return (
    <section className="py-24 bg-[#3f4a3c] text-[#fdfbf7]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", serif',color: '#fdfbf7' }}>
            Atrakcje <span className="italic font-normal">w pobliżu</span>
          </h2>
          <p className="text-center text-base sm:text-lg max-w-3xl mx-auto mb-16 text-[#eae7df]">
            Luisówka położona jest w malowniczej Nowej Morawie, u stóp Masywu Śnieżnika.
            To idealna baza wypadowa do górskich wędrówek i odkrywania skarbów Dolnego Śląska.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button onClick={prev} className="text-2xl hover:text-white transition">
            <FaChevronLeft />
          </button>

          <div
            className={clsx(
              'grid gap-6 w-full transition-all duration-300',
              cardsPerPage === 1 && 'grid-cols-1',
              cardsPerPage === 3 && 'md:grid-cols-3'
            )}
          >
            {widoczne.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="bg-white text-[#3f4a3c] p-5 rounded-xl shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                  <Image src={a.obraz} alt={a.nazwa} fill className="object-cover" quality={80} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {a.nazwa}
                </h3>
                <p className="text-sm">{a.opis}</p>
              </motion.div>
            ))}
          </div>

          <button onClick={next} className="text-2xl hover:text-white transition">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
