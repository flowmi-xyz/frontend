import { Box, Text } from "@chakra-ui/react";

const FlowmiProfileInfo = () => {
  return (
    <Box border="1px" borderColor="#E0E0E3" borderRadius="10px" p="5">
      <Text
        fontWeight="600"
        fontSize="20px"
        lineHeight="120%"
        color="black"
        my="auto"
        pt="3"
        pb="2"
      >
        This is a{" "}
        <Text
          as="span"
          bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
          bgClip="text"
        >
          Social Defi{" "}
        </Text>{" "}
        profile
      </Text>

      <Text
        fontWeight="600"
        fontSize="14px"
        lineHeight="120%"
        color="gray.600"
        my="auto"
        pt="3"
        pb="2"
      >
        To follow this user, you must pay 0.1 WMATIC. These WMATIC are sent to
        Aave to generate interest
      </Text>

      <Text
        fontWeight="600"
        fontSize="14px"
        lineHeight="120%"
        color="gray.600"
        my="auto"
        pt="3"
        pb="2"
      >
        When the number of DeFi followers for this user reaches 10, the total
        WMATIC that has been accumulated between all of them will be raffled
        among some of the followers.
      </Text>
    </Box>
  );
};

export default FlowmiProfileInfo;
