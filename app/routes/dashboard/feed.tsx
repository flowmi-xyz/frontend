// BFF components
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";

import { db } from "~/bff/db.server";
import { destroySession, getSession } from "~/bff/session";

import { changeHeaders, lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

import { getBalanceFromAddress } from "~/web3/etherservice";

import { getaWMATICBalance, getWMATICBalance } from "~/web3/erc20";

import { getGasFee } from "~/web3/gasfee";
import { getPriceFeedFromFlowmi } from "~/web3/social-defi/getPriceFeed";
import { getTotalFundedProfile } from "~/web3/social-defi";

// UI components
import React from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import SettingsBox from "~/components/SettingsBox";

import { switchNetwork } from "~/web3/metamask";
import { BsPlusLg } from "react-icons/bs";
import { BsPiggyBank } from "react-icons/bs";

import PostModal from "~/components/post/PostModal";
import DepositModal from "~/components/transactions/DepositModal";
import Balance from "~/components/Balance";

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
    getTotalFundedProfile(defaultProfile?.ownedBy),
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
    accessToken,
    defaultProfile,
    gasFee,
    priceFeed,
    maticBalance,
    wmaticBalance,
    awmaticBalance,
  } = useLoaderData();

  const transition = useTransition();

  const {
    onOpen: onOpenPost,
    onClose: onClosePost,
    isOpen: isOpenPost,
  } = useDisclosure();
  const {
    onOpen: onOpenDeposit,
    onClose: onCloseDeposit,
    isOpen: isOpenDeposit,
  } = useDisclosure();

  changeHeaders(accessToken);

  React.useEffect(() => {
    const changeNetwork = async () => {
      await switchNetwork();
    };

    changeNetwork()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <Box bg="backgroundFeed">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      {transition.state === "idle" && (
        <Box maxWidth="1200px" m="auto">
          {!defaultProfile?.handle && (
            <Box pl="10">
              <SettingsBox />
            </Box>
          )}

          {defaultProfile?.handle && (
            <Box>
              <SettingsBox />
              <Grid templateColumns="repeat(3, 1fr)">
                <GridItem colSpan={2}>
                  <Outlet />
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
              </Grid>
            </Box>
          )}

          {defaultProfile?.handle && (
            <>
              <Button
                position="fixed"
                bottom="10"
                right="10"
                rounded="full"
                bg="lens"
                onClick={onOpenPost}
              >
                <Icon as={BsPlusLg} color="lensDark" h="3" w="3" />
              </Button>

              <Button
                position="fixed"
                bottom="24"
                right="10"
                rounded="full"
                bg="lens"
                onClick={onOpenDeposit}
              >
                <Icon as={BsPiggyBank} color="lensDark" h="6" w="6" />
              </Button>

              <DepositModal
                isOpen={isOpenDeposit}
                onClose={onCloseDeposit}
                handle={defaultProfile?.handle}
                amount={0}
                profileId={defaultProfile?.id}
                gasFee={gasFee}
                priceFeed={1}
                maticBalance={maticBalance}
                wmaticBalance={wmaticBalance}
                awmaticBalance={0}
              />

              <PostModal
                isOpen={isOpenPost}
                onClose={onClosePost}
                handle={defaultProfile?.handle}
                address={address}
                profileId={defaultProfile?.id}
                gasFee={gasFee}
                priceFeed={1}
                maticBalance={maticBalance}
              />
            </>
          )}
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
