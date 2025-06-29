import { useCallback, useRef, useState } from "react";

export function useAudioPlayer() {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const pausedByUser = useRef<{ [key: string]: boolean }>({});
  const playQueue = useRef<string | null>(null);

  const playTrack = useCallback(
    async (trackId: string) => {
      playQueue.current = trackId;

      const audioElement = audioRefs.current[trackId];
      const videoElement = videoRefs.current[trackId];
      if (!audioElement) return;

      if (playingTrack && playingTrack !== trackId) {
        const currentAudio = audioRefs.current[playingTrack];
        const currentVideo = videoRefs.current[playingTrack];
        currentAudio?.pause();
        currentVideo?.pause();
      }

      await new Promise(resolve => setTimeout(resolve, 50));

      if (playQueue.current !== trackId) return;

      try {
        await audioElement.play();
        if (videoElement?.src) {
          await videoElement.play();
        }

        if (playQueue.current === trackId) {
          setPlayingTrack(trackId);
          pausedByUser.current[trackId] = false;
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.warn("Failed to play audio/video:", trackId, error);
        }
      }
    },
    [playingTrack],
  );

  const pauseTrack = useCallback((trackId: string) => {
    playQueue.current = null;
    const audioElement = audioRefs.current[trackId];
    const videoElement = videoRefs.current[trackId];
    if (!audioElement) return;

    audioElement.pause();
    videoElement?.pause();
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
      const videoElement = videoRefs.current[trackId];

      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }

      if (playingTrack === trackId) {
        setPlayingTrack(null);
      }
      pausedByUser.current[trackId] = false;
    },
    [playingTrack],
  );

  const loadVideo = useCallback((trackId: string, videoUrl: string) => {
    const videoElement = videoRefs.current[trackId];
    if (!videoElement) return;

    videoElement.src = videoUrl;
    videoElement.load();
  }, []);

  const unloadVideo = useCallback((trackId: string) => {
    const videoElement = videoRefs.current[trackId];
    if (!videoElement) return;

    videoElement.pause();
    videoElement.removeAttribute("src");
    videoElement.load();
  }, []);

  return {
    playingTrack,
    hasInteracted,
    setHasInteracted,
    audioRefs,
    videoRefs,
    togglePlayPause,
    shouldAutoPlay,
    playTrack,
    handlePlayPause,
    loadVideo,
    unloadVideo,
  };
}
