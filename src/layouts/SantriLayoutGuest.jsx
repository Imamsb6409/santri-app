import { NavLink, Outlet } from "react-router";

function SantriLayoutGuest() {
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-white text-emerald-700 shadow-sm font-semibold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
    }`;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans">
      <section className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        <div className="absolute w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-10">
          Anda berada di halaman tamu. Silahkan login untuk mengakses fitur
          manajemen santri.
        </div>
        <header className="flex flex-col gap-1 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-7 bg-emerald-600 rounded-full inline-block"></span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
              Manajemen Santri
            </h1>
          </div>
          <p className="text-sm text-slate-500 pl-5">
            Kelola data santri, nilai akademik, dan presensi harian secara
            terpadu.
          </p>
        </header>

        {/* Tab Navigation Menggunakan Path Relatif */}
        <nav className="inline-flex h-11 items-center justify-start rounded-xl bg-slate-200/70 p-1 text-slate-500 w-fit border border-slate-200">
          <NavLink to="list" className={navLinkClass}>
            Daftar Santri
          </NavLink>

          <NavLink to="nilai" className={navLinkClass}>
            Nilai
          </NavLink>

          <NavLink to="absensi" className={navLinkClass}>
            Absensi
          </NavLink>
        </nav>

        <main className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 min-h-100">
          <Outlet />
        </main>
      </section>
    </div>
  );
}

export default SantriLayoutGuest;

/**
 *
 */
