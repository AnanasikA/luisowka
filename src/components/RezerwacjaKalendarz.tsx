'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/calendar-custom.css';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, Timestamp, query, where } from 'firebase/firestore';
import { FiAlertTriangle } from 'react-icons/fi';

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

// --- Funkcje pomocnicze dla dat ---
const toLocalMidnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const endOfLocalDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
const formatLocal = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`; // np. 2025-08-05
};
const enumerateLocalDays = (start: Date, end: Date): string[] => {
  const res: string[] = [];
  const cur = toLocalMidnight(start);
  const last = endOfLocalDay(end); // liczymy do końca dnia
  while (cur.getTime() <= last.getTime()) {
    res.push(formatLocal(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return res;
};

export default function RezerwacjaKalendarz() {
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pobranie zajętych dat z Firestore
  useEffect(() => {
    const fetchBookedDates = async () => {
      const snap = await getDocs(collection(db, 'rezerwacje'));
      const tmp = new Set<string>();

      snap.forEach((doc) => {
        const data = doc.data();
        const s: Date | undefined = data.start?.toDate?.();
        const e: Date | undefined = data.end?.toDate?.();
        if (!s || !e) return;

        enumerateLocalDays(s, e).forEach((d) => tmp.add(d));
      });

      setBookedDates(tmp);
    };

    fetchBookedDates();
  }, []);

  // Blokowanie dat
  const isDateDisabled = (date: Date) => {
    const today = toLocalMidnight(new Date());
    const dayStr = formatLocal(date);
    return toLocalMidnight(date) < today || bookedDates.has(dayStr);
  };

  // Obsługa wyboru dat
  const handleDateChange = (value: Value) => {
    setErrorMessage('');

    if (Array.isArray(value) && value[0] instanceof Date && value[1] instanceof Date) {
      const start = toLocalMidnight(value[0]);
      const end = toLocalMidnight(value[1]);

      if (start > end) {
        setSelectedRange(null);
        return;
      }

      // Sprawdzenie kolizji z zajętymi dniami
      const days = enumerateLocalDays(start, end);
      if (days.some((d) => bookedDates.has(d))) {
        setSelectedRange(null);
        setErrorMessage('Nie można zarezerwować zakresu z zajętymi dniami w środku.');
        return;
      }

      // Ustawienie pełnych dób (w stanie może zostać jak masz)
      setSelectedRange([start, endOfLocalDay(end)]);
    } else {
      setSelectedRange(null);
    }
  };

  // Wyliczenie liczby wybranych dni
  const selectedDaysCount =
    selectedRange &&
    selectedRange[0] instanceof Date &&
    selectedRange[1] instanceof Date
      ? Math.floor(
          (toLocalMidnight(selectedRange[1]).getTime() - toLocalMidnight(selectedRange[0]).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  // Warunki pokazywania formularza / ostrzeżenia
  const showForm = selectedDaysCount >= 3;
  const tooShortRange = selectedDaysCount > 0 && selectedDaysCount < 3;

  // Wysyłka formularza
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_honeypot')) {
      setLoading(false);
      return;
    }

    const name = formData.get('Imię i nazwisko')?.toString().trim();
    const email = formData.get('E-mail')?.toString().trim();
    const phone = formData.get('Telefon')?.toString().trim();

    const nameRegex = /^[A-Za-zÀ-ÿżźćńółęąśŻŹĆĄŚĘŁÓŃ\s'-]{2,}$/;
    if (!name || !nameRegex.test(name)) {
      setErrorMessage('Podaj poprawne imię i nazwisko.');
      setLoading(false);
      return;
    }

    if (selectedRange) {
      const start = toLocalMidnight(selectedRange[0]);
      const end = endOfLocalDay(selectedRange[1]);

      if (selectedDaysCount < 3) {
        setErrorMessage('Minimalny czas pobytu to 2 doby.');
        setLoading(false);
        return;
      }

      formData.append('Zakres dat', `${start.toLocaleDateString('pl-PL')} – ${selectedRange[1].toLocaleDateString('pl-PL')}`);
      formData.append('_subject', 'Nowa rezerwacja przez stronę Luisówka');

      try {
        // Limit jednej rezerwacji dziennie dla tej samej osoby
        const q = query(collection(db, 'rezerwacje'), where('name', '==', name));
        const snapshot = await getDocs(q);
        const today = toLocalMidnight(new Date());
        const hasAlreadyBookedToday = snapshot.docs.some((doc) => {
          const createdAt = doc.data().createdAt?.toDate?.();
          return createdAt && toLocalMidnight(createdAt) >= today;
        });
        if (hasAlreadyBookedToday) {
          setErrorMessage('Możesz zarezerwować tylko jeden termin dziennie.');
          setLoading(false);
          return;
        }

        // Zapis do Firestore
        await addDoc(collection(db, 'rezerwacje'), {
          name,
          email,
          phone,
          start: Timestamp.fromDate(start),
          end: Timestamp.fromDate(end),
          createdAt: Timestamp.now(),
        });

        // Optymistyczne dodanie do zajętych dni
        enumerateLocalDays(start, end).forEach((d) => bookedDates.add(d));
        setBookedDates(new Set(bookedDates));

        // Wysyłka maila
        const response = await fetch('https://formsubmit.co/ajax/kontakt@luisowka.com', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          setErrorMessage('Wystąpił błąd przy wysyłce e-maila.');
        }
      } catch (error) {
        console.error('Błąd:', error);
        setErrorMessage('Wystąpił błąd przy zapisie lub wysyłce.');
      }
    }

    setLoading(false);
  };

  // Klucz wymuszający rerender kalendarza, gdy zmieni się "dzisiaj" lub liczba zajętych dni
  const calendarKey = `cal-${formatLocal(new Date())}-${bookedDates.size}`;

  return (
    <section id="rezerwacja" className="bg-[#fdfbf7] py-24 px-6 text-[#3f4a3c]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Zarezerwuj swój pobyt
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Wybierz dogodny zakres dat i zarezerwuj wypoczynek w sercu gór. Luisówka to idealne miejsce na relaks wśród natury i ciszy.
          <strong className="block mt-2">Minimalny czas pobytu to 2 doby.</strong>
        </p>

        <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row min-h-[600px] overflow-hidden transition-all duration-500">
          {/* Kalendarz */}
          <div className="w-full md:w-1/2 flex items-start justify-center p-6">
            <div className="w-full flex justify-center items-start pt-4">
              <Calendar
                key={calendarKey}
                onChange={handleDateChange}
                value={selectedRange}
                minDate={toLocalMidnight(new Date())}   // ⬅️ globalna blokada przeszłości
                tileDisabled={({ date }) => isDateDisabled(date)}
                calendarType="iso8601"
                locale="pl-PL"
                selectRange={true}
                tileClassName={() => 'py-3 md:py-4'}
              />
            </div>
          </div>

          {/* Formularz / komunikaty */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 bg-white border-t md:border-t-0 md:border-l border-gray-200">
            {submitted ? (
              <p className="text-[#3f4a3c] text-lg font-semibold">
                Rezerwacja została wysłana, ale nie jest jeszcze potwierdzona. Skontaktujemy się z Tobą mailowo lub telefonicznie, aby zatwierdzić dostępność i ostatecznie potwierdzić pobyt.
              </p>
            ) : showForm ? (
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 text-left">
                <p className="text-lg">
                  Wybrany termin: {selectedRange?.[0].toLocaleDateString('pl-PL')} – {selectedRange?.[1].toLocaleDateString('pl-PL')}
                </p>

                {errorMessage && (
                  <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-300 p-3 rounded text-sm font-medium">
                    <FiAlertTriangle className="text-xl mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="_subject" value="Nowa rezerwacja przez stronę Luisówka" />
                <input type="hidden" name="Typ formularza" value="Rezerwacja przez stronę Luisówka" />

                <input
                  type="text"
                  name="Imię i nazwisko"
                  placeholder="Imię i nazwisko"
                  required
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                  type="email"
                  name="E-mail"
                  placeholder="E-mail"
                  required
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                  type="tel"
                  name="Telefon"
                  placeholder="Telefon"
                  required
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <textarea
                  name="Wiadomość (opcjonalna)"
                  placeholder="Dodatkowe informacje, pytania..."
                  rows={3}
                  className="w-full border border-gray-300 p-3 rounded"
                />

                <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm p-3 rounded">
                  <strong>Uwaga:</strong> Wypełnienie formularza to pierwszy krok do rezerwacji. Po jego wysłaniu potwierdzimy termin mailowo lub telefonicznie.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3f4a3c] text-[#fdfbf7] py-3 px-4 rounded transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-[#2e382c]"
                >
                  {loading ? 'Wysyłanie...' : 'Zarezerwuj termin'}
                </button>
              </form>
            ) : tooShortRange ? (
              <div className="flex flex-col items-center justify-center text-center text-red-600 px-2 space-y-2">
                <FiAlertTriangle className="h-10 w-10 text-red-600" />
                <p className="text-base font-medium">
                  Minimalny czas pobytu to <strong>2 doby</strong>. Wybierz dłuższy zakres dat w kalendarzu.
                </p>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center text-center text-[#3f4a3c] space-y-4 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#657157]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium">Wybierz zakres dat z kalendarza</p>
                <p className="text-sm text-[#6b7b68]">Aby wypełnić formularz i zarezerwować pobyt w Luisówce</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
