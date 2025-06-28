import { cn } from "@/lib/utils";
import type { Artist } from "@/types";

interface ArtistProfileProps {
  artist: Artist;
  isFollowing: boolean;
  handleFollowArtist: () => void;
}

export default function ArtistProfile({
  artist,
  isFollowing,
  handleFollowArtist,
}: ArtistProfileProps) {
  return (
    <div className="flex items-center justify-between">
      <a
        href={`spotify:artist:${artist.id}`}
        target="_blank"
        className="flex min-w-0 items-center space-x-3"
      >
        <div className="relative flex-shrink-0">
          <img
            src={artist.image}
            alt={artist.name}
            className="h-10 w-10 rounded-full border border-white/20"
          />
        </div>
        <div className="min-w-0 flex-1 text-white">
          <div className="truncate font-semibold text-sm text-white/90">
            {artist.name}
          </div>
          <div className="truncate text-white/60 text-xs">
            {artist.followers ?? "–"} followers
          </div>
        </div>
      </a>
      <button
        type="button"
        aria-pressed={isFollowing}
        className={cn(
          "ml-3 flex-shrink-0 rounded-full border px-4 py-1.5 font-medium text-xs backdrop-blur-sm transition-all duration-200",
          isFollowing
            ? "bg-white text-black hover:cursor-pointer hover:bg-white/70"
            : "border-white/20 bg-white/15 text-white/90 hover:bg-white/25",
        )}
        onClick={handleFollowArtist}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}
