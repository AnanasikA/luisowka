'use client';

import {
  FaWifi,
  FaCar,
  FaSnowflake,
  FaTv,
  FaHotTub
} from 'react-icons/fa';
import {
  GiFireplace,
  GiSofa,
  GiWashingMachine,
  GiMountains
} from 'react-icons/gi';
import { GiKitchenKnives } from 'react-icons/gi';

const udogodnienia = [
  { ikona: <FaCar />, nazwa: 'Bezpłatny parking' },
  { ikona: <FaWifi />, nazwa: 'Szybki internet Wi‑Fi' },
  { ikona: <GiKitchenKnives />, nazwa: 'W pełni wyposażona kuchnia' },
  { ikona: <FaSnowflake />, nazwa: 'Klimatyzacja z funkcją grzania' },
  { ikona: <FaTv />, nazwa: 'Telewizor z płaskim ekranem' },
  { ikona: <FaHotTub />, nazwa: 'Balia z bąbelkami' },
  { ikona: <GiFireplace />, nazwa: 'Kominek w salonie' },
  { ikona: <GiSofa />, nazwa: 'Rozkładana sofa' },
  { ikona: <GiWashingMachine />, nazwa: 'Pralka' },
  { ikona: <GiMountains />, nazwa: 'Taras z widokiem' },
];

export default function Udogodnienia() {
  return (
    <section id="udogodnienia" className="py-20 bg-[#fdfbf7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-center mb-6"
          style={{
            fontFamily: '"Playfair Display", serif',
            color: '#3f4a3c',
            fontWeight: '600',
          }}
        >
          Udogodnienia
        </h2>

        <p className="text-center text-base sm:text-lg max-w-3xl mx-auto mb-12 text-[#3f4a3c]">
  Cały obiekt tylko dla Ciebie – 74 m² komfortowej przestrzeni z tarasem, w pełni wyposażoną kuchnią, prywatną łazienką i klimatyzacją. Na miejscu dostępne są: bezpłatny parking, szybkie Wi‑Fi, telewizor, pralka oraz wiele udogodnień, które sprawią, że poczujesz się jak w domu.
</p>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-10 text-center">
          {udogodnienia.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 sm:space-y-4 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full text-2xl sm:text-3xl transition-transform duration-300 hover:scale-110"
                style={{
                  border: '2px solid #3f4a3c',
                  color: '#657157',
                }}
              >
                {item.ikona}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#3f4a3c]">
                {item.nazwa}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
