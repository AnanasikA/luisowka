'use client';

import { FiPhone } from 'react-icons/fi';

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+48601675411"
      aria-label="Zadzwoń do nas"
      className="fixed bottom-8 right-6 z-50 
                 bg-[#3f4a3c] hover:bg-[#2e382c] 
                 text-[#fdfbf7] 
                 p-4 rounded-full shadow-md 
                 transition-all duration-300 
                 active:scale-95 
                 md:hidden 
                 w-16 h-16 flex items-center justify-center 
                 animate-soft-pulse"
    >
      <FiPhone className="text-2xl" />
    </a>
  );
}
