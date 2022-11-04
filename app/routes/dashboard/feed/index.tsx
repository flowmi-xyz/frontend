// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { lensClient } from "~/web3/lens/lens-client";
import { ExplorePublications } from "~/web3/lens/graphql/generated";

// UI components
import LensterFeed from "~/components/external/LensterFeed";

export const loader: LoaderFunction = async () => {
  // Get feed from Lens protocol
  console.log("[dashboard/feed] Fetching feed from Lens API ...");

  const responsePublications = await lensClient.request(ExplorePublications);

  const recentsPostsResponse = responsePublications.explorePublications;

  const recentPosts = recentsPostsResponse.items.filter((item: any) => {
    return item.__typename === "Post";
  });

  return recentPosts;
};

export default function Feed() {
  const recentPosts = useLoaderData();

  return <LensterFeed Posts={recentPosts} />;
}
