'use client';

import { useRouter } from 'next/navigation';

export default function BrakZgodyPage() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cookieConsent');
    }
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#3f4a3c] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Brak zgody na cookies</h1>
      <p className="mb-6 max-w-xl">
        Aby korzystać z naszej strony, wymagamy zgody na pliki cookies.
        Niestety, bez jej wyrażenia nie możemy umożliwić dalszego przeglądania zawartości.
      </p>
      <button
        onClick={handleBack}
        className="bg-[#657157] text-white px-5 py-2 rounded hover:bg-[#3f4a3c] transition"
      >
        Wróć i wyraź zgodę
      </button>
    </main>
  );
}
