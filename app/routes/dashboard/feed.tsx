// BFF components
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { destroySession, getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile, Refresh } from "~/web3/lens/graphql/generated";

// UI components
import { Box, Grid, GridItem } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";
import SettingsBox from "~/components/ConfigurationBox";
import { db } from "~/bff/db.server";

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

  const defaultProfile = responseProfile.defaultProfile;

  return { address, accessToken, defaultProfile };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const address = form.get("address");
  const connected = form.get("connected");

  if (!address || typeof address !== "string") return null;
  if (!connected || typeof connected !== "string") return null;

  await db.user.update({
    where: {
      address,
    },
    data: {
      connected: connected === "true",
    },
  });

  const session = await getSession(request.headers.get("Cookie"));

  return redirect(`/login`, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function Dashboard() {
  const { address, defaultProfile } = useLoaderData();

  return (
    <Box bg="#FAFAF9">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      <Box maxWidth="1200px" m="auto">
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={2}>
            <ProfileParticipation />
          </GridItem>

          <GridItem colSpan={1}>
            <SettingsBox />
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
