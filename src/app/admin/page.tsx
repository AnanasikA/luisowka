'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/components/Admin/types';
import Link from 'next/link';

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
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin');
    const tokenTime = localStorage.getItem('admin_token_time');

    if (!isAdmin || !tokenTime) {
      router.push('/admin/login');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const expiry = parseInt(tokenTime) + 30 * 60 * 1000;
      const remainingMs = expiry - now;

      if (remainingMs <= 0) {
        localStorage.removeItem('admin');
        localStorage.removeItem('admin_token_time');
        router.push('/admin/login');
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(remainingMs / 60000);
      const seconds = Math.floor((remainingMs % 60000) / 1000).toString().padStart(2, '0');
      setRemainingTime(`${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'rezerwacje'));
        const reservations = snapshot.docs.map((doc) => {
          const data = doc.data();
          const start = data.start?.toDate?.();
          const end = data.end?.toDate?.();
          const createdAt = data.createdAt?.toDate?.() || new Date();

          if (!start || !end) return null;

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
        }).filter(Boolean);

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
    setReservations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    toast.success('Rezerwacja zaktualizowana!');
    setReservationToEdit(null);
  };

  return (
    <main className="text-[#3f4a3c] min-h-screen p-6 bg-[#fdfbf7] font-sans">
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: '#fdfbf7',
          color: '#3f4a3c',
          border: '1px solid #657157',
          borderRadius: '12px',
          padding: '10px 14px',
        },
      }} />

      <div className="flex justify-between items-center mb-6">
        <img src="/favicon.ico" alt="Luisówka logo" className="h-10 w-auto" />
        <div className="flex gap-4">
          <Link href="/" className="bg-[#fdfbf7] text-[#3f4a3c] border border-[#8d6e63] px-4 py-2 rounded-full hover:bg-[#eae7df] transition-all">Strona Luisówka</Link>
          <button
            onClick={() => {
              localStorage.removeItem('admin');
              localStorage.removeItem('admin_token_time');
              router.push('/admin/login');
            }}
            className="bg-[#fdfbf7] text-[#3f4a3c] border border-[#8d6e63] px-4 py-2 rounded-full hover:bg-[#eae7df] transition-all"
          >
            Wyloguj się
          </button>
        </div>
      </div>

      {remainingTime && (
  <div className="flex justify-center mb-6">
    <div className="flex items-center gap-2 bg-[#fdfbf7] border border-[#657157] text-[#3f4a3c] px-4 py-2 rounded-xl shadow-sm text-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-[#657157]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        Sesja wygaśnie za: <strong>{remainingTime}</strong>
      </span>
    </div>
  </div>
)}


      <h1 className="text-3xl font-bold mb-6 text-center">Panel administracyjny</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {[{ label: 'Dodaj rezerwację', action: 'add' }, { label: 'Usuń rezerwacje', action: 'delete' }, { label: 'Sprawdź termin', action: 'check' }].map(({ label, action }) => (
          <button
            key={action}
            onClick={() => setModalContent(action as 'add' | 'delete' | 'check')}
            className="bg-[#fdfbf7] text-[#3f4a3c] border border-[#8d6e63] px-6 py-2 rounded-full shadow-sm hover:bg-[#eae7df] hover:shadow-inner transition-all duration-200"
          >
            {label}
          </button>
        ))}
      </div>

      <ReservationSummary reservations={reservations} />

      <section className="max-w-5xl mx-auto">
        <ReservationList
          reservations={reservations}
          onDelete={handleDelete}
          onEdit={(res) => setReservationToEdit(res)}
        />
      </section>

      <Modal isOpen={modalContent !== null} onClose={closeModal}>
        {modalContent === 'add' && <AddReservationForm onAdd={handleAdd} />}
        {modalContent === 'delete' && <DeleteByDate reservations={reservations} onDelete={handleDelete} />}
        {modalContent === 'check' && <CheckAvailability reservations={reservations} />}
      </Modal>

      {reservationToEdit && (
        <Modal isOpen={true} onClose={() => setReservationToEdit(null)}>
          <EditReservationForm reservation={reservationToEdit} onUpdate={handleUpdate} />
        </Modal>
      )}
    </main>
  );
}