'use client';

import Image from 'next/image';

export default function Kontakt() {
  return (
    <section id="kontakt" className="relative py-24 px-6 text-[#fdfbf7]">
      {/* 📸 Tło obrazek */}
      <Image
        src="/kontakt-bg.jpg"
        alt="Tło kontaktowe"
        fill
        priority
        className="absolute inset-0 object-cover z-0"
      />

      {/* 🌫️ Nakładka koloru */}
      <div className="absolute inset-0 bg-[#3f4a3c]/40 z-10" />

      {/* 📋 Formularz */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-serif mb-4"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Skontaktuj się z nami
        </h2>
        <p
  className="text-base md:text-lg mb-12 text-[#eae7df]"
  style={{ fontFamily: '"Open Sans", sans-serif' }}
>
  Chcesz zarezerwować pobyt w Luisówce, sprawdzić dostępność terminów lub zapytać o szczegóły? 
  Wypełnij formularz – z przyjemnością odpowiemy i pomożemy zaplanować Twój wypoczynek w górach.
</p>

        <form className="grid md:grid-cols-2 gap-6 text-left">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">Imię i nazwisko</label>
            <input
              type="text"
              id="name"
              className="p-3 rounded-md border border-[#ccc] bg-white text-[#3f4a3c] focus:outline-none focus:ring-2 focus:ring-[#eae7df]"
              placeholder="Twoje imię"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold">Adres email</label>
            <input
              type="email"
              id="email"
              className="p-3 rounded-md border border-[#ccc] bg-white text-[#3f4a3c] focus:outline-none focus:ring-2 focus:ring-[#eae7df]"
              placeholder="np. kontakt@luisowka.pl"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="message" className="mb-1 font-semibold">Wiadomość</label>
            <textarea
              id="message"
              rows={6}
              className="p-3 rounded-md border border-[#ccc] bg-white text-[#3f4a3c] focus:outline-none focus:ring-2 focus:ring-[#eae7df]"
              placeholder="Napisz wiadomość..."
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#fdfbf7] hover:bg-[#eae7df] text-[#3f4a3c] font-semibold px-8 py-3 rounded-full transition duration-300"
            >
              Wyślij wiadomość
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
