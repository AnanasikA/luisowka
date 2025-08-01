'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCookieBite } from 'react-icons/fa';

export default function CookieConsent() {
  const [consentGiven, setConsentGiven] = useState(false);
  const [checkedStorage, setCheckedStorage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accepted = localStorage.getItem('cookieConsent');
    if (accepted === 'true') {
      setConsentGiven(true);
    }
    setCheckedStorage(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setConsentGiven(true);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    router.push('/brak-zgody'); // lub inna strona informacyjna
  };

  if (!checkedStorage || consentGiven) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto max-w-xl bg-white/90 border border-[#657157] text-[#3f4a3c] p-4 rounded-xl shadow-xl z-50 backdrop-blur-md">
      <div className="flex gap-4 items-start">
        <FaCookieBite className="text-3xl mt-1 text-[#657157]" />
        <div className="flex-1 text-sm leading-relaxed">
          <p>
            Nasza strona używa plików cookies w celach technicznych, analitycznych i funkcjonalnych.
            Korzystając z niej, wyrażasz zgodę na ich użycie.
          </p>
          <div className="flex flex-wrap gap-3 text-xs mt-2">
            <a href="/cookies" className="underline">Cookies</a>
            <span className="text-gray-400">|</span>
            <a href="/polityka-prywatnosci" className="underline">Polityka prywatności</a>
            <span className="text-gray-400">|</span>
            <a href="/regulamin" className="underline">Regulamin</a>
          </div>
          <div className="flex gap-3 mt-4 justify-end">
            <button
              onClick={handleReject}
              className="px-4 py-1.5 border border-[#8d6e63] text-[#8d6e63] rounded hover:bg-[#fdfbf7] transition"
            >
              Odrzucam
            </button>
            <button
              onClick={handleAccept}
              className="bg-[#657157] text-white px-4 py-1.5 rounded hover:bg-[#3f4a3c] transition"
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
