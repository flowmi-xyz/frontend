import { lensClient } from "./lens-client";

import { Authenticate } from "./graphql/generated";

import type { AuthenticationResult } from "./lens-api.response";
import type { SignedAuthChallenge } from "./graphql/lens.types";

export default async function authenticateInLens(
  address: string,
  signature: string
) {
  const variables: SignedAuthChallenge = {
    request: {
      address: address,
      signature: signature,
    },
  };

  const result: AuthenticationResult = await lensClient.request(
    Authenticate,
    variables
  );

  return result;
}
