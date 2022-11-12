import {
  Avatar,
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { transformToIpfsUrl } from "~/web3/ipfs";

type TokenAccumulatedProps = {
  handle: string;
  tokensAccumulated: number;
};

const PreviousRafles = ({
  handle,
  tokensAccumulated,
}: TokenAccumulatedProps) => {
  const item = {
    handle: "flaite.test",
    image: null,
    accumulatedTokens: 0.3,
  };

  return (
    <Box ml="10">
      <Flex>
        <Text
          fontWeight="600"
          fontSize="15px"
          lineHeight="120%"
          color="black"
          my="auto"
          pt="3"
          pb="2"
        >
          Previous Aave raffles
        </Text>

        <Image
          src="../assets/logos/aave-aave-logo.png"
          w="6"
          h="6"
          my="auto"
          ml="3"
        />
      </Flex>

      <Box
        bg="white"
        border="1px"
        borderColor="#E0E0E3"
        borderRadius="10px"
        width="400px"
      >
        <Flex justifyContent="space-around" p="4" key={item.handle}>
          <Flex justifyContent="space-between" width="90%">
            <Link to={`/${item.handle}`} prefetch="intent">
              <Flex width="50%">
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
            </Link>

            <Box width="50%" my="auto">
              <Text fontWeight="700" fontSize="12px" letterSpacing="-0.03em">
                {/* Won:{" "} */}
                <Text
                  as="span"
                  bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                  bgClip="text"
                >
                  {item.accumulatedTokens} WMATIC{" "}
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
      </Box>
    </Box>
  );
};

export default PreviousRafles;
