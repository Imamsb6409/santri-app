import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Pengaturan from "./pages/Pengaturan";
import AppLayout from "./layouts/AppLayout";
import SantriLayout from "./layouts/SantriLayout";
import SantriList from "./pages/Santri/SantriList";
import SantriNilai from "./pages/Santri/SantriNilai";
import SantriAbsensi from "./pages/Santri/SantriAbsensi";
import SantriDetail from "./pages/Santri/SantriDetail";
import Raport from "./pages/Santri/Raport";
import AuthLayout from "./layouts/tugas-11/AuthLayout";
import SantriLayoutGuest from "./layouts/SantriLayoutGuest";
import HomeGuest from "./pages/HomeGuest";
import PengaturanGuest from "./pages/PengaturanGuest";

const router = createBrowserRouter([
  // Guest Routes
  {
    path: "/",
    element: <AppLayout role="guest" />,
    children: [
      {
        index: true,
        element: <HomeGuest />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pengaturan-guest",
        element: <PengaturanGuest />,
      },
      {
        path: "santri-guest",
        element: <SantriLayoutGuest />,
        children: [
          {
            index: true,
            element: <SantriList />,
          },
          {
            path: "list",
            children: [
              {
                index: true,
                element: <SantriList />,
              },
              {
                path: ":santri_id",
                element: <SantriDetail />,
              },
            ],
          },
          {
            path: "rapor/:santri_id",
            element: <Raport />,
          },
          {
            path: "nilai",
            element: <SantriNilai />,
          },
          {
            path: "absensi",
            element: <SantriAbsensi />,
          },
        ],
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AppLayout role="admin" />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "santri",
        element: <SantriLayout />,
        children: [
          {
            index: true,
            element: <SantriList />,
          },
          {
            path: "list",
            children: [
              {
                index: true,
                element: <SantriList />,
              },
              {
                path: ":santri_id",
                element: <SantriDetail />,
              },
            ],
          },
          {
            path: "rapor/:santri_id",
            element: <Raport />,
          },
          {
            path: "nilai",
            element: <SantriNilai />,
          },
          {
            path: "absensi",
            element: <SantriAbsensi />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pengaturan",
        element: <Pengaturan />,
      },
    ],
  },

  // User Routes
  {
    path: "/user",
    element: (
      <AppLayout
        role="user"
        customUser={{
          name: "Ustadz Abdullah",
          avatar: "UA",
          title: "Pengajar Hafalan",
        }}
      />
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "santri",
        element: <SantriLayout />,
        children: [
          {
            index: true,
            element: <SantriList />,
          },
          {
            path: "list",
            children: [
              {
                index: true,
                element: <SantriList />,
              },
              {
                path: ":santri_id",
                element: <SantriDetail />,
              },
            ],
          },
          {
            path: "rapor/:santri_id",
            element: <Raport />,
          },
          {
            path: "nilai",
            element: <SantriNilai />,
          },
          {
            path: "absensi",
            element: <SantriAbsensi />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pengaturan-guest",
        element: <PengaturanGuest />,
      },
    ],
  },

  // Auth & Redirects
  {
    path: "/auth/:type",
    element: <AuthLayout />,
  },
  {
    path: "/sign-in",
    element: <Navigate to="/auth/sign-in" replace />,
  },
]);

export default router;