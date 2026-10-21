import React, { useEffect } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
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

  // Variasi animasi untuk kemunculan bertahap (stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="flex min-h-screen items-center justify-between overflow-hidden bg-gray-50 dark:bg-zinc-900">
      {/* Gambar Visual dengan Animasi Zoom & Fade In */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden h-screen w-1/2 overflow-hidden md:block"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKgw-XLS0CK4GQN7YnFOEwy2f7RN-Hn3_cNmKPs9prQ&s=10"
          alt="Auth Visual"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Container Form dengan Animasi Slide & Fade */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex h-screen w-full flex-col justify-center border-l border-gray-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 md:w-1/2"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-md"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-6 text-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
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
          </motion.div>

          {/* Alert Error Zustand dengan Animasi Slide Down/Up */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 overflow-hidden rounded-lg bg-red-100 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Utama */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            {/* Input Nama (Sign Up Only dengan AnimatePresence) */}
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  key="input-name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
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
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 block text-xs text-red-500"
                    >
                      {errors.name.message}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Email */}
            <motion.div variants={itemVariants}>
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
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 block text-xs text-red-500"
                >
                  {errors.email.message}
                </motion.span>
              )}
            </motion.div>

            {/* Input Password */}
            <motion.div variants={itemVariants}>
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
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 block text-xs text-red-500"
                >
                  {errors.password.message}
                </motion.span>
              )}
            </motion.div>

            {/* Tombol Submit dengan Efek Feedback Hover & Tap */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={!isValid}
                whileHover={isValid ? { scale: 1.01 } : {}}
                whileTap={isValid ? { scale: 0.98 } : {}}
                className={`mt-2 w-full rounded-lg py-2.5 text-sm font-medium transition ${
                  isValid
                    ? "cursor-pointer bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-zinc-600"
                }`}
              >
                {isSignUp ? "Daftar Akun" : "Masuk"}
              </motion.button>
            </motion.div>
          </form>

          {/* Switcher Navigasi */}
          <motion.div
            variants={itemVariants}
            className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AuthLayout;