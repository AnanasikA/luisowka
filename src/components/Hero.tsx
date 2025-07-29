'use client';

export default function Hero() {
    const handleScrollWithPath = (targetId: string, newPath: string) => {
    // Scroll do elementu
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // Zmień widoczny URL bez przeładowania strony
    window.history.pushState(null, '', newPath);

  };


  return (
    <section id="start" className="relative h-screen w-full overflow-hidden">
      {/* Wideo w tle */}
      <video
      preload="auto"
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover z-0"
  poster="/hero-placeholder.webp"
>
  <source src="/hero-video.webm" type="video/webm" />
  <source src="/hero-video.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje wideo HTML5.
</video>


      {/* Nakładka gradientowa */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

      {/* Treść na tle wideo */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-end text-center px-4 pb-24 sm:px-6 sm:pb-32 text-white">
        <h1
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 leading-tight opacity-0 fade-up"
  style={{
    fontFamily: '"Playfair Display", serif',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#fdfbf7', // dodane
  }}
>

          Luisówka – domek w górach
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-xl md:max-w-2xl mb-6 sm:mb-8 opacity-0 fade-up-delayed"
          style={{
            fontFamily: '"Open Sans", sans-serif',
            color: '#fdfbf7',
          }}
        >
          Przytulny domek do wynajęcia w sercu Masywu Śnieżnika. Zrelaksuj się w ciszy, z widokiem na lasy i góry. Jacuzzi, kominek i natura – na wyłączność.
        </p>

        <button
          onClick={() => handleScrollWithPath('rezerwacja', '/rezerwacja')}
          className="px-5 sm:px-6 py-3 font-semibold rounded-full transition text-sm sm:text-base opacity-0 fade-zoom-delayed"
          style={{
            backgroundColor: '#657157',
            color: '#fdfbf7',
            fontFamily: '"Open Sans", sans-serif',
          }}
        >
          Zarezerwuj pobyt
        </button>
      </div>
    </section>
  );
}
