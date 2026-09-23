import { NavLink } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "./ui/sidebar";
import {
  GraduationCap,
  Home,
  Info,
  Users,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { santriList } from "@/data/santriData";

const mainNav = [
  { to: "/user", label: "Beranda", icon: Home, end: true },
  {
    to: "/user/santri",
    label: "Data Santri",
    icon: Users,
    badge: santriList.length,
  },
];

const secondaryNav = [
  { to: "/user/about", label: "Tentang Aplikasi", icon: Info },
  { to: "/user/pengaturan-guest", label: "Pengaturan", icon: Settings },
];

function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      {/* App Header */}
      <SidebarHeader className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/20 shrink-0">
            <GraduationCap size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-slate-800 tracking-tight truncate">
                Santri<span className="text-emerald-600">App</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
                PRO
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium truncate">
              Sistem Sistem Pesantren
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="px-2 py-4 gap-6">
        {/* Navigasi Utama */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-3 mb-1">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink to={item.to} end={item.end} className="w-full">
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 font-semibold shadow-xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            size={18}
                            className={
                              isActive ? "text-emerald-600" : "text-slate-400"
                            }
                          />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              isActive
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System & About */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-3 mb-1">
            Sistem
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink to={item.to} className="w-full">
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={
                            isActive ? "text-emerald-600" : "text-slate-400"
                          }
                        />
                        <span className="text-sm">{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer / User Mini Profile */}
      <SidebarFooter className="p-3 border-t border-slate-100">
        <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-800 truncate">
                User
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                Masuk sebagai user
              </span>
            </div>
          </div>
          <button
            type="button"
            title="Keluar"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
