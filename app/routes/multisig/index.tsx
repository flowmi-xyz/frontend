// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

// UI components
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import { getTransactionCount } from "~/web3/multising";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  // Get default profile from Lens
  const variables: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lensClient.request(
    GetDefaultProfile,
    variables
  );

  const defaultProfile = responseProfile.defaultProfile;

  const transactionsCount = await getTransactionCount();

  return { address, defaultProfile, transactionsCount };
};

export default function Multisig() {
  const { address, defaultProfile, transactionsCount } = useLoaderData();

  console.log("transactionsCount", transactionsCount);

  return (
    <>
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      <Box maxWidth="1000px" m="auto" pb="3">
        <Box>
          <Text
            fontWeight="700"
            fontSize={["40px", "55px", "45px"]}
            lineHeight={["48px", "66px", "66px"]}
            color="black"
            pt="5"
            m="auto"
          >
            Multisig Wallet
          </Text>

          <Text
            textAlign="justify"
            fontSize="22px"
            lineHeight="28.8ppx"
            color="grayLetter"
            pt="5"
          >
            Balance
          </Text>
        </Box>
      </Box>
    </>
  );
}
