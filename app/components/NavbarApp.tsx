import { Link, useSubmit } from "@remix-run/react";

import { Flex, Text, Button } from "@chakra-ui/react";
import { loginWithMetamask } from "~/web3/metamask";

const NavbarApp = () => {
  const submit = useSubmit();

  const handleLogin = async () => {
    const address = await loginWithMetamask();

    const formData = new FormData();

    formData.append("address", address);
    formData.append("connected", "true");

    submit(formData, {
      action: "/login/?index",
      method: "post",
      encType: "application/x-www-form-urlencoded",
      replace: true,
    });
  };

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
        <Text fontWeight="700" fontSize="24" lineHeight="21.6px" color="white">
          Social DeFi
        </Text>
      </Link>

      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Flex display="flex" align="center">
          <Button
            bg="white"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            onClick={handleLogin}
            display={["none", "block", "block", "block"]}
          >
            <Text
              fontWeight="700"
              fontSize="14"
              lineHeight="120%"
              color="black"
            >
              Connect your wallet
            </Text>
          </Button>

          <Button
            bg="white"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            display={["block", "none", "none", "none"]}
            disabled
          >
            <Text
              fontWeight="700"
              fontSize="14"
              lineHeight="120%"
              color="black"
            >
              Connect your wallet
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavbarApp;
