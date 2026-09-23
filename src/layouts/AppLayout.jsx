import React from "react";
import { Navigate, Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/Sidebar"; // Sesuaikan path file AppSidebar kamu
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/context/SettingsContext";
import useAuthStore from "@/pages/Auth/store/useAuthStore";

function AppLayout({ role = "guest", customUser }) {
  const user = useAuthStore((state) => state.user);

  // Guard untuk rute Admin
  if (role === "admin") {
    if (!user) return <Navigate to="/auth/sign-in" replace />;
    if (user.role !== "admin") return <Navigate to="/user" replace />;
  }

  // Guard untuk rute User
  if (role === "user") {
    if (!user) return <Navigate to="/auth/sign-in" replace />;
    if (user.role !== "user") return <Navigate to="/admin" replace />;
  }

  const mainClass = role === "guest" ? "flex-1" : "flex-1 p-6";

  return (
    <SettingsProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar role={role} />

          <SidebarInset>
            <Navbar role={role} customUser={customUser} />

            <main className={mainClass}>
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </SettingsProvider>
  );
}

export default AppLayout;