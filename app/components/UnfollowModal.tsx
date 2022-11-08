import React from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
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
  VStack,
} from "@chakra-ui/react";

import { ethers } from "ethers";

import { createUnfollowTypedData } from "~/web3/lens/follow/unfollow";
import { LENS_HUB_ABI } from "~/web3/lens/lens-hub";
import { getSigner } from "~/web3/etherservice";

import { Step, Steps, useSteps } from "chakra-ui-steps";

type UnFollowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  handle: string;
};

const UnfollowModal = ({
  isOpen,
  onClose,
  profileId,
  handle,
}: UnFollowModalProps) => {
  const steps = [{ label: "Confirm unfollow" }, { label: "Unfollow complete" }];

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleUnfollow = async () => {
    setIsLoading(true);

    const unfollowTypedData = await createUnfollowTypedData({
      request: { profile: profileId },
    });

    const typedData = unfollowTypedData.typedData;

    const followNFTContract = new ethers.Contract(
      typedData.domain.verifyingContract,
      LENS_HUB_ABI,
      getSigner()
    );

    nextStep();

    try {
      const burnTx = await followNFTContract.burn(typedData.value.tokenId);

      setIsLoading(false);
      setSigned(true);

      await burnTx.wait();

      setSigned(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    reset();

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader>Unfollow</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Steps
              labelOrientation="vertical"
              activeStep={activeStep}
              responsive={false}
              size="sm"
            >
              {steps.map(({ label }) => (
                <Step label={label} key={label}></Step>
              ))}
            </Steps>
          </Box>

          <Box>
            <Text p="10">
              You are going to stop following the profile @{handle}.
            </Text>

            <Text>
              Remember that tokens deposited when making DeFi Follow will not be
              returned.
            </Text>
          </Box>

          {isLoading && (
            <HStack paddingLeft="10" paddingTop="10">
              <Text>Waiting for confirmation with your wallet...</Text>
              <Spinner size={"md"} />
            </HStack>
          )}

          {signed && (
            <Center>
              <VStack paddingTop="10">
                <Alert
                  marginBottom="5"
                  status="info"
                  borderRadius="15"
                  width="80%"
                >
                  <AlertIcon />
                  <AlertTitle fontWeight="light">
                    The transaction is being processed.
                  </AlertTitle>
                </Alert>

                <HStack paddingLeft="10">
                  <Text fontWeight="700">
                    Waiting transacction to be mined...
                  </Text>

                  <Image
                    src="https://feature.undp.org/beyond-bitcoin/es/assets/mbNja7QNnr/block3.gif"
                    width="50%"
                  />
                </HStack>
              </VStack>
            </Center>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            bg="white"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mr="5"
          >
            <Text
              fontWeight="500"
              fontSize="18px"
              lineHeight="21.6px"
              color="first"
              onClick={handleClose}
            >
              Cancel
            </Text>
          </Button>

          <Button
            bg="third"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            onClick={handleUnfollow}
          >
            <Text
              fontWeight="500"
              fontSize="18px"
              lineHeight="21.6px"
              color="white"
            >
              Unfollow
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UnfollowModal;
