// BFF components
import { useSubmit } from "@remix-run/react";

// UI components
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Img,
  Text,
} from "@chakra-ui/react";

// icons
import { TbHeartHandshake } from "react-icons/tb";
import { MdVerifiedUser, MdVisibility } from "react-icons/md";

// methods
import { loginWithMetamask } from "~/web3/metamask";

type ConnectWalletProps = {
  users: number;
};

const ConnectWallet = ({ users }: ConnectWalletProps) => {
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Flex flexDirection="column">
        <Text
          textAlign="center"
          fontWeight="700"
          fontSize="25"
          lineHeight="30px"
        >
          Connect your wallet to
        </Text>

        <Center pt="2">
          <Img src="./assets/logos/polygon-tipo.png" h="14" />
        </Center>

        <Text
          textAlign="center"
          fontWeight="700"
          fontSize="25"
          lineHeight="30px"
          pt="3"
        >
          Mumbai
        </Text>

        <Center pt="50">
          <Box
            borderRadius="20"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            width="500px"
          >
            <Center pt="5">
              <Button
                bg="third"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleLogin}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="white"
                >
                  Connect wallet
                </Text>
              </Button>
            </Center>

            <HStack pt="5" pr="5" pl="5">
              <Icon as={MdVisibility} margin="5" color="first" w="7" h="7" />

              <Text color="grayLetter" fontSize="14" paddingRight="5">
                View only permission. We will never do anything without your
                approval
              </Text>
            </HStack>

            <HStack pr="5" pl="5">
              <Icon as={MdVerifiedUser} margin="5" color="first" w="7" h="7" />

              <Text color="grayLetter" fontSize="14">
                Contracts verified
              </Text>
            </HStack>

            <HStack pr="5" pl="5">
              <Icon
                as={TbHeartHandshake}
                margin="5"
                color="first"
                w="7"
                h="7"
              />

              <Text color="grayLetter" fontSize="14">
                Trusted by {users} users
              </Text>
            </HStack>
          </Box>
        </Center>
      </Flex>
    </Box>
  );
};

export default ConnectWallet;
