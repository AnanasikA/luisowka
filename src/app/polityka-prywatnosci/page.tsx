'use client';

import Naglowek from '@/components/Naglowek';
import Stopka from '@/components/Stopka';
import Link from 'next/link';

export default function PolitykaPrywatnosci() {
  return (
    <main className="bg-[#fdfbf7] min-h-screen flex flex-col">
      <Naglowek />

      <div className="flex-1 flex justify-center px-4 py-16 md:py-24">
        <div className="bg-white/70 border border-[#3f4a3c] shadow-xl backdrop-blur-md rounded-2xl max-w-3xl w-full text-[#3f4a3c] p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6">Polityka prywatności</h1>

          <p className="mb-4">
            Niniejsza polityka prywatności wyjaśnia, w jaki sposób przetwarzamy Twoje dane osobowe podczas korzystania
            ze strony internetowej Luisówka – domek w górach. Dbamy o Twoją prywatność i dokładamy wszelkich starań,
            aby dane były chronione zgodnie z RODO.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Administrator danych</h2>
          <p className="mb-4">
            Administratorem danych jest właściciel obiektu Luisówka. Kontakt mailowy: <a href="mailto:kontakt@luisowka.com" className="underline">kontakt@luisowka.com</a>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. Zakres przetwarzanych danych</h2>
          <p className="mb-4">
            Gromadzimy dane przekazywane w formularzu rezerwacyjnym: imię, nazwisko, e-mail, numer telefonu oraz daty pobytu.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. Cel i podstawa przetwarzania</h2>
          <p className="mb-4">
            Dane przetwarzane są w celu realizacji rezerwacji oraz kontaktu z klientem. Podstawą prawną przetwarzania jest art. 6 ust. 1 lit. b RODO – wykonanie umowy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Twoje prawa</h2>
          <p className="mb-4">
            Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania
            oraz wniesienia skargi do organu nadzorczego.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. Cookies</h2>
          <p className="mb-4">
            Korzystamy z plików cookies do celów technicznych i analitycznych. Szczegóły znajdziesz w&nbsp;
            <Link href="/cookies" className="underline">polityce cookies</Link>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. Bezpieczeństwo danych</h2>
          <p className="mb-4">
            Wdrożyliśmy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed
            nieuprawnionym dostępem, utratą lub zniszczeniem.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. Kontakt</h2>
          <p className="mb-4">
            W sprawach związanych z ochroną danych osobowych prosimy o kontakt mailowy: <a href="mailto:kontakt@luisowka.com" className="underline">kontakt@luisowka.com</a>.
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
