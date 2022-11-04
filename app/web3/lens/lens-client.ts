import { GraphQLClient } from "graphql-request";

const lensClient = new GraphQLClient("https://api.lens.dev/playground");

export { lensClient };
