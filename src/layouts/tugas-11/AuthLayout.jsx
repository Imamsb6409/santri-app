import React, { useEffect } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/pages/Auth/store/useAuthStore";
import { signUpSchema, signInSchema } from "../../schemas/RegisterSchema";

function AuthLayout() {
  const { type } = useParams();
  const navigate = useNavigate();

  const {
    register: registerAuth,
    login,
    error,
    user,
    clearError,
  } = useAuthStore();

  const isSignUp = type === "sign-up";

  // Pilih schema berdasarkan mode (Sign Up atau Sign In)
  const currentSchema = isSignUp ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Reset form & hapus pesan error saat berpindah mode
  useEffect(() => {
    reset({
      name: "",
      email: "",
      password: "",
    });
    if (clearError) clearError();
  }, [type, reset, clearError]);

  // Redirection jika user sudah login
  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/user" replace />;
  }

  const onSubmit = (data) => {
    if (isSignUp) {
      const success = registerAuth({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user",
      });

      if (success) {
        navigate("/auth/sign-in");
      }
    } else {
      const success = login(data.email, data.password);

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
      {/* Visual */}
      <div className="hidden h-screen w-1/2 md:block">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKgw-XLS0CK4GQN7YnFOEwy2f7RN-Hn3_cNmKPs9prQ&s=10"
          alt="Auth Visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="flex h-screen w-1/2 flex-col justify-center border-l border-gray-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
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

          {/* Alert Error Zustand */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Form Utama */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            {/* Input Nama (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label
                  htmlFor="input-name"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nama Lengkap
                </label>
                <input
                  id="input-name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
                />
                {errors.name && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
            )}

            {/* Input Email */}
            <div>
              <label
                htmlFor="input-email"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="input-email"
                type="email"
                placeholder="nama@email.com"
                {...register("email")}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Input Password */}
            <div>
              <label
                htmlFor="input-password"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="input-password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
              />
              {errors.password && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className={`mt-2 w-full rounded-lg py-2.5 text-sm font-medium transition ${
                isValid
                  ? "cursor-pointer bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-zinc-600"
              }`}
            >
              {isSignUp ? "Daftar Akun" : "Masuk"}
            </button>
          </form>

          {/* Switcher Navigasi */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link to="/">
              <button className="mb-3 cursor-pointer">
                masuk sebagai{" "}
                <span className="font-bold text-black underline dark:text-white">
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