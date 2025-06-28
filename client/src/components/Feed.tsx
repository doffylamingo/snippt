import FeedItem from "@/components/FeedItem";
import PromptInteraction from "@/components/PromptInteraction";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import type { Recommendations } from "@/types";

export function Feed({
  recommendations,
}: {
  recommendations: Recommendations[];
}) {
  const audioPlayer = useAudioPlayer();

  const handleInteraction = () => {
    audioPlayer.setHasInteracted(true);
  };

  return (
    <>
      {!audioPlayer.hasInteracted && (
        <PromptInteraction onInteract={handleInteraction} />
      )}

      <div className="no-scrollbar h-screen w-full snap-y snap-mandatory overflow-y-scroll bg-[#0a0a0a]">
        {recommendations.map(recommendation => (
          <FeedItem
            key={recommendation.track.id}
            item={recommendation}
            audioPlayer={audioPlayer}
          />
        ))}
      </div>
    </>
  );
}
