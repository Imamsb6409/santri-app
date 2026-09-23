import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_USERS } from "@/data/userData";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: MOCK_USERS, // Data default dari userData.js
      error: null,

      setUser: (user) => set({ user }),

      // Fungsi Registrasi
      register: ({ name, email, password, role = "user" }) => {
        // Pengaman: Jika users dari storage kosong/undefined, gunakan MOCK_USERS
        const currentUsers = get().users || MOCK_USERS;

        const isExist = currentUsers.some((u) => u.email === email);
        if (isExist) {
          set({ error: "Email sudah terdaftar!" });
          return false;
        }

        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          role,
        };

        set({
          users: [...currentUsers, newUser],
          error: null,
        });

        return true;
      },

      // Fungsi Login
      login: (email, password) => {
        // Pengaman: Jika users dari storage kosong/undefined, gunakan MOCK_USERS
        const currentUsers = get().users || MOCK_USERS;

        const foundUser = currentUsers.find(
          (u) => u.email === email && u.password === password,
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
          return true;
        } else {
          set({ user: null, error: "Email atau password salah" });
          return false;
        }
      },

      logout: () => set({ user: null, error: null }),
    }),
    {
      name: "auth-storage",
      // Penggabung otomatis state baru jika struktur storage berbeda
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        users: persistedState?.users?.length
          ? persistedState.users
          : currentState.users,
      }),
    },
  ),
);

export default useAuthStore;
