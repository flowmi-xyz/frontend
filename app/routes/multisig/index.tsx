// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";
import { getTransactionCount } from "~/web3/multising";

import { truncateAddress } from "~/web3/etherservice";

// UI components
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  Center,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";

import { BsCircle, BsCheckCircleFill, BsXCircle } from "react-icons/bs";

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
        <Text
          fontWeight="700"
          fontSize={["40px", "55px", "45px"]}
          lineHeight={["48px", "66px", "66px"]}
          color="black"
          pt="5"
          textAlign="center"
        >
          Multisig Wallet
        </Text>

        <Flex justify="space-around" pt="5">
          <Box>
            <Flex>
              <Image
                src="../assets/logos/wrapped-matic-logo.png"
                w="6"
                h="6"
                my="auto"
              />
              <Box>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  WMatic
                </Text>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  0.00
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Flex>
              <Image
                src="../assets/logos/wrapped-matic-logo.png"
                w="6"
                h="6"
                my="auto"
              />
              <Box>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  WETH
                </Text>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  0.00
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Flex>
              <Image
                src="../assets/logos/wrapped-matic-logo.png"
                w="6"
                h="6"
                my="auto"
              />
              <Box>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  USDC
                </Text>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  0.00
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Flex>
              <Image
                src="../assets/logos/wrapped-matic-logo.png"
                w="6"
                h="6"
                my="auto"
              />
              <Box>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  DAI
                </Text>
                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  1000.00
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>

        <Center>
          <Button mt="10">Submit transaction</Button>
        </Center>

        <Box pt="10">
          <Text
            fontWeight="700"
            fontSize="24px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="black"
            textAlign="center"
          >
            Transactions
          </Text>

          <TableContainer borderBottomRadius="10px">
            <Table colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>To</Th>
                  <Th>Asset</Th>

                  <Th isNumeric>Amount</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>
                    {truncateAddress(
                      "0x3aeC2276326CDC8E9a8A4351c338166e67105AC3"
                    )}
                  </Td>

                  <Td>
                    <HStack>
                      <Image
                        src="../assets/logos/wrapped-matic-logo.png"
                        w="6"
                        h="6"
                      />
                      <Text fontSize={14} paddingLeft={2}>
                        WMATIC
                      </Text>
                    </HStack>
                  </Td>
                  <Td isNumeric>1</Td>

                  <Td>
                    <HStack>
                      <Box width="50%" bg="white"></Box>
                      <Flex justify="space-around" width="50%">
                        <Icon as={BsCircle} color="gray" h="6" w="6" />
                        <Icon
                          as={BsCheckCircleFill}
                          color="green"
                          h="6"
                          w="6"
                        />
                        <Icon as={BsXCircle} color="red" h="6" w="6" />
                      </Flex>
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
