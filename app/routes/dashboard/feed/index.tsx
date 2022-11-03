// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { GraphQLClient } from "graphql-request";

import { ExplorePublications } from "~/web3/lens/lens-api";

// UI components
import LensterFeed from "~/components/external/LensterFeed";

export const loader: LoaderFunction = async () => {
  // Get feed from Lens protocol
  const lens = new GraphQLClient("https://api.lens.dev/playground");

  console.log("[dashboard/friends] Fetching feed from Lens API ...");

  const responsePublications = await lens.request(ExplorePublications);

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
