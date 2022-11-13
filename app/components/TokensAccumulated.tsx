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
  countFollowers: number;
  goalOfFollowers: number;
};

const TokenAccumulated = ({
  handle,
  tokensAccumulated,
  countFollowers,
  goalOfFollowers,
}: TokenAccumulatedProps) => {
  console.log(countFollowers);
  console.log(goalOfFollowers);
  return (
    <Box
      bg="white"
      border="1px"
      borderColor="#E0E0E3"
      borderRadius="10px"
      width="300px"
      m="5"
      p="5"
    >
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

      <Center>
        <CircularProgress
          value={Number(
            (
              ((countFollowers % goalOfFollowers) / goalOfFollowers) *
              100
            ).toFixed(0)
          )}
          color="third"
          size="150px"
          p="5"
        >
          <CircularProgressLabel>
            {Number(
              (
                ((countFollowers % goalOfFollowers) / goalOfFollowers) *
                100
              ).toFixed(0)
            )}
            %
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
        fontSize="32px"
        letterSpacing="-0.03em"
        bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
        bgClip="text"
      >
        {tokensAccumulated.toFixed(4)} WMATIC
      </Text>
    </Box>
  );
};

export default TokenAccumulated;
