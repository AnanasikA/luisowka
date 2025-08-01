'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCookieBite } from 'react-icons/fa';

export default function CookieConsent() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visible]);

  const handleAccept = () => {
    setVisible(false);
    console.log('Cookies accepted');
    // Możesz też zapisać do localStorage jeśli w przyszłości chcesz zapamiętać
  };

  const handleReject = () => {
    console.log('Cookies rejected');
    router.push('/brak-zgody'); // <- możesz podmienić na inną stronę
  };

  if (!visible) return null;
return (
  <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 sm:px-6 py-6 w-screen h-screen overflow-hidden box-border">
    <div className="bg-[#fdfbf7] text-[#3f4a3c] border border-[#657157] rounded-xl shadow-lg w-full max-w-md p-5 sm:p-6 text-sm sm:text-base box-border">
      <div className="flex items-center gap-3 mb-3">
        <FaCookieBite className="text-2xl text-[#657157]" />
        <h2 className="text-base font-semibold">Ta strona korzysta z plików cookies</h2>
      </div>

      <p className="mb-4 leading-relaxed">
        Nasza strona korzysta z plików cookies w celu zapewnienia prawidłowego działania,
        ulepszania komfortu użytkowania oraz analizowania ruchu. Korzystając z witryny, wyrażasz
        zgodę na ich użycie zgodnie z naszą polityką prywatności. Możesz w każdej chwili zmienić
        ustawienia dotyczące cookies w swojej przeglądarce.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 border-[#d4cec3]">
        <div className="flex flex-wrap gap-2 text-sm justify-center w-full sm:justify-start">
          <a href="/cookies" className="underline text-[#657157] hover:text-[#3f4a3c]">Cookies</a>
          <span className="text-[#ccc]">|</span>
          <a href="/polityka-prywatnosci" className="underline text-[#657157] hover:text-[#3f4a3c]">Polityka prywatności</a>
          <span className="text-[#ccc]">|</span>
          <a href="/regulamin" className="underline text-[#657157] hover:text-[#3f4a3c]">Regulamin</a>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-center sm:justify-end mt-2 sm:mt-0">
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
  </div>
);


}
