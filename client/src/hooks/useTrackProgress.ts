import { useEffect, useState } from "react";

type AudioPlayer = ReturnType<
  typeof import("@/hooks/useAudioPlayer").useAudioPlayer
>;

export default function useTrackAudio(
  trackId: string,
  audioPlayer: AudioPlayer,
) {
  const [progress, setProgress] = useState(0);

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

  return progress;
}
