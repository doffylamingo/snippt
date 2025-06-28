import { Navigate } from "react-router";
import Spotify from "@/assets/spotify-logo.svg";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const { user } = useAuth();

  if (user)
    return (
      <Navigate
        to="/"
        replace
      />
    );

  const handleLogin = async () =>
    await authClient.signIn.social({ provider: "spotify" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-semibold text-2xl">Welcome to Snippt!</h1>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/10 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-white/20"
          onClick={handleLogin}
        >
          <img
            src={Spotify}
            alt="Spotify logo"
            className="h-5 w-5 invert"
          />
          Continue with Spotify
        </button>
      </div>
    </div>
  );
}
