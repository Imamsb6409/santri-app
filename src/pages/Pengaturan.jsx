import React, { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Building2,
  Save,
  Check,
  Download,
  RotateCcw,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

function Pengaturan() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [activeTab, setActiveTab] = useState("profil");
  const [saved, setSaved] = useState(false);
  const [backupStatus, setBackupStatus] = useState("");

  // Local state form di-sync dengan global context
  const [formData, setFormData] = useState(settings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(formData); // Simpan ke Context & LocalStorage
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Balikin pengaturan ke default?")) {
      resetSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleDownloadBackup = () => {
    setBackupStatus("Mengunduh...");
    setTimeout(() => {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(formData, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `backup-santriapp-${new Date().toISOString().split("T")[0]}.json`,
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setBackupStatus("Selesai!");
      setTimeout(() => setBackupStatus(""), 2500);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8 font-sans pb-10 max-w-4xl mx-auto">
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500 animate-bounce">
          <CheckCircle2 size={18} />
          <span className="text-xs font-semibold">
            Pengaturan berhasil disimpan & diterapkan ke Home!
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Settings className="text-emerald-600" size={24} />
            Pengaturan Sistem
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ubah nama pesantren, tahun ajaran, dan notifikasi yang muncul di
            Home.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            {saved ? <Check size={16} /> : <Save size={16} />}
            <span>{saved ? "Tersimpan!" : "Simpan Perubahan"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="md:col-span-2 space-y-6">
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
                    name="namaPesantren"
                    value={formData.namaPesantren}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                    name="pimpinanPesantren"
                    value={formData.pimpinanPesantren}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                      name="tahunAjaran"
                      value={formData.tahunAjaran}
                      onChange={handleChange}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
                      name="emailAdmin"
                      value={formData.emailAdmin}
                      onChange={handleChange}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    name="notifPresensiAlpa"
                    checked={formData.notifPresensiAlpa}
                    onChange={handleChange}
                    className="accent-emerald-600 h-4 w-4 cursor-pointer"
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
                    name="notifHafalan"
                    checked={formData.notifHafalan}
                    onChange={handleChange}
                    className="accent-emerald-600 h-4 w-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "keamanan" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Shield size={16} className="text-emerald-600" />
                Status Backup di Banner Home
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
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
                    name="autoBackup"
                    checked={formData.autoBackup}
                    onChange={handleChange}
                    className="accent-emerald-600 h-4 w-4 cursor-pointer"
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
                    name="frekuensiBackup"
                    value={formData.frekuensiBackup}
                    onChange={handleChange}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-xl transition-all cursor-pointer"
                  >
                    <Download size={15} />
                    <span>
                      {backupStatus
                        ? backupStatus
                        : "Unduh File Backup (.JSON)"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pengaturan;
