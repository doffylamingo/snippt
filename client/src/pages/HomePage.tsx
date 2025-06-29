import { Feed } from "@/components/Feed";
import LoadingFeed from "@/components/LoadingFeed";
import { useInfiniteRecommendations } from "@/hooks/useInfiniteRecommendations";

export default function HomePage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteRecommendations({
    limit: 10,
    seed_artists:
      "6HvZYsbFfjnjFrWF950C9d,10C2C3ecEhGKdHskghO52u,64tJ2EAv1R6UaZqc4iOCyj",
  });

  if (isLoading) {
    return <LoadingFeed />;
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-red-500 text-xl">
            Error loading recommendations
          </h2>
          <p className="text-gray-600">{error?.message}</p>
        </div>
      </div>
    );
  }

  const recommendations = data?.pages.flatMap(page => page.data) ?? [];
  const uniqueRecommendations = Array.from(
    new Map(recommendations.map(rec => [rec.track.id, rec])).values(),
  );

  return (
    <Feed
      recommendations={uniqueRecommendations}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
