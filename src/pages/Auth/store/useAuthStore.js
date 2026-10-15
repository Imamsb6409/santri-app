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
      clearError: () => set({ error: null }),

      // Fungsi Registrasi
      register: ({ name, email, password, role = "user" }) => {
        const currentUsers = get().users || MOCK_USERS;

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        const isExist = currentUsers.some(
          (u) => u.email.trim().toLowerCase() === cleanEmail
        );

        if (isExist) {
          set({ error: "Email sudah terdaftar!" });
          return false;
        }

        const newUser = {
          id: Date.now(),
          name: name.trim(),
          email: cleanEmail,
          password: cleanPassword,
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
        const currentUsers = get().users || MOCK_USERS;

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        const foundUser = currentUsers.find(
          (u) =>
            u.email.trim().toLowerCase() === cleanEmail &&
            u.password.trim() === cleanPassword
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
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        users: persistedState?.users?.length
          ? persistedState.users
          : currentState.users,
      }),
    }
  )
);

export default useAuthStore;