import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

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
        <Flex
          bg="white"
          border="1px"
          borderColor="#E0E0E3"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="10px"
          p="5"
        >
          <Box bg="#F2F4F6" width="200px" borderRadius="10px" p="3">
            <Flex>
              <Avatar
                size="md"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />

              <Box my="auto" pl="2">
                <Text
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="120%"
                  letterSpacing="-0.03em"
                  color="black"
                >
                  @dan_abramov
                </Text>

                <Text
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="100%"
                  letterSpacing="-0.03em"
                  color="black"
                  pt="2"
                >
                  47k followers
                </Text>
              </Box>
            </Flex>

            <Center pt="5" pb="5">
              <Text
                fontWeight="700"
                fontSize="16px"
                letterSpacing="-0.03em"
                color="black"
              >
                <Text
                  as="span"
                  fontSize="15px"
                  fontWeight="bold"
                  bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                  bgClip="text"
                >
                  9 MATIC{" "}
                </Text>
                accumulated
              </Text>
            </Center>

            <Box
              bg="lens"
              borderRadius="10px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            >
              <Flex>
                <Image
                  src="./assets/LOGO__lens_ultra small icon.png"
                  alt="lens"
                  boxSize="40px"
                />

                <Text
                  fontWeight="700"
                  fontSize="10px"
                  lineHeight="120%"
                  color="lensDark"
                  my="auto"
                >
                  Follow @dan_abramov
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default HotProfiles;
