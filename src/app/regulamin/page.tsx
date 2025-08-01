'use client';

import Naglowek from '@/components/Naglowek';
import Stopka from '@/components/Stopka';
import Link from 'next/link';

export default function RegulaminPage() {
  return (
    <main className="bg-[#fdfbf7] min-h-screen flex flex-col">
      <Naglowek />

      <div className="flex-1 flex justify-center px-4 py-16 md:py-24">
        <div className="bg-white/70 border border-[#3f4a3c] shadow-xl backdrop-blur-md rounded-2xl max-w-3xl w-full text-[#3f4a3c] p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6">Regulamin rezerwacji</h1>

          <p className="mb-6">
            Rezerwacja pobytu w domku Luisówka oznacza akceptację poniższych warunków.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Rezerwacja i płatności</h2>
          <div className="space-y-2 mb-4">
            <p>• Rezerwacja zostaje potwierdzona po wpłacie zadatku.</p>
            <p>• W przypadku rezygnacji z pobytu, zadatek nie podlega zwrotowi.</p>
            <p>• Pozostała kwota płatna przelewem lub gotówką na miejscu.</p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Zameldowanie i wymeldowanie</h2>
          <div className="space-y-2 mb-4">
            <p>• Zameldowanie: od godziny <strong>16:00</strong> do <strong>20:00</strong>.</p>
            <p>• Wymeldowanie: do godziny <strong>11:00</strong>.</p>
            <p>• Wymagany dokument tożsamości oraz karta kredytowa.</p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Zasady pobytu</h2>
          <div className="space-y-2 mb-4">
            <p>• Cisza nocna obowiązuje w godzinach <strong>22:00–7:00</strong>.</p>
            <p>• Zakaz palenia w całym obiekcie.</p>
            <p>• Zakaz organizowania imprez i wydarzeń.</p>
            <p>• Gość ponosi odpowiedzialność za powstałe szkody.</p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Zwierzęta</h2>
          <p className="mb-4">
            Pobyt <strong>ze zwierzętami nie jest dozwolony</strong>.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Dzieci</h2>
          <p className="mb-4">
            Obiekt akceptuje dzieci w każdym wieku. Nie są dostępne dodatkowe łóżka ani łóżeczka.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Postanowienia końcowe</h2>
          <p className="mb-4">
            Dokonanie rezerwacji oznacza akceptację regulaminu. W przypadku naruszenia zasad, właściciel zastrzega sobie prawo do odmowy dalszego pobytu.
          </p>

          <p className="mt-8 text-sm text-[#657157]">Data ostatniej aktualizacji: sierpień 2025</p>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-block bg-[#3f4a3c] text-white px-5 py-2 rounded hover:bg-[#657157] transition"
            >
              Wróć na stronę główną
            </Link>
          </div>
        </div>
      </div>

      <Stopka />
    </main>
  );
}
