'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/calendar-custom.css';

import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, Timestamp, query, where } from 'firebase/firestore';

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

export default function RezerwacjaKalendarz() {
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookedDates = async () => {
      const querySnapshot = await getDocs(collection(db, 'rezerwacje'));
      const dates: Date[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const start = data.start?.toDate?.();
        const end = data.end?.toDate?.();

        if (start && end) {
          const current = new Date(start);
          while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        }
      });
      setBookedDates(dates);
    };

    fetchBookedDates();
  }, []);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      date < today ||
      bookedDates.some((booked) => date.toDateString() === booked.toDateString())
    );
  };

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value) && value[0] instanceof Date && value[1] instanceof Date) {
      setSelectedRange([value[0], value[1]]);
    } else {
      setSelectedRange(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      alert('Podaj poprawne imię i nazwisko.');
      setLoading(false);
      return;
    }

    if (selectedRange) {
      const start = selectedRange[0];
      const end = selectedRange[1];
      formData.append('Zakres dat', `${start.toLocaleDateString('pl-PL')} – ${end.toLocaleDateString('pl-PL')}`);

      try {
        // Sprawdzenie, czy osoba już zarezerwowała dziś
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
          collection(db, 'rezerwacje'),
          where('name', '==', name),
          where('createdAt', '>=', Timestamp.fromDate(today))
        );

        const existing = await getDocs(q);
        if (!existing.empty) {
          alert('Możesz zarezerwować tylko jeden termin dziennie.');
          setLoading(false);
          return;
        }

        await addDoc(collection(db, 'rezerwacje'), {
          name,
          email,
          phone,
          start: Timestamp.fromDate(start),
          end: Timestamp.fromDate(end),
          createdAt: Timestamp.now(),
        });

        const response = await fetch('https://formsubmit.co/ajax/kontakt@luisowka.com', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          alert('Wystąpił błąd przy wysyłce e-maila.');
        }
      } catch (error) {
        alert('Wystąpił błąd przy zapisie lub wysyłce.');
      }
    }

    setLoading(false);
  };

   return (
    <section id="rezerwacja" className="bg-[#fdfbf7] py-24 px-6 text-[#3f4a3c]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Zarezerwuj swój pobyt
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Wybierz dogodny zakres dat i zarezerwuj wypoczynek w sercu gór. Luisówka to idealne miejsce na relaks wśród natury i ciszy.
        </p>

        <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row min-h-[600px] overflow-hidden animate-fade-in transition-all duration-500">
          {/* Kalendarz */}
          <div className="w-full md:w-1/2 flex items-start justify-center p-6">
            <div className="w-full flex justify-center items-start pt-4">
              <Calendar
                onChange={handleDateChange}
                value={selectedRange}
                tileDisabled={({ date }) => isDateDisabled(date)}
                calendarType="iso8601"
                locale="pl-PL"
                selectRange={true}
                tileClassName={() => 'py-3 md:py-4'}
              />
            </div>
          </div>

          {/* Formularz */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 bg-white border-t md:border-t-0 md:border-l border-gray-200">
            {submitted ? (
              <p className="text-[#3f4a3c] text-lg font-semibold">
                Rezerwacja została wysłana, ale nie jest jeszcze potwierdzona. Skontaktujemy się z Tobą mailowo lub telefonicznie, aby zatwierdzić dostępność i ostatecznie potwierdzić pobyt.
              </p>
            ) : selectedRange ? (
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 text-left">
                <p className="text-lg">
                  Wybrany termin: {selectedRange[0].toLocaleDateString('pl-PL')} – {selectedRange[1].toLocaleDateString('pl-PL')}
                </p>
                {/* Honeypot */}
                <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <input type="text" name="Imię i nazwisko" placeholder="Imię i nazwisko" required className="w-full border border-gray-300 p-3 rounded" />
                <input type="email" name="E-mail" placeholder="E-mail" required className="w-full border border-gray-300 p-3 rounded" />
                <input type="tel" name="Telefon" placeholder="Telefon" required className="w-full border border-gray-300 p-3 rounded" />
                <textarea name="Wiadomość" placeholder="Dodatkowe informacje (opcjonalnie)" rows={3} className="w-full border border-gray-300 p-3 rounded" />

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