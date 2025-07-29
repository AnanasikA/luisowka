import Naglowek from '@/components/Naglowek';
import Hero from '@/components/Hero';
import Galeria from '@/components/Galeria';
import Udogodnienia from '@/components/Udogodnienia';
import Atrakcje from '@/components/Atrakcje';
import JakDojechac from '@/components/JakDojechac';
import MomentSection from '@/components/MomentsSection';
import Rezerwacja from '@/components/RezerwacjaKalendarz';
import Contact from '@/components/Contact';
import Stopka from '@/components/Stopka';

export default function Home() {
  return (
    <main className="bg-bezowy text-lesny">
      <Naglowek />
      <Hero />
      <MomentSection /> 
      <Galeria />
      <Udogodnienia />
      <Atrakcje /> 
      <JakDojechac /> 
      <Rezerwacja />
      <Contact />
      <Stopka /> 
    </main>
  );
}
