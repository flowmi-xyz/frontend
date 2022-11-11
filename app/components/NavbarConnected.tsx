import { Link } from "@remix-run/react";

import { Flex, Text, Button, Box, HStack, Input, Icon } from "@chakra-ui/react";
import ChainButton from "./external/chainButton/ChainButton";

import { AiOutlineSearch } from "react-icons/ai";

type NavbarConnectedProps = {
  address: string;
  authenticatedInLens: boolean;
  handle?: string;
};

const NavbarConnected = ({
  address,
  authenticatedInLens,
  handle,
}: NavbarConnectedProps) => {
  const handleSearch = () => {
    console.log("search");
  };

  return (
    <Flex
      justify="space-around"
      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
      height="65px"
      align="center"
      alignItems="center"
      width="100%"
    >
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Link to="/dashboard/feed">
          <Text fontWeight="700" fontSize="20" color="white">
            Social Defi
          </Text>
        </Link>

        <Box mt="20px" ml="15px" mb="18px" mr="15px">
          <HStack>
            <Box width="330px">
              <Input
                // value={value}
                // onChange={handleChange}
                placeholder="Find your friends"
                borderRadius="10"
                backgroundColor="#E3E3E4"
              />
            </Box>

            <Button onClick={handleSearch}>
              <Icon fontSize="4xl" color="gradient1" as={AiOutlineSearch} />
            </Button>
          </HStack>
        </Box>
      </Flex>

      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Flex display="flex" align="center">
          <ChainButton />

          {authenticatedInLens && (
            <Link to={`/${handle}`} prefetch="intent">
              <Button
                bg="lens"
                borderRadius="10px"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                mr="5"
              >
                <Text fontWeight="600" fontSize="14px" color="lensDark">
                  @{handle}
                </Text>
              </Button>
            </Link>
          )}

          <Button
            bg="first"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          >
            <Text fontSize="14px" color="white">
              {`${address.slice(0, 6)} ... ${address.slice(
                address.length - 4,
                address.length
              )}`}
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavbarConnected;
