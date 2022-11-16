import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";

const Resume = () => {
  return (
    <Box bg="white" width="100%">
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
            fontWeight="700"
            fontSize="18px"
            lineHeight="21.6px"
            color="black"
            m="auto"
            p="5"
          >
            Follow a Lens profile and pay an extra fee
          </Text>
        </Box>

        <Box width={["100%", "30%", "30%", "30%"]}>
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize="18px"
            lineHeight="21.6px"
            color="black"
            m="auto"
            p="5"
          >
            The extra fee will be lend in Aave
          </Text>

          <Image
            src="../assets/logos/aave-tipo.png"
            h="10"
            m="auto"
            display={["none", "block", "block", "block"]}
          />
        </Box>

        <Box width={["100%", "30%", "30%", "30%"]}>
          <Text
            textAlign="center"
            fontSize="16px"
            display={["none", "block", "block", "block"]}
          >
            🎉
          </Text>

          <Text
            textAlign="center"
            fontWeight="700"
            fontSize="18px"
            lineHeight="21.6px"
            color="black"
            m="auto"
            p="5"
          >
            When 3 people follow the same profile, the accumulated fees will be
            raffled among them
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Resume;
