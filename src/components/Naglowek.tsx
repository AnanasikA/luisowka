'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Naglowek() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Start', id: 'start' },
    { label: 'Galeria', id: 'galeria' },
    { label: 'Lokalizacja', id: 'lokalizacja' },
    { label: 'Cennik', id: 'cennik' },
    { label: 'Kontakt', id: 'kontakt' },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const handleScrollWithPath = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // Ustawia URL bez przeładowania strony
    window.history.pushState(null, '', `/#${targetId}`);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%] bg-[#3f4a3c]/90 text-[#fdfbf7] rounded-full shadow-md px-6 py-3 backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <span className="text-[#fdfbf7] font-serif text-xl font-bold tracking-wide">
              Luisówka
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 font-medium">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScrollWithPath(item.id)}
                className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#fdfbf7] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleScrollWithPath('rezerwacja')}
              className="bg-[#fdfbf7] text-[#3f4a3c] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#eae7df] transition"
            >
              Zarezerwuj
            </button>
          </div>

          <button
            className="md:hidden text-[#fdfbf7] text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Drawer menu mobilny */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <span className="drawer-logo">Luisówka</span>
          </Link>
          <button
            className="drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Zamknij menu"
          >
            <FiX />
          </button>
        </div>

        <nav className="drawer-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleScrollWithPath(item.id)}
              className="drawer-link"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleScrollWithPath('rezerwacja')}
            className="cta"
          >
            Zarezerwuj
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
