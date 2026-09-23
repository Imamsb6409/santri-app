import { santriList } from "@/data/santriData";
import SantriCard from "@/components/SantriCard";

function SantriList() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="flex flex-col gap-1 mb-6 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Daftar Santri
        </h1>
        <p className="text-sm text-slate-500">
          Klik pada kartu santri untuk melihat detail lengkap.
        </p>
      </header>

      {/* Grid Layout untuk Card Santri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {santriList.map((santri) => (
          <SantriCard
            key={santri.id}
            id={santri.id}
            name={santri.nama}
            classroom={santri.classroom}
          />
        ))}
      </div>
    </div>
  );
}

export default SantriList;