'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BrakZgodyPage() {
  const router = useRouter();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'true') {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] text-[#3f4a3c] px-4 text-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold">Brak zgody na cookies</h1>
        <p>
          Nie wyraziłeś zgody na użycie plików cookies, dlatego dostęp do zawartości strony został ograniczony.
        </p>
        <button
          onClick={() => {
            localStorage.setItem('cookieConsent', 'true');
            router.push('/');
          }}
          className="px-5 py-2 rounded bg-[#657157] text-white hover:bg-[#3f4a3c] transition"
        >
          Akceptuję cookies i przejdź dalej
        </button>
      </div>
    </div>
  );
}
