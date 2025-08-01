'use client';

import { useMemo, useState } from 'react';
import { FaCalendarCheck, FaCalendarTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Reservation {
  start: Date;
  end: Date;
}

interface Props {
  reservations: Reservation[];
}

export default function ReservationSummary({ reservations }: Props) {
  const [monthOffset, setMonthOffset] = useState(0); // 0 = bieżący miesiąc

  const {
    currentMonthCount,
    freeDays,
    currentMonthName,
    calendarDays,
  } = useMemo(() => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const monthStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const monthEnd = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

    const monthDays = Array.from({ length: monthEnd.getDate() }, (_, i) => {
      return new Date(targetDate.getFullYear(), targetDate.getMonth(), i + 1);
    });

    const currentMonthReservations = reservations.filter(
      (r) => r.start <= monthEnd && r.end >= monthStart
    );

    const reservedDaysSet = new Set<string>();
    currentMonthReservations.forEach((r) => {
      const start = new Date(r.start);
      const end = new Date(r.end);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        reservedDaysSet.add(d.toDateString());
      }
    });

    const freeDaysCount = monthDays.filter(
      (d) => !reservedDaysSet.has(d.toDateString())
    ).length;

    const calendarDays = monthDays.map((date) => ({
      key: date.toDateString(),
      label: date.getDate(),
      reserved: reservedDaysSet.has(date.toDateString()),
    }));

    const monthName = targetDate.toLocaleDateString('pl-PL', {
      month: 'long',
      year: 'numeric',
    });

    return {
      currentMonthCount: currentMonthReservations.length,
      freeDays: freeDaysCount,
      currentMonthName: monthName,
      calendarDays,
    };
  }, [reservations, monthOffset]);

  return (
    <div className="bg-[#fdfbf7] border border-[#657157] text-[#3f4a3c] rounded-xl px-6 py-5 mb-10 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonthOffset((prev) => prev - 1)}
          className="text-[#657157] hover:text-[#3f4a3c] transition"
          aria-label="Poprzedni miesiąc"
        >
          <FaChevronLeft />
        </button>

        <h2 className="text-lg font-semibold text-center">{currentMonthName}</h2>

        <button
          onClick={() => setMonthOffset((prev) => prev + 1)}
          className="text-[#657157] hover:text-[#3f4a3c] transition"
          aria-label="Następny miesiąc"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <FaCalendarCheck className="text-[#3f4a3c]" />
        <span>
          Liczba rezerwacji: <strong>{currentMonthCount}</strong>
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <FaCalendarTimes className="text-[#657157]" />
        <span>
          Wolne dni: <strong>{freeDays}</strong>
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm mt-4">
        {calendarDays.map((day) => (
          <div
            key={day.key}
            className={`rounded text-center py-1 ${
              day.reserved
                ? 'bg-[#657157] text-white'
                : 'bg-[#eae7df] text-[#3f4a3c]'
            }`}
          >
            {day.label}
          </div>
        ))}
      </div>
    </div>
  );
}
