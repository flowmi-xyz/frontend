// logic components
import { BigNumber, ethers } from "ethers";

import { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS } from "~/web3/lens/lens-hub";
import { getSignerFront } from "~/web3/etherservice";
import { removeProfileIdPrefix } from "~/web3/lens/lent-utils";

// UI components
import React from "react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import SignedMessageTx from "../transactions/common/SignedMessage";

type MirrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  profileId: string;
  profileIdToMirror: string;
  handle: string;
  maticBalance: number;
  id: string;
};

const MirrorModal = ({
  isOpen,
  onClose,
  handle,
  address,
  profileId,
  profileIdToMirror,
  maticBalance,
  id,
}: MirrorModalProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [firstSign, setFirstSign] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [posted, setPosted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [txHash, setTxHash] = React.useState("");

  const handleMirror = async () => {
    setIsLoading(true);
    console.log("handleMirror");

    try {
      const lensContract = new ethers.Contract(
        LENS_HUB_CONTRACT_ADDRESS,
        LENS_HUB_ABI,
        getSignerFront()
      );

      setIsLoading(true);

      const publicationId = removeProfileIdPrefix(id, profileIdToMirror);

      const GAS_LIMIT = BigNumber.from(10000000);

      const tx = await lensContract.mirror(
        {
          profileId: profileId,
          profileIdPointed: profileIdToMirror,
          pubIdPointed: publicationId,
          referenceModuleData: [],
          referenceModule: ethers.constants.AddressZero,
          referenceModuleInitData: [],
        },
        {
          gasLimit: GAS_LIMIT,
        }
      );

      setIsLoading(false);
      setSigned(true);

      await tx.wait();

      setPosted(true);
      setSigned(false);
      setIsLoading(false);

      console.log("mirror succefully ", tx);

      setTxHash(tx.hash);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsLoading(false);
    setSigned(false);
    setError(false);

    onClose();
  };

  const handleExploreTx = async () => {
    window.open(`https://mumbai.polygonscan.com/tx/${txHash}`, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader>Mirror post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!signed && !error && !posted && (
            <Box>
              {/* <Textarea
                name="post"
                placeholder='What"s on your mind?'
                rows={4}
                resize="none"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              /> */}

              <Divider mt="5" />

              {/* <Flex pt="5">
                <Text
                  fontWeight="700"
                  fontSize="20px"
                  color="grayLetter"
                  my="auto"
                >
                  Your balance:
                </Text>{" "}
                <Image
                  src="../assets/logos/polygon-matic-logo.png"
                  w="5"
                  h="5"
                  ml="2"
                  my="auto"
                />
                <Text
                  fontWeight="600"
                  fontSize="18px"
                  color="black"
                  ml="2"
                  my="auto"
                >
                  {maticBalance.toFixed(4)} MATIC
                </Text>
              </Flex> */}
            </Box>
          )}

          {firstSign && !signed && !error && !posted && (
            <Box>
              <Text
                fontWeight="500"
                fontSize="18px"
                lineHeight="120%"
                color="black"
              >
                You need to post now
              </Text>
            </Box>
          )}

          {posted && (
            <>
              <Center pl="5" pr="5">
                <Alert
                  status="success"
                  borderRadius={10}
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <AlertIcon boxSize="40px" />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Mirrored successfully!
                  </AlertTitle>
                </Alert>
              </Center>
            </>
          )}

          {isLoading && (
            <HStack pt="5">
              <Text>Waiting for confirmation with your wallet...</Text>
              <Spinner size="md" color="third" />
            </HStack>
          )}

          {signed && <SignedMessageTx />}

          {error && (
            <Box p="5">
              <Alert status="error" borderRadius={10}>
                <AlertIcon />
                The transaction has failed
              </Alert>

              <Text
                fontWeight="600"
                fontSize="14px"
                lineHeight="120%"
                color="black"
                pt="5"
              >
                Please, try again 5 minutes later. If the problem persists,
                contact us.
              </Text>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            bg="white"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mr="5"
            onClick={handleClose}
          >
            <Text
              fontWeight="700"
              fontSize="18px"
              lineHeight="21.6px"
              color="first"
            >
              Cancel
            </Text>
          </Button>

          {!signed && !error && !posted && (
            <>
              <Button
                bg="lens"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleMirror}
                hidden={error}
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
                    Mirror
                  </Text>
                </Flex>
              </Button>
            </>
          )}

          {/* {activeStep == 2 && ( */}
          {false && (
            <>
              <Button
                bg="white"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleExploreTx}
                mr="5"
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="second"
                >
                  View on Explorer
                </Text>
              </Button>

              <Link to={`/${handle}`}>
                <Button
                  bg="first"
                  borderRadius="10px"
                  boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                >
                  <Text
                    fontWeight="500"
                    fontSize="18px"
                    lineHeight="21.6px"
                    color="white"
                  >
                    Go to @{handle}
                  </Text>
                </Button>
              </Link>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MirrorModal;
