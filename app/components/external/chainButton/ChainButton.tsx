import {
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import PolygonLogo from "~/components/logos/PolygonLogo";

import type { ChainName } from "~/web3/blockchain.types";
import { networks } from "~/web3/blockchain.types";

import ConnectedNetwork from "./ConnectedNetwork";
import LogoNetwork from "./LogoNetwork";

function ChainButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showTestnets = true;

  const network = {
    name: "Mumbai",
    chainName: "maticmum" as ChainName,
    chainId: "string",
    dev: true,
    nativeToken: "Token",
  };

  return (
    <Flex>
      <Button
        marginRight={5}
        leftIcon={<LogoNetwork chainName={network.chainName} />}
        iconSpacing={3}
        onClick={onOpen}
        bg="grayBg"
        size="md"
        borderRadius={10}
      >
        <ConnectedNetwork networkName={network.name} />
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={20}>
          <ModalHeader margin="auto">
            <Text>Select a blockchain</Text>
          </ModalHeader>
          <ModalCloseButton />

          <Text
            paddingLeft="6"
            paddingRight="6"
            paddingBottom={6}
            fontSize={14}
            textAlign="center"
          >
            Select a blockchain
          </Text>

          <Button
            leftIcon={<PolygonLogo />}
            width="75%"
            margin="auto"
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={network.chainName === "matic"}
            borderRadius={10}
            display={
              networks.matic !== undefined && !showTestnets ? "flex" : "none"
            }
          >
            {networks.matic?.name}
          </Button>

          <Button
            leftIcon={<PolygonLogo />}
            width="75%"
            margin="auto"
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={network.chainName === "maticmum"}
            borderRadius={10}
            display={
              networks.maticmum !== undefined && showTestnets ? "flex" : "none"
            }
          >
            {networks.maticmum?.name}
          </Button>

          <Text fontSize={12} margin="auto" paddingTop={3} paddingBottom={6}>
            Currently connected to
            <Text as="span" color="second" fontWeight={700}>
              &nbsp; {network.name}
            </Text>
          </Text>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ChainButton;
