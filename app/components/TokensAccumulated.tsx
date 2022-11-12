import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

type TokenAccumulatedProps = {
  handle: string;
  tokensAccumulated: number;
};

const TokenAccumulated = ({
  handle,
  tokensAccumulated,
}: TokenAccumulatedProps) => {
  return (
    <Box>
      <Text
        fontWeight="600"
        fontSize="15px"
        lineHeight="120%"
        color="black"
        my="auto"
        pt="3"
        pb="2"
      >
        DeFi Followers
      </Text>

      <Box
        bg="white"
        border="1px"
        borderColor="#E0E0E3"
        borderRadius="10px"
        width="300px"
      >
        <Center>
          <CircularProgress
            value={(tokensAccumulated / 1) * 100}
            color="third"
            size="150px"
            p="5"
          >
            <CircularProgressLabel>
              {(tokensAccumulated / 1) * 100}%
            </CircularProgressLabel>
          </CircularProgress>
        </Center>

        <Text
          textAlign="center"
          fontWeight="600"
          fontSize="15px"
          lineHeight="120%"
          color="black"
        >
          {handle} has accumulated:
        </Text>

        <Text
          textAlign="center"
          fontWeight="700"
          fontSize="36px"
          letterSpacing="-0.03em"
          bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
          bgClip="text"
        >
          {tokensAccumulated} WMATIC
        </Text>
      </Box>
    </Box>
  );
};

export default TokenAccumulated;
