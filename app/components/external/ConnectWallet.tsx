import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Img,
  Text,
} from "@chakra-ui/react";

import { AiFillCheckCircle } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";

const ConnectWallet = () => {
  return (
    <>
      <Center mt={["10", "20", "50", "100"]}>
        <Img
          src="https://previews.123rf.com/images/fordzolo/fordzolo1506/fordzolo150600296/41026708-example-white-stamp-text-on-red-backgroud.jpg"
          w={24}
          h={24}
        />
      </Center>

      <Center mt={["0", "20", "50", "50"]}>
        <Box
          bg={"white"}
          borderRadius={15}
          height={["300px", "356px", "356px"]}
          width={["80%", "80%", "500px"]}
        >
          <Center margin={5}>
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
          </Center>
        </Box>
      </Center>

      <>
        <Center mt="5">
          <HStack>
            <Img src="./assets/poap-logo.png" w={14} />

            <Icon as={BsPlusLg} color="lensDark" />

            <Img src="./assets/lens-logo.png" w={14} />
          </HStack>
        </Center>

        <Center mt="12">
          <Box
            width={"100%"}
            borderRadius={20}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          >
            <Center paddingTop={5}>
              <Button
                bgGradient="linear(to-l, poapDark, pink.500)"
                color="white"
                borderRadius={"70px"}
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                // onClick={handleLoginWalletConnect}
              >
                <Text fontWeight={500} fontSize={"18px"} lineHeight={"21.6px"}>
                  Connect your wallet
                </Text>
              </Button>
            </Center>

            <HStack margin={"auto"} paddingTop={5}>
              <Icon as={MdVisibility} margin={5} color="poapDark" w={8} h={8} />

              <Text color={"grayLetter"} fontSize={"14"} paddingRight={5}>
                View only permission. We will never do anything withot your
                approval
              </Text>
            </HStack>

            <HStack>
              <Icon
                as={AiFillCheckCircle}
                margin={5}
                color="lensDark"
                w={8}
                h={8}
              />

              <Text color={"grayLetter"} fontSize={"14"}>
                There are currently{" "}
                <Text
                  as="span"
                  bgGradient="linear(to-l, gradient1, gradient2)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  Social DeFi users{" "}
                </Text>
                frens verifying in Lens, join us!
              </Text>
            </HStack>
          </Box>
        </Center>
      </>
    </>
  );
};

export default ConnectWallet;
