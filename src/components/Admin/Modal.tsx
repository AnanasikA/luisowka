'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#3f4a3c]/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#fdfbf7] text-[#3f4a3c] p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-[#8d6e63]">
        
        {/* Zamknięcie w górnym rogu, ale wewnątrz kontenera */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-[#657157] hover:text-[#3f4a3c] transition-colors text-xl font-bold"
            aria-label="Zamknij"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
