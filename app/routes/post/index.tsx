// BFF components
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useTransition } from "@remix-run/react";

import { db } from "~/bff/db.server";
import { destroySession, getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import {
  GetDefaultProfile,
  GetPublicationReferenceModule,
} from "~/web3/lens/graphql/generated";

import { getBalanceFromAddress } from "~/web3/etherservice";

// UI components
import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { MdPostAdd, MdAdsClick } from "react-icons/md";
// import { IoDiceOutline } from "react-icons/io";

// components
import NavbarConnected from "~/components/navbar/NavbarConnectedDesktop";

import { switchNetwork } from "~/web3/metamask";
import { EditIcon } from "@chakra-ui/icons";
import CoinSelect from "~/components/CoinSelect";
import BalanceWallet from "~/components/BalanceWallet";
import { getTotalFundedProfile } from "~/web3/social-defi";
import { getGasFee } from "~/web3/gasfee";
import {
  getaWMATICBalance,
  getWEthBalance,
  getWMATICBalance,
  getUSDCBalance,
  getDAIBalance,
  getTOUBalance,
} from "~/web3/erc20";
import { getPriceFeedFromFlowmi } from "~/web3/social-defi/getPriceFeed";

import { getGlobalBudget, getPostBudget } from "~/web3/adsModule/index";
import {
  DAI_CONTRACT_ADDRESS,
  TOU_CONTRACT_ADDRESS,
  USDC_CONTRACT_ADDRESS,
  WEth_CONTRACT_ADDRESS,
  WMATIC_CONTRACT_ADDRESS,
} from "~/web3/erc20/erc20-hub";

import BalanceGlobalBudget from "~/components/BalanceGlobalBudget";
import getItemIds from "~/web3/adsModule/publicationId";
import { transformToIpfsUrl } from "~/web3/ipfs/ipfs";
import DepositModal from "~/components/transactions/DepositModal";
import Wav3sPostModal from "~/components/post/Wav3sPostModal";

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

  const referenceModule = await lensClient.request(
    GetPublicationReferenceModule
  );

  const defaultProfile = responseProfile.defaultProfile;

  const results = await getItemIds(defaultProfile.id);

  console.log(results);

  const [
    maticBalance,
    wmaticBalance,
    wethBalance,
    usdcBalance,
    daiBalance,
    touBalance,
    gasFee,
    globalBudgetWmatic,
    globalBudgetWEth,
    globalBudgetDai,
    globalBudgetUsdc,
    globalBudgetTou,
  ] = await Promise.all([
    getBalanceFromAddress(address),
    getWMATICBalance(address),
    getWEthBalance(address),
    getUSDCBalance(address),
    getDAIBalance(address),
    getTOUBalance(address),
    getGasFee(),
    getGlobalBudget(defaultProfile?.id, WMATIC_CONTRACT_ADDRESS),
    getGlobalBudget(defaultProfile?.id, WEth_CONTRACT_ADDRESS),
    getGlobalBudget(defaultProfile?.id, DAI_CONTRACT_ADDRESS),
    getGlobalBudget(defaultProfile?.id, USDC_CONTRACT_ADDRESS),
    getGlobalBudget(defaultProfile?.id, TOU_CONTRACT_ADDRESS),
  ]);

  // const [
  //   totalFounded,
  //   maticBalance,
  //   wmaticBalance,
  //   wethBalance,
  //   usdcBalance,
  //   daiBalance,
  //   touBalance,
  //   globalBudgetWmatic,
  //   globalBudgetWEth,
  //   globalBudgetDai,
  //   globalBudgetUsdc,
  //   globalBudgetTou,
  // ] = await Promise.all([
  //   getTotalFundedProfile(defaultProfile?.ownedBy),
  //   getBalanceFromAddress(address),
  //   getWMATICBalance(address),
  //   getWEthBalance(address),
  //   getUSDCBalance(address),
  //   getDAIBalance(address),
  //   getTOUBalance(address),
  //   getGlobalBudget(defaultProfile?.id, WMATIC_CONTRACT_ADDRESS),
  //   getGlobalBudget(defaultProfile?.id, WEth_CONTRACT_ADDRESS),
  //   getGlobalBudget(defaultProfile?.id, DAI_CONTRACT_ADDRESS),
  //   getGlobalBudget(defaultProfile?.id, USDC_CONTRACT_ADDRESS),
  //   getGlobalBudget(defaultProfile?.id, TOU_CONTRACT_ADDRESS),
  // ]);

  return {
    address,
    accessToken,
    defaultProfile,
    // totalFounded,
    maticBalance,
    wmaticBalance,
    wethBalance,
    usdcBalance,
    daiBalance,
    touBalance,
    gasFee,
    globalBudgetWmatic,
    globalBudgetWEth,
    globalBudgetDai,
    globalBudgetUsdc,
    globalBudgetTou,
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
    gasFee,
    priceFeed,
    maticBalance,
    wmaticBalance,
    awmaticBalance,
    wethBalance,
    usdcBalance,
    daiBalance,
    touBalance,
    globalBudgetWmatic,
    globalBudgetWEth,
    globalBudgetDai,
    globalBudgetUsdc,
    globalBudgetTou,
  } = useLoaderData();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenPost,
    onOpen: onOpenPost,
    onClose: onClosePost,
  } = useDisclosure();

  const [postNormal, setPostNormal] = React.useState(false);
  const [postAds, setPostAds] = React.useState(true);

  const [content, setContent] = React.useState(" ");

  const [reward, setReward] = React.useState(" ");

  const [replys, setReplys] = React.useState("1");

  const activePostNormal = () => {
    setPostAds(false);
    setPostNormal(true);
  };
  const activePostAds = () => {
    setPostNormal(false);
    setPostAds(true);
  };

  useEffect(() => {
    const changeNetwork = async () => {
      await switchNetwork();
    };

    changeNetwork()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <Box bg="backgroundFeed" h="100vh">
      <NavbarConnected address={address} handle={defaultProfile?.handle} />

      <Flex flexDirection="row">
        <Box
          bg="white"
          ml="40px"
          mt="7"
          w="50%"
          border="1px"
          borderColor="#E0E0E3"
          borderRadius="10px"
        >
          <Box pt="8" pl="8" pb="8">
            <Text
              fontSize="4xl"
              fontWeight="700"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              bgClip="text"
              width="-webkit-fit-content"
            >
              Welcome{" "}
              {`${
                defaultProfile?.handle[0].toUpperCase() +
                defaultProfile?.handle.substring(1).slice(0, -5)
              }`}
            </Text>
            <Text fontSize="md" fontWeight="600">
              Let’s create the best post for you
            </Text>

            {/* Start normal post */}
            {postNormal && !postAds && (
              <>
                <Flex flexDirection="row" pt="5">
                  <Button
                    leftIcon={<MdPostAdd />}
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    variant="solid"
                    color="white"
                    borderRadius="12px"
                    mr="5px"
                    onClick={activePostNormal}
                  >
                    Post
                  </Button>

                  <Button
                    leftIcon={<MdAdsClick />}
                    colorScheme="black"
                    variant="ghost"
                    fontWeight="500"
                    onClick={activePostAds}
                  >
                    Ads P2P
                  </Button>
                </Flex>
                <Flex flexDirection="row" pt="5">
                  <Avatar
                    size="md"
                    src={transformToIpfsUrl(
                      defaultProfile?.picture?.original?.url
                    )}
                  />

                  <InputGroup mx={5}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.500" />}
                    />
                    <Input type="tel" placeholder="What’s happening?" />
                  </InputGroup>

                  <Button
                    leftIcon={<EditIcon />}
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    variant="solid"
                    color="white"
                    mr={20}
                    borderRadius="12px"
                    w={36}
                  >
                    Post
                  </Button>
                </Flex>
              </>
            )}
            {/* Start ads post */}
            {!postNormal && postAds && (
              <>
                <Flex flexDirection="row" pt="5">
                  <Button
                    leftIcon={<MdPostAdd />}
                    colorScheme="black"
                    variant="ghost"
                    fontWeight="500"
                    mr="5px"
                    onClick={activePostNormal}
                  >
                    Post
                  </Button>
                  <Button
                    leftIcon={<MdAdsClick />}
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    variant="solid"
                    color="white"
                    borderRadius="12px"
                    mr="5px"
                    onClick={activePostAds}
                  >
                    Ads P2P
                  </Button>
                </Flex>

                <Box pt="6" pr="20px" w="80%">
                  <Text fontSize="md">
                    Create a p2p Ads and for each person who shares and helps
                    you reach more public, you will have to pay an amount
                    designated by you
                  </Text>
                </Box>

                <Flex flexDirection="row" pt="7">
                  <Avatar
                    size="md"
                    src={transformToIpfsUrl(
                      defaultProfile?.picture?.original?.url
                    )}
                  />

                  <Textarea
                    mx={5}
                    name="post"
                    placeholder='What"s on your mind?'
                    rows={4}
                    resize="none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />

                  <Button
                    leftIcon={<EditIcon />}
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    variant="solid"
                    color="white"
                    mr={20}
                    borderRadius="12px"
                    w={36}
                    onClick={onOpenPost}
                  >
                    Post
                  </Button>
                </Flex>

                <Wav3sPostModal
                  isOpen={isOpenPost}
                  onClose={onClosePost}
                  handle={defaultProfile?.handle}
                  address={address}
                  profileId={defaultProfile?.id}
                  gasFee={gasFee}
                  priceFeed={1}
                  maticBalance={maticBalance}
                  reward={Number(reward)}
                  numbersOfReplys={Number(replys)}
                  content={content}
                />

                <Flex flexDirection="row" pt="5" pl="14">
                  <Box pl={3}>
                    <Text fontWeight={600}>Coin</Text>

                    <HStack mt="8px">
                      <Image
                        src="../assets/logos/wrapped-matic-logo.png"
                        w="6"
                        h="6"
                      />
                      <Text fontSize={14} paddingLeft={2}>
                        WMATIC
                      </Text>
                    </HStack>
                  </Box>

                  <Box pl="10">
                    <Text fontWeight={600}>Reward</Text>
                    <NumberInput
                      w={32}
                      value={reward}
                      onChange={(e) => setReward(e)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>

                  <Box pl="10">
                    <Text fontWeight={600}>Numbers of reply</Text>
                    <NumberInput
                      w={32}
                      value={replys}
                      onChange={(e) => setReplys(e)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Flex>
              </>
            )}
          </Box>
        </Box>

        <Box
          bg="white"
          ml="70px"
          mt="7"
          w="35%"
          pb="32"
          border="1px"
          borderColor="#E0E0E3"
          borderRadius="10px"
        >
          <Box pt="8" pl="8" pr="8">
            <Text
              fontSize="4xl"
              fontWeight="700"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              bgClip="text"
              width="-webkit-fit-content"
            >
              Balance
            </Text>

            <Text fontSize="lg" fontWeight="bold" pt={6}>
              Contract balance
            </Text>

            <Link href="https://app.uniswap.org/#/swap" isExternal>
              <Text fontSize="sm" color="#8B5CF6" fontWeight={400}>
                Need WMatic? lets swap 🦄
              </Text>
            </Link>

            <BalanceWallet
              maticBalance={maticBalance}
              wmaticBalance={wmaticBalance}
              awmaticBalance={awmaticBalance}
              wethBalance={wethBalance}
              gasFee={gasFee}
              priceFeed={priceFeed}
              usdcBalance={usdcBalance}
              daiBalance={daiBalance}
              touBalance={touBalance}
            />

            <BalanceGlobalBudget
              globalBudgetWmatic={globalBudgetWmatic}
              globalBudgetWEth={globalBudgetWEth}
              globalBudgetDai={globalBudgetDai}
              globalBudgetUsdc={globalBudgetUsdc}
              globalBudgetTou={globalBudgetTou}
            />

            <Center pt="3" pb="5">
              <Button
                bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                p="3"
                onClick={onOpen}
              >
                <Text fontWeight="600" fontSize="16px" color="white">
                  Deposit
                </Text>
              </Button>
            </Center>

            <DepositModal
              isOpen={isOpen}
              onClose={onClose}
              handle={defaultProfile?.handle}
              amount={0}
              profileId={defaultProfile?.id}
              gasFee={gasFee}
              priceFeed={1}
              maticBalance={maticBalance}
              wmaticBalance={wmaticBalance}
              awmaticBalance={0}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
