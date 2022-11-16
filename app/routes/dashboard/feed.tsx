// BFF components
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";

import { db } from "~/bff/db.server";
import { destroySession, getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

import { getBalanceFromAddress } from "~/web3/etherservice";

import { getaWMATICBalance, getWMATICBalance } from "~/web3/erc20";

import { getGasFee } from "~/web3/gasfee";
import { getPriceFeedFromFlowmi } from "~/web3/social-defi/getPriceFeed";
import { getTotalFundedProfile } from "~/web3/social-defi";

// UI components
import { useEffect } from "react";
import { Box, Center, Grid, GridItem, Image, Text } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";
import SettingsBox from "~/components/SettingsBox";
import Balance from "~/components/Balance";

import { switchNetwork } from "~/web3/metamask";

export const loader: LoaderFunction = async ({ request }) => {
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

  useEffect(() => {
    const changeNetwork = async () => {
      await switchNetwork();
    };

    changeNetwork()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <Box bg="#FAFAF9" h="100vh">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      {transition.state === "idle" && (
        <Box maxWidth="1200px" m="auto">
          <Box pl="10">
            <Text
              fontWeight="700"
              fontSize={["40px", "55px", "45px"]}
              lineHeight={["48px", "66px", "66px"]}
              color="black"
              pt="50px"
            >
              Welcome to the{" "}
              <Text
                as="span"
                bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                bgClip="text"
              >
                Social DeFi
              </Text>
            </Text>

            <Text
              fontSize="22px"
              lineHeight="28.8ppx"
              color="grayLetter"
              pt="5"
            >
              Follow some profiles to participate in a decentralized social
              raffle and win{" "}
              <Text
                as="span"
                fontWeight="700"
                bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                bgClip="text"
              >
                some WMATIC
              </Text>
            </Text>
          </Box>

          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem colSpan={2}>
              <ProfileParticipation totalFounded={totalFounded} />
            </GridItem>

            <GridItem colSpan={1}>
              <Box>
                <SettingsBox />
                <Balance
                  maticBalance={maticBalance}
                  wmaticBalance={wmaticBalance}
                  awmaticBalance={awmaticBalance}
                  gasFee={gasFee}
                  priceFeed={priceFeed}
                />
              </Box>
            </GridItem>

            <GridItem colSpan={2}>
              <Box>
                <Outlet />
              </Box>
            </GridItem>

            <GridItem colSpan={1}>
              <Box>
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
