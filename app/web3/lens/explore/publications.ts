import { lensClient } from "../lens-client";

import { ExplorePublications } from "../graphql/generated";

import type { ExplorePublicationRequest } from "../graphql/lens.types";

const exploreLatestPublications = async (
  request: ExplorePublicationRequest
) => {
  const variables: ExplorePublicationRequest = request;

  const result = await lensClient.request(ExplorePublications, variables);

  return result.explorePublications;
};

export { exploreLatestPublications };
