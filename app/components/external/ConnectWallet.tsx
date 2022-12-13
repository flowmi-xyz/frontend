// BFF components
import { useSubmit } from "@remix-run/react";

// UI components
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Img,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// icons
import { TbHeartHandshake } from "react-icons/tb";
import { MdVerifiedUser, MdVisibility } from "react-icons/md";

// methods
// import { loginWithMetamask } from "~/web3/metamask";
// import MobileConnectWalletModal from "../login/MobileConnectWalletModal";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

import { subscribeToEvents } from "~/web3/walletConnect";

type ConnectWalletProps = {
  users: number;
};

const ConnectWallet = ({ users }: ConnectWalletProps) => {
  const submit = useSubmit();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleLogin = async () => {
  //   const address = await loginWithMetamask();

  //   const formData = new FormData();

  //   formData.append("address", address);
  //   formData.append("connected", "true");

  //   submit(formData, {
  //     action: "/login/?index",
  //     method: "post",
  //     encType: "application/x-www-form-urlencoded",
  //     replace: true,
  //   });
  // };
  const handleLoginWalletConnect = async () => {
    console.log(
      "[browser][handleLoginWalletConnect] Waiting connection with walletConnect ..."
    );

    // bridge url
    const bridge = "https://bridge.walletconnect.org";

    // create new connector
    const connector: WalletConnect = new WalletConnect({
      bridge, // Required
      qrcodeModal: QRCodeModal,
    });

    // check if already connected
    if (!connector.connected) {
      console.log("[browser][handleLoginWalletConnect] Creating session ...");
      // create new session
      await connector.createSession();
    } else {
      console.log("[browser][handleLoginWalletConnect] connector:", connector);

      const address = connector.accounts[0];

      console.log("[browser][handleLoginWalletConnect] address:", address);

      const formData = new FormData();

      formData.append("address", address);
      formData.append("connected", "true");

      submit(formData, {
        action: "/login/?index",
        method: "post",
        encType: "application/x-www-form-urlencoded",
        replace: true,
      });
    }

    // subscribe to events and submit form
    subscribeToEvents(connector, submit);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Flex flexDirection="column">
        <Text
          textAlign="center"
          fontWeight="700"
          fontSize="25"
          lineHeight="30px"
          pt={["20", "100", "100", "100"]}
        >
          Connect your wallet to
        </Text>

        <Center pt="2">
          <Img src="./assets/logos/polygon-tipo.png" h="14" />
        </Center>

        <Text
          textAlign="center"
          fontWeight="700"
          fontSize="25"
          lineHeight="30px"
          pt="3"
        >
          Mumbai
        </Text>

        <Center pt="50">
          <Box
            borderRadius="20"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            width={["80%", "500px", "500px", "500px"]}
          >
            <Center pt="5">
              <Button
                bg="third"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleLoginWalletConnect}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="white"
                >
                  Connect wallet
                </Text>
              </Button>

              {/* <Button
                bg="third"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={onOpen}
                display={["block", "none", "none", "none"]}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="white"
                >
                  Connect wallet
                </Text>
              </Button> */}
            </Center>

            <HStack pt="5" pr="5" pl="5">
              <Icon as={MdVisibility} margin="5" color="first" w="7" h="7" />

              <Text color="grayLetter" fontSize="14" paddingRight="5">
                View only permission. We will never do anything without your
                approval
              </Text>
            </HStack>

            <HStack pr="5" pl="5">
              <Icon as={MdVerifiedUser} margin="5" color="first" w="7" h="7" />

              <Text color="grayLetter" fontSize="14">
                Contracts verified
              </Text>
            </HStack>

            <HStack pr="5" pl="5">
              <Icon
                as={TbHeartHandshake}
                margin="5"
                color="first"
                w="7"
                h="7"
              />

              <Text color="grayLetter" fontSize="14">
                Trusted by {users} users
              </Text>
            </HStack>
          </Box>
        </Center>

        {/* <MobileConnectWalletModal isOpen={isOpen} onClose={onClose} /> */}
      </Flex>
    </Box>
  );
};

export default ConnectWallet;
