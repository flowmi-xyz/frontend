// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { lensClient } from "~/web3/lens/lens-client";

import { getSession } from "~/bff/session";

// UI components
import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import { GetDefaultProfile, GetProfiles } from "~/web3/lens/graphql/generated";
import WhitelistContractModal from "~/components/WhiteListContractModal";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  // Get profiles from Lens
  const variables: any = {
    request: { ownedBy: [address], limit: 20 },
  };

  const getProfilesResponse = await lensClient.request(GetProfiles, variables);

  const profiles = getProfilesResponse.profiles.items;

  // Get default profile from Lens
  const variablesForDefault: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lensClient.request(
    GetDefaultProfile,
    variablesForDefault
  );

  const defaultProfile = responseProfile.defaultProfile;

  return { address, profiles, defaultProfile };
};

export default function WhitelistContract() {
  const { address, profiles, defaultProfile } = useLoaderData();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [addressContract, setaddressContract] = React.useState("");
  //   const [defaultHandle, setDefaultHandle] = React.useState("");

  const contracts = [
    {
      name: "FlowmiFollowModule v0.11",
      address: "0x3F5a80275E2DE94Be2717487370b47a38Cc4CbfA",
    },
  ];

  const handleWhitelistContract = (index: number) => {
    setaddressContract(contracts[index].address);

    onOpen();
  };

  return (
    <Box bg="#FAFAF9">
      <NavbarConnected
        address={address}
        authenticatedInLens={false}
        handle={defaultProfile?.handle}
      />

      <Box
        maxWidth="600px"
        m="auto"
        bg="white"
        border="1px"
        borderColor="#E0E0E3"
        borderRadius="10px"
        p="5"
        mt="5"
        mb="5"
      >
        <Text
          fontWeight="700"
          fontSize="18px"
          lineHeight="120%"
          color="black"
          my="auto"
        >
          Whitelist a contract
        </Text>

        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          my="auto"
          pt="3"
        >
          Add a contract to your whitelist to allow it to interact with your
          profile
        </Text>

        <Text
          fontWeight="600"
          fontSize="15px"
          lineHeight="120%"
          color="black"
          my="auto"
          pt="6"
        >
          Select contract
        </Text>

        <Box mt="3">
          {contracts.map((contract: any, index: number) => {
            return (
              <Box
                bg="grayBg"
                borderRadius="lg"
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
                p="2"
                key={contract.name}
                mb="5"
              >
                <Flex justify="space-between">
                  <HStack spacing="4">
                    <Image
                      src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/code-512.png"
                      borderRadius="lg"
                      boxSize="8"
                    />

                    <VStack>
                      <Text
                        fontWeight="600"
                        fontSize="16px"
                        lineHeight="100%"
                        letterSpacing="-0.03em"
                        bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                        bgClip="text"
                      >
                        {contract.name}
                      </Text>

                      <Text
                        fontWeight="600"
                        fontSize="16px"
                        lineHeight="100%"
                        letterSpacing="-0.03em"
                        bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                        bgClip="text"
                      >
                        {`${contract.address.slice(
                          0,
                          6
                        )} ... ${contract.address.slice(
                          contract.address.length - 4,
                          contract.address.length
                        )}`}
                      </Text>
                    </VStack>
                  </HStack>

                  <Button
                    bg="lens"
                    borderRadius="10px"
                    boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                    onClick={() => handleWhitelistContract(index)}
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
                </Flex>
              </Box>
            );
          })}

          <WhitelistContractModal
            isOpen={isOpen}
            onClose={onClose}
            address={addressContract}
            // profileId={defaultProfileSelect}
            // handle={defaultHandle}
          />
        </Box>
      </Box>
    </Box>
  );
}
