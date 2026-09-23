import React, { useState } from "react";
import {
  GraduationCap,
  ShieldCheck,
  Zap,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  Code2,
  Heart,
  Globe,
} from "lucide-react";

// Simulasi Data FAQ
const faqs = [
  {
    question: "Bagaimana cara menambahkan data santri baru?",
    answer:
      "Data santri dapat ditambahkan melalui halaman 'Daftar Santri' dengan menekan tombol 'Tambah Santri' di sudut kanan atas.",
  },
  {
    question: "Apakah data absensi terintegrasi secara real-time?",
    answer:
      "Ya, semua input absensi dan rekapitulasi nilai akan langsung memperbarui grafik statistik di halaman utama secara otomatis.",
  },
  {
    question: "Apakah sistem ini dapat diakses melalui perangkat mobile?",
    answer:
      "SantriApp dirancang dengan pendekatan *responsive web design* sehingga nyaman digunakan di HP, tablet, maupun desktop.",
  },
];

function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-10 font-sans pb-10 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center flex flex-col items-center gap-4 py-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
          <GraduationCap size={36} />
        </div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <span>Versi 2.4.0 (Rilis 2026)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight max-w-2xl">
          Digitalisasi Manajemen Pesantren Modern & Terpadu
        </h1>
        
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          SantriApp hadir untuk membantu pengurus dan ustadz dalam mengelola data akademik, capaian hafalan Al-Qur'an, serta presensi santri secara efisien.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-3 hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Users size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-800">Manajemen Santri</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Penyimpanan database santri lengkap mencakup nomor induk (NIS), wali santri, hingga penempatan kamar asrama.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-3 hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Award size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-800">Evaluasi Akademik</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Rekapitulasi nilai ujian kitab, kelulusan, serta kriteria predikat santri terekam secara otomatis.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-3 hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <BookOpen size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-800">Monitoring Tahfidz</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pencatatan perkembangan setoran juz dan hafalan Al-Qur'an harian santri secara transparan.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section (Radix-Style Pattern) */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Pertanyaan Umum (FAQ)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Informasi umum seputar penggunaan dan fitur sistem SantriApp.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-sm font-semibold text-slate-800">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-200 ${
                    openFaq === index ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>
              
              {openFaq === index && (
                <div className="px-5 pb-4 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack & System Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
            <Code2 size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Teknologi yang Digunakan</h4>
            <p className="text-xs text-slate-500">
              React 19, React Router v7, Tailwind CSS & Radix UI / Shadcn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
            <ShieldCheck size={14} className="text-emerald-600" />
            Keamanan Data Terjaga
          </span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-4">
        <span>Dikembangkan dengan</span>
        <Heart size={14} className="text-rose-500 fill-rose-500" />
        <span>untuk Kemajuan Pesantren Indonesia</span>
      </div>
    </div>
  );
}

export default About;