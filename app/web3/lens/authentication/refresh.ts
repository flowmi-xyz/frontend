import { lensClient } from "../lens-client";

import { Refresh } from "../graphql/generated";

import type { RefreshRequest } from "../graphql/lens.types";

export default async function refreshToken(refreshToken: string) {
  const variables: RefreshRequest = {
    request: {
      refreshToken: refreshToken,
    },
  };

  const result = await lensClient.request(Refresh, variables);

  return result;
}
