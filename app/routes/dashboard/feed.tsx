// BFF components
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/bff/db.server";
import { destroySession, getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

import {
  getBalanceFromAddress,
  getSignerBack,
  getSignerFront,
} from "~/web3/etherservice";

import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

import {
  aWMA_CONTRACT_ADDRESS,
  ERC20_HUB_ABI,
  WMATIC_CONTRACT_ADDRESS,
} from "~/web3/erc20/erc20-hub";

import { FLOWMI_CONTRACT_ADDRESS, FLOWMI_HUB_ABI } from "~/web3/social-defi";

import getGasFee from "~/web3/gasfee";

// UI components
import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";
import SettingsBox from "~/components/ConfigurationBox";
import Balance from "~/components/Balance";
import getPriceFeedFromFlowmi from "~/web3/social-defi/getPriceFeed";
import { getaWMATICBalance, getWMATICBalance } from "~/web3/erc20";

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

  const gasFee = await getGasFee();

  const flowmiContract = new ethers.Contract(
    FLOWMI_CONTRACT_ADDRESS,
    FLOWMI_HUB_ABI,
    getSignerBack()
  );

  let totalFounded = 0;

  try {
    totalFounded = await flowmiContract.getTotalFundedProfile(
      defaultProfile.ownedBy
    );

    console.log(totalFounded);

    totalFounded = Number(formatEther(totalFounded));
  } catch (error) {
    console.log(error);
  }

  const maticBalance = await getBalanceFromAddress(address);

  const wmaticBalance = await getWMATICBalance(address);

  const awmaticBalance = await getaWMATICBalance(address);

  const priceFeed = await getPriceFeedFromFlowmi();

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

  return (
    <Box bg="#FAFAF9" h="100vh">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

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
    </Box>
  );
}
