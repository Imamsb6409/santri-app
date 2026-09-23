import React, { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Building2,
  Lock,
  Eye,
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

function PengaturanGuest() {
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState("profil");

  // Menggunakan data dari global context
  const formData = settings || {
    namaPesantren: "-",
    pimpinanPesantren: "-",
    tahunAjaran: "-",
    emailAdmin: "-",
    notifPresensiAlpa: false,
    notifHafalan: false,
    autoBackup: false,
    frekuensiBackup: "Harian",
  };

  return (
    <div className="flex flex-col gap-6 font-sans pb-10 max-w-4xl mx-auto">
      {/* Banner Notice untuk Guest */}
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-2xl shadow-xs">
        <Lock size={18} className="text-amber-600 shrink-0" />
        <div className="text-xs">
          <span className="font-bold">Mode Akses Tamu (Read-Only): </span>
          Anda hanya dapat melihat pengaturan sistem saat ini. Perubahan data hanya dapat dilakukan oleh Admin.
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Settings className="text-emerald-600" size={24} />
            Pengaturan Sistem
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Informasi profil pesantren, notifikasi, dan keamanan sistem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 text-slate-600 font-medium text-xs rounded-xl border border-slate-200 select-none">
            <Eye size={15} className="text-slate-500" />
            <span>Akses Tamu</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Tabs */}
        <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab("profil")}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "profil"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Building2 size={16} />
            <span>Profil Pesantren</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifikasi")}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "notifikasi"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Bell size={16} />
            <span>Notifikasi & Alert</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("keamanan")}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "keamanan"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Shield size={16} />
            <span>Keamanan & Data</span>
          </button>
        </div>

        {/* Tab Panels */}
        <div className="md:col-span-2 space-y-6">
          {/* Tab Profil */}
          {activeTab === "profil" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building2 size={16} className="text-emerald-600" />
                Informasi Lembaga
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="namaPesantren"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Nama Pesantren / Lembaga
                  </label>
                  <input
                    id="namaPesantren"
                    type="text"
                    readOnly
                    value={formData.namaPesantren}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-not-allowed focus:outline-none select-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pimpinanPesantren"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Pimpinan / Pengasuh Pesantren
                  </label>
                  <input
                    id="pimpinanPesantren"
                    type="text"
                    readOnly
                    value={formData.pimpinanPesantren}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-not-allowed focus:outline-none select-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="tahunAjaran"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Tahun Ajaran Aktif
                    </label>
                    <input
                      id="tahunAjaran"
                      type="text"
                      readOnly
                      value={formData.tahunAjaran}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-not-allowed focus:outline-none select-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="emailAdmin"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Email Resmi Admin
                    </label>
                    <input
                      id="emailAdmin"
                      type="email"
                      readOnly
                      value={formData.emailAdmin}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-not-allowed focus:outline-none select-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Notifikasi */}
          {activeTab === "notifikasi" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Bell size={16} className="text-emerald-600" />
                Alert yang Tampil di Home
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Tampilkan Alert Presensi Alpa di Home
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Memberi pemberitahuan warna kuning di beranda
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    checked={Boolean(formData.notifPresensiAlpa)}
                    className="accent-emerald-600 h-4 w-4 cursor-not-allowed opacity-70"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Tampilkan Alert Target Tahfidz di Home
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Memberi pemberitahuan warna ungu di beranda
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    checked={Boolean(formData.notifHafalan)}
                    className="accent-emerald-600 h-4 w-4 cursor-not-allowed opacity-70"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Keamanan */}
          {activeTab === "keamanan" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Shield size={16} className="text-emerald-600" />
                Status Backup di Banner Home
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Tampilkan Badge Backup Otomatis
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Badge status backup akan terpasang di banner utama
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    checked={Boolean(formData.autoBackup)}
                    className="accent-emerald-600 h-4 w-4 cursor-not-allowed opacity-70"
                  />
                </div>

                <div>
                  <label
                    htmlFor="frekuensiBackup"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Frekuensi Backup
                  </label>
                  <select
                    id="frekuensiBackup"
                    disabled
                    value={formData.frekuensiBackup}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl cursor-not-allowed focus:outline-none select-none"
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PengaturanGuest;