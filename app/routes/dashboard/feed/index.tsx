// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { lensClient } from "~/web3/lens/lens-client";
import {
  ExplorePublications,
  GetDefaultProfile,
} from "~/web3/lens/graphql/generated";

// UI components
import LensterFeed from "~/components/external/LensterFeed";
import { getSession } from "~/bff/session";

export const loader: LoaderFunction = async ({ request }) => {
  // Get feed from Lens protocol
  console.log("[dashboard/feed] Fetching feed from Lens API ...");

  const responsePublications = await lensClient.request(ExplorePublications);

  const recentsPostsResponse = responsePublications.explorePublications;

  const recentPosts = recentsPostsResponse.items.filter((item: any) => {
    return item.__typename === "Post";
  });

  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  // Get default profile from Lens
  const variables: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lensClient.request(
    GetDefaultProfile,
    variables
  );

  const defaultProfile = responseProfile.defaultProfile;

  return { recentPosts, defaultProfile };
};

export default function Feed() {
  const { recentPosts, defaultProfile } = useLoaderData();

  return <LensterFeed Posts={recentPosts} defaultProfile={defaultProfile} />;
}
