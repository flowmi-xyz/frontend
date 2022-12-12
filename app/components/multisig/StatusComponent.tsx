import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";

import { BsCircle, BsCheckCircleFill, BsXCircle } from "react-icons/bs";

type MultisigStatusProps = {
  numberOfConfirmations: number;
};

const MultisigStatus = ({ numberOfConfirmations }: MultisigStatusProps) => {
  return (
    <>
      {numberOfConfirmations === 0 && (
        <HStack>
          <Box width="50%" bg="white"></Box>
          <Flex justify="space-around" width="50%">
            <Icon as={BsCircle} color="gray" h="6" w="6" />
            <Icon as={BsCircle} color="gray" h="6" w="6" />
            <Icon as={BsCircle} color="gray" h="6" w="6" />
          </Flex>
        </HStack>
      )}

      {numberOfConfirmations === 1 && (
        <HStack>
          <Box width="50%" bg="white"></Box>
          <Flex justify="space-around" width="50%">
            <Icon as={BsCheckCircleFill} color="green" h="6" w="6" />
            <Icon as={BsCircle} color="gray" h="6" w="6" />
            <Icon as={BsCircle} color="gray" h="6" w="6" />
          </Flex>
        </HStack>
      )}

      {numberOfConfirmations === 2 && (
        <HStack>
          <Box width="50%" bg="white"></Box>
          <Flex justify="space-around" width="50%">
            <Icon as={BsCheckCircleFill} color="green" h="6" w="6" />
            <Icon as={BsCheckCircleFill} color="green" h="6" w="6" />
            <Icon as={BsCircle} color="gray" h="6" w="6" />
          </Flex>
        </HStack>
      )}

      {numberOfConfirmations === 3 && (
        <HStack>
          <Box width="50%" bg="white"></Box>
          <Flex justify="space-around" width="50%">
            <Icon as={BsCheckCircleFill} color="green" h="6" w="6" />
            <Icon as={BsCheckCircleFill} color="green" h="6" w="6" />
            <Icon as={BsCheckCircleFill} color="green" h="6" w="6" />
          </Flex>
        </HStack>
      )}
    </>
  );
};

export default MultisigStatus;
