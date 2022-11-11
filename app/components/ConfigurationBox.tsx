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
          mt="10"
          p="5"
        >
          <Flex>
            <Icon as={IoSettings} color="lensDark" h="6" w="6" />
            <Text
              fontWeight="700"
              fontSize="18px"
              lineHeight="120%"
              letterSpacing="-0.03em"
              color="lensDark"
              pb="2"
              ml="2"
            >
              Setup your Lens profile
            </Text>
          </Flex>

          <Flex>
            <Text
              fontWeight="500"
              fontSize="15px"
              lineHeight="120%"
              letterSpacing="-0.03em"
              color="lensDark"
              pb="1"
            >
              Create profiles
            </Text>
          </Flex>

          <Text
            fontWeight="500"
            fontSize="15px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="lensDark"
            pb="1"
          >
            Set default profile
          </Text>

          <Text
            fontWeight="500"
            fontSize="15px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="lensDark"
            pb="1"
          >
            Set follow module
          </Text>

          <Text
            fontWeight="500"
            fontSize="15px"
            lineHeight="120%"
            letterSpacing="-0.03em"
            color="lensDark"
            pb="1"
          >
            Whitelist module
          </Text>
        </Box>
      </Link>
    </>
  );
};

export default SettingsBox;
