'use client';

import Link from 'next/link';
import { FaCar, FaTrain, FaBus } from 'react-icons/fa';

export default function JakDojechac() {
  return (
    <section id="dojazd" className="bg-[#3f4a3c] text-[#fdfbf7] px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* 🔝 Nagłówek */}
        <h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          style={{ fontFamily: '"Playfair Display", serif', color: '#fdfbf7' }}
        >
          Jak dojechać <span className="italic font-normal">do Luisówki?</span>
        </h2>

        {/* 🔁 Mapa + tekst */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 🗺️ Mapa Google */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.4211421976183!2d16.9064426!3d50.2377978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711fda1e3e5b1ed%3A0xe0eaa3165ba4e3ec!2sLuis%C3%B3wka!5e0!3m2!1spl!2spl!4v1722233282392!5m2!1spl!2spl"
              loading="lazy"
              style={{ border: 0 }}
              className="w-full h-full"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* 🟢 Opis */}
          <div>
            <p className="mb-6 text-base md:text-lg text-[#eae7df]" style={{ fontFamily: '"Open Sans", sans-serif' }}>
              Luisówka znajduje się pod adresem <strong>Nowa Morawa 8F, 57-550 Nowa Morawa</strong> – w sercu gór i tuż przy czeskiej granicy.
              To idealne miejsce na wypoczynek blisko natury i piesze wycieczki po Masywie Śnieżnika.
            </p>

            <ul className="space-y-4 text-base text-[#fdfbf7]">
              <li className="flex items-center gap-3">
                <FaCar className="text-xl text-[#eae7df]" />
                <span><strong>Samochodem</strong>: z Kłodzka przez Stronie Śląskie – ok. 35 min</span>
              </li>
              <li className="flex items-center gap-3">
                <FaTrain className="text-xl text-[#eae7df]" />
                <span><strong>Pociągiem</strong> do Kłodzka, a dalej autobus lub taxi</span>
              </li>
              <li className="flex items-center gap-3">
                <FaBus className="text-xl text-[#eae7df]" />
                <span><strong>Autobusem</strong> – lokalne busy z Kłodzka lub Bystrzycy Kł.</span>
              </li>
            </ul>

            <Link
              href="https://www.google.com/maps/place/Luis%C3%B3wka/@50.2377978,16.9064426,18.25z/data=!4m6!3m5!1s0x4711fda1e3e5b1ed:0xe0eaa3165ba4e3ec!8m2!3d50.2382166!4d16.9062574!16s%2Fg%2F11yc0cn5m1?entry=ttu"
              target="_blank"
              className="inline-block mt-10 px-6 py-3 rounded-full bg-[#657157] text-[#fdfbf7] font-semibold transition hover:bg-[#4c5b3c]"
            >
              Zobacz na mapie →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
