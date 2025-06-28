import { Settings } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import spotifyLogo from "@/assets/spotify-logo.svg";
import ActionButton from "@/components/ActionButton";
import AlbumCover from "@/components/AlbumCover";
import ArtistProfile from "@/components/ArtistProfile";
import TrackCard from "@/components/TrackCard";
import { api } from "@/lib/api-client";
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
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(item.liked);
  const [isFollowing, setIsFollowing] = useState(item.isFollowing);

  useEffect(() => {
    if (!audioPlayer.hasInteracted) return;

    if (
      inView &&
      audioPlayer.playingTrack !== trackId &&
      audioPlayer.shouldAutoPlay(trackId)
    ) {
      audioPlayer.playTrack(trackId);
    } else if (!inView) {
      audioPlayer.handlePlayPause(trackId);
    }
  }, [inView, audioPlayer, trackId]);

  useEffect(() => {
    const audioElement = audioPlayer.audioRefs.current[trackId];
    if (!audioElement) return;

    const updateProgress = () => {
      const { currentTime, duration } = audioElement;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    };

    const handleEnded = () => {
      setProgress(0);
      audioPlayer.handlePlayPause(trackId);
    };

    audioElement.addEventListener("timeupdate", updateProgress);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioPlayer, trackId]);

  const handleTrackLike = useCallback(async () => {
    const previousLiked = liked;
    setLiked(prev => !prev);

    try {
      const res = liked
        ? await api.spotify.tracks.unlike.$post({ json: { id: trackId } })
        : await api.spotify.tracks.like.$post({ json: { id: trackId } });

      if (!res.ok) {
        setLiked(previousLiked);
      }
    } catch {
      setLiked(previousLiked);
    }
  }, [liked, trackId]);

  const handleFollowArtist = useCallback(async () => {
    const previousFollowing = isFollowing;
    setIsFollowing(prev => !prev);

    try {
      const res = previousFollowing
        ? await api.spotify.profile.unfollow.$post({
            json: { id: item.artist.id },
          })
        : await api.spotify.profile.follow.$post({
            json: {
              id: item.artist.id,
            },
          });

      if (!res.ok) {
        setIsFollowing(previousFollowing);
      }
    } catch {
      setIsFollowing(previousFollowing);
    }
  }, [isFollowing, item.artist.id]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-screen w-full snap-start overflow-hidden bg-[#0a0a0a] lg:max-w-lg"
    >
      <div className="absolute inset-0 z-0 flex flex-col px-3 py-6 md:px-5">
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
          onClick={() => audioPlayer.togglePlayPause(trackId)}
        >
          <AlbumCover
            src={item.album.cover}
            alt={item.album.name}
          />
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
          <div className="w-full bg-gray-700">
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
