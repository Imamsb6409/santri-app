import { Link } from "react-router";

function SantriCard({ id, name, classroom }) {
  // Ambil inisial dari nama santri
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <Link
      to={`${id}`}
      className="group relative flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Avatar Inisial */}
      <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 font-bold text-base flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        {initial}
      </div>

      {/* Informasi Santri */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>
        <div className="mt-1 flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Kelas {classroom}
          </span>
        </div>
      </div>

      {/* Ikon Panah (Indikator Detail) */}
      <div className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}

export default SantriCard;