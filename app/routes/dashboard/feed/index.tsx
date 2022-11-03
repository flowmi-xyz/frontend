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

  const recentsPosts = responsePublications.explorePublications;

  return recentsPosts.items;
};

export default function Feed() {
  const recentsPosts = useLoaderData();

  console.log("[dashboard/feed] Feed data: ", recentsPosts);

  return <LensterFeed />;
}
