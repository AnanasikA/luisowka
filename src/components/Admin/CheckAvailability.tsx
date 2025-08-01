'use client';

import { useState } from 'react';
import { Reservation } from '@/components/Admin/types';


interface Props {
  reservations: Reservation[];
}

export default function CheckAvailability({ reservations }: Props) {
  const [checkStart, setCheckStart] = useState('');
  const [checkEnd, setCheckEnd] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleCheckAvailability = () => {
    if (!checkStart || !checkEnd) {
      alert('Wybierz pełny zakres dat.');
      return;
    }

    const startDate = new Date(checkStart);
    const endDate = new Date(checkEnd);

    const overlap = reservations.some(
      (r) => startDate <= r.end && endDate >= r.start
    );

    setIsAvailable(!overlap);
  };

  return (
    <div className="mb-10 p-4 bg-white border border-[#8d6e63] rounded-lg space-y-3">
      <h2 className="text-lg font-semibold">Sprawdź dostępność terminu</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="date"
          value={checkStart}
          onChange={(e) => setCheckStart(e.target.value)}
          className="border p-2 rounded"
        />
        <span>—</span>
        <input
          type="date"
          value={checkEnd}
          onChange={(e) => setCheckEnd(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleCheckAvailability}
          className="bg-[#657157] text-white px-4 py-2 rounded hover:bg-[#3f4a3c]"
        >
          Sprawdź
        </button>
      </div>
      {isAvailable !== null && (
        <p className={`text-sm font-medium ${isAvailable ? 'text-green-700' : 'text-red-600'}`}>
          {isAvailable ? 'Termin jest wolny' : 'Termin jest już zajęty'}
        </p>
      )}
    </div>
  );
}
