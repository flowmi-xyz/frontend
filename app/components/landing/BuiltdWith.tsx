import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";

const BuildWith = () => {
  return (
    <>
      <Box>
        <Center pt="10">
          <Text
            fontWeight="700"
            fontSize="26px"
            lineHeight="120%"
            bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
            bgClip="text"
          >
            Built with
          </Text>
        </Center>

        <Flex justify="space-around" pt="10" maxWidth="1200px" m="auto">
          <Image src="../assets/logos/chainlink-tipo.png" h="10" my="auto" />
          <Image src="../assets/logos/polygon-tipo.png" h="12" my="auto" />
          <Image src="../assets/logos/lens-tipo.png" h="20" my="auto" />
          <Image src="../assets/logos/aave-tipo.png" h="10" my="auto" />
          <Image src="../assets/logos/metamask-tipo.png" h="20" my="auto" />
        </Flex>
      </Box>
    </>
  );
};

export default BuildWith;
