import { Box, Divider, Flex, Icon, Image, Text } from "@chakra-ui/react";

// icons
import { TbHash, TbLocation } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

const LensterProfile = () => {
  return (
    <Box m="5" p="10" width="300px">
      <Box p="2" borderRadius="2xl" bg="#FAFAF9">
        <Image
          src="https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreib75vvqtckmck6zs7v7lntc7pan45jbugmcc6633z3aflvprryr4i"
          w="300px"
          borderRadius="md"
        />
      </Box>

      <Text
        fontWeight="600"
        fontSize="24px"
        lineHeight="120%"
        letterSpacing="-0.03em"
        color="black"
        pt="4"
      >
        Cristian Valdivia
      </Text>
      <Text
        fontWeight="700"
        fontSize="14px"
        bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
        bgClip="text"
        pt="1"
      >
        @cristianvaldivia.lens
      </Text>
      <Flex pt="5" justifyContent="space-between">
        <Box>
          <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="120%"
            color="black"
          >
            24
          </Text>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="grayLetter"
          >
            Followers
          </Text>
        </Box>

        <Box>
          <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="120%"
            color="black"
          >
            34
          </Text>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="grayLetter"
          >
            Following
          </Text>
        </Box>
      </Flex>
      <Divider pt="3" />
      <Flex pt="3">
        <Icon as={TbHash} color="first" w="4" h="4" />

        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          pl="3"
          my="auto"
        >
          0x01
        </Text>
      </Flex>
      <Flex pt="3">
        <Icon as={TbLocation} color="third" w="4" h="4" />
        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          pl="3"
          my="auto"
        >
          Chile
        </Text>
      </Flex>
      <Flex pt="3">
        <Image src="../assets/ens.png" w="4" h="4" />
        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          pl="3"
          my="auto"
        >
          cristianvaldivia.eth
        </Text>
      </Flex>
      <Flex pt="3">
        <Icon as={BiWorld} color="second" w="4" h="4" />
        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          pl="3"
          my="auto"
        >
          www.cristianvaldivia.cl
        </Text>
      </Flex>
      <Flex pt="3">
        <Icon as={FaTwitter} color="twitter" w="4" h="4" />

        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          pl="3"
          my="auto"
        >
          cris___stark
        </Text>
      </Flex>
    </Box>
  );
};

export default LensterProfile;