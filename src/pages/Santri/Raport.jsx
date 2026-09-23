import React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Printer, Award, CheckCircle2, AlertCircle } from "lucide-react";
import { santriList } from "@/data/santriData";
import { useSettings } from "@/context/SettingsContext";

function Raport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const santri = santriList.find((s) => s.id === parseInt(id));

  if (!santri) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-slate-500">Data santri tidak ditemukan.</p>
        <button
          onClick={() => navigate("/santri/list")}
          className="text-xs text-emerald-600 font-semibold hover:underline"
        >
          Kembali ke Daftar Santri
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      {/* Top Action Bar (Sembunyi saat diprint) */}
      <div className="flex items-center justify-between print:hidden border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <Printer size={16} />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>

      {/* Lembar Rapor utama */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0 space-y-8">
        
        {/* Header Rapor */}
        <div className="text-center border-b-2 border-slate-800 pb-6 space-y-1">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-900">
            {settings.namaPesantren}
          </h1>
          <p className="text-xs text-slate-600">
            Pengasuh: <span className="font-medium">{settings.pimpinanPesantren}</span> • Email: {settings.emailAdmin}
          </p>
          <p className="text-xs font-bold text-emerald-800 tracking-wider uppercase pt-2">
            Laporan Hasil Belajar Santri — TA {settings.tahunAjaran}
          </p>
        </div>

        {/* Biodata Santri */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-28 text-slate-500">Nama Santri</span>
              <span className="font-bold text-slate-800">: {santri.nama}</span>
            </div>
            <div className="flex">
              <span className="w-28 text-slate-500">NIS</span>
              <span className="font-semibold text-slate-700">: {santri.nis}</span>
            </div>
            <div className="flex">
              <span className="w-28 text-slate-500">Kelas</span>
              <span className="font-semibold text-slate-700">: {santri.classroom}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-28 text-slate-500">Asrama</span>
              <span className="font-semibold text-slate-700">: {santri.asrama || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-28 text-slate-500">Pencapaian Hafalan</span>
              <span className="font-bold text-emerald-700">: {santri.hafalan}</span>
            </div>
            <div className="flex">
              <span className="w-28 text-slate-500">Status</span>
              <span className="font-semibold text-slate-700">: {santri.status}</span>
            </div>
          </div>
        </div>

        {/* Tabel Nilai */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Award size={16} className="text-emerald-600" />
            Nilai Mata Pelajaran & Mulok
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-12 text-center">No</th>
                  <th className="p-3">Mata Pelajaran</th>
                  <th className="p-3 text-center">Nilai Angka</th>
                  <th className="p-3">Predikat</th>
                  <th className="p-3 text-center">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {santri.nilai && santri.nilai.length > 0 ? (
                  santri.nilai.map((n, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 text-center font-medium text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-semibold">{n.mapel || n.matpel}</td>
                      <td className="p-3 text-center font-bold text-slate-900">{n.nilai}</td>
                      <td className="p-3 font-medium text-emerald-800">{n.predikat || "-"}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            n.status === "Tuntas"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {n.status || "Tuntas"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-slate-400">
                      Belum ada nilai terinput.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rekap Absensi */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Rekapitulasi Kehadiran
          </h3>
          <div className="grid grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-[10px] text-emerald-700 font-medium">Hadir</p>
              <p className="text-base font-bold text-emerald-900 mt-0.5">
                {santri.absensi?.hadir || 0} Hari
              </p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-[10px] text-blue-700 font-medium">Izin</p>
              <p className="text-base font-bold text-blue-900 mt-0.5">
                {santri.absensi?.izin || 0} Hari
              </p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-[10px] text-amber-700 font-medium">Sakit</p>
              <p className="text-base font-bold text-amber-900 mt-0.5">
                {santri.absensi?.sakit || 0} Hari
              </p>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <p className="text-[10px] text-rose-700 font-medium">Alpa</p>
              <p className="text-base font-bold text-rose-900 mt-0.5">
                {santri.absensi?.alpa || 0} Hari
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Tanda Tangan */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-center">
          <div>
            <p className="text-slate-500">Wali Santri,</p>
            <div className="h-16" />
            <p className="font-bold text-slate-800 uppercase underline">( ............................ )</p>
          </div>
          <div>
            <p className="text-slate-500">Pimpinan Pesantren,</p>
            <div className="h-16" />
            <p className="font-bold text-slate-800 uppercase underline">
              {settings.pimpinanPesantren}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Raport;