import { Box, Text } from "@chakra-ui/react";

const LensterFooter = () => {
  return (
    <Box m="auto" pt="10" pb="3" width="420px">
      <Text
        fontWeight="500"
        fontSize="14px"
        lineHeight="120%"
        letterSpacing="-0.03em"
        color="grayLetter"
      >
        © 2022 Social DeFi
      </Text>

      <Text
        fontWeight="600"
        fontSize="13px"
        lineHeight="120%"
        letterSpacing="-0.03em"
        color="black"
        pt="2"
      >
        Make with ❤️ for Chainlink Hackathon Fall 2022
      </Text>
    </Box>
  );
};

export default LensterFooter;
