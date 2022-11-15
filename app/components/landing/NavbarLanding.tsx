import { Link } from "@remix-run/react";

import { Flex, Text, Button, Heading } from "@chakra-ui/react";

const NavbarLanding = () => {
  return (
    <Flex
      justify="space-around"
      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
      height="76px"
      align="center"
      alignItems="center"
      width="100%"
    >
      <Link to="/">
        <Text fontSize="24" lineHeight="21.6px" color="white">
          Social Defi
        </Text>
      </Link>

      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Flex display="flex" align="center">
          <Link to="/login">
            <Button
              bg="white"
              borderRadius="10px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            >
              <Heading
                fontWeight="700"
                fontSize="16"
                lineHeight="21.6px"
                color="black"
              >
                Launch App
              </Heading>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavbarLanding;
