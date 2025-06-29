import { Settings } from "lucide-react";
import { useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import spotifyLogo from "@/assets/spotify-logo.svg";
import ActionButton from "@/components/ActionButton";
import AlbumCover from "@/components/AlbumCover";
import ArtistProfile from "@/components/ArtistProfile";
import TrackCard from "@/components/TrackCard";
import useAutoPlay from "@/hooks/useAutoPlay";
import useTrackActions from "@/hooks/useTrackActions";
import useTrackAudio from "@/hooks/useTrackProgress";
import useVideoLoader from "@/hooks/useVideoLoader";
import type { Recommendations } from "@/types";

interface TrackProps {
  item: Recommendations;
  audioPlayer: ReturnType<
    typeof import("@/hooks/useAudioPlayer").useAudioPlayer
  >;
}

export default function FeedItem({ item, audioPlayer }: TrackProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const trackId = item.track.id;
  const progress = useTrackAudio(trackId, audioPlayer);
  useAutoPlay(inView, trackId, audioPlayer);
  const videoRef = useVideoLoader(
    trackId,
    item.track.canvas_url,
    inView,
    audioPlayer,
  );
  const { liked, isFollowing, handleTrackLike, handleFollowArtist } =
    useTrackActions(item);

  const handlePlayPause = useCallback(() => {
    audioPlayer.togglePlayPause(trackId);
  }, [audioPlayer, trackId]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-screen w-full snap-start overflow-hidden bg-[#0a0a0a] lg:max-w-lg"
    >
      {item.track.canvas_url && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          loop
          muted
          preload="auto"
          playsInline
        />
      )}

      <div className="absolute inset-0 z-10 flex flex-col px-3 py-6 md:px-5">
        <div className="mb-4 flex items-center justify-between">
          <ActionButton>
            <a
              href={`spotify:track:${trackId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={spotifyLogo}
                alt="spotify logo"
                className="h-9 w-9 invert"
              />
            </a>
          </ActionButton>
          <Link to="/settings">
            <ActionButton>
              <Settings size={18} />
            </ActionButton>
          </Link>
        </div>

        <div
          className="mb-6 flex min-h-0 flex-1 items-center justify-center"
          onClick={handlePlayPause}
        >
          {!item.track.canvas_url && (
            <AlbumCover
              src={item.album.cover}
              alt={item.album.name}
            />
          )}
        </div>

        <div className="space-y-3">
          <ArtistProfile
            artist={item.artist}
            isFollowing={isFollowing}
            handleFollowArtist={handleFollowArtist}
          />
          <TrackCard
            track={{
              id: trackId,
              name: item.track.name,
              albumId: item.album.id,
              artist: item.artist.name,
              artistId: item.artist.id,
            }}
            albumCover={item.album.cover}
            liked={liked}
            handleTrackLike={handleTrackLike}
          />
          <div className="w-full bg-white/15">
            <div
              className="rounded-full bg-white p-0.5 transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <audio
        ref={el => {
          if (el) {
            audioPlayer.audioRefs.current[trackId] = el;
          } else {
            delete audioPlayer.audioRefs.current[trackId];
          }
        }}
        loop
        src={item.track.preview_url}
      />
    </div>
  );
}
