import { Box, Text } from "@chakra-ui/react";

const AppFooter = () => {
  return (
    <Box p="3" position="fixed" bottom="0" right="10">
      <Text
        fontWeight="500"
        fontSize="14px"
        lineHeight="120%"
        letterSpacing="-0.03em"
        color="grayLetter"
        pt="2"
      >
        Make with ❤️ for Chainlink Hackathon Fall 2022
      </Text>
    </Box>
  );
};

export default AppFooter;
