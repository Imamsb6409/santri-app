import React from "react";
import { Link } from "react-router";
import {
  Users,
  BookOpen,
  Award,
  CalendarCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BellRing,
  ShieldCheck,
} from "lucide-react";
import { santriList } from "@/data/santriData";
import { useSettings } from "@/context/SettingsContext";

function Home() {
  const { settings } = useSettings();
  const totalSantri = santriList.length;

  const totalPersentase = santriList.reduce((acc, santri) => {
    const { hadir = 0, izin = 0, sakit = 0, alpa = 0 } = santri.absensi || {};
    const total = hadir + izin + sakit + alpa || 1;
    return acc + (hadir / total) * 100;
  }, 0);
  const avgAbsensi = Math.round(totalPersentase / (totalSantri || 1));

  const allNilai = santriList.flatMap((s) => s.nilai || []);
  const avgNilai = (
    allNilai.reduce((acc, curr) => acc + curr.nilai, 0) / (allNilai.length || 1)
  ).toFixed(1);

  const recentSantri = santriList.slice(0, 3);

  return (
    <div className="flex flex-col gap-8 font-sans pb-8">
      {/* Welcome Banner - Dinamis dari Pengaturan */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-medium border border-white/10">
                <Sparkles size={14} className="text-amber-300" />
                <span>TA {settings.tahunAjaran}</span>
              </span>

              {/* Badge Backup - Berubah sesuai toggle Pengaturan */}
              {settings.autoBackup && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/40 text-emerald-300 text-[11px] font-medium border border-emerald-400/20">
                  <ShieldCheck size={13} />
                  <span>Backup {settings.frekuensiBackup}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {settings.namaPesantren}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Pengasuh:{" "}
              <span className="font-semibold">
                {settings.pimpinanPesantren}
              </span>{" "}
              • Contact: {settings.emailAdmin}
            </p>
          </div>

          <Link
            to="santri"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0 active:scale-95"
          >
            <Plus size={16} />
            <span>Kelola Santri</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Alerts Banner - Muncul cuma kalau diaktifkan di Pengaturan */}
      {(settings.notifPresensiAlpa || settings.notifHafalan) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {settings.notifPresensiAlpa && (
            <div className="flex-1 bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle
                size={18}
                className="text-amber-600 shrink-0 mt-0.5"
              />
              <div>
                <p className="text-xs font-bold">Alert Presensi Aktif</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Notifikasi WA otomatis dikirim jika ada santri yang alpa pekan
                  ini.
                </p>
              </div>
            </div>
          )}

          {settings.notifHafalan && (
            <div className="flex-1 bg-purple-50 border border-purple-200 text-purple-900 p-4 rounded-2xl flex items-start gap-3">
              <BellRing size={18} className="text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold">Monitoring Tahfidz Aktif</p>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Sistem menandai santri yang belum mencapai target juz bulan
                  ini.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">
              Total Santri
            </span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-800">
              {totalSantri}
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} className="mr-1" /> Aktif
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">
              Rata-rata Kehadiran
            </span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-800">
              {avgAbsensi}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Bulan Ini
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">
              Rata-rata Nilai
            </span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Award size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-800">
              {avgNilai}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Skala 100
            </span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">
              Target Tahfidz
            </span>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-800">
              30 Juz
            </span>
            <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
              On Track
            </span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Santri Terbaru
                </h3>
                <p className="text-xs text-slate-400">
                  Daftar santri aktif di {settings.namaPesantren}
                </p>
              </div>
              <Link
                to="santri"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentSantri.map((santri) => (
                <div
                  key={santri.id}
                  className="py-3 flex items-center justify-between hover:bg-slate-50/60 rounded-xl px-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                      {santri.nama.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">
                        {santri.nama}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Kelas {santri.classroom} • NIS: {santri.nis}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      {santri.hafalan}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              Navigasi Cepat
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="santri/list"
                className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-all group"
              >
                <Users
                  size={18}
                  className="text-slate-500 group-hover:text-emerald-600 mb-2"
                />
                <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                  Daftar Santri
                </p>
              </Link>
              <Link
                to="santri/nilai"
                className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-all group"
              >
                <Award
                  size={18}
                  className="text-slate-500 group-hover:text-emerald-600 mb-2"
                />
                <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                  Rekap Nilai
                </p>
              </Link>
            </div>
          </div>

          <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 text-emerald-300 mb-2">
              <CheckCircle2 size={16} />
              <span className="text-xs font-bold uppercase">
                Catatan Pengurus
              </span>
            </div>
            <h4 className="text-sm font-bold">Setoran Tahfidz Pekan Ini</h4>
            <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
              Laporan otomatis akan dikirim ke{" "}
              <span className="underline">{settings.emailAdmin}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
