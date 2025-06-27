import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-green-500 border-b-2" />
      </div>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}
