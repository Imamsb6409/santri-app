import Navbar from "@/components/Navbar";

import AppSidebar from "@/components/SidebarGuest";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/context/SettingsContext";
import React from "react";
import { NavLink, Outlet } from "react-router";
import { useState } from "react";

function AppLayoutGuest() {
  return (
    <div>
      <SettingsProvider>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
              <Navbar role="guest" />

              <main className="flex-1">
                <Outlet />
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </SettingsProvider>
    </div>
  );
}

export default AppLayoutGuest;
