import { CreateUnfollowTypedData } from "./graphql/generated";
import type { UnfollowRequest } from "./graphql/lens.types";
import { lensClient } from "./lens-client";

const createUnfollowTypedData = async (request: UnfollowRequest) => {
  const variables: UnfollowRequest = request;

  const createUnfollowTypedDataResponse = await lensClient.request(
    CreateUnfollowTypedData,
    variables
  );

  return createUnfollowTypedDataResponse.createUnfollowTypedData;
};

export { createUnfollowTypedData };
