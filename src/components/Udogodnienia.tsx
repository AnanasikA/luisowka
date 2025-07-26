import {
  FaWifi,
  FaCar,
  FaSnowflake,
  FaTv,
} from 'react-icons/fa';
import { GiKitchenKnives } from 'react-icons/gi';

const udogodnienia = [
  { ikona: <FaCar />, nazwa: 'Bezpłatny parking' },
  { ikona: <FaWifi />, nazwa: 'Bezpłatne Wi‑Fi' },
  { ikona: <GiKitchenKnives />, nazwa: 'Kuchnia z wyposażeniem' },
  { ikona: <FaSnowflake />, nazwa: 'Klimatyzacja' },
  { ikona: <FaTv />, nazwa: 'Telewizor z płaskim ekranem' },
];

export default function Udogodnienia() {
  return (
    <section id="udogodnienia" className="py-24 bg-[#fdfbf7]">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl text-center mb-4"
          style={{
            fontFamily: '"Playfair Display", serif',
            color: '#3f4a3c',
            fontWeight: '600',
          }}
        >
          Udogodnienia
        </h2>

        <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-[#3f4a3c]">
          Luisówka oferuje wszystko, czego potrzebujesz do komfortowego wypoczynku – nowoczesne wyposażenie, wygoda i bliskość natury.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-center">
          {udogodnienia.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full text-3xl"
                style={{
                  border: '2px solid #3f4a3c',
                  color: '#657157',
                }}
              >
                {item.ikona}
              </div>
              <span className="text-sm font-medium text-[#3f4a3c]">
                {item.nazwa}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
