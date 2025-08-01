'use client';

import { useState } from 'react';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from './types';

interface Props {
  reservation: Reservation;
  onUpdate: (updated: Reservation) => void;
}

export default function EditReservationForm({ reservation, onUpdate }: Props) {
  const [name, setName] = useState(reservation.name);
  const [email, setEmail] = useState(reservation.email);
  const [phone, setPhone] = useState(reservation.phone);
  const [source, setSource] = useState(reservation.source || '');
  const [start, setStart] = useState(reservation.start.toISOString().substring(0, 10));
  const [end, setEnd] = useState(reservation.end.toISOString().substring(0, 10));
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updated = {
      ...reservation,
      name,
      email,
      phone,
      source,
      start: new Date(start),
      end: new Date(end),
    };

    const ref = doc(db, 'rezerwacje', reservation.id);
    await updateDoc(ref, {
      name,
      email,
      phone,
      source,
      start: Timestamp.fromDate(new Date(start)),
      end: Timestamp.fromDate(new Date(end)),
    });

    onUpdate(updated);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Edytuj rezerwację</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Imię" className="w-full border p-2 rounded" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email" className="w-full border p-2 rounded" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Telefon" className="w-full border p-2 rounded" />
      <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Źródło" className="w-full border p-2 rounded" />
      
      <div className="flex gap-2">
        <input value={start} onChange={(e) => setStart(e.target.value)} type="date" required className="w-full border p-2 rounded" />
        <input value={end} onChange={(e) => setEnd(e.target.value)} type="date" required className="w-full border p-2 rounded" />
      </div>

      <button disabled={loading} type="submit" className="bg-[#657157] text-white px-6 py-2 rounded hover:bg-[#4b5c44] transition">
        {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
      </button>
    </form>
  );
}
