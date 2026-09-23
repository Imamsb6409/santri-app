import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/SidebarUser";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet } from "react-router";
import { SettingsProvider } from "@/context/SettingsContext";

function AppLayoutUser() {
  return (
    <SettingsProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset>
            <Navbar
              role="user"
              customUser={{
                name: "Ustadz Abdullah",
                avatar: "UA",
                title: "Pengajar Hafalan",
              }}
            />

            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </SettingsProvider>
  );
}

export default AppLayoutUser;
