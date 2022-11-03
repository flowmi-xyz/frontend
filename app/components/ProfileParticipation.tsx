import { Box, Center, Flex, Text } from "@chakra-ui/react";

const ProfileParticipation = () => {
  return (
    <>
      <Box width="924px" m="auto" p="3" mt="5">
        <Text
          fontWeight="700"
          fontSize="18"
          lineHeight="120%"
          color="black"
          my="auto"
          ml="2"
          textAlign={"start"}
        >
          Your participation in Social DeFi
        </Text>
      </Box>

      <Center pb="10">
        <Box
          bg="#ECE9F7"
          border="1px"
          borderColor="#824EF0"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="10px"
          width="924px"
        >
          <Flex justifyContent="space-around" p="12">
            <Box>
              <Text
                textAlign="center"
                fontWeight="700"
                fontSize="36px"
                letterSpacing="-0.03em"
                bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                bgClip="text"
              >
                11 MATIC
              </Text>

              <Text
                textAlign="center"
                fontWeight="700"
                fontSize="16px"
                letterSpacing="-0.03em"
                color="black"
              >
                Winned
              </Text>
            </Box>

            <Box>
              <Text
                textAlign="center"
                fontWeight="700"
                fontSize="36px"
                letterSpacing="-0.03em"
                bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                bgClip="text"
              >
                8
              </Text>

              <Text
                textAlign="center"
                fontWeight="700"
                fontSize="16px"
                letterSpacing="-0.03em"
                color="black"
              >
                Followers
              </Text>
            </Box>

            <Box>
              <Text
                textAlign="center"
                fontWeight="700"
                fontSize="36px"
                letterSpacing="-0.03em"
                bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                bgClip="text"
              >
                22
              </Text>

              <Text
                textAlign="center"
                fontWeight="700"
                fontSize="16px"
                letterSpacing="-0.03em"
                color="black"
              >
                DeFi Following
              </Text>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default ProfileParticipation;
