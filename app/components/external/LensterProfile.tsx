import { Box, Divider, Flex, Text } from "@chakra-ui/react";

const LensterProfile = () => {
  return (
    <Box
      m="5"
      p="10"
      border="1px"
      borderColor="#E0E0E3"
      borderRadius="10px"
      width="300px"
    >
      Image
      <Text
        fontWeight="600"
        fontSize="24px"
        lineHeight="120%"
        letterSpacing="-0.03em"
        color="black"
      >
        Cristian Valdivia
      </Text>
      <Text
        fontWeight="700"
        fontSize="14px"
        bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
        bgClip="text"
        pt="1"
      >
        @cristianvaldivia.lens
      </Text>
      <Flex pt="5" justifyContent="space-between">
        <Box>
          <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="black"
          >
            24
          </Text>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="grayLetter"
          >
            Followers
          </Text>
        </Box>

        <Box>
          <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="black"
          >
            34
          </Text>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="grayLetter"
          >
            Following
          </Text>
        </Box>
      </Flex>
      <Divider pt="3" />
      <Flex pt="3">
        <Text>#</Text>
        <Text>0x01</Text>
      </Flex>
      <Flex>
        <Text>9</Text>
        <Text>Chile</Text>
      </Flex>
      <Flex>
        <Text>#</Text>
        <Text>cristianvaldivia.eth</Text>
      </Flex>
      <Flex>
        <Text>#</Text>
        <Text>www.cristianvaldivia.cl</Text>
      </Flex>
      <Flex>
        <Text>#</Text>
        <Text>cris___stark</Text>
      </Flex>
    </Box>
  );
};

export default LensterProfile;
