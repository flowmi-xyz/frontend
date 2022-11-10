// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  return { address };
};

export default function MenuInternal() {
  const { address } = useLoaderData();

  return (
    <Box>
      <NavbarConnected address={address} authenticatedInLens={false} />

      <Box maxWidth="600px" m="auto" pt="3" pb="3">
        <Text fontWeight="600" fontSize="36px" color="black">
          Configurations
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
        </HStack>
      </Box>
    </Box>
  );
}
