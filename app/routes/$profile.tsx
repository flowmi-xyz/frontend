// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { GraphQLClient } from "graphql-request";
import { GetDefaultProfile } from "~/web3/lens/lens-api";

import { getSession } from "~/bff/session";
// UI components
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import ProfileParticipation from "~/components/ProfileParticipation";
import LensterProfile from "~/components/external/LensterProfile";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const accessToken = session.get("accessToken");

  // Get default profile from Lens
  const lens = new GraphQLClient("https://api.lens.dev/playground");

  const variables: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lens.request(GetDefaultProfile, variables);

  const profile = responseProfile.defaultProfile;

  return { address, accessToken, profile };
};

export default function Profile() {
  const { address, profile } = useLoaderData();

  return (
    <Box bg="#FAFAF9">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handler={profile.handle}
      />

      <Image
        src="https://www.xtrafondos.com/descargar.php?id=4599&resolucion=5120x2880"
        w="100%"
        h="320px"
        objectFit="fill"
      />

      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={2}>
          <LensterProfile />
        </GridItem>

        <GridItem colSpan={1}>aldkjf alj</GridItem>
      </Grid>
    </Box>
  );
}
