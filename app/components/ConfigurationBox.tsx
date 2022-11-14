import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

import { IoSettings } from "react-icons/io5";

const SettingsBox = () => {
  return (
    <>
      <Link to={"/internal"}>
        <Box
          bg="white"
          border="1px"
          borderColor="lensDark"
          borderRadius="10px"
          width="420px"
          mt="5"
          p="5"
        >
          <Flex>
            <Icon as={IoSettings} color="lensDark" h="5" w="5" my="4px" />
            <Text
              fontWeight="700"
              fontSize="18px"
              letterSpacing="-0.03em"
              color="lensDark"
              pb="2"
              ml="2 j"
            >
              Setup your Lens profile
            </Text>
          </Flex>
        </Box>
      </Link>
    </>
  );
};

export default SettingsBox;
