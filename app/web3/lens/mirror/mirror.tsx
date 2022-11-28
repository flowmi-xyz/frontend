import { lensClient } from "../lens-client";

import { CreateMirrorTypedData } from "../graphql/generated";

import type { CreateMirrorRequest } from "../graphql/lens.types";

const createMirrorTypedData = async (request: CreateMirrorRequest) => {
  const variables: CreateMirrorRequest = request;

  const result = await lensClient.request(CreateMirrorTypedData, variables);

  return result.createMirrorTypedData;
};

export { createMirrorTypedData };
