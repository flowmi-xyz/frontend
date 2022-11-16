import { Avatar, Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { transformToIpfsUrl } from "~/web3/ipfs";

const AccumulatedProfiles = () => {
  const HotProfilesArr = [
    {
      handle: "pailita.test",
      name: "Pailita",
      image: null,
      accumulatedTokens: 2,
    },
    {
      handle: "magnanimus.test",
      name: "Magnanimus",
      image: null,
      accumulatedTokens: 10,
    },
    {
      handle: "gutybv.lens",
      name: "Guty",
      image:
        "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreidbnm4dapoitvrl52urbnzursub4jy4ncw2q4zpoptlfalruqvdau",
      accumulatedTokens: 2,
    },
  ];
  return (
    <Box
      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
      width="100%"
    >
      <Text
        textAlign="center"
        fontWeight="700"
        fontSize="26px"
        lineHeight="120%"
        color="white"
        p="5"
      >
        Accumulated profiles
      </Text>

      <Center>
        <Flex justify="space-between">
          {HotProfilesArr.map((item) => {
            return (
              <Box
                key={item.handle}
                bg="white"
                borderRadius="10px"
                width="320px"
                m="5"
              >
                <Flex justifyContent="space-between" p="4">
                  <Box width="50%">
                    <Flex>
                      <Avatar
                        size="md"
                        name={item.handle}
                        src={transformToIpfsUrl(item.image)}
                        my="auto"
                      />

                      <Box my="auto" pl="2">
                        <Text
                          fontWeight="600"
                          fontSize="12px"
                          lineHeight="100%"
                          letterSpacing="-0.03em"
                          color="black"
                          pt="1"
                        >
                          {item.name}
                        </Text>

                        <Text
                          fontWeight="600"
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
                  </Box>

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

                <Text
                  textAlign="center"
                  fontWeight="700"
                  fontSize="14px"
                  lineHeight="100%"
                  letterSpacing="-0.03em"
                  color="black"
                  pl="5"
                  pr="5"
                  pb="5"
                >
                  {item.name} has accumulated{" "}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    bgClip="text"
                  >
                    {item.accumulatedTokens} WMATIC
                  </Text>
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Center>

      <Text
        textAlign="center"
        fontWeight="700"
        fontSize="14px"
        lineHeight="100%"
        letterSpacing="-0.03em"
        color="white"
        pb="5"
      >
        * Example values
      </Text>
    </Box>
  );
};

export default AccumulatedProfiles;
