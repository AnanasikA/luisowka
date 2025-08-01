'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/components/Admin/types';
import Link from 'next/link';
import { doc, deleteDoc } from 'firebase/firestore';


import CheckAvailability from '@/components/Admin/CheckAvailability';
import AddReservationForm from '@/components/Admin/AddReservationForm';
import DeleteByDate from '@/components/Admin/DeleteByDate';
import ReservationList from '@/components/Admin/ReservationList';
import ReservationSummary from '@/components/Admin/ReservationSummary';
import Modal from '@/components/Admin/Modal';
import EditReservationForm from '@/components/Admin/EditReservationForm';

import { Toaster, toast } from 'react-hot-toast';

export default function AdminPage() {
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [modalContent, setModalContent] = useState<'add' | 'delete' | 'check' | null>(null);
  const [reservationToEdit, setReservationToEdit] = useState<Reservation | null>(null);

  // 🔐 Sprawdzenie logowania
  useEffect(() => {
    const isAdmin = localStorage.getItem('admin');
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
  const fetchReservations = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'rezerwacje'));
      const reservations = snapshot.docs.map((doc) => {
        const data = doc.data();

        // Bezpieczne parsowanie dat
        const start = data.start?.toDate?.();
        const end = data.end?.toDate?.();
        const createdAt = data.createdAt?.toDate?.() || new Date();

        if (!start || !end) return null; // pomiń uszkodzone rekordy

        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          source: data.source || '',
          start,
          end,
          createdAt,
        };
      }).filter(Boolean); // usuń null z mapy

      setReservations(reservations as Reservation[]);
    } catch (error) {
      console.error('Błąd podczas pobierania rezerwacji:', error);
      toast.error('Nie udało się pobrać rezerwacji. Spróbuj ponownie później.');
    }
  };

  fetchReservations();
}, []);


  const closeModal = () => setModalContent(null);

  const handleAdd = (reservation: Reservation) => {
    setReservations((prev) => [...prev, reservation]);
    toast.success('Rezerwacja została dodana!');
    closeModal();
  };

const handleDelete = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'rezerwacje', id));
    setReservations((prev) => prev.filter((r) => r.id !== id));
    toast.success('Rezerwacja została usunięta!');
  } catch (error) {
    console.error('Błąd podczas usuwania rezerwacji:', error);
    toast.error('Nie udało się usunąć rezerwacji.');
  }
};


  const handleUpdate = (updated: Reservation) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    toast.success('Rezerwacja zaktualizowana!');
    setReservationToEdit(null);
  };

  return (
    <main className="text-[#3f4a3c] min-h-screen p-6 bg-[#fdfbf7] font-sans">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fdfbf7',
            color: '#3f4a3c',
            border: '1px solid #657157',
            borderRadius: '12px',
            padding: '10px 14px',
          },
        }}
      />

      {/* 🔝 Pasek górny z logo i przyciskami */}
      <div className="flex justify-between items-center mb-6">
        <img src="/favicon.ico" alt="Luisówka logo" className="h-10 w-auto" />
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-[#fdfbf7] text-[#3f4a3c] border border-[#8d6e63] px-4 py-2 rounded-full hover:bg-[#eae7df] transition-all"
          >
            Strona Luisówka
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('admin');
              router.push('/admin/login');
            }}
            className="bg-[#fdfbf7] text-[#3f4a3c] border border-[#8d6e63] px-4 py-2 rounded-full hover:bg-[#eae7df] transition-all"
          >
            Wyloguj się
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Panel administracyjny</h1>

      {/* 🔘 Przyciski */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {[
          { label: 'Dodaj rezerwację', action: 'add' },
          { label: 'Usuń rezerwacje', action: 'delete' },
          { label: 'Sprawdź termin', action: 'check' },
        ].map(({ label, action }) => (
          <button
            key={action}
            onClick={() => setModalContent(action as 'add' | 'delete' | 'check')}
            className="bg-[#fdfbf7] text-[#3f4a3c] border border-[#8d6e63] px-6 py-2 rounded-full shadow-sm hover:bg-[#eae7df] hover:shadow-inner transition-all duration-200"
          >
            {label}
          </button>
        ))}
      </div>

      {/* 🟢 Podsumowanie */}
      <ReservationSummary reservations={reservations} />

      {/* 📋 Lista rezerwacji */}
      <section className="max-w-5xl mx-auto">
        <ReservationList
          reservations={reservations}
          onDelete={handleDelete}
          onEdit={(res) => setReservationToEdit(res)}
        />
      </section>

      {/* 🪟 Modal dodawania/usuwania/sprawdzania */}
      <Modal isOpen={modalContent !== null} onClose={closeModal}>
        {modalContent === 'add' && <AddReservationForm onAdd={handleAdd} />}
        {modalContent === 'delete' && (
          <DeleteByDate reservations={reservations} onDelete={handleDelete} />
        )}
        {modalContent === 'check' && <CheckAvailability reservations={reservations} />}
      </Modal>

      {/* 🪟 Modal edycji */}
      {reservationToEdit && (
        <Modal isOpen={true} onClose={() => setReservationToEdit(null)}>
          <EditReservationForm reservation={reservationToEdit} onUpdate={handleUpdate} />
        </Modal>
      )}
    </main>
  );
}
