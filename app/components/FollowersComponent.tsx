import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { transformToIpfsUrl } from "~/web3/ipfs/ipfs";

type TokenAccumulatedProps = {
  followers: any;
};

const FollowersComponent = ({ followers }: TokenAccumulatedProps) => {
  return (
    <Box
      bg="white"
      border="1px"
      borderColor="#E0E0E3"
      borderRadius="10px"
      width="420px"
      p="5"
      m="5"
    >
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
      {followers.map((wallet: any) => {
        return (
          <Flex
            p="4"
            key={wallet.wallet.address}
            justifyContent="space-between"
            width="100%"
          >
            <Link
              to={`/${wallet.wallet?.defaultProfile?.handle}`}
              prefetch="intent"
            >
              <Flex width="100%">
                <Box bg="lens" borderRadius="full" w="35px" h="35px" my="auto">
                  <Image
                    src="../assets/LOGO__lens_ultra small icon.png"
                    alt="lens"
                    my="-5px"
                  />
                </Box>

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

            <Flex width="50%" justify="space-between">
              <Box width="30%" my="auto">
                <Text
                  fontWeight="700"
                  fontSize="12px"
                  letterSpacing="-0.03em"
                  textAlign="center"
                >
                  {wallet.wallet.defaultProfile.stats.totalFollowers}
                </Text>
                <Text
                  fontWeight="700"
                  fontSize="12px"
                  letterSpacing="-0.03em"
                  textAlign="center"
                >
                  followers
                </Text>
              </Box>

              <Box width="30%" my="auto">
                <Text
                  fontWeight="700"
                  fontSize="12px"
                  letterSpacing="-0.03em"
                  textAlign="center"
                >
                  {wallet.wallet.defaultProfile.stats.totalFollowing}
                </Text>
                <Text
                  fontWeight="700"
                  fontSize="12px"
                  letterSpacing="-0.03em"
                  textAlign="center"
                >
                  following
                </Text>
              </Box>
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
};

export default FollowersComponent;
