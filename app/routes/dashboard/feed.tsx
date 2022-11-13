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
import { ethers } from "ethers";
import {
  aWMA_CONTRACT_ADDRESS,
  ERC20_HUB_ABI,
  WMATIC_CONTRACT_ADDRESS,
} from "~/web3/erc20/erc20-hub";
import { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS } from "~/web3/lens/lens-hub";
import { FLOWMI_CONTRACT_ADDRESS, FLOWMI_HUB_ABI } from "~/web3/social-defi";

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

  return { address, accessToken, defaultProfile, totalFounded };
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
  const { address, defaultProfile, totalFounded } = useLoaderData();

  const [nativeBalance, setNativeBalance] = React.useState(0);
  const [wmaticBalance, setWmaticBalance] = React.useState(0);
  const [awmaticBalance, setAwmaticBalance] = React.useState(0);

  React.useEffect(() => {
    const getBalance = async () => {
      const signer = await getSignerFront();

      const balance = await signer.getBalance();

      const wmaticContract = new ethers.Contract(
        WMATIC_CONTRACT_ADDRESS,
        ERC20_HUB_ABI,
        signer
      );

      const wmaticBalance = await wmaticContract.balanceOf(address);

      const awmaticContract = new ethers.Contract(
        aWMA_CONTRACT_ADDRESS,
        ERC20_HUB_ABI,
        signer
      );

      const awmaticBalance = await awmaticContract.balanceOf(address);

      setNativeBalance(Number(formatEther(balance)));
      setWmaticBalance(Number(formatEther(wmaticBalance)));
      setAwmaticBalance(Number(formatEther(awmaticBalance)));
    };

    getBalance().catch(console.error);
  }, []);

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
              nativeBalance={nativeBalance}
              wmaticBalance={wmaticBalance}
              awmaticBalance={awmaticBalance}
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
