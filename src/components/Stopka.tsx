export default function Stopka() {
  return (
    <footer className="bg-[#3f4a3c] text-[#fdfbf7] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Logo / Nazwa */}
        <div>
          <h3
            className="text-2xl font-serif font-bold"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Luisówka
          </h3>
          <p className="text-sm mt-1">Nowa Morawa, Dolny Śląsk</p>
        </div>

        {/* Kontakt */}
        <div>
          <p className="text-sm font-semibold mb-1">Kontakt</p>
          <p className="text-sm">kontakt@luisowka.pl</p>
          <p className="text-sm">+48 123 456 789</p>
        </div>

        {/* CTA / Opis */}
        <div className="max-w-sm text-sm">
          <p>
            Odpocznij w sercu natury. Czeka na Ciebie wyjątkowy domek z jacuzzi, cisza i widoki,
            które zostają w pamięci.
          </p>
        </div>
      </div>

      {/* Pasek dolny */}
      <div className="text-center mt-8 text-xs text-[#dcd7d0]">
        &copy; {new Date().getFullYear()} Luisówka – Wszystkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
