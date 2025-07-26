import Image from 'next/image';

const atrakcje = [
  {
    nazwa: 'Wieża widokowa na Czernicy',
    opis: 'Malownicza trasa prowadząca do punktu widokowego z panoramą na Masyw Śnieżnika.',
    obraz: '/okolica-czernica.jpg',
  },
  {
    nazwa: 'Sky Bridge 721 – Dolní Morava',
    opis: 'Najdłuższy na świecie most wiszący dla pieszych – wrażenia i widoki, których się nie zapomina.',
    obraz: '/okolica-skybridge.jpg',
  },
  {
    nazwa: 'Jaskinia Niedźwiedzia',
    opis: 'Jedna z najpiękniejszych jaskiń w Polsce – trasa turystyczna z przewodnikiem.',
    obraz: '/okolica-jaskinia.jpg',
  },
];

export default function Lokalizacja() {
  return (
    <section
      id="lokalizacja"
      className="py-24"
      style={{ backgroundColor: '#3f4a3c', color: '#fdfbf7' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-center uppercase tracking-wider text-sm mb-3"
        >
          Okolica
        </p>

        <h2
          className="text-center text-4xl md:text-5xl font-bold leading-tight mb-6"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Atrakcje <span className="italic font-normal">w pobliżu</span>
        </h2>

        <p
          className="text-center text-lg max-w-3xl mx-auto mb-16"
          style={{ color: '#eae7df' }}
        >
          Luisówka położona jest w malowniczej Nowej Morawie, u stóp Masywu Śnieżnika. 
          To idealna baza wypadowa do górskich wędrówek i odkrywania skarbów Dolnego Śląska.
        </p>

        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {atrakcje.map((a, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border hover:shadow-xl hover:scale-[1.02] transition duration-300"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#657157',
                color: '#3f4a3c',
              }}
            >
              <div className="aspect-video relative mb-5 rounded-lg overflow-hidden">
                <Image
                  src={a.obraz}
                  alt={a.nazwa}
                  fill
                  className="object-cover"
                />
              </div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}
              >
                {a.nazwa}
              </h3>
              <p className="text-sm">{a.opis}</p>
            </div>
          ))}
        </div>

        <h3 className="text-center text-xl font-semibold mb-4" style={{ fontFamily: '"Open Sans", sans-serif' }}>
          Jak dojechać do Luisówki?
        </h3>
        <p className="text-center text-base mb-6 text-[#eae7df] max-w-2xl mx-auto">
          Poniżej znajduje się mapa z dokładną lokalizacją naszej chaty w Nowej Morawie. Możesz łatwo zaplanować trasę dojazdu samochodem lub pieszo.
        </p>

        {/* Mapa */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.934889942739!2d16.9467393!3d50.2769531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470e28c1e1b3b4f7%3A0x1234567890abcdef!2sNowa%20Morawa!5e0!3m2!1spl!2spl!4v1620000000000!5m2!1spl!2spl"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            title="Mapa dojazdu do Luisówki"
            allowFullScreen
          ></iframe>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Nowa+Morawa,+Polska"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#fdfbf7] text-[#3f4a3c] font-semibold px-6 py-3 rounded-full hover:bg-[#eae7df] transition"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            Wyznacz trasę w Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
