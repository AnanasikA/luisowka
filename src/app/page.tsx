import Naglowek from '@/components/Naglowek';
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
// import Galeria from '@/components/Galeria';
// import Udogodnienia from '@/components/Udogodnienia';
// import Lokalizacja from '@/components/Lokalizacja';
// import MomentSection from '@/components/MomentsSection';
import Contact from '@/components/Contact';
import Stopka from '@/components/Stopka';

export default function Home() {
  return (
    <main className="bg-bezowy text-lesny">
      <Naglowek />
      <Hero />
      <IntroSection /> 
      {/* <Galeria /> */}
      {/* <Udogodnienia /> */}
      {/* <Lokalizacja /> */}
      {/* <MomentSection /> */}
      <Contact />
      <Stopka /> 
    </main>
  );
}
