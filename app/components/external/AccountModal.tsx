import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Icon,
} from "@chakra-ui/react";

import { BiCopy } from "react-icons/bi";
import { useSubmit } from "@remix-run/react";

type AccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  address: string;
};

export default function AccountModal({
  isOpen,
  onClose,
  address,
}: AccountModalProps) {
  const submit = useSubmit();

  const logOut = async () => {
    const formData = new FormData();

    formData.append("address", address);
    formData.append("connected", "false");

    submit(formData, {
      action: "/dashboard/feed",
      method: "post",
      encType: "application/x-www-form-urlencoded",
      replace: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
        borderRadius={"15px"}
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="black"
          fontSize="sm"
          _hover={{
            color: "gray.300",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="black" fontSize="sm">
                Connected with MetaMask
              </Text>
            </Flex>
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Text
                color="black"
                fontSize="xl"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
                {`${address.slice(0, 6)}...${address.slice(
                  address.length - 4,
                  address.length
                )}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={5}>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(address.toString())
                }
                variant="link"
                color="black"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  textDecoration: "none",
                  color: "gray.400",
                }}
              >
                <Icon as={BiCopy} mr={1} />
                Copy Address
              </Button>
              <Button
                margin={3}
                onClick={() => {
                  logOut();
                  onClose();
                }}
              >
                Logout
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
