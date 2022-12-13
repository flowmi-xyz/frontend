/* eslint-disable array-callback-return */
import {
  Button,
  Flex,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import type { ChainName, Network } from "~/web3/blockchain.types";
import { networks } from "~/web3/blockchain.types";
import { getChainId, switchNetwork } from "~/web3/metamask";

import ConnectedNetwork from "./ConnectedNetwork";
import LogoNetwork from "./LogoNetwork";

function ChainButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const DEFAULT_NETWORK = networks[1];

  const [loading, setLoading] = React.useState<boolean>(false);
  const [chainId, setChainId] = React.useState<string>(" ");
  const [network, setNetwork] = React.useState<Network>(DEFAULT_NETWORK);

  React.useEffect(() => {
    setLoading(true);
    const getChain = async () => {
      const chainId = await getChainId();

      return chainId;
    };

    getChain().then((chainId) => {
      setChainId(chainId);

      const network = networks.filter((network) => {
        if (network.chainId === chainId) {
          return network;
        }
      });

      setNetwork(network[0]);

      setLoading(false);
    });
  }, []);

  const handleNetworkChange = (chainId: string) => {
    switchNetwork(chainId);
  };

  return (
    <Flex>
      <Button
        marginRight="5"
        leftIcon={<LogoNetwork chainName={network.chainName} />}
        iconSpacing="3"
        onClick={onOpen}
        bg="grayBg"
        size="md"
        borderRadius="10"
      >
        {loading ? (
          <Spinner />
        ) : (
          <ConnectedNetwork networkName={network.name} />
        )}
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
            paddingBottom="6"
            fontSize="14"
            textAlign="center"
          >
            Select a network to switch to or change manually in your wallet
          </Text>

          <Button
            leftIcon={
              <Image src="../assets/logos/polygon-matic-logo.png" w="6" h="6" />
            }
            width="75%"
            margin="auto"
            marginBottom="3"
            justifyContent="start"
            iconSpacing="5"
            borderRadius="10"
            disabled={chainId === networks[0].chainId}
            onClick={() => handleNetworkChange(networks[0].chainId)}
          >
            {networks[0].name}
          </Button>

          <Button
            leftIcon={
              <Image src="../assets/logos/polygon-matic-logo.png" w="6" h="6" />
            }
            width="75%"
            margin="auto"
            marginBottom="3"
            justifyContent="start"
            iconSpacing="5"
            borderRadius="10"
            disabled={chainId === networks[1].chainId}
            onClick={() => handleNetworkChange(networks[1].chainId)}
          >
            {networks[1].name}
          </Button>

          <Text fontSize="12" margin="auto" pt="3" pb="6">
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
