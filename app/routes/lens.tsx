// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  return address;
};

export default function AuthLens() {
  const address = useLoaderData();

  return (
    <Box bg="#FAFAF9" height="100vh">
      <NavbarConnected address={address} authenticatedInLens={false} />

      <Text
        fontWeight="700"
        fontSize="24px"
        lineHeight="120%"
        color="black"
        textAlign="center"
        mt="10"
      >
        Please sign the message
      </Text>

      <Text textAlign={"center"} mt="3">
        This is your first time in Social DeFi. We need you sign the message
      </Text>

      <Text
        fontWeight="500"
        fontSize="13px"
        lineHeight="120%"
        color="grayLetter"
        textAlign="center"
        mt="2"
      >
        Social DeFi uses this signature to verify that you're the owner of this
        address
      </Text>

      <Center mt="10">
        <Button
          bg="lens"
          borderRadius="10px"
          boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
          // onClick={handleLogin}
        >
          <Flex>
            <Box bg="lens" w="40px" h="40px">
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
              Sign in with Lens
            </Text>
          </Flex>
        </Button>
      </Center>
    </Box>
  );
}
