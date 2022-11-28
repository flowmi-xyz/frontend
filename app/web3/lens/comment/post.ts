import { lensClient } from "../lens-client";

import { CreatePostTypedData } from "../graphql/generated";

import type { CreatePublicPostRequest } from "../graphql/lens.types";

const createPostTypedData = async (request: CreatePublicPostRequest) => {
  const variables: CreatePublicPostRequest = request;

  const result = await lensClient.request(CreatePostTypedData, variables);

  return result.createPostTypedData;
};

export { createPostTypedData };
