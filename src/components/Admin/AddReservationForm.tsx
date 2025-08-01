'use client';

import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/components/Admin/types';


interface Props {
  onAdd: (reservation: Reservation) => void;
}

export default function AddReservationForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    start: '',
    end: '',
    source: '',
  });

  const handleSubmit = async () => {
    const { name, email, phone, start, end, source } = form;
    if (!name || !email || !phone || !start || !end) {
      alert('Wypełnij wszystkie wymagane pola.');
      return;
    }

    const newReservation = {
      name,
      email,
      phone,
      source,
      start: Timestamp.fromDate(new Date(start)),
      end: Timestamp.fromDate(new Date(end)),
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'rezerwacje'), newReservation);

    onAdd({
      id: docRef.id,
      name,
      email,
      phone,
      source,
      start: new Date(start),
      end: new Date(end),
      createdAt: new Date(),
    });

    setForm({ name: '', email: '', phone: '', start: '', end: '', source: '' });
  };

return (
  <div className="bg-[#fdfbf7] border border-[#8d6e63] p-6 rounded-xl mb-8 space-y-4 shadow-sm">
    <h2 className="text-xl font-semibold text-[#3f4a3c]">Dodaj rezerwację</h2>

    <input
      type="text"
      placeholder="Imię i nazwisko"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      className="w-full border border-[#ccc] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#657157]"
    />

    <input
      type="email"
      placeholder="Email"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      className="w-full border border-[#ccc] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#657157]"
    />

    <input
      type="tel"
      placeholder="Telefon"
      value={form.phone}
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
      className="w-full border border-[#ccc] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#657157]"
    />

    <input
      type="text"
      placeholder="Źródło (np. formularz, telefon)"
      value={form.source}
      onChange={(e) => setForm({ ...form, source: e.target.value })}
      className="w-full border border-[#ccc] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#657157]"
    />

    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="date"
        value={form.start}
        onChange={(e) => setForm({ ...form, start: e.target.value })}
        className="border border-[#ccc] p-3 rounded-md w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#657157]"
      />
      <input
        type="date"
        value={form.end}
        onChange={(e) => setForm({ ...form, end: e.target.value })}
        className="border border-[#ccc] p-3 rounded-md w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#657157]"
      />
    </div>

    <button
      onClick={handleSubmit}
      className="bg-[#657157] text-white px-5 py-2.5 rounded-md hover:bg-[#3f4a3c] transition-colors"
    >
      Dodaj rezerwację
    </button>
  </div>
);

}
