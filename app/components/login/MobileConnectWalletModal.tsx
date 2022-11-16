import React from "react";

import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = {
  isOpen: any;
  onClose: any;
};

function MobileConnectWalletModal({ isOpen, onClose }: Props) {
  return (
    <Modal size={"xs"} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent h="200px">
        <ModalHeader>
          <Center>
            <Text
              fontWeight="700"
              fontSize="24"
              lineHeight="21.6px"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              bgClip="text"
            >
              Social DeFi
            </Text>
          </Center>

          <Center>
            <Box
              width="80%"
              height="2px"
              bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
              marginTop="10"
            />
          </Center>
        </ModalHeader>

        <ModalBody textAlign={"center"}>
          Cannot connect to wallet. Please visit this page on your desktop
          browser to connect to your wallet.
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MobileConnectWalletModal;
