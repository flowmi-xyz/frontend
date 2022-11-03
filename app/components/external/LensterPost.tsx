import { Avatar, Box, HStack, Image, Text } from "@chakra-ui/react";

type PostProps = {
  id: string;
  name: string;
  handle: string;
  profileImage?: string;
  content?: string;
  image?: string;
  index?: number;
};

const LensterPost = ({
  id,
  name,
  handle,
  profileImage,
  content,
  image,
  index,
}: PostProps) => {
  return (
    <Box
      bg="white"
      border="1px"
      borderColor="#E0E0E3"
      borderRadius={index === 0 ? "10px 10px 0 0" : "0"}
      width="924px"
      _hover={{ bg: "#F4F4F5" }}
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
              {name}
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
              @{handle}
            </Text>
          </Box>
        </HStack>

        <Box>
          <Text
            fontWeight="700"
            fontSize="11px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="grayLetter"
          >
            6 hours ago
          </Text>
        </Box>
      </HStack>

      <Box pl="6">
        <Text
          fontWeight="500"
          fontSize="14px"
          lineHeight="120%"
          letterSpacing="-0.03em"
          color="black"
          pl="10"
          pr="2"
        >
          {content}
        </Text>

        <Box pl="10" pt="3" pb="3" width="70%">
          <Image src="./assets/test1.png" borderRadius="lg" />
        </Box>
      </Box>
    </Box>
  );
};

export default LensterPost;
