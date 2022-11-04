import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";

import { CgMoreR } from "react-icons/cg";

const HotProfilesArr = [
  {
    handle: "dan_abramov",
    image: "https://bit.ly/dan-abramov",
    followers: "47k",
    accumulatedTokens: 9,
  },
  {
    handle: "fabri",
    image: "https://bit.ly/dan-abramov",
    followers: "12",
    accumulatedTokens: 5,
  },
  {
    handle: "cristianvaldivia",
    image: "https://bit.ly/dan-abramov",
    followers: "24",
    accumulatedTokens: 2,
  },
];

const HotProfiles = () => {
  return (
    <>
      <Box width="924px" m="auto" pb="3">
        <Flex>
          <Text
            fontWeight="700"
            fontSize="18"
            lineHeight="120%"
            color="black"
            my="auto"
          >
            💰 Who to follow in Social DeFi
          </Text>
        </Flex>
      </Box>

      <Center pb="10">
        <Box
          bg="white"
          border="1px"
          borderColor="#E0E0E3"
          borderRadius="10px"
          width="924px"
        >
          <Flex justify="space-between">
            {HotProfilesArr.map((item) => {
              return (
                <Box
                  bg="#F2F4F6"
                  width="200px"
                  borderRadius="10px"
                  p="3"
                  m="3"
                  key={item.handle}
                >
                  <Flex>
                    <Avatar size="md" name={item.handle} src={item.image} />

                    <Box my="auto" pl="2">
                      <Text
                        fontWeight="700"
                        fontSize="16px"
                        lineHeight="120%"
                        letterSpacing="-0.03em"
                        color="black"
                      >
                        @{item.handle}
                      </Text>

                      <Text
                        fontWeight="400"
                        fontSize="12px"
                        lineHeight="100%"
                        letterSpacing="-0.03em"
                        color="black"
                        pt="2"
                      >
                        {item.followers} followers
                      </Text>
                    </Box>
                  </Flex>

                  <Flex pt="3" pb="3" justifyContent="space-between">
                    <Text
                      fontWeight="700"
                      fontSize="16px"
                      letterSpacing="-0.03em"
                      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                      bgClip="text"
                      my="auto"
                    >
                      {item.accumulatedTokens} MATIC
                    </Text>

                    <Box bg="lens" borderRadius="10px" w="40px" h="40px">
                      <Image
                        src="../assets/LOGO__lens_ultra small icon.png"
                        alt="lens"
                        my="-3px"
                      />
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </Flex>

          <Divider />

          <Box bg="#F9FAFA" borderBottomRadius="10px">
            <Flex>
              <Icon as={CgMoreR} margin="4" color="grayLetter" w="5" h="5" />

              <Text
                fontWeight="700"
                fontSize="14px"
                color="grayLetter"
                my="auto"
              >
                Show more
              </Text>
            </Flex>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default HotProfiles;
