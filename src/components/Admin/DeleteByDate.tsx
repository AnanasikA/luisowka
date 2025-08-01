'use client';

import { useState } from 'react';
import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/components/Admin/types';


interface Props {
  reservations: Reservation[];
  onDelete: (id: string) => void;
}

export default function DeleteByDate({ reservations, onDelete }: Props) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleDelete = async () => {
    if (!start || !end) {
      alert('Wybierz zakres dat do usunięcia.');
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const overlapping = reservations.filter(
      (r) => startDate <= r.end && endDate >= r.start
    );

    if (overlapping.length === 0) {
      alert('Brak pasujących rezerwacji.');
      return;
    }

    for (const r of overlapping) {
      await deleteDoc(doc(db, 'rezerwacje', r.id));
      onDelete(r.id);
    }

    alert(`Usunięto ${overlapping.length} rezerwacji w podanym zakresie.`);
  };

  return (
    <div className="mb-10 p-6 bg-[#fdfbf7] border border-[#8d6e63] rounded-lg space-y-4">
  <h2 className="text-xl font-semibold text-[#3f4a3c]">Usuń rezerwacje po zakresie dat</h2>
  <div className="flex flex-wrap gap-4 items-center">
    <input
      type="date"
      value={start}
      onChange={(e) => setStart(e.target.value)}
      className="border border-[#ccc] p-2 rounded text-[#3f4a3c]"
    />
    <span className="text-[#3f4a3c]">—</span>
    <input
      type="date"
      value={end}
      onChange={(e) => setEnd(e.target.value)}
      className="border border-[#ccc] p-2 rounded text-[#3f4a3c]"
    />
    <button
      onClick={handleDelete}
      className="bg-[#8d6e63] text-white px-4 py-2 rounded hover:bg-[#6c4c3e] transition"
    >
      Usuń rezerwacje
    </button>
  </div>
</div>

  );
}
