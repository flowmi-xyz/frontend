import { Box, Button, Center, HStack, Icon, Img, Text } from "@chakra-ui/react";

import { TbHeartHandshake } from "react-icons/tb";
import { MdVerifiedUser, MdVisibility } from "react-icons/md";

const ConnectWallet = () => {
  return (
    <>
      <Center>
        <Img
          src="https://previews.123rf.com/images/fordzolo/fordzolo1506/fordzolo150600296/41026708-example-white-stamp-text-on-red-backgroud.jpg"
          w={24}
          h={24}
        />
      </Center>

      <Text
        textAlign="center"
        fontWeight={700}
        fontSize={"25"}
        lineHeight={"30px"}
      >
        Social verification in{" "}
        <Text as="span" color="lensDark">
          Lens Protocol
        </Text>{" "}
        with{" "}
        <Text as="span" color="poap">
          POAPs
        </Text>
      </Text>

      <Text
        textAlign="center"
        fontWeight="400"
        fontSize={"18"}
        lineHeight={"21.6px"}
        color="grayLetter"
      >
        Connect with your wallet to start to use Social DeFi
      </Text>

      <Center paddingTop="5">
        <Box
          borderRadius="20"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          width="500px"
        >
          <Center paddingTop="5">
            <Button
              bg="third"
              borderRadius="10px"
              boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
              // onClick={handleLoginWalletConnect}
            >
              <Text
                fontWeight={500}
                fontSize={"18px"}
                lineHeight={"21.6px"}
                color="white"
              >
                Connect your wallet
              </Text>
            </Button>
          </Center>

          <HStack pt="5" pr="5" pl="5">
            <Icon as={MdVisibility} margin={5} color="first" w={8} h={8} />

            <Text color={"grayLetter"} fontSize={"14"} paddingRight={5}>
              View only permission. We will never do anything without your
              approval
            </Text>
          </HStack>

          <HStack pr="5" pl="5">
            <Icon as={TbHeartHandshake} margin={5} color="first" w={8} h={8} />

            <Text color={"grayLetter"} fontSize={"14"}>
              Trusted by 0 users
            </Text>
          </HStack>

          <HStack pr="5" pl="5">
            <Icon as={MdVerifiedUser} margin={5} color="first" w={8} h={8} />

            <Text color={"grayLetter"} fontSize={"14"}>
              Contracts verified
            </Text>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default ConnectWallet;
