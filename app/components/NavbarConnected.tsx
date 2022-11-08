import { Link } from "@remix-run/react";

import { Flex, Text, Button } from "@chakra-ui/react";

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
  return (
    <Flex
      justify="space-around"
      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
      height="65px"
      align="center"
      alignItems="center"
      width="100%"
    >
      <Link to="/dashboard/feed">
        <Text fontWeight="700" fontSize="20" color="white">
          Social Defi
        </Text>
      </Link>

      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Flex display="flex" align="center">
          {authenticatedInLens && (
            <Button
              bg="lens"
              borderRadius="10px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            >
              <Text fontWeight="600" fontSize="14px" color="lensDark">
                @{handle}
              </Text>
            </Button>
          )}

          <Button
            bg="first"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            ml="20px"
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
