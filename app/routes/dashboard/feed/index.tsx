// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

import type { ExplorePublicationRequest } from "~/web3/lens/graphql/lens.types";
import { exploreLatestPublications } from "~/web3/lens/explore/publications";

// UI components
import LensterFeed from "~/components/external/LensterFeed";
import { getSession } from "~/bff/session";

export const loader: LoaderFunction = async ({ request }) => {
  // Get feed from Lens protocol
  console.log("[dashboard/feed] Fetching feed from Lens API ...");

  const exploreLatestVariables: ExplorePublicationRequest = {
    request: {
      sortCriteria: "LATEST",
      limit: 10,
    },
  };
  const latestPublications = await exploreLatestPublications(
    exploreLatestVariables
  );

  const recentsPostsResponse = latestPublications;

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
