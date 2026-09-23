import { create } from "zustand";
import { persist } from "zustand/middleware";

const MOCK_USERS = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: "123",
    name: "Budi",
    role: "admin",
  },
  {
    id: 2,
    email: "user@gmail.com",
    password: "123",
    name: "Siti",
    role: "user",
  },
];

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,

      setUser: (user) => set({ user }),

      login: (email, password) => {
        const foundUser = MOCK_USERS.find(
          (user) => user.email === email && user.password === password,
        );
        if (foundUser) {
          set({
            user: {
              id: foundUser.id,
              email: foundUser.email,
              name: foundUser.name,
              role: foundUser.role,
            },
            error: null,
          });
          return true; // Berhasil login
        } else {
          set({ user: null, error: "Email atau password salah" });
          return false; // Gagal login
        }
      },

      logout: () => set({ user: null, error: null }),
    }),
    {
      name: "auth-storage", // Key untuk menyimpan state di localStorage
    }
  )
);

export default useAuthStore;