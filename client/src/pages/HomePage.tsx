import { useLoaderData } from "react-router";
import { Feed } from "@/components/Feed";
import type { Recommendations } from "@/types";

export default function HomePage() {
  const recommendations: Recommendations[] = useLoaderData();

  return <Feed recommendations={recommendations} />;
}
