'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Naglowek() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { label: 'Start', id: 'start' },
    { label: 'Galeria', id: 'galeria' },
    { label: 'Lokalizacja', id: 'lokalizacja' },
    { label: 'Cennik', id: 'cennik' },
    { label: 'Kontakt', id: 'kontakt' },
  ];

  useEffect(() => {
    // blokujemy <html>, nie <body>, i kompensujemy szerokość paska
    const docEl = document.documentElement;

    // SSR-safe
    const getScrollbarWidth = () => {
      if (typeof window === 'undefined') return 0;
      return window.innerWidth - docEl.clientWidth;
    };

    const lock = menuOpen || showModal;
    if (lock) {
      const sw = getScrollbarWidth();
      docEl.style.overflow = 'hidden';
      if (sw > 0) docEl.style.paddingRight = `${sw}px`;
    } else {
      docEl.style.overflow = '';
      docEl.style.paddingRight = '';
    }

    return () => {
      docEl.style.overflow = '';
      docEl.style.paddingRight = '';
    };
  }, [menuOpen, showModal]);

  const handleScrollWithPath = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', `/#${targetId}`);
    setMenuOpen(false);
  };

  // 🔔 NOWE: wysyłka formularza z modala przez /api/email (SMTP CyberFolks)
  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot (antybot)
    if (formData.get('_honeypot')) {
      alert('Wykryto podejrzaną aktywność.');
      return;
    }

    const payload = {
      type: 'reservation', // żeby w mailu było widać że to zapytanie o dostępność
      name: formData.get('Imię i nazwisko'),
      email: formData.get('E-mail'),
      phone: formData.get('Telefon'),
      message: formData.get('Wiadomość'),
    };

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Dziękujemy! Twoje zapytanie zostało wysłane.');
        form.reset();
        setShowModal(false);
      } else {
        console.error('Błąd odpowiedzi API:', await res.text());
        alert('Coś poszło nie tak. Spróbuj ponownie później.');
      }
    } catch (err) {
      console.error(err);
      alert('Błąd połączenia. Spróbuj ponownie za chwilę.');
    }
  };

  return (
    <>
      {/* Główna nawigacja */}
      <header
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%] bg-[#3f4a3c] text-[#fdfbf7] rounded-full shadow-md px-6 py-3 backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } animate-fade-down`}
      >
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <span className="text-[#fdfbf7] font-serif text-xl font-bold tracking-wide">Luisówka</span>
          </Link>

          {/* Nawigacja desktop */}
          <nav className="desktop-nav flex items-center gap-6 font-medium">
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

          {/* Przyciski desktop */}
          <div className="desktop-nav flex items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#fdfbf7] text-[#3f4a3c] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#eae7df] transition"
            >
              Zapytaj o dostępność
            </button>
            <button
              onClick={() => handleScrollWithPath('rezerwacja')}
              className="bg-[#fdfbf7] text-[#3f4a3c] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#eae7df] transition"
            >
              Zarezerwuj
            </button>
          </div>

          {/* Hamburger menu mobile */}
          <button className="mobile-nav text-[#fdfbf7] text-2xl" onClick={() => setMenuOpen(true)}>
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Menu mobilne */}
      <div className={`mobile-drawer ${menuOpen ? 'open drawer-animated' : ''}`}>
        <div className="drawer-header">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <span className="drawer-logo">Luisówka</span>
          </Link>
          <button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Zamknij menu">
            <FiX />
          </button>
        </div>

        <nav className="drawer-nav">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => handleScrollWithPath(item.id)} className="drawer-link">
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleScrollWithPath('rezerwacja')}
            className="cta"
          >
            Zarezerwuj
          </button>
          <button
            onClick={() => {
              setShowModal(true);
              setMenuOpen(false);
            }}
            className="cta"
          >
            Zapytaj o dostępność
          </button>
        </nav>
      </div>

      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}

      {/* Modal z formularzem */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white text-[#3f4a3c] rounded-xl p-6 w-full max-w-md relative animate-scale-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-[#3f4a3c] hover:text-red-600"
              aria-label="Zamknij"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Wyślij zapytanie o dostępność</h3>
            <form
              // wcześniej: action="https://formsubmit.co/kontakt@luisowka.com"
              // teraz wysyłamy przez /api/email
              action="#"
              method="POST"
              className="space-y-4"
              onSubmit={handleModalSubmit}
            >
              <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="_subject" value="Zapytanie o dostępność – formularz Luisówka" />
              <input type="hidden" name="Typ formularza" value="Zapytanie o dostępność przez stronę Luisówka" />
              <input type="hidden" name="_captcha" value="false" />

              <input
                type="text"
                name="Imię i nazwisko"
                placeholder="Imię i nazwisko"
                required
                pattern="^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]{2,}(?:\\s+[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]{2,})+$"
                title="Podaj pełne imię i nazwisko"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="email"
                name="E-mail"
                placeholder="E-mail"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="tel"
                name="Telefon"
                placeholder="Telefon"
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <textarea
                name="Wiadomość"
                placeholder="Termin pobytu, liczba osób, pytania..."
                rows={3}
                className="w-full border border-gray-300 p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-[#3f4a3c] text-[#fdfbf7] py-2 px-4 rounded hover:bg-[#2e382c] transition"
              >
                Wyślij zapytanie
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
