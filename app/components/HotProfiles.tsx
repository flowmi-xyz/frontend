import { Link } from "@remix-run/react";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";

import LensterFooter from "./external/LensterFooter";

import { transformToIpfsUrl } from "~/web3/ipfs/ipfs";

const HotProfilesArr = [
  {
    handle: "pailita.test",
    image: null,
  },
  {
    handle: "magnanimus.test",
    image: null,
  },
  // {
  //   handle: "gutybv.lens",
  //   image:
  //     "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreidbnm4dapoitvrl52urbnzursub4jy4ncw2q4zpoptlfalruqvdau",
  //   accumulatedTokens: 2,
  // },
];

const HotProfiles = () => {
  return (
    <>
      <Box
        bg="white"
        border="1px"
        borderColor="#E0E0E3"
        borderRadius="10px"
        // width="420px"
        mt="5"
        ml="10"
        mr="10"
      >
        <Text
          fontWeight="400"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          my="auto"
          pt="5"
          pl="5"
          pr="5"
        >
          💰 Who to follow in Social DeFi
        </Text>

        {HotProfilesArr.map((item) => {
          return (
            <Box key={item.handle}>
              <Link to={`/${item.handle}`} prefetch="intent">
                <Flex justifyContent="space-between" p="4">
                  <Box width="50%">
                    <Flex>
                      <Avatar
                        size="sm"
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
              </Link>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default HotProfiles;
