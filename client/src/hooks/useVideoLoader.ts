import { useEffect, useRef, useState } from "react";

type AudioPlayer = ReturnType<
  typeof import("@/hooks/useAudioPlayer").useAudioPlayer
>;

export default function useVideoLoader(
  trackId: string,
  canvasUrl: string | undefined,
  inView: boolean,
  audioPlayer: AudioPlayer,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      audioPlayer.videoRefs.current[trackId] = videoRef.current;
    }

    return () => {
      delete audioPlayer.videoRefs.current[trackId];
    };
  }, [audioPlayer, trackId]);

  useEffect(() => {
    if (!canvasUrl) return;

    if (inView && !videoLoaded) {
      audioPlayer.loadVideo(trackId, canvasUrl);
      setVideoLoaded(true);
    } else if (!inView && videoLoaded) {
      audioPlayer.unloadVideo(trackId);
      setVideoLoaded(false);
    }

    return () => {
      if (videoLoaded) {
        audioPlayer.unloadVideo(trackId);
      }
    };
  }, [inView, canvasUrl, audioPlayer, trackId, videoLoaded]);

  return videoRef;
}
