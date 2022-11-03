import { Box, Center, Flex, Text } from "@chakra-ui/react";

const HotProfiles = () => {
  return (
    <>
      <Center>
        <Flex>
          <Text fontSize="32">🥇🥈🥉 </Text>

          <Text
            fontWeight="700"
            fontSize="18"
            lineHeight="120%"
            color="black"
            my="auto"
            ml="2"
          >
            Profiles with more tokens accumulated
          </Text>
        </Flex>
      </Center>

      <Center>
        <Box
          bg="white"
          width="500px"
          border="1px"
          borderColor="#E0E0E3"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="10px"
        >
          @fabri.lens
        </Box>
      </Center>
    </>
  );
};

export default HotProfiles;
