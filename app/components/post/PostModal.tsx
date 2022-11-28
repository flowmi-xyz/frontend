// logic components
import { BigNumber, ethers } from "ethers";

import { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS } from "~/web3/lens/lens-hub";

import { getSignerFront } from "~/web3/etherservice";

// UI components
import React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Link } from "react-router-dom";

type CreateProfileProps = {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  handle: string;
  gasFee: any;
  priceFeed: number;
  wmaticBalance: number;
};

const PostModal = ({
  isOpen,
  onClose,
  handle,
  profileId,
  gasFee,
  priceFeed,
  wmaticBalance,
}: CreateProfileProps) => {
  const steps = [
    { label: "Confirm default profile" },
    { label: "Set default profile ✅" },
  ];

  console.log(gasFee);

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  const [post, setPost] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [txHash, setTxHash] = React.useState("");

  const gasLimitNumber = 500000;

  const handlePost = async () => {
    console.log("handlePost");
    console.log(post);
    // setIsLoading(true);

    // const lensContract = new ethers.Contract(
    //   LENS_HUB_CONTRACT_ADDRESS,
    //   LENS_HUB_ABI,
    //   getSignerFront()
    // );

    // const GAS_LIMIT = BigNumber.from(gasLimitNumber);

    // try {
    //   const setDefaultProfile = await lensContract.setDefaultProfile(
    //     profileId,
    //     {
    //       gasLimit: GAS_LIMIT,
    //     }
    //   );

    //   nextStep();

    //   setIsLoading(false);
    //   setSigned(true);

    //   const setDefaultProfileTx = await setDefaultProfile.wait();

    //   setTxHash(setDefaultProfileTx.transactionHash);

    //   nextStep();
    //   setSigned(false);
    // } catch (error) {
    //   setError(true);
    //   setIsLoading(false);
    //   setSigned(false);

    //   console.log(error);
    // }
  };

  const handleClose = () => {
    setIsLoading(false);
    setSigned(false);
    setError(false);

    reset();
    onClose();
  };

  const handleExploreTx = async () => {
    window.open(`https://mumbai.polygonscan.com/tx/${txHash}`, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader>Create post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {activeStep == 0 && !signed && !error && (
            <Box>
              <Textarea
                name="post"
                placeholder='What"s on your mind?'
                rows={4}
                resize="none"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />

              <Divider mt="5" />

              <Flex pt="5">
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
                  {wmaticBalance.toFixed(4)} MATIC
                </Text>
              </Flex>
            </Box>
          )}

          {activeStep == 2 && !signed && !error && (
            <>
              <>
                <Center pt="5" pl="5" pr="5">
                  <Alert status="success" borderRadius={10}>
                    <AlertIcon />
                    Set default profile successfully!
                  </Alert>
                </Center>

                <Text pt="5" pl="5" pr="5">
                  Congratulations, you have change to default profile to the
                  profile{" "}
                  <Text
                    as="span"
                    fontWeight="700"
                    fontSize="14px"
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    bgClip="text"
                  >
                    @{handle}
                  </Text>{" "}
                  in the Lens protocol.
                </Text>
              </>
            </>
          )}

          {isLoading && (
            <HStack pt="5" pl="5" pr="5">
              <Text>Waiting for confirmation with your wallet...</Text>
              <Spinner size="md" color="third" />
            </HStack>
          )}

          {signed && (
            <Center>
              <VStack paddingTop="5" pl="5" pr="5">
                <HStack>
                  <Text
                    fontWeight="700"
                    fontSize="14px"
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    bgClip="text"
                  >
                    Waiting transacction to be mined...
                  </Text>

                  <Image
                    src="https://feature.undp.org/beyond-bitcoin/es/assets/mbNja7QNnr/block3.gif"
                    width="50%"
                  />
                </HStack>

                <Text
                  textAlign="center"
                  fontWeight="500"
                  fontSize="12px"
                  lineHeight="120%"
                  color="grayLetter"
                  pt="5"
                >
                  This usually takes 0-1 minutes to complete
                </Text>
              </VStack>
            </Center>
          )}

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
            hidden={activeStep == 2}
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

          {activeStep == 0 && (
            <>
              <Button
                bg="lens"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handlePost}
                disabled={isLoading}
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
                    Post
                  </Text>
                </Flex>
              </Button>
            </>
          )}

          {activeStep == 2 && (
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

export default PostModal;
