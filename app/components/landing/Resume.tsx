import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";

const Resume = () => {
  return (
    <Box bg="white" width="100%">
      <Text
        textAlign="center"
        fontWeight="700"
        fontSize="26px"
        lineHeight="120%"
        color="white"
        p="2"
        opacity="0"
      >
        .
      </Text>
      <Flex
        justify="space-between"
        maxWidth="1200px"
        m="auto"
        my="10"
        direction={["column", "row", "row", "row"]}
      >
        <Box width={["100%", "30%", "30%", "30%"]}>
          <Center>
            <Button
              bg="lens"
              borderRadius="10px"
              boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            >
              <Flex>
                <Box w="40px" h="40px">
                  <Image
                    src="../assets/LOGO__lens_ultra small icon.png"
                    alt="lens"
                    my="-5px"
                    mx="-5px"
                  />
                </Box>

                <Text
                  fontWeight="700"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="lensDark"
                  m="auto"
                >
                  Follow @stani.lens on Lens
                </Text>
              </Flex>
            </Button>
          </Center>

          <Text
            textAlign="center"
            fontWeight="200"
            fontSize="18px"
            lineHeight="21.6px"
            color="black"
            m="auto"
            p="5"
          >
            Use your 🌿 Lens profile to follow your friends paying a fee that
            goes to a common money pool 💰
          </Text>
          <Text p="2">.</Text>
        </Box>

        <Box width={["100%", "30%", "30%", "30%"]}>
          <Text
            textAlign="center"
            fontSize="30px"
            display={["none", "block", "block", "block"]}
          >
            🎉💸🎉
          </Text>

          <Text
            textAlign="center"
            fontWeight="200"
            fontSize="18px"
            lineHeight="21.6px"
            color="black"
            m="auto"
            p="5"
          >
            When 3 friends follow the same profile, the accumulated fees will be
            raffled among them!
          </Text>
        </Box>

        <Box width={["100%", "30%", "30%", "30%"]}>
          <Image
            src="../assets/logos/aave-tipo.png"
            h="10"
            m="auto"
            display={["none", "block", "block", "block"]}
          />
          <Text
            textAlign="center"
            fontWeight="200"
            fontSize="18px"
            lineHeight="21.6px"
            color="black"
            m="auto"
            p="5"
          >
            Get 👻 ATokens as a prize! Aave makes them earn interest while they
            are in the Pool. Redeem them whenever you want!
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Resume;
