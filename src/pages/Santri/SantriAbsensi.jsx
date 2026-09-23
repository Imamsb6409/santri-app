import React from "react";
import { santriList } from "@/data/santriData";

function SantriAbsensi() {
  const totalSantri = santriList.length;

  // Hitung persentase kehadiran per santri
  const dataAbsensi = santriList.map((santri) => {
    const { hadir = 0, izin = 0, sakit = 0, alpa = 0 } = santri.absensi || {};
    const totalPertemuan = hadir + izin + sakit + alpa || 1;
    const persentase = Math.round((hadir / totalPertemuan) * 100);
    return {
      ...santri,
      persentase,
    };
  });

  // Kalkulasi statistik keseluruhan
  const avgAttendance = Math.round(
    dataAbsensi.reduce((acc, curr) => acc + curr.persentase, 0) /
      (totalSantri || 1),
  );

  const totalAlpa = santriList.reduce(
    (acc, curr) => acc + (curr.absensi?.alpa || 0),
    0,
  );

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Rekapitulasi Absensi Santri
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau tingkat kehadiran, izin, sakit, dan alpa santri secara
            terpusat.
          </p>
        </div>
        <div>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1.5 rounded-lg border border-emerald-200 inline-block">
            Periode: Bulan Ini
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Rata-rata Kehadiran
          </p>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {avgAttendance}%
          </p>
        </div>
        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Total Santri
          </p>
          <p className="text-2xl font-bold text-emerald-800 mt-1">
            {totalSantri} Santri
          </p>
        </div>
        <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">
            Total Alpa
          </p>
          <p className="text-2xl font-bold text-rose-800 mt-1">
            {totalAlpa} Hari
          </p>
        </div>
      </div>

      {/* Tabel Absensi */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-3.5">Santri</th>
              <th className="p-3.5 text-center">Hadir</th>
              <th className="p-3.5 text-center">Izin</th>
              <th className="p-3.5 text-center">Sakit</th>
              <th className="p-3.5 text-center">Alpa</th>
              <th className="p-3.5 min-w-35">Tingkat Kehadiran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dataAbsensi.map((santri) => (
              <tr
                key={santri.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="p-3.5">
                  <p className="font-semibold text-slate-800">{santri.nama}</p>
                  <p className="text-[11px] text-slate-500">
                    Kelas {santri.classroom}
                  </p>
                </td>
                <td className="p-3.5 text-center font-semibold text-emerald-600">
                  {santri.absensi?.hadir || 0}
                </td>
                <td className="p-3.5 text-center font-medium text-blue-600">
                  {santri.absensi?.izin || 0}
                </td>
                <td className="p-3.5 text-center font-medium text-amber-600">
                  {santri.absensi?.sakit || 0}
                </td>
                <td className="p-3.5 text-center font-semibold text-rose-600">
                  {santri.absensi?.alpa || 0}
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          santri.persentase >= 90
                            ? "bg-emerald-500"
                            : santri.persentase >= 85
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                        style={{ width: `${santri.persentase}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-slate-700 text-xs min-w-[32px] text-right">
                      {santri.persentase}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SantriAbsensi;
