import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { SidebarTrigger } from "./ui/sidebar";
import {
  Search,
  Bell,
  Settings,
  LogOut,
  X,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { santriList } from "@/data/santriData";
import { useSettings } from "@/context/SettingsContext";
import useAuthStore from "@/pages/Auth/store/useAuthStore";

// Konfigurasi dinamis berdasarkan Role
const ROLE_CONFIG = {
  guest: {
    homePath: "/",
    avatar: "G",
    name: "Guest",
    title: "Pengurus Pesantren",
    settingsPath: "/pengaturan-guest",
    aboutPath: "/about",
    shortcuts: [
      { label: "Daftar Santri", path: "santri/list" },
      { label: "Rekap Nilai", path: "/santri/nilai" },
      { label: "Presensi Santri", path: "/santri/absensi" },
      { label: "Pengaturan", path: "/pengaturan" },
    ],
  },
  user: {
    homePath: "/user",
    avatar: "U",
    name: "User",
    title: "Pengguna Aplikasi",
    settingsPath: "pengaturan-guest",
    aboutPath: "about",
    shortcuts: [
      { label: "Daftar Santri", path: "santri/list" },
      { label: "Rekap Nilai", path: "santri/nilai" },
      { label: "Presensi Santri", path: "santri/absensi" },
      { label: "Pengaturan", path: "pengaturan-guest" },
    ],
  },
  admin: {
    homePath: "/admin",
    avatar: "A",
    name: "Admin",
    title: "Administrator",
    settingsPath: "pengaturan",
    aboutPath: "about",
    shortcuts: [
      { label: "Daftar Santri", path: "santri/list" },
      { label: "Rekap Nilai", path: "santri/nilai" },
      { label: "Presensi Santri", path: "santri/absensi" },
      { label: "Pengaturan", path: "pengaturan" },
    ],
  },
};

function Navbar({ role = "guest", customUser, onLogout }) {
  const { settings } = useSettings();
  const navigate = useNavigate();

  // Memilih konfigurasi role (fallback ke 'guest' jika role tidak ditemukan)
  const currentRole = ROLE_CONFIG[role] || ROLE_CONFIG.guest;

  // Profil pengguna
  const userDisplay = {
    name: customUser?.name || currentRole.name,
    avatar: customUser?.avatar || currentRole.avatar,
    title: customUser?.title || currentRole.title,
  };

  // State Management
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Data Notifikasi Dummy
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Setoran Hafalan",
      desc: "Santri Ahmad Zaki menyelesaikan Juz 15",
      time: "10m yang lalu",
      unread: true,
      type: "success",
    },
    {
      id: 2,
      title: "Presensi Harian",
      desc: "3 santri tercatat Alpa hari ini",
      time: "1j yang lalu",
      unread: true,
      type: "alert",
    },
    {
      id: 3,
      title: "Pengumuman Pesantren",
      desc: "Jadwal evaluasi bulanan diperbarui",
      time: "3j yang lalu",
      unread: false,
      type: "info",
    },
  ]);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Shortcut Keyboard (Cmd+K / Ctrl+K & ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Hasil Pencarian
  const filteredSantri = searchQuery.trim()
    ? santriList.filter(
        (s) =>
          s.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.nis?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.classroom?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllNotifRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSearchOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
    setSearchQuery("");
  };

  const logout = useAuthStore((state) => state.logout);


  const handleLogoutClick = () => {
    logout(); // 1. Hapus data user dari Zustand & localStorage
    navigate("/auth/sign-in", { replace: true }); // 2. Pindahkan ke halaman sign-in
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md transition-all sm:px-6">
        {/* Sisi Kiri: Sidebar & Logo Brand */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors cursor-pointer" />
          <div className="h-4 w-px bg-slate-200" />

          <Link
            to={currentRole.homePath}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white text-xs shadow-xs group-hover:bg-emerald-700 transition-colors">
              ISB
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-800">
              Isaba<span className="text-emerald-600">ntri</span>
            </span>
          </Link>
        </div>

        {/* Sisi Kanan: Search, Notifikasi, & Profil */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-1.5 text-xs text-slate-400 border border-slate-200/60 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Cari santri atau kelas...</span>
            <kbd className="rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Popover Notifikasi */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setNotifOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              aria-label="Lihat notifikasi"
              className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </button>

            {/* Dropdown Notifikasi */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between p-3.5 border-b border-slate-100 bg-slate-50/50">
                  <span className="text-xs font-bold text-slate-800">
                    Notifikasi
                  </span>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllNotifRead}
                      className="text-[11px] font-medium text-emerald-600 hover:underline cursor-pointer"
                    >
                      Tandai dibaca
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 text-xs flex gap-3 transition-colors ${
                        item.unread ? "bg-emerald-50/30" : "hover:bg-slate-50"
                      }`}
                    >
                      {item.type === "success" && (
                        <CheckCircle2
                          size={16}
                          className="text-emerald-600 shrink-0 mt-0.5"
                        />
                      )}
                      {item.type === "alert" && (
                        <AlertCircle
                          size={16}
                          className="text-amber-500 shrink-0 mt-0.5"
                        />
                      )}
                      {item.type === "info" && (
                        <FileText
                          size={16}
                          className="text-blue-500 shrink-0 mt-0.5"
                        />
                      )}
                      <div className="flex-1 space-y-0.5">
                        <p className="font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          {item.desc}
                        </p>
                        <p className="text-slate-400 text-[10px]">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Popover Profil Pengguna */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2.5 cursor-pointer pl-1 hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-xs font-bold text-emerald-800">
                {userDisplay.avatar}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  {userDisplay.name}
                </span>
              </div>
            </button>

            {/* Dropdown Menu Profil */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 overflow-hidden p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2.5 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-800">
                    {userDisplay.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {settings?.namaPesantren || "Pesantren App"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleNavigate(currentRole.settingsPath)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <Settings size={15} className="text-slate-500" />
                  <span>Pengaturan Sistem</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate(currentRole.aboutPath)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <GraduationCap size={15} className="text-slate-500" />
                  <span>Tentang Aplikasi</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal Quick Search (Cmd + K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Input Bar */}
            <div className="flex items-center px-4 border-b border-slate-100">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama santri, NIS, atau halaman..."
                className="w-full px-3 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* List Hasil Pencarian / Pintasan */}
            <div className="p-2 max-h-80 overflow-y-auto divide-y divide-slate-50">
              {searchQuery.trim() === "" ? (
                <div className="p-4 space-y-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Pintasan Halaman
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {currentRole.shortcuts.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleNavigate(item.path)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-xs text-slate-700 text-left cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={14} className="text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredSantri.length > 0 ? (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                    Hasil Santri ({filteredSantri.length})
                  </p>
                  {filteredSantri.map((santri) => (
                    <div
                      key={santri.id}
                      onClick={() =>
                        handleNavigate(`/santri/list/${santri.id}`)
                      }
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {santri.nama}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          NIS: {santri.nis} • Kelas {santri.classroom}
                        </p>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {santri.hafalan}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  Tidak ada santri yang cocok dengan "
                  <span className="font-semibold">{searchQuery}</span>"
                </div>
              )}
            </div>

            {/* Footer Modal */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
              <span>
                Tekan{" "}
                <kbd className="px-1 py-0.5 bg-white border rounded">ESC</kbd>{" "}
                untuk menutup
              </span>
              <span>SantriApp v2.4</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
