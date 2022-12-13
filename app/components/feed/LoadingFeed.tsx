import { Center, Image, Text, VStack } from "@chakra-ui/react";

const LoadingFeed = () => {
  return (
    <Center>
      <VStack paddingTop="5" pl="5" pr="5">
        <Text
          fontWeight="700"
          fontSize="20px"
          bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
          bgClip="text"
        >
          Connecting with garden ...
        </Text>

        <Center>
          <Image
            src="../assets/animations/Lens-Anim4_16x10.gif"
            rounded="xl"
            w={["100%", "100%", "100%", "50%"]}
            height="auto"
            mt="10"
            mb="10"
          />
        </Center>
      </VStack>
    </Center>
  );
};

export default LoadingFeed;
