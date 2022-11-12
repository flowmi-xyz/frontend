import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { transformToIpfsUrl } from "~/web3/ipfs";

type TokenAccumulatedProps = {
  followers: any;
};

const FollowersComponent = ({ followers }: TokenAccumulatedProps) => {
  return (
    <Box ml="10" mt="10">
      <Text
        fontWeight="600"
        fontSize="15px"
        lineHeight="120%"
        color="black"
        my="auto"
        pt="3"
        pb="2"
      >
        Followers
      </Text>

      <Box
        bg="white"
        border="1px"
        borderColor="#E0E0E3"
        borderRadius="10px"
        width="400px"
      >
        {followers.map((wallet: any) => {
          return (
            <Flex
              justifyContent="space-around"
              p="4"
              key={wallet.wallet.address}
            >
              <Flex justifyContent="space-between" width="90%">
                <Link
                  to={`/${wallet.wallet?.defaultProfile?.handle}`}
                  prefetch="intent"
                >
                  <Flex width="50%">
                    <Avatar
                      size="sm"
                      name={wallet.wallet?.defaultProfile?.handle}
                      src={transformToIpfsUrl(wallet.wallet.image)}
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
                        @{wallet.wallet?.defaultProfile?.handle}
                      </Text>
                    </Box>
                  </Flex>
                </Link>

                <Box width="50%" my="auto">
                  <Text
                    fontWeight="700"
                    fontSize="12px"
                    letterSpacing="-0.03em"
                  >
                    followers
                    <Text
                      as="span"
                      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                      bgClip="text"
                    >
                      {wallet.wallet.defaultProfile.stats.totalFollowers}
                    </Text>
                  </Text>
                </Box>
              </Flex>

              <Box bg="lens" borderRadius="10px" w="35px" h="35px" my="auto">
                <Image
                  src="../assets/LOGO__lens_ultra small icon.png"
                  alt="lens"
                  my="-5px"
                />
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default FollowersComponent;
