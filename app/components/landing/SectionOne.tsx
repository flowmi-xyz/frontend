import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";

const SectionOne = () => {
  return (
    <Box bg="white" width="100%">
      <Center>
        <Image
          src="../assets/images/blur.png"
          alt="blur"
          zIndex="0"
          position="absolute"
          top={["80px", "50px", "50px", "50px"]}
          left={["0px", "20px", "20px", "20px"]}
          w={["40%", "20%", "20%", "20%"]}
        />
      </Center>

      <Image
        src="../assets/images/blur.png"
        alt="blur"
        zIndex="0"
        position="absolute"
        top="180px"
        right={["0px", "20px", "20px", "20px"]}
        w={["40%", "20%", "20%", "20%"]}
      />

      <Center>
        <Flex
          flexDirection={"column"}
          alignItems="center"
          pt="10"
          pl="20"
          pr="20"
        >
          {" "}
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize="80px"
            lineHeight="120%"
            color="white"
            p="30"
            opacity="0"
          >
            .
          </Text>
          <Text
            textAlign="center"
            fontWeight="1200"
            fontSize={["80px", "110px", "90px"]}
            lineHeight={["48px", "66px", "66px"]}
            color="black"
            zIndex="1"
          >
            Welcome to{" "}
            <Text
              as="span"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              bgClip="text"
            >
              Social DeFi
            </Text>
          </Text>
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize="26px"
            lineHeight="120%"
            color="white"
            p="45"
            opacity="0"
          >
            .
          </Text>
          <Text
            fontSize={["24px", "29px", "29px"]}
            lineHeight={["21.6px", "28.8px", "28.8ppx"]}
            color="grayLetter"
            textAlign="center"
            marginTop={"23px"}
            width={["90%", "600px", "600px"]}
            zIndex="1"
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
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize="26px"
            lineHeight="120%"
            color="white"
            p="2"
            opacity="0"
          >
            .
          </Text>
          <Box
            width="80%"
            height="2px"
            bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
            zIndex="1"
            marginTop="50px"
          />
          {/* <Image src="../assets/images/phone.png" alt="phone" zIndex="1" /> */}
        </Flex>
      </Center>
    </Box>
  );
};

export default SectionOne;
