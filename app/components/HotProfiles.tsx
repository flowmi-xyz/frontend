import { Avatar, Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import LensterFooter from "./external/LensterFooter";

const HotProfilesArr = [
  {
    name: "fabri.lens",
    handle: "fabri.lens",
    image:
      "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreifflpxyheb2bzqeygz7c3h3ytvpxcfobg5gl3liozawj64ph2jafu",
    accumulatedTokens: 12,
  },
  {
    name: "Cris Valdivia",
    handle: "crisvaldivia.lens",
    image:
      "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreichwq6umgahyohbekflyclq7o7y2u46jatkhwqueqfl2koortgeve",
    accumulatedTokens: 5,
  },
  {
    name: "Guty",
    handle: "gutybv.lens",
    image:
      "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreidbnm4dapoitvrl52urbnzursub4jy4ncw2q4zpoptlfalruqvdau",
    accumulatedTokens: 2,
  },
];

const HotProfiles = () => {
  return (
    <>
      <Box m="auto" pb="3" width="420px">
        <Text
          fontWeight="600"
          fontSize="15px"
          lineHeight="120%"
          color="black"
          my="auto"
        >
          💰 Who to follow in Social DeFi
        </Text>
      </Box>

      <Center>
        <Box
          bg="white"
          border="1px"
          borderColor="#E0E0E3"
          borderRadius="10px"
          width="420px"
        >
          {HotProfilesArr.map((item) => {
            return (
              <>
                <Flex justifyContent="space-around" p="4">
                  <Flex width="40%">
                    <Avatar
                      size="sm"
                      name={item.handle}
                      src={item.image}
                      my="auto"
                    />

                    <Box my="auto" pl="2">
                      <Text
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="120%"
                        letterSpacing="-0.03em"
                        color="black"
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

                  <Box width="40%" my="auto">
                    <Text
                      fontWeight="700"
                      fontSize="14px"
                      letterSpacing="-0.03em"
                      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                      bgClip="text"
                    >
                      {item.accumulatedTokens} MATIC{" "}
                      <Text as="span" fontWeight="400" color="black">
                        accumulated
                      </Text>
                    </Text>
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
              </>
            );
          })}
        </Box>
      </Center>

      <LensterFooter />
    </>
  );
};

export default HotProfiles;
