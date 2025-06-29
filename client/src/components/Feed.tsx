import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FeedItem from "@/components/FeedItem";
import PromptInteraction from "@/components/PromptInteraction";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import type { Recommendations } from "@/types";

interface FeedProps {
  recommendations: Recommendations[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function Feed({
  recommendations,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: FeedProps) {
  const audioPlayer = useAudioPlayer();
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "500px",
  });

  const handleInteraction = () => {
    audioPlayer.setHasInteracted(true);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <>
      {!audioPlayer.hasInteracted && (
        <PromptInteraction onInteract={handleInteraction} />
      )}

      <div className="no-scrollbar h-screen w-full snap-y snap-mandatory overflow-y-scroll bg-[#0a0a0a]">
        {recommendations.map((recommendation, index) => {
          const isNearEnd = index === recommendations.length - 3;

          return (
            <div
              key={`${recommendation.track.id}-${index}`}
              ref={isNearEnd ? loadMoreRef : undefined}
            >
              <FeedItem
                item={recommendation}
                audioPlayer={audioPlayer}
              />
            </div>
          );
        })}

        <div className="flex h-20 items-center justify-center">
          {isFetchingNextPage && (
            <div className="text-sm text-white">
              Loading more recommendations...
            </div>
          )}
          {!hasNextPage && recommendations.length > 0 && (
            <div className="text-gray-500 text-sm">No more recommendations</div>
          )}
        </div>
      </div>
    </>
  );
}
