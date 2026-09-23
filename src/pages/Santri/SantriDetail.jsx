import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Printer, FileText } from "lucide-react";
import { santriList } from "@/data/santriData";

function SantriDetail() {
  const { santri_id } = useParams();

  // Cari santri berdasarkan ID dari file data terpusat
  const santri = santriList.find((item) => item.id === Number(santri_id));

  // Tampilan jika ID tidak ditemukan
  if (!santri) {
    return (
      <div className="min-h-screen bg-slate-50 p-12 text-center font-sans">
        <h2 className="text-xl font-bold text-slate-800">
          Santri tidak ditemukan!
        </h2>
        <p className="text-sm text-slate-500 mt-2 mb-4">
          Data dengan ID {santri_id} tidak ada dalam database.
        </p>
        <Link
          to="/admin/santri/list"
          className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium"
        >
          Kembali ke Daftar Santri
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header Profile */}
        <div className="bg-emerald-600 px-6 py-8 text-white relative">
          <Link
            to="/admin/santri/list"
            className="inline-flex items-center text-sm font-medium text-emerald-100 hover:text-white transition-colors mb-6"
          >
            <span>&larr; Kembali ke Daftar Santri</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 bg-emerald-200 rounded-full border-4 border-white shadow-md flex items-center justify-center text-emerald-800 text-3xl font-bold shrink-0">
              {santri.nama.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {santri.nama}
              </h1>
              <p className="text-emerald-100 mt-1 text-sm">
                ID:{" "}
                <span className="font-mono bg-emerald-700/50 px-1.5 py-0.5 rounded">
                  {santri.id}
                </span>{" "}
                • Kelas: {santri.classroom} • NIS: {santri.nis}
              </p>
              <span className="inline-block mt-3 px-3 py-1 bg-emerald-500 text-xs font-semibold rounded-full border border-emerald-400 shadow-sm">
                Status: {santri.status}
              </span>
            </div>
          </div>
        </div>

        {/* Informasi Detail */}
        <div className="p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            Informasi Akademik & Asrama
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Kelas
              </p>
              <p className="text-slate-800 font-medium mt-1">
                {santri.classroom}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Penempatan Asrama
              </p>
              <p className="text-slate-800 font-medium mt-1">{santri.asrama}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Capaian Hafalan
              </p>
              <p className="text-slate-800 font-medium mt-1">
                {santri.hafalan}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Tahun Bergabung
              </p>
              <p className="text-slate-800 font-medium mt-1">{santri.gabung}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
            <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
              Edit Data
            </button>
            <button
              type="button"
              onClick={() => navigate(`/admin/santri/rapor/${santri.id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <FileText size={16} />
              <span>Lihat Rapor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SantriDetail;
