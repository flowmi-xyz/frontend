// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import React from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/navbar/NavbarConnectedDesktop";
import CreateProfileModal from "~/components/transactions/CreateProfileModal";
import { changeHeaders, lensClient } from "~/web3/lens/lens-client";
import { getBalanceFromAddress } from "~/web3/etherservice";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

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

  const wmaticBalance = await getBalanceFromAddress(address);

  return { address, defaultProfile, accessToken, wmaticBalance };
};

export default function Index() {
  const { address, accessToken, wmaticBalance, defaultProfile } =
    useLoaderData();

  const [handle, setHandle] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangehandle = (event: any) => {
    setHandle(event.target.value);
  };

  changeHeaders(accessToken);

  return (
    <Box>
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
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
        <Text fontWeight="600" fontSize="36px" color="black" pb="3">
          Create profile
        </Text>

        <Alert status="info" borderRadius="10px">
          <AlertIcon />
          You only need a name for your profile. Your profile name must be more
          than 5 characters.
        </Alert>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="5">
          handle
        </Text>
        <InputGroup size="md">
          <Input
            placeholder="example"
            value={handle}
            onChange={handleChangehandle}
          />
          <InputRightAddon children=".test" />
        </InputGroup>

        {/* <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          profile picture
        </Text>
        <InputGroup size="md">
          <Input placeholder="null" isDisabled />
        </InputGroup> */}

        {/* <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          follow NFT
        </Text>
        <Select placeholder="null"></Select> */}

        {/* <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          follow Module
        </Text>
        <Select placeholder="null">
          {/* <option value="null">null</option>
          <option value="FlowmiFollowModule">FlowmiFollowModule</option> 
        </Select> */}

        <Center>
          <Button
            bg="lens"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mt="10"
            onClick={onOpen}
            disabled={handle === "" || handle.length < 5}
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
        </Center>

        <CreateProfileModal
          isOpen={isOpen}
          onClose={onClose}
          handle={handle}
          wmaticBalance={wmaticBalance}
        />
      </Box>
    </Box>
  );
}
