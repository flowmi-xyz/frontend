// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";
import { getTransaction, getTransactionCount } from "~/web3/multising";

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
import NavbarConnected from "~/components/navbar/NavbarConnectedDesktop";

import MultisigStatus from "~/components/multisig/StatusComponent";

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

  const transaction = await getTransaction(0);

  return { address, defaultProfile, transactionsCount, transaction };
};

export default function Multisig() {
  const { address, defaultProfile, transactionsCount, transaction } =
    useLoaderData();

  console.log("transactionsCount", transactionsCount);
  console.log("transaction", transaction);

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
            fontSize="30px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="black"
            textAlign="center"
          >
            Transactions
          </Text>

          <TableContainer pt="5">
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
                  <Td>{transaction.id}</Td>
                  <Td>{truncateAddress(transaction.to)}</Td>

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
                  <Td isNumeric>{transaction.value.toFixed(4)}</Td>

                  <Td>
                    <MultisigStatus
                      numberOfConfirmations={transaction.numConfirmations}
                    />
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
