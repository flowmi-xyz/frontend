import {
  Button,
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { MdAccountBalanceWallet } from "react-icons/md";

type BalanceProps = {
  globalBudgetWmatic: number;

  globalBudgetWEth: number;
  globalBudgetDai: number;
  globalBudgetUsdc: number;
  globalBudgetTou: number;
};

const BalanceGlobalBudget = ({
  globalBudgetWmatic,
  globalBudgetWEth,
  globalBudgetDai,
  globalBudgetUsdc,
  globalBudgetTou,
}: BalanceProps) => {
  return (
    <>
      <Box
        bg="white"
        border="1px"
        borderColor="#E0E0E3"
        borderRadius="10px"
        width="420px"
        mt="10"
      >
        <Flex p="5">
          <Icon as={MdAccountBalanceWallet} color="first" h="6" w="6" />
          <Text
            fontWeight="700"
            fontSize="18px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="first"
            pb="2"
            ml="2"
            mr="2"
          >
            Your Global Budget
          </Text>
        </Flex>

        <TableContainer borderBottomRadius="10px">
          <Table variant="striped" colorScheme="purple">
            <Thead>
              <Tr>
                <Th>Assets</Th>
                <Th isNumeric>Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {parseFloat(globalBudgetWmatic?.toFixed(4)) &&
              parseFloat(globalBudgetWmatic?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack>
                        <Image
                          src="../assets/logos/wrapped-matic-logo.png"
                          w="6"
                          h="6"
                        />{" "}
                        <Text fontSize={14}>WMATIC</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{globalBudgetWmatic?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}

              {parseFloat(globalBudgetDai?.toFixed(4)) &&
              parseFloat(globalBudgetDai?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack>
                        <Image src="../assets/logos/di.png" w="6" h="6" />
                        <Text fontSize={14}>DAI</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{globalBudgetDai?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {parseFloat(globalBudgetUsdc?.toFixed(4)) &&
              parseFloat(globalBudgetUsdc?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack ml={-2}>
                        <Image src="../assets/logos/usdc.png" w="10" h="10" />
                        <Text fontSize={14}>USDC</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{globalBudgetUsdc?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {parseFloat(globalBudgetWEth?.toFixed(4)) &&
              parseFloat(globalBudgetWEth?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack ml={-2}>
                        <Image src="../assets/logos/weth.png" w="10" h="10" />
                        <Text fontSize={14}>WETH</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{globalBudgetWEth?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}

              {parseFloat(globalBudgetTou?.toFixed(4)) &&
              parseFloat(globalBudgetTou?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack ml={-2}>
                        <Image
                          src="../assets/logos/toucanprotocol.png"
                          w="10"
                          h="10"
                        />
                        <Text fontSize={14}>Toucan Protocol</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{globalBudgetTou?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        {/* <Text
                fontWeight="500"
                fontSize="15px"
                lineHeight="120%"
                letterSpacing="-0.03em"
                color="lensDark"
                pb="1"
              >
                Whitelist module
              </Text> */}
      </Box>
    </>
  );
};

export default BalanceGlobalBudget;
