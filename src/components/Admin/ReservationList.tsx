'use client';

import { Reservation } from '@/components/Admin/types';

interface Props {
  reservations: Reservation[];
  onDelete: (id: string) => void;
  onEdit?: (reservation: Reservation) => void; // jeśli chcesz edycję przez modal
}

export default function ReservationList({ reservations, onDelete, onEdit }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-[#3f4a3c] text-[#fdfbf7]">
          <tr>
            <th className="p-2 border">Data dodania</th>
            <th className="p-2 border">Imię</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Telefon</th>
            <th className="p-2 border">Zakres</th>
            <th className="p-2 border">Źródło</th>
            <th className="p-2 border">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="even:bg-[#f0edea] text-center">
              <td className="p-2 border">{r.createdAt.toLocaleDateString('pl-PL')}</td>
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.email}</td>
              <td className="p-2 border">{r.phone}</td>
              <td className="p-2 border">
                {r.start.toLocaleDateString('pl-PL')} – {r.end.toLocaleDateString('pl-PL')}
              </td>
              <td className="p-2 border">{r.source || '-'}</td>
              <td className="p-2 border">
  <div className="flex justify-center gap-2">
    <button
      onClick={() => onEdit?.(r)}
      className="px-3 py-1 text-sm border border-[#657157] text-[#3f4a3c] rounded-full hover:bg-[#eae7df] transition-all"
    >
      Edytuj
    </button>
    <button
      onClick={() => onDelete(r.id)}
      className="px-3 py-1 text-sm border border-[#8d4f4f] text-[#8d4f4f] rounded-full hover:bg-[#fbecec] transition-all"
    >
      Usuń
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
