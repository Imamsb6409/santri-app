import React, { createContext, useContext, useState } from "react";

const defaultSettings = {
  namaPesantren: "Pesantren Imam Al-Bachtiary",
  pimpinanPesantren: "KH. Imam Sandy Bachtiar, M.Ag",
  tahunAjaran: "2025/2026",
  emailAdmin: "admin@santri.id",
  telepon: "+62 812-3456-7890",
  notifEmail: true,
  notifWa: true,
  notifPresensiAlpa: true,
  notifHafalan: true,
  autoBackup: true,
  frekuensiBackup: "Harian",
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("santri_app_settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("santri_app_settings", JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem(
      "santri_app_settings",
      JSON.stringify(defaultSettings),
    );
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
