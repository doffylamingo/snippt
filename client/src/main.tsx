import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoadingFeed from "@/components/LoadingFeed";
import { ProtectedRoute } from "@/components/ProtectedRoute.tsx";
import { AuthProvider } from "@/context/AuthContext.tsx";
import { api } from "@/lib/api-client";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SettingsPage from "@/pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          const res = await api.spotify.recommendations.$post({
            json: {
              limit: 10,
              seed_artists: "5INjqkS1o8h1imAzPqGZBb,5n1xzqdY899CtBxeu88qHf",
              min_popularity: 80,
            },
          });
          return await res.json();
        },
        hydrateFallbackElement: <LoadingFeed />,
      },
      {
        element: <ProtectedRoute />,
        children: [{ path: "settings", element: <SettingsPage /> }],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
