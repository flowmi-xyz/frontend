// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

import { changeHeaders, lensClient } from "~/web3/lens/lens-client";
import {
  GetDefaultProfile,
  GetFollowers,
  GetProfile,
} from "~/web3/lens/graphql/generated";

import { ethers } from "ethers";

import {
  getBalanceFromAddress,
  getSignerBack,
  getSignerFront,
} from "~/web3/etherservice";
import { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS } from "~/web3/lens/lens-hub";
import {
  FLOWMI_CONTRACT_ADDRESS,
  FLOWMI_HUB_ABI,
} from "~/web3/social-defi/social-defi-hub";

// UI components
import React from "react";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import LensterProfile from "~/components/external/LensterProfile";
import TokenAccumulated from "~/components/TokensAccumulated";
import FlowmiProfileInfo from "~/components/FlowmiProfileInfo";
import FollowersComponent from "~/components/FollowersComponent";
import BalanceInProfile from "~/components/BalanceInProfile";

import { formatEther } from "~/utils/formatEther";
import { getGasFee } from "~/web3/gasfee";
import { getPriceFeedFromFlowmi } from "~/web3/social-defi/getPriceFeed";
import { getaWMATICBalance, getWMATICBalance } from "~/web3/erc20";

export const loader: LoaderFunction = async ({ request, params }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const accessToken = session.get("accessToken");

  changeHeaders(accessToken);

  // Get default profile from Lens
  let variables: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lensClient.request(
    GetDefaultProfile,
    variables
  );

  const defaultProfile = responseProfile.defaultProfile;

  // Get profile from Lens protocol
  variables = {
    request: { handle: params.profile },
  };

  const response = await lensClient.request(GetProfile, variables);

  const pageProfile = response.profile;

  const location = pageProfile.attributes.filter((attribute: any) => {
    return attribute.key === "location";
  });

  const locationValue = location[0]?.value;

  const ens = pageProfile.attributes.filter((attribute: any) => {
    return attribute.key === "ens";
  });

  const ensValue = ens[0]?.value;

  const website = pageProfile.attributes.filter((attribute: any) => {
    return attribute.key === "website";
  });

  const websiteValue = website[0]?.value;

  const twitter = pageProfile.attributes.filter((attribute: any) => {
    return attribute.key === "twitter";
  });

  const twitterValue = twitter[0]?.value;

  const lensContract = new ethers.Contract(
    LENS_HUB_CONTRACT_ADDRESS,
    LENS_HUB_ABI,
    getSignerBack()
  );

  let followModuleAddress = "";

  try {
    followModuleAddress = await lensContract.getFollowModule(pageProfile.id);
  } catch (error) {
    console.log(error);
  }

  let isDefiFollowProfile = false;

  if (followModuleAddress == FLOWMI_CONTRACT_ADDRESS) {
    isDefiFollowProfile = true;
  }

  // Get followers from API
  variables = {
    request: { profileId: pageProfile.id, limit: 10 },
  };

  const followersResponse = await lensClient.request(GetFollowers, variables);

  const arrayFollowers = followersResponse?.followers?.items;

  // Get how much pay in WMATIC
  const flowmiContract = new ethers.Contract(
    FLOWMI_CONTRACT_ADDRESS,
    FLOWMI_HUB_ABI,
    getSignerBack()
  );

  // Get how much WMATIC user has
  let wmaticAccumulated = 0;

  try {
    const wmaticBalance = await flowmiContract.getFundsInThisRaffle(
      pageProfile.ownedBy
    );

    wmaticAccumulated = Number(formatEther(wmaticBalance));
  } catch (error) {
    console.log(error);
  }

  // Get count of followers
  let countFollowers = 0;

  try {
    countFollowers = await flowmiContract.getNumberOfFollowers(
      pageProfile.ownedBy
    );

    countFollowers = Number(countFollowers);
  } catch (error) {
    console.log(error);
  }

  // Get goals of followers
  let goalOfFollowers = 0;

  try {
    goalOfFollowers = await flowmiContract.getGoal();

    goalOfFollowers = Number(goalOfFollowers);
  } catch (error) {
    console.log(error);
  }

  const gasFee = await getGasFee();

  const priceFeed = await getPriceFeedFromFlowmi();

  const maticBalance = await getBalanceFromAddress(address);

  const wmaticBalance = await getWMATICBalance(address);

  const awmaticBalance = await getaWMATICBalance(address);

  return {
    address,
    accessToken,
    defaultProfile,
    pageProfile,
    locationValue,
    ensValue,
    websiteValue,
    twitterValue,
    followModuleAddress,
    isDefiFollowProfile,
    arrayFollowers,
    wmaticAccumulated,
    countFollowers,
    goalOfFollowers,
    gasFee,
    priceFeed,
    maticBalance,
    wmaticBalance,
    awmaticBalance,
  };
};

export default function Profile() {
  const {
    address,
    accessToken,
    defaultProfile,
    pageProfile,
    locationValue,
    ensValue,
    websiteValue,
    twitterValue,
    followModuleAddress,
    isDefiFollowProfile,
    arrayFollowers,
    wmaticAccumulated,
    countFollowers,
    goalOfFollowers,
    gasFee,
    priceFeed,
    maticBalance,
    wmaticBalance,
    awmaticBalance,
  } = useLoaderData();

  changeHeaders(accessToken);

  console.log(pageProfile);
  console.log(followModuleAddress);
  console.log(arrayFollowers);
  console.log(priceFeed);

  return (
    <Box bg="#FAFAF9">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      {/* <Image src="./assets/2.png" w="100%" h="180px" objectFit="cover" /> */}

      <Box>
        <Text
          textAlign="center"
          fontWeight="700"
          fontSize={["40px", "55px", "45px"]}
          lineHeight={["48px", "66px", "66px"]}
          color="black"
          zIndex="1"
          my="50px"
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
      </Box>

      <Box maxWidth="1200px" m="auto">
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={1}>
            <LensterProfile
              name={pageProfile.name}
              handle={pageProfile.handle}
              id={pageProfile?.id}
              avatar={pageProfile.picture?.original?.url}
              followers={pageProfile.stats.totalFollowers}
              following={pageProfile.stats.totalFollowing}
              location={locationValue}
              ens={ensValue}
              website={websiteValue}
              twitter={twitterValue}
              isFollowed={pageProfile.isFollowedByMe}
              followModuleAddress={followModuleAddress}
              amount={priceFeed}
              gasFee={gasFee}
              priceFeed={priceFeed}
              maticBalance={maticBalance}
              wmaticBalance={wmaticBalance}
            />
          </GridItem>

          <GridItem colSpan={2}>
            {isDefiFollowProfile && (
              <Box>
                <Flex w="100%">
                  <FlowmiProfileInfo wmaticToPay={priceFeed} />

                  <BalanceInProfile
                    maticBalance={maticBalance}
                    wmaticBalance={wmaticBalance}
                    awmaticBalance={awmaticBalance}
                  />
                </Flex>

                <Flex mb="10">
                  <TokenAccumulated
                    handle={pageProfile.handle}
                    tokensAccumulated={wmaticAccumulated}
                    countFollowers={countFollowers}
                    goalOfFollowers={goalOfFollowers}
                  />

                  <Box>
                    <FollowersComponent followers={arrayFollowers} />
                  </Box>
                </Flex>
              </Box>
            )}
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
