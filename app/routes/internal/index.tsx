// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import React from "react";

import {
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
import NavbarConnected from "~/components/NavbarConnected";
import CreateProfileModal from "~/components/CreateProfileModal";
import { changeHeaders } from "~/web3/lens/lens-client";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const accessToken = session.get("accessToken");

  const profile = {
    handle: "TODO",
  };

  return { address, profile, accessToken };
};

export default function Index() {
  const { address, accessToken } = useLoaderData();

  const [handle, setHandle] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [followNFT, setFollowNFT] = React.useState(null);
  const [followModule, setFollowModule] = React.useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangehandle = (event: any) => {
    setHandle(event.target.value);
  };

  changeHeaders(accessToken);

  return (
    <Box>
      <NavbarConnected address={address} authenticatedInLens={false} />

      <Box maxWidth="600px" m="auto" pt="3" pb="3">
        <Text fontWeight="600" fontSize="36px" color="black" pb="3">
          Create profile
        </Text>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3">
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

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          profile picture
        </Text>
        <InputGroup size="md">
          <Input placeholder="null" isDisabled />
        </InputGroup>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          follow NFT
        </Text>
        <Select placeholder="null"></Select>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          follow Module
        </Text>
        <Select placeholder="null">
          {/* <option value="null">null</option>
          <option value="FlowmiFollowModule">FlowmiFollowModule</option> */}
        </Select>

        <Center>
          <Button
            bg="lens"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mt="10"
            onClick={onOpen}
            disabled={handle === ""}
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
          profileId={"2"}
          handle={handle}
        />
      </Box>
    </Box>
  );
}
