import { Box, Center, Text } from "@chakra-ui/react";

const FooterLanding = () => {
  return (
    <Box pt="10" width="100%">
      <Center>
        <Box
          width="50%"
          height="2px"
          bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
        />
      </Center>

      <Center p="5">
        <Text
          textAlign="center"
          fontWeight="700"
          fontSize="18px"
          lineHeight="120% "
        >
          Make with love for Chainlik Hackathon Fall 2022
        </Text>
      </Center>
    </Box>
  );
};

export default FooterLanding;
