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

  return { address, defaultProfile };
};

export default function MenuInternal() {
  const { address, defaultProfile } = useLoaderData();

  return (
    <Box>
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      <Box maxWidth="1000px" m="auto" pt="3" pb="3">
        <Box>
          <Text
            fontWeight="700"
            fontSize={["40px", "55px", "45px"]}
            lineHeight={["48px", "66px", "66px"]}
            color="black"
            pt="50px"
          >
            Interact with{" "}
            <Text as="span" color="lensDark">
              Lens Protocol
            </Text>
          </Text>

          <Text
            textAlign="justify"
            fontSize="22px"
            lineHeight="28.8ppx"
            color="grayLetter"
            pt="5"
          >
            The Lens Protocol is a Web3 social graph on the Polygon
            Proof-of-Stake blockchain. It is designed to empower creators to own
            the links between themselves and their community, forming a fully
            composable, user-owned social graph.
          </Text>

          <Text fontSize="22px" lineHeight="28.8ppx" color="grayLetter" pt="5">
            Mint a profile, set a profile as a default and change your follow
            module to the special one created by{" "}
            <Text
              as="span"
              fontWeight="700"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              bgClip="text"
            >
              Social DeFi team
            </Text>
          </Text>
        </Box>

        <Text fontWeight="600" fontSize="16px" color="black" pt="10">
          You can view your followNFT in OpenSea
        </Text>

        <ChakraLink href="https://testnets.opensea.io/es/account?tab=private">
          <Button
            bg="white"
            border="1px solid #E5E5E5"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mt="3"
          >
            <Flex>
              <Box w="120px">
                <Image
                  src="../assets/logos/opensea-tipo.png"
                  alt="lens"
                  my="-5px"
                  mx="-5px"
                />
              </Box>
            </Flex>
          </Button>
        </ChakraLink>

        <Text fontWeight="600" fontSize="36px" color="black" pt="10">
          Functions in Lens Hub
        </Text>

        <HStack>
          <Link to="/create-profile">
            <Button
              bg="lens"
              borderRadius="10px"
              boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
              mt="3"
            >
              <Flex>
                <Box w="40px" h="40px">
                  <Image
                    src="../assets/LOGO__lens_ultra small icon.png"
                    alt="lens"
                    my="-5px"
                    mx="-5px"
                  />
                </Box>

                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="lensDark"
                  m="auto"
                >
                  Create profile
                </Text>
              </Flex>
            </Button>
          </Link>

          <Link to="/set-default">
            <Button
              bg="lens"
              borderRadius="10px"
              boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
              mt="3"
            >
              <Flex>
                <Box w="40px" h="40px">
                  <Image
                    src="../assets/LOGO__lens_ultra small icon.png"
                    alt="lens"
                    my="-5px"
                    mx="-5px"
                  />
                </Box>

                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="lensDark"
                  m="auto"
                >
                  Set default profile
                </Text>
              </Flex>
            </Button>
          </Link>

          <Link to="/set-follow-module">
            <Button
              bg="lens"
              borderRadius="10px"
              boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
              mt="3"
            >
              <Flex>
                <Box w="40px" h="40px">
                  <Image
                    src="../assets/LOGO__lens_ultra small icon.png"
                    alt="lens"
                    my="-5px"
                    mx="-5px"
                  />
                </Box>

                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="lensDark"
                  m="auto"
                >
                  Set follow module
                </Text>
              </Flex>
            </Button>
          </Link>

          {/* <Link to="/whitelist-contract">
            <Button
              bg="lens"
              borderRadius="10px"
              boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
              mt="3"
            >
              <Flex>
                <Box w="40px" h="40px">
                  <Image
                    src="../assets/LOGO__lens_ultra small icon.png"
                    alt="lens"
                    my="-5px"
                    mx="-5px"
                  />
                </Box>

                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="lensDark"
                  m="auto"
                >
                  Whitelist contract
                </Text>
              </Flex>
            </Button>
          </Link> */}
        </HStack>
      </Box>
    </Box>
  );
}
