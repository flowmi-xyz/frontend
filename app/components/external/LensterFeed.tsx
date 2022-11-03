import { Avatar, Box, Center, HStack, Text } from "@chakra-ui/react";

const LensterFeed = () => {
  return (
    <Center>
      <Box
        bg="white"
        border="1px"
        borderColor="#E0E0E3"
        borderRadius="10px"
        width="924px"
      >
        <HStack p="5" justifyContent="space-between">
          <HStack>
            <Avatar
              size="sm"
              name="nader"
              src="https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX"
            />

            <Box my="auto" pl="1">
              <Text
                fontWeight="600"
                fontSize="14px"
                lineHeight="120%"
                letterSpacing="-0.03em"
                color="black"
              >
                Nader Dabit
              </Text>

              <Text
                fontWeight="700"
                fontSize="12px"
                lineHeight="100%"
                letterSpacing="-0.03em"
                bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                bgClip="text"
                pt="1"
              >
                @nader.lens
              </Text>
            </Box>
          </HStack>

          <Box>
            <Text
              fontWeight="700"
              fontSize="12px"
              lineHeight="120%"
              letterSpacing="-0.03em"
              color="grayLetter"
            >
              6 hours ago
            </Text>
          </Box>
        </HStack>
      </Box>
    </Center>
  );
};

export default LensterFeed;
