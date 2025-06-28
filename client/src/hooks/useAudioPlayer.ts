import { useCallback, useRef, useState } from "react";

export function useAudioPlayer() {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const pausedByUser = useRef<{ [key: string]: boolean }>({});

  const playTrack = useCallback(
    async (trackId: string) => {
      const audioElement = audioRefs.current[trackId];
      if (!audioElement) return;

      if (playingTrack && playingTrack !== trackId) {
        const currentAudio = audioRefs.current[playingTrack];
        currentAudio?.pause();
      }

      try {
        await audioElement.play();
        setPlayingTrack(trackId);
        pausedByUser.current[trackId] = false;
      } catch (error) {
        console.warn("Failed to play audio:", error);
      }
    },
    [playingTrack],
  );

  const pauseTrack = useCallback((trackId: string) => {
    const audioElement = audioRefs.current[trackId];
    if (!audioElement) return;

    audioElement.pause();
    setPlayingTrack(null);
    pausedByUser.current[trackId] = true;
  }, []);

  const togglePlayPause = useCallback(
    (trackId: string) => {
      if (playingTrack === trackId) {
        pauseTrack(trackId);
      } else {
        playTrack(trackId);
      }
    },
    [playingTrack, pauseTrack, playTrack],
  );

  const shouldAutoPlay = useCallback((trackId: string) => {
    return !pausedByUser.current[trackId];
  }, []);

  const handlePlayPause = useCallback(
    (trackId: string) => {
      const audioElement = audioRefs.current[trackId];
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      if (playingTrack === trackId) {
        setPlayingTrack(null);
      }
      pausedByUser.current[trackId] = false;
    },
    [playingTrack],
  );

  return {
    playingTrack,
    hasInteracted,
    setHasInteracted,
    audioRefs,
    togglePlayPause,
    shouldAutoPlay,
    playTrack,
    handlePlayPause,
  };
}
