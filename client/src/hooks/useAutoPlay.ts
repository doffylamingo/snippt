import { useEffect } from "react";

type AudioPlayer = ReturnType<
  typeof import("@/hooks/useAudioPlayer").useAudioPlayer
>;

export default function useAutoPlay(
  inView: boolean,
  trackId: string,
  audioPlayer: AudioPlayer,
) {
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
}
