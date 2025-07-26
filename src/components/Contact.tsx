'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Kontakt() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // zatrzymaj przeładowanie strony
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/kontakt@luisowka.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Coś poszło nie tak. Spróbuj ponownie później.');
      }
    } catch (error) {
      console.error(error);
      alert('Błąd połączenia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="relative py-24 px-6 text-[#fdfbf7] overflow-hidden">
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

      <div className="relative z-20 max-w-4xl mx-auto text-center px-4">
        {!submitted ? (
          <>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Skontaktuj się z nami</h2>
            <p className="text-base md:text-lg mb-12 text-[#eae7df]">
              Chcesz zarezerwować pobyt w Luisówce, sprawdzić dostępność terminów lub zapytać o szczegóły?
              Wypełnij formularz – z przyjemnością odpowiemy i pomożemy zaplanować Twój wypoczynek w górach.
            </p>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 text-left mt-8">
              <input type="hidden" name="_subject" value="Nowa wiadomość z formularza Luisówka" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-semibold">Imię i nazwisko</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="p-3 rounded-md border border-[#ccc] bg-white text-[#3f4a3c]"
                  placeholder="Twoje imię"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold">Adres email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="p-3 rounded-md border border-[#ccc] bg-white text-[#3f4a3c]"
                  placeholder="np. kontakt@luisowka.pl"
                />
              </div>

              <div className="md:col-span-2 flex flex-col">
                <label htmlFor="message" className="mb-1 font-semibold">Wiadomość</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="p-3 rounded-md border border-[#ccc] bg-white text-[#3f4a3c]"
                  placeholder="Napisz wiadomość..."
                ></textarea>
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="bg-[#fdfbf7] hover:bg-[#eae7df] text-[#3f4a3c] font-semibold px-8 py-3 rounded-full transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <h2 className="text-xl md:text-2xl font-semibold !text-[#fdfbf7]  p-6 rounded-xl">
            Dziękujemy! Otrzymaliśmy Twoją wiadomość i wkrótce się odezwiemy.
            <br />Miło nam, że chcesz odwiedzić Luisówkę!
          </h2>
        )}
      </div>
    </section>
  );
}
