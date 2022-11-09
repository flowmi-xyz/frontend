// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile, Refresh } from "~/web3/lens/graphql/generated";

// UI components
import { Box, Grid, GridItem } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const accessToken = session.get("accessToken");

  // Get default profile from Lens
  const variables: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lensClient.request(
    GetDefaultProfile,
    variables
  );

  const profile = responseProfile.defaultProfile;

  // const profile = {
  //   handle: "TODO",
  // };

  return { address, accessToken, profile };
};

export default function Dashboard() {
  const { address, profile } = useLoaderData();

  return (
    <Box bg="#FAFAF9">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={profile?.handle}
      />

      <Box maxWidth="1200px" m="auto">
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={2}>
            <ProfileParticipation />
          </GridItem>

          <GridItem colSpan={2}>
            <Outlet />
          </GridItem>

          <GridItem colSpan={1}>
            <HotProfiles />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
