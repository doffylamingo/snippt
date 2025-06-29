import { useCallback, useState } from "react";
import { api } from "@/lib/api-client";
import type { Recommendations } from "@/types";

export default function useTrackActions(item: Recommendations) {
  const [liked, setLiked] = useState(item.liked);
  const [isFollowing, setIsFollowing] = useState(item.isFollowing);

  const handleTrackLike = useCallback(async () => {
    const previousLiked = liked;

    setLiked(prev => !prev);

    try {
      const res = liked
        ? await api.spotify.tracks.unlike.$post({ json: { id: item.track.id } })
        : await api.spotify.tracks.like.$post({ json: { id: item.track.id } });

      if (!res.ok) {
        setLiked(previousLiked);
      }
    } catch (_) {
      setLiked(previousLiked);
    }
  }, [liked, item.track.id]);

  const handleFollowArtist = useCallback(async () => {
    const previousFollowing = isFollowing;

    setIsFollowing(prev => !prev);

    try {
      const res = previousFollowing
        ? await api.spotify.profile.unfollow.$post({
            json: { id: item.artist.id },
          })
        : await api.spotify.profile.follow.$post({
            json: { id: item.artist.id },
          });

      if (!res.ok) {
        setIsFollowing(previousFollowing);
        console.error("Failed to update artist follow status");
      }
    } catch (_) {
      setIsFollowing(previousFollowing);
    }
  }, [isFollowing, item.artist.id]);

  return {
    liked,
    isFollowing,
    handleTrackLike,
    handleFollowArtist,
  };
}
