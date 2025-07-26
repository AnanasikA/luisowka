'use client';

import Link from 'next/link';

export default function ThanksPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-[#fdfbf7] text-[#3f4a3c]">
      <h1 className="text-4xl md:text-5xl font-serif mb-6">
        Dziękujemy za wiadomość!
      </h1>
      <p className="text-lg md:text-xl mb-10 max-w-2xl">
        Odpowiemy tak szybko, jak to możliwe. Do zobaczenia w Luisówce!
      </p>
      <Link
        href="/"
        className="bg-[#3f4a3c] hover:bg-[#2f3a2c] text-[#fdfbf7] px-6 py-3 rounded-full transition font-semibold"
      >
        Powrót do strony głównej
      </Link>
    </section>
  );
}
