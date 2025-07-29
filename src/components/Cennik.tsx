'use client';

export default function Cennik() {
  return (
    <section id="cennik" className="bg-[#fdfbf7] text-[#3f4a3c] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Cennik
        </h2>

        <p
          className="text-lg md:text-xl mb-10"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Cena zależy od długości pobytu, liczby gości i wybranego terminu.
        </p>

        <div className="bg-white rounded-xl shadow-md p-8 text-left space-y-6 text-base md:text-lg">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Cena za dobę</span>
            <span>od 550 zł</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Dłuższy pobyt / więcej osób</span>
            <span>zniżki indywidualne</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Jacuzzi (opcja dodatkowa)</span>
            <span>300 zł (jednorazowo)</span>
          </div>
          <div className="pt-4 text-sm text-gray-600 italic">
            Skontaktuj się z nami, a przygotujemy indywidualną ofertę.
          </div>
        </div>
      </div>
    </section>
  );
}
