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
import { Link } from "@remix-run/react";

import { MdAccountBalanceWallet } from "react-icons/md";

type BalanceProps = {
  nativeBalance: number;
  wmaticBalance: number;
};

const Balance = ({ nativeBalance, wmaticBalance }: BalanceProps) => {
  return (
    <>
      <Link to={"/internal"}>
        <Box
          bg="white"
          border="1px"
          borderColor="first"
          borderRadius="10px"
          width="420px"
          mt="20"
          p="5"
        >
          <Flex>
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

          <TableContainer>
            <Table variant="striped" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th>Assets</Th>
                  <Th isNumeric>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
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
                  <Td isNumeric>
                    {/* {isLoading ? <Spinner color="third" /> : nativeBalance} */}
                    {nativeBalance.toFixed(4)}
                  </Td>
                </Tr>
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
                  <Td isNumeric>
                    {/* {isLoading ? <Spinner color="third" /> : tokenBalance} */}
                    {wmaticBalance?.toFixed(4)}
                  </Td>
                </Tr>
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
      </Link>
    </>
  );
};

export default Balance;
