import {
  Box,
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
} from "@chakra-ui/react";

import { MdAccountBalanceWallet } from "react-icons/md";

type BalanceProps = {
  wmaticBalanceContract: number;

  // wethBalanceContract: number;
  // daiBalanceContract: number;
  // usdcBalanceContract: number;
  // touBalanceContract: number;
  // gasFee: any;
  // priceFeed: number;
};

const BalanceContract = ({
  wmaticBalanceContract,
}: // wethBalanceContract,

// touBalanceContract,
// usdcBalanceContract,
// daiBalanceContract,
// gasFee,
// priceFeed,
BalanceProps) => {
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
            Your Balance in Polygon Mumbai
          </Text>
          <Image src="../assets/logos/polygon-matic-logo.png" w="6" h="6" />
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
              {/* {parseFloat(maticBalanceContract?.toFixed(4)) &&
              parseFloat(maticBalanceContract?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack>
                        <Image
                          src="../assets/logos/polygon-matic-logo.png"
                          w="6"
                          h="6"
                        />
                        <Text fontSize={14} paddingLeft={2}>
                          MATIC
                        </Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{maticBalanceContract?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )} */}
              {parseFloat(wmaticBalanceContract?.toFixed(4)) &&
              parseFloat(wmaticBalanceContract?.toFixed(4)) > 0 ? (
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
                    <Td isNumeric>{wmaticBalanceContract?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}

              {/* {parseFloat(daiBalanceContract?.toFixed(4)) &&
              parseFloat(daiBalanceContract?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack>
                        <Image src="../assets/logos/di.png" w="6" h="6" />
                        <Text fontSize={14}>DAI</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{daiBalanceContract?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {parseFloat(usdcBalanceContract?.toFixed(4)) &&
              parseFloat(usdcBalanceContract?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack ml={-2}>
                        <Image src="../assets/logos/usdc.png" w="10" h="10" />
                        <Text fontSize={14}>USDC</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{usdcBalanceContract?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}
              {parseFloat(wethBalanceContract?.toFixed(4)) &&
              parseFloat(wethBalanceContract?.toFixed(4)) > 0 ? (
                <>
                  <Tr>
                    <Td>
                      <HStack ml={-2}>
                        <Image src="../assets/logos/weth.png" w="10" h="10" />
                        <Text fontSize={14}>WETH</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric>{wethBalanceContract?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )}

              {parseFloat(touBalanceContract?.toFixed(4)) &&
              parseFloat(touBalanceContract?.toFixed(4)) > 0 ? (
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
                    <Td isNumeric>{touBalanceContract?.toFixed(4)}</Td>
                  </Tr>
                </>
              ) : (
                <></>
              )} */}
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

export default BalanceContract;
