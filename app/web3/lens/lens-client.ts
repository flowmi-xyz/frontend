import { GraphQLClient } from "graphql-request";

import { LENS_API_URL } from "./lens-hub";

const lensClient = new GraphQLClient(LENS_API_URL);

const changeHeaders = (token: string) => {
  lensClient.setHeaders({
    "x-access-token": token ? `Bearer ${token}` : "",
  });
};

export { lensClient, changeHeaders };
