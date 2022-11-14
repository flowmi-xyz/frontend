// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { lensClient } from "~/web3/lens/lens-client";

import { getSession } from "~/bff/session";

import getGasFee from "~/web3/gasfee";
import getPriceFeedFromFlowmi from "~/web3/social-defi/getPriceFeed";

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
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import { GetDefaultProfile, GetProfiles } from "~/web3/lens/graphql/generated";
import SetDefaultProfileModal from "~/components/transactions/SetDefaultProfileModal";
import { getBalanceFromAddress } from "~/web3/etherservice";
import { formatEther } from "~/utils/formatEther";

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

  const gasFee = await getGasFee();

  const priceFeed = await getPriceFeedFromFlowmi();

  const wmaticBalance = await getBalanceFromAddress(address);

  return {
    address,
    profiles,
    defaultProfile,
    gasFee,
    priceFeed,
    wmaticBalance,
  };
};

export default function SetDefault() {
  const {
    address,
    profiles,
    defaultProfile,
    gasFee,
    priceFeed,
    wmaticBalance,
  } = useLoaderData();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [defaultProfileSelect, setDefaultProfileSelect] = React.useState("");
  const [defaultHandle, setDefaultHandle] = React.useState("");

  const handleSetDefaultProfile = (index: number) => {
    setDefaultProfileSelect(profiles[index].id);
    setDefaultHandle(profiles[index].handle);

    onOpen();
  };

  return (
    <Box bg="#FAFAF9" height="100vh">
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
          Select default profile
        </Text>

        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          my="auto"
          pt="3"
        >
          Selecting your default account helps to display the selected profile
          across Lenster, you can change your default profile anytime.
        </Text>

        <Text
          fontWeight="600"
          fontSize="15px"
          lineHeight="120%"
          color="black"
          my="auto"
          pt="6"
        >
          Select profile
        </Text>

        <Box mt="3">
          {profiles.map((profile: any, index: number) => {
            return (
              <Box
                bg="grayBg"
                borderRadius="lg"
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
                p="2"
                key={profile.handle}
                mb="5"
              >
                <Flex align="center" justify="space-between">
                  <Link to={`/${profile.handle}`}>
                    <HStack spacing="4">
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSML8sGOxzk99KfXxskBKcqHiSraQj06axIl4QYw-wu2N3GEMg2eNCBcJZuwIQtwqkiHh8&usqp=CAU"
                        borderRadius="lg"
                        boxSize="8"
                      />
                      <Box>
                        <Text
                          fontWeight="600"
                          fontSize="16px"
                          lineHeight="100%"
                          letterSpacing="-0.03em"
                          bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                          bgClip="text"
                        >
                          @{profile.handle}
                        </Text>
                      </Box>
                    </HStack>
                  </Link>

                  <Button
                    bg="lens"
                    borderRadius="10px"
                    boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                    onClick={() => handleSetDefaultProfile(index)}
                    disabled={profile.id === defaultProfile?.id}
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
                </Flex>
              </Box>
            );
          })}

          <SetDefaultProfileModal
            isOpen={isOpen}
            onClose={onClose}
            profileId={defaultProfileSelect}
            handle={defaultHandle}
            gasFee={gasFee}
            priceFeed={priceFeed}
            wmaticBalance={wmaticBalance}
          />
        </Box>
      </Box>
    </Box>
  );
}
