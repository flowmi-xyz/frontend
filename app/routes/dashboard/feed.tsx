// BFF components
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";

import { db } from "~/bff/db.server";
import { destroySession, getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

import { getBalanceFromAddress, getSignerBack } from "~/web3/etherservice";

import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

import {
  FLOWMI_CONTRACT_ADDRESS,
  FLOWMI_HUB_ABI,
} from "~/web3/social-defi/social-defi-hub";
import { getaWMATICBalance, getWMATICBalance } from "~/web3/erc20";

import { getGasFee } from "~/web3/gasfee";
import { getPriceFeedFromFlowmi } from "~/web3/social-defi/getPriceFeed";

// UI components
import { Box, Center, Grid, GridItem, Image, Text } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";
import SettingsBox from "~/components/ConfigurationBox";
import Balance from "~/components/Balance";
import { getTotalFundedProfile } from "~/web3/social-defi";

export const loader: LoaderFunction = async ({ request }) => {
  const time1 = new Date();

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

  const [
    totalFounded,
    gasFee,
    maticBalance,
    wmaticBalance,
    awmaticBalance,
    priceFeed,
  ] = await Promise.all([
    getTotalFundedProfile(defaultProfile.ownedBy),
    getGasFee(),
    getBalanceFromAddress(address),
    getWMATICBalance(address),
    getaWMATICBalance(address),
    getPriceFeedFromFlowmi(),
  ]);

  // const maticBalance = await getBalanceFromAddress(address);

  // const wmaticBalance = await getWMATICBalance(address);

  // const awmaticBalance = await getaWMATICBalance(address);

  // const priceFeed = await getPriceFeedFromFlowmi();

  const time2 = new Date();

  console.log(
    "Time to load dashboard: ",
    (time2.getTime() - time1.getTime()) / 1000
  );

  return {
    address,
    accessToken,
    defaultProfile,
    totalFounded,
    gasFee,
    priceFeed,
    maticBalance,
    wmaticBalance,
    awmaticBalance,
  };
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
  // TODO: charge fonts correctly
  // reduce time of loading
  const {
    address,
    defaultProfile,
    totalFounded,
    gasFee,
    priceFeed,
    maticBalance,
    wmaticBalance,
    awmaticBalance,
  } = useLoaderData();

  const transition = useTransition();

  return (
    <Box bg="#FAFAF9" h="100vh">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      {transition.state === "idle" && (
        <Box maxWidth="1200px" m="auto">
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem colSpan={2}>
              <ProfileParticipation totalFounded={totalFounded} />
            </GridItem>

            <GridItem colSpan={1}>
              <Balance
                maticBalance={maticBalance}
                wmaticBalance={wmaticBalance}
                awmaticBalance={awmaticBalance}
                gasFee={gasFee}
                priceFeed={priceFeed}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <Box>
                <Outlet />
              </Box>
            </GridItem>

            <GridItem colSpan={1}>
              <Box>
                <SettingsBox />

                <HotProfiles />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      )}

      {transition.state === "loading" && (
        <Box p="10">
          <Text textAlign="center" fontSize="26px" color="lensDark" mt="25px">
            Connecting with garden ...
          </Text>

          <Center mt="10">
            <Image
              src="../assets/animations/Lens-Anim4_16x10.gif"
              rounded="xl"
              w="50%"
            />
          </Center>
        </Box>
      )}
    </Box>
  );
}
