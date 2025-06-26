import type { PlaylistItem } from "@shared/types/spotify";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";

function LoginWithSpotify() {
  const handle = async () =>
    await authClient.signIn.social({ provider: "spotify" });

  return (
    <button
      onClick={handle}
      type="button"
    >
      Login with Spotify
    </button>
  );
}

function Logout() {
  const handle = async () => await authClient.signOut();

  return (
    <button
      onClick={handle}
      type="button"
    >
      Logout
    </button>
  );
}

function App() {
  const { data: session, isPending } = authClient.useSession();
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await api.spotify.playlists.$get({ query: {} });
      const data = await res.json();
      setPlaylists(data.items);
    };

    if (session) {
      fetchPlaylists();
    }
  }, [session]);

  if (isPending) return <div>Loading...</div>;
  if (!session) return <LoginWithSpotify />;

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {playlists.map(playlist => (
          <div key={playlist.id}>
            <h3>{playlist.name}</h3>
            {playlist.images ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                width="100"
              />
            ) : (
              <div>No image</div>
            )}
          </div>
        ))}
      </div>
      {session.user.name}
      <div>
        <Logout />
      </div>
    </div>
  );
}

export default App;
