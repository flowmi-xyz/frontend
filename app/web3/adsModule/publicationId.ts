import React from "react";
import { lensClient } from "../lens/lens-client";

const query = `
query ($request: PublicationsQueryRequest!) {
  publications(request: $request ) {
    items {
      ... on Post {
        metadata {
          description
        }
        referenceModule {
          ... on UnknownReferenceModuleSettings {
            __typename
            contractAddress
          }
        }
        id
      }
    }
  }
}
`;

async function getItemIds(profileId: string): Promise<string[]> {
  const variables = {
    request: {
      profileId: profileId,
      publicationTypes: ["POST"],
    },
  };

  const response = await lensClient.request(query, variables);
  console.log(response);
  const items = response.publications.items;
  const filteredItems = items.filter(
    (item: { referenceModule: { contractAddress: string } }) =>
      item?.referenceModule?.contractAddress ===
      "0x7867F85CF1553cAfF31cf67EBA1369C9Ff109E26"
  );
  const itemIds = filteredItems.map((item: { id: string }) =>
    item.id.substring(5)
  );
  return itemIds;
}

export default getItemIds;
