import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";

const SectionOne = () => {
  return (
    <Box bg={"#F1F4F6"} width="100%">
      <Center>
        <Flex flexDirection={"column"} alignItems="center">
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize={["40px", "55px", "45px"]}
            lineHeight={["48px", "66px", "66px"]}
            color="black"
            marginTop={["20px", "100px", "50px"]}
          >
            Welcome to the{" "}
            <Text
              as="span"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              bgClip="text"
            >
              Social DeFi
            </Text>
          </Text>

          <Text
            fontSize={["18px", "22px", "22px"]}
            lineHeight={["21.6px", "28.8px", "28.8ppx"]}
            color="grayLetter"
            textAlign="center"
            marginTop={"23px"}
            padding={["10px", "0px", "0px"]}
            width={["90%", "600px", "600px"]}
          >
            Use web3 social network and interact with Defi protocols at the same
            time{" "}
            <Text
              as="span"
              fontWeight="700"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              bgClip="text"
            >
              without realizing it
            </Text>
          </Text>

          <Image src="../assets/images/phone.png" alt="phone" />
        </Flex>
      </Center>
    </Box>
  );
};

export default SectionOne;
