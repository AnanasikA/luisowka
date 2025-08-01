'use client';

import { useEffect, useState } from 'react';
import { FaCookieBite } from 'react-icons/fa';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] bg-[#fdfbf7] text-[#3f4a3c] border border-[#657157] rounded-xl shadow-lg max-w-md w-full p-5 sm:p-6 text-sm sm:text-base box-border">
      <div className="flex items-center gap-3 mb-3">
        <FaCookieBite className="text-2xl text-[#657157]" />
        <h2 className="text-base font-semibold">Ta strona korzysta z plików cookies</h2>
      </div>

      <p className="mb-4 leading-relaxed">
        Nasza strona używa plików cookies do prawidłowego działania, poprawy wygody użytkowania
        oraz analizy ruchu. Korzystając z niej, wyrażasz zgodę na ich użycie. Możesz zmienić ustawienia cookies w swojej przeglądarce.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 border-[#d4cec3]">
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="/cookies" className="underline text-[#657157] hover:text-[#3f4a3c]">Cookies</a>
          <span className="text-[#ccc]">|</span>
          <a href="/polityka-prywatnosci" className="underline text-[#657157] hover:text-[#3f4a3c]">Polityka prywatności</a>
          <span className="text-[#ccc]">|</span>
          <a href="/regulamin" className="underline text-[#657157] hover:text-[#3f4a3c]">Regulamin</a>
        </div>

        <div className="flex gap-2 mt-3 sm:mt-0 sm:ml-auto">
          <button
            onClick={handleReject}
            className="px-4 py-2 rounded border border-[#657157] text-[#657157] hover:text-[#3f4a3c] hover:border-[#3f4a3c] transition"
          >
            Odrzucam
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded bg-[#657157] text-white hover:bg-[#3f4a3c] transition"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
