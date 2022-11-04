import { Avatar, Box, Center, Flex, Image, Text } from "@chakra-ui/react";

const HotProfilesArr = [
  {
    name: "fabri.lens",
    handle: "fabri.lens",
    image: "https://bit.ly/dan-abramov",
    accumulatedTokens: 9,
  },
  {
    name: "Cris Valdivia",
    handle: "crisvaldivia.lens",
    image: "https://bit.ly/dan-abramov",
    accumulatedTokens: 5,
  },
  // {
  //   handle: "cristianvaldivia",
  //   image: "https://bit.ly/dan-abramov",
  //   followers: "24",
  //   accumulatedTokens: 2,
  // },
];

const HotProfiles = () => {
  return (
    <>
      <Box m="auto" pb="3">
        <Flex>
          <Text
            fontWeight="600"
            fontSize="15px"
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
          width="400px"
          p="3"
        >
          {HotProfilesArr.map((item) => {
            return (
              <>
                <Flex justifyContent="space-around">
                  <Flex>
                    <Avatar
                      size="md"
                      name={item.handle}
                      src={item.image}
                      my="auto"
                    />

                    <Box my="auto" pl="2">
                      <Text
                        fontWeight="700"
                        fontSize="16px"
                        lineHeight="120%"
                        letterSpacing="-0.03em"
                        color="black"
                      >
                        {item.name}
                      </Text>

                      <Text
                        fontWeight="400"
                        fontSize="12px"
                        lineHeight="100%"
                        letterSpacing="-0.03em"
                        bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                        bgClip="text"
                        pt="1"
                      >
                        @{item.handle}
                      </Text>
                    </Box>
                  </Flex>

                  <Text
                    fontWeight="700"
                    fontSize="16px"
                    letterSpacing="-0.03em"
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    bgClip="text"
                    my="auto"
                  >
                    {item.accumulatedTokens} MATIC{" "}
                    <Text as="span" color="black">
                      accumulated
                    </Text>
                  </Text>

                  <Box
                    bg="lens"
                    borderRadius="10px"
                    w="35px"
                    h="35px"
                    my="auto"
                  >
                    <Image
                      src="../assets/LOGO__lens_ultra small icon.png"
                      alt="lens"
                      my="-5px"
                    />
                  </Box>
                </Flex>
              </>
            );
          })}
        </Box>
      </Center>
    </>
  );
};

export default HotProfiles;
