import React, { useState } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/pages/Auth/store/useAuthStore";

function AuthLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { type } = useParams();
  const navigate = useNavigate();

  // Ambil register, login, error, dan user dari Zustand store
  const { register, login, error, user } = useAuthStore();

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/user" replace />;
  }

  const isSignUp = type === "sign-up";

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email");
    const passwordInput = formData.get("password");
    const nameInput = formData.get("name");

    if (isSignUp) {
      // Jalankan fungsi pendaftaran
      const success = register({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        role: "user", // Default akun pendaftaran baru sebagai 'user'
      });

      if (success) {
        navigate("/auth/sign-in");
      }
    } else {
      const success = login(emailInput, passwordInput);

      if (success) {
        const currentUser = useAuthStore.getState().user;

        if (currentUser?.role === "admin") {
          navigate("/admin");
        } else if (currentUser?.role === "user") {
          navigate("/user");
        }
      }
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-between bg-gray-50 dark:bg-zinc-900">
      {/* Sisi Kiri - Hero / Visual */}
      <div className="w-1/2 h-screen hidden md:block">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKgw-XLS0CK4GQN7YnFOEwy2f7RN-Hn3_cNmKPs9prQ&s=10"
          alt="Auth Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sisi Kanan - Form Container */}
      <div className="w-1/2 h-screen flex flex-col justify-center p-8 bg-white dark:bg-zinc-950 border-l border-gray-200 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-md">
          {/* Header & Logo */}
          <div className="mb-6 text-center">
            <img
              src="/favicon.jpg"
              alt="Sign Logo"
              className="mx-auto mb-3 h-10 w-auto"
            />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {isSignUp ? "Buat Akun Baru" : "Selamat Datang Kembali"}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isSignUp
                ? "Daftar sekarang untuk memulai akses ke platform."
                : "Masukkan kredensial Anda untuk masuk ke akun."}
            </p>
          </div>

          {/* Menampilkan Pesan Error dari Zustand jika ada */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            {isSignUp && (
              <Field>
                <FieldLabel htmlFor="input-name">Nama Lengkap</FieldLabel>
                <Input
                  id="input-name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="input-email">Email</FieldLabel>
              <Input
                id="input-email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="input-password">Password</FieldLabel>
              <Input
                id="input-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </Field>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer"
            >
              {isSignUp ? "Daftar Akun" : "Masuk"}
            </button>
          </form>

          {/* Navigasi Switcher Antara Sign In & Sign Up */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link to="/">
              <button className="mb-3 cursor-pointer">
                masuk sebagai{" "}
                <span className="font-bold underline text-black dark:text-white">
                  tamu
                </span>
              </button>
            </Link>
            {isSignUp ? (
              <p>
                Sudah punya akun?{" "}
                <Link
                  to="/auth/sign-in"
                  className="font-semibold text-black underline dark:text-white"
                >
                  Sign In
                </Link>
              </p>
            ) : (
              <p>
                Belum punya akun?{" "}
                <Link
                  to="/auth/sign-up"
                  className="font-semibold text-black underline dark:text-white"
                >
                  Sign Up
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;