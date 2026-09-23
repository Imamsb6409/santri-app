import React, { useState } from "react";
import { santriList } from "@/data/santriData";

function SantriNilai() {
  const [selectedSemester, setSelectedSemester] = useState("Ganjil 2025/2026");

  // Meratakan (flatten) data nilai dari seluruh santri
  const rekapNilai = santriList.flatMap((santri) =>
    santri.nilai.map((n, index) => ({
      keyId: `${santri.id}-${index}`,
      nama: santri.nama,
      kelas: santri.classroom,
      mapel: n.mapel,
      nilai: n.nilai,
      predikat: n.predikat,
      status: n.status,
    }))
  );

  // Kalkulasi statistik sederhana secara dinamis
  const totalNilai = rekapNilai.reduce((acc, curr) => acc + curr.nilai, 0);
  const rataRata = (totalNilai / (rekapNilai.length || 1)).toFixed(1);
  const totalMumtaz = rekapNilai.filter((item) => item.predikat === "Mumtaz").length;
  const totalRemedial = rekapNilai.filter((item) => item.status === "Remedial").length;

  const getPredikatBadge = (predikat) => {
    switch (predikat) {
      case "Mumtaz":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Jayyid Jiddan":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Jayyid":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-rose-100 text-rose-800 border-rose-200";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Rekapitulasi Nilai Akademik
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Data diambil langsung dari database terpusat santri.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="semester" className="text-xs text-slate-500 font-medium">
            Semester:
          </label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Ganjil 2025/2026">Ganjil 2025/2026</option>
            <option value="Genap 2024/2025">Genap 2024/2025</option>
          </select>
        </div>
      </div>

      {/* Ringkasan Statistik Dinamis */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Rata-rata Nilai
          </p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{rataRata}</p>
        </div>
        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Predikat Mumtaz
          </p>
          <p className="text-2xl font-bold text-emerald-800 mt-1">{totalMumtaz} Ujian</p>
        </div>
        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Perlu Remedial
          </p>
          <p className="text-2xl font-bold text-amber-800 mt-1">{totalRemedial} Santri</p>
        </div>
      </div>

      {/* Tabel Nilai */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-3.5">Santri</th>
              <th className="p-3.5">Mata Pelajaran / Kitab</th>
              <th className="p-3.5 text-center">Nilai Akhir</th>
              <th className="p-3.5 text-center">Predikat</th>
              <th className="p-3.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rekapNilai.map((item) => (
              <tr key={item.keyId} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5">
                  <p className="font-semibold text-slate-800">{item.nama}</p>
                  <p className="text-[11px] text-slate-500">Kelas {item.kelas}</p>
                </td>
                <td className="p-3.5 font-medium text-slate-700">{item.mapel}</td>
                <td className="p-3.5 text-center font-bold text-slate-800">
                  {item.nilai}
                </td>
                <td className="p-3.5 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium border ${getPredikatBadge(
                      item.predikat
                    )}`}
                  >
                    {item.predikat}
                  </span>
                </td>
                <td className="p-3.5 text-center">
                  <span
                    className={`font-semibold ${
                      item.status === "Tuntas"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SantriNilai;