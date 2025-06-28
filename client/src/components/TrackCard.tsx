import { Heart, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ActionButton from "@/components/ActionButton";

interface TrackCardProps {
  track: {
    id: string;
    name: string;
    albumId: string;
    artist: string;
    artistId: string;
  };
  albumCover: string;
  liked: boolean;
  handleTrackLike: () => void;
}

export default function TrackCard({
  track,
  albumCover,
  liked,
  handleTrackLike,
}: TrackCardProps) {
  const trackNameRef = useRef<HTMLDivElement>(null);
  const artistNameRef = useRef<HTMLDivElement>(null);
  const [isTrackNameTruncated, setIsTrackNameTruncated] = useState(false);
  const [isArtistNameTruncated, setIsArtistNameTruncated] = useState(false);

  useEffect(() => {
    const checkIfTruncated = () => {
      if (trackNameRef.current) {
        setIsTrackNameTruncated(
          trackNameRef.current.scrollWidth > trackNameRef.current.clientWidth,
        );
      }
      if (artistNameRef.current) {
        setIsArtistNameTruncated(
          artistNameRef.current.scrollWidth > artistNameRef.current.clientWidth,
        );
      }
    };

    checkIfTruncated();
    window.addEventListener("resize", checkIfTruncated);

    return () => {
      window.removeEventListener("resize", checkIfTruncated);
    };
  }, []);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur-sm">
      <div className="flex min-w-0 flex-1 items-center space-x-3">
        <a
          href={`spotify:album:${track.albumId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative flex-shrink-0">
            <img
              src={albumCover}
              alt="album cover"
              className="h-12 w-12 rounded-xl border border-white/20"
            />
          </div>
        </a>
        <div className="min-w-0 flex-1 text-white">
          <a
            href={`spotify:track:${track.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              ref={trackNameRef}
              className={`font-semibold text-sm text-white/90 ${
                isTrackNameTruncated ? "whitespace-nowrap" : "truncate"
              }`}
            >
              {isTrackNameTruncated ? (
                <div className="w-full overflow-hidden">
                  <div className="marquee-content inline-block animate-marquee whitespace-nowrap">
                    {track.name}&nbsp;&nbsp;&nbsp;&nbsp;{track.name}
                  </div>
                </div>
              ) : (
                track.name
              )}
            </div>
          </a>
          <a
            href={`spotify:artist:${track.artistId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              ref={artistNameRef}
              className={`text-white/60 text-xs ${
                isArtistNameTruncated ? "whitespace-nowrap" : "truncate"
              }`}
            >
              {isArtistNameTruncated ? (
                <div className="w-full overflow-hidden">
                  <div className="marquee-content inline-block animate-marquee whitespace-nowrap">
                    {track.artist}&nbsp;&nbsp;&nbsp;&nbsp;{track.artist}
                  </div>
                </div>
              ) : (
                track.artist
              )}
            </div>
          </a>
        </div>
      </div>
      <div className="ml-3 flex flex-shrink-0 items-center space-x-2">
        <ActionButton
          className="h-8 w-8"
          onClick={handleTrackLike}
        >
          <Heart
            size={14}
            fill={liked ? "red" : "none"}
            stroke={liked ? "red" : "currentColor"}
          />
        </ActionButton>
        <ActionButton className="h-8 w-8">
          <Plus size={14} />
        </ActionButton>
      </div>
    </div>
  );
}
