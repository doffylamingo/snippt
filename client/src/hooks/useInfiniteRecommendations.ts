import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Recommendations } from "@/types";

interface RecommendationsParams {
  limit?: number;
  seed_artists?: string;
  seed_genres?: string;
  seed_tracks?: string;
  min_popularity?: number;
}

export function useInfiniteRecommendations(params: RecommendationsParams) {
  return useInfiniteQuery({
    queryKey: ["recommendations", params],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.spotify.recommendations.$post({
        json: {
          ...params,
          limit: params.limit || 10,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data: Recommendations[] = await res.json();

      return {
        data,
        nextPage: pageParam + 1,
      };
    },
    getNextPageParam: lastPage => {
      return lastPage.nextPage;
    },
    initialPageParam: 0,
  });
}
