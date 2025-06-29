import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute.tsx";
import { AuthProvider } from "@/context/AuthContext.tsx";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SettingsPage from "@/pages/SettingsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
