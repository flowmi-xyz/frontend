import {
  Box,
  Button,
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
import ClaimTokens from "./transactions/ClaimTokensModal";

type BalanceProps = {
  maticBalance: number;
  wmaticBalance: number;
  awmaticBalance: number;
  gasFee: any;
  priceFeed: number;
};

const Balance = ({
  maticBalance,
  wmaticBalance,
  awmaticBalance,
  gasFee,
  priceFeed,
}: BalanceProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

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
                <Td isNumeric>{maticBalance.toFixed(4)}</Td>
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
                <Td isNumeric>{wmaticBalance?.toFixed(4)}</Td>
              </Tr>

              <Tr>
                <Td>
                  <HStack>
                    <Image
                      src="../assets/logos/aave-aave-logo.png"
                      w="6"
                      h="6"
                    />
                    <Text fontSize={14}>aWMATIC</Text>
                  </HStack>
                </Td>
                <Td isNumeric>{awmaticBalance?.toFixed(4)}</Td>
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

      <Center pt="3" pb="5">
        <Button
          bg="first"
          borderRadius="10px"
          boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
          p="3"
          onClick={onOpen}
        >
          <Text fontWeight="600" fontSize="16px" color="white">
            Claim your aWMATIC
          </Text>
        </Button>
      </Center>

      <ClaimTokens
        isOpen={isOpen}
        onClose={onClose}
        profileId={"1"}
        handle={"2"}
        amount={0}
        gasFee={gasFee}
        priceFeed={priceFeed}
        maticBalance={maticBalance}
        wmaticBalance={wmaticBalance}
        awmaticBalance={awmaticBalance}
      />
    </>
  );
};

export default Balance;
