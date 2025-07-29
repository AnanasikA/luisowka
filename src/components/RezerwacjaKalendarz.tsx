'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/calendar-custom.css';

import { db } from '../lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

import './styles/calendar-custom.css';

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
      bookedDates.some((booked) =>
        date.toDateString() === booked.toDateString()
      )
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

    if (selectedRange) {
      const start = selectedRange[0];
      const end = selectedRange[1];
      formData.append(
        'Zakres dat',
        `${start.toLocaleDateString('pl-PL')} – ${end.toLocaleDateString('pl-PL')}`
      );

      try {
        await addDoc(collection(db, 'rezerwacje'), {
  name: formData.get('Imię i nazwisko'),
  email: formData.get('E-mail'),
  phone: formData.get('Telefon'),
  guests: formData.get('Liczba osób'),
  notes: formData.get('Uwagi'),
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

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* 📅 Kalendarz */}
          <div className="w-full h-full bg-white rounded-xl shadow-md p-6 flex justify-center items-center">
            <div className="w-full max-w-sm">
              <Calendar
                onChange={handleDateChange}
                value={selectedRange}
                tileDisabled={({ date }) => isDateDisabled(date)}
                calendarType="iso8601"
                locale="pl-PL"
                selectRange={true}
                tileClassName={() => 'py-3 md:py-4'}
              />
               <div className="mt-4 text-sm text-left space-y-1">
                    <p><span className="inline-block w-4 h-4 rounded bg-[#3f4a3c] mr-2"></span> Start / koniec wybranego terminu</p>
                    <p><span className="inline-block w-4 h-4 rounded bg-[#b9c5af] mr-2"></span> Zakres rezerwacji</p>
                    <p><span className="inline-block w-4 h-4 rounded bg-[#f0efea] mr-2 border border-gray-300"></span> Niedostępne</p>
                  </div>
            </div>
          </div>

          {/* 📋 Formularz */}
          <div className="w-full h-full bg-white rounded-xl shadow-md p-6">
            {submitted ? (
              <p className="text-green-700 text-lg font-semibold">
                Dziękujemy za rezerwację! Wkrótce się z Tobą skontaktujemy.
              </p>
            ) : selectedRange ? (
              <>
                <p className="text-lg mb-4">
                  Wybrany termin: {selectedRange[0].toLocaleDateString('pl-PL')} – {selectedRange[1].toLocaleDateString('pl-PL')}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
  <input
    type="text"
    name="Imię i nazwisko"
    placeholder="Imię i nazwisko"
    required
    className="w-full border border-gray-300 p-2 rounded"
  />
  <input
    type="email"
    name="E-mail"
    placeholder="E-mail"
    required
    className="w-full border border-gray-300 p-2 rounded"
  />
  <input
    type="tel"
    name="Telefon"
    placeholder="Telefon"
    required
    className="w-full border border-gray-300 p-2 rounded"
  />
  <input
    type="number"
    name="Liczba osób"
    placeholder="Liczba osób"
    min={1}
    required
    className="w-full border border-gray-300 p-2 rounded"
  />
  <textarea
    name="Uwagi"
    placeholder="Uwagi (opcjonalnie)"
    className="w-full border border-gray-300 p-2 rounded"
    rows={4}
  />
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#3f4a3c] text-[#fdfbf7] py-2 px-4 rounded hover:bg-[#2e382c] transition"
  >
    {loading ? 'Wysyłanie...' : 'Zarezerwuj termin'}
  </button>
</form>

              </>
            ) : (
              <div className="h-full flex flex-col justify-center items-center">
                <p className="text-lg">Wybierz zakres dat z kalendarza, aby wypełnić formularz.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
