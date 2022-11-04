// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import { Box } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";
import { GraphQLClient } from "graphql-request";
import { GetDefaultProfile } from "~/web3/lens/lens-api";

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

export default function Dashboard() {
  const { address, accessToken, profile } = useLoaderData();

  console.log(profile);

  return (
    <Box bg="#FAFAF9" height="100vh">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handler={profile.handle}
      />

      <ProfileParticipation />

      <HotProfiles />

      <Outlet />
    </Box>
  );
}
