import { Box, Center, Flex, Text } from "@chakra-ui/react";

import { WIDTH_FEED } from "~/style/theme";

type ProfileParticipationProps = {
  totalFounded: number;
};

const ProfileParticipation = ({ totalFounded }: ProfileParticipationProps) => {
  return (
    <>
      <Center pt="10" pb="10">
        <Box
          bg="#ECE9F7"
          border="1px"
          borderColor="#824EF0"
          borderRadius="10px"
          width={WIDTH_FEED}
          p="5"
        >
          <Text
            fontWeight="600"
            fontSize="15px"
            lineHeight="120%"
            color="first"
            my="auto"
          >
            Your participation in Social DeFi
          </Text>

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
                {totalFounded.toFixed(2)} WMATIC
              </Text>

              <Text
                textAlign="center"
                fontWeight="500"
                fontSize="15px"
                letterSpacing="-0.03em"
                color="black"
              >
                Accumulated
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
                3
              </Text>

              <Text
                textAlign="center"
                fontWeight="500"
                fontSize="15px"
                letterSpacing="-0.03em"
                color="black"
              >
                DeFi Followers
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
                0
              </Text>

              <Text
                textAlign="center"
                fontWeight="500"
                fontSize="15px"
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
