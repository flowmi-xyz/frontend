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

import { ReactComponent as BnbChainLogo } from "../../../assets/logos/bnbchain-logo.svg";
import { ReactComponent as EthereumLogo } from "../../../assets/logos/ethereum-logo.svg";
import { ReactComponent as PolygonLogo } from "../../../assets/logos/polygon-logo.svg";
import type { ChainName } from "../../../blockchain/types";
import { networks } from "../../../blockchain/types";

import ConnectedNetwork from "./ConnectedNetwork";
import LogoNetwork from "./LogoNetwork";

function ChainButton() {
  const { t } = useTranslation("ChainButton");

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { manager, network, setNetwork } = useNetworkManager();

  const showTestnets = false;

  const network = {
    name: "Polygon",
    chainName: "matic" as ChainName,
    chainId: "string",
    dev: "boolean",
    nativeToken: "Token",
  };

  // const changeNetwork = async (networkName: ChainName) => {
  //     console.log(`Change network to networkName: ${networkName}`);

  //     try {
  //         await manager.switchNetwork(networkName);
  //         const networks = manager.listNetworks();

  //         setNetwork(networks[networkName]);

  //         onClose();
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

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
            <Text>{t("title")}</Text>
          </ModalHeader>
          <ModalCloseButton />

          <Text
            paddingLeft="6"
            paddingRight="6"
            paddingBottom={6}
            fontSize={14}
            textAlign="center"
          >
            {t("subtitle")}
          </Text>

          <Button
            leftIcon={<EthereumLogo width={25} height={25} />}
            width="75%"
            margin="auto"
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={network.chainName === "eth"}
            borderRadius={10}
            display={
              networks.eth !== undefined && !showTestnets ? "flex" : "none"
            }
          >
            {networks.eth?.name}
          </Button>

          <Button
            leftIcon={<EthereumLogo width={25} height={25} />}
            width="75%"
            margin="auto"
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={network.chainName === "kovan"}
            borderRadius={10}
            display={
              networks.kovan !== undefined && showTestnets ? "flex" : "none"
            }
          >
            {networks.kovan?.name}
          </Button>

          <Button
            leftIcon={<PolygonLogo width={25} height={25} />}
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
            leftIcon={<PolygonLogo width={25} height={25} />}
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

          <Button
            leftIcon={<BnbChainLogo width={25} height={25} />}
            width="75%"
            margin="auto"
            marginBottom={3}
            justifyContent="start"
            iconSpacing={5}
            isDisabled={network.chainName === "bsc"}
            borderRadius={10}
            display={
              networks.bsc !== undefined && !showTestnets ? "flex" : "none"
            }
          >
            {networks.bsc?.name}
          </Button>

          <Text fontSize={12} margin="auto" paddingTop={3} paddingBottom={6}>
            {t("connectedTo")}
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
