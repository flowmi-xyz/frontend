// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import { WIDTH_FEED } from "~/style/theme";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const profile = {
    handle: "TODO",
  };

  return { address, profile };
};

export default function Index() {
  const { address } = useLoaderData();

  return (
    <Box>
      <NavbarConnected address={address} authenticatedInLens={false} />

      <Box maxWidth="600px" m="auto" pt="3" pb="3" width={WIDTH_FEED}>
        <Text fontWeight="600" fontSize="36px" color="black" pb="3">
          Create profile
        </Text>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3">
          handle
        </Text>
        <InputGroup size="md">
          <Input placeholder="example" />
          <InputRightAddon children=".test" />
        </InputGroup>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          profile picture
        </Text>
        <InputGroup size="md">
          <Input placeholder="https://example.com" />
        </InputGroup>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          follow NFT
        </Text>
        <Select placeholder="Select followNFTURI">
          <option value="null">null</option>
        </Select>

        <Text fontWeight="400" fontSize="20px" color="lensDark" pb="3" pt="10">
          follow Module
        </Text>
        <Select placeholder="Select followModule">
          <option value="null">null</option>
          <option value="FlowmiFollowModule">FlowmiFollowModule</option>
        </Select>

        <Center>
          <Button
            bg="lens"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mt="10"

            //   onClick={onOpenFollow}
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
      </Box>
    </Box>
  );
}
