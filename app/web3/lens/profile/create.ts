import { lensClient } from "../lens-client";

import type { CreateProfileRequest } from "../graphql/lens.types";

import { CreateProfile } from "../graphql/generated";

const createProfileRequest = async (request: CreateProfileRequest) => {
  const variables: CreateProfileRequest = request;

  const result = await lensClient.request(CreateProfile, variables);

  return result;
};

export { createProfileRequest };
