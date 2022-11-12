// BFF components
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/bff/db.server";
import { destroySession, getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

import { getSignerBack, getSignerFront } from "~/web3/etherservice";

// UI components
import { Box, Grid, GridItem } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";
import SettingsBox from "~/components/ConfigurationBox";
import Balance from "~/components/Balance";
import { formatEther } from "ethers/lib/utils";
import React from "react";

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
  const intent = form.get("intent");
  const profileToGo = form.get("profileToGo");

  if (intent === "search") {
    return redirect(`/${profileToGo}.test`);
  }

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

  return redirect(`/`, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function Dashboard() {
  const { address, defaultProfile } = useLoaderData();

  const [nativeBalance, setNativeBalance] = React.useState(0);

  React.useEffect(() => {
    // declare the data fetching function
    const getBalance = async () => {
      const signer = await getSignerFront();

      const balance = await signer.getBalance();

      console.log("balance", formatEther(balance));

      setNativeBalance(Number(formatEther(balance)));
    };

    // call the function
    getBalance()
      // make sure to catch any error
      .catch(console.error);
  }, []);

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
            <Box>
              <HotProfiles />

              <Balance nativeBalance={nativeBalance} />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
