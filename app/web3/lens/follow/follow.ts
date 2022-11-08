import { lensClient } from "../lens-client";

import { CreateFollowDataType } from "../graphql/generated";

import type { FollowRequest } from "../graphql/lens.types";

const createFollowTypedData = async (request: FollowRequest) => {
  const variables: FollowRequest = request;

  const result = await lensClient.request(CreateFollowDataType, variables);

  return result;
};

export { createFollowTypedData };
