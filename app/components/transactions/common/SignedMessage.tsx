import { Center, Image, Text, VStack } from "@chakra-ui/react";

const SignedMessageTx = () => {
  return (
    <Center>
      <VStack paddingTop="5" pl="5" pr="5">
        <Text
          fontWeight="700"
          fontSize="20px"
          bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
          bgClip="text"
        >
          Waiting transacction to be mined...
        </Text>

        <Image src="../assets/animations/blocks.gif" width="50%" pt="5" />

        <Text
          textAlign="center"
          fontWeight="500"
          fontSize="16px"
          lineHeight="120%"
          color="grayLetter"
          pt="5"
        >
          This usually takes 0-1 minutes to complete
        </Text>
      </VStack>
    </Center>
  );
};

export default SignedMessageTx;
