// logic components
import { BigNumber, ethers } from "ethers";
import { defaultAbiCoder, parseEther } from "ethers/lib/utils";

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

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { WMATIC_CONTRACT_ADDRESS } from "~/web3/erc20/erc20-hub";

type CreateProfileProps = {
  isOpen: boolean;
  onClose: () => void;
  followModule: string;
  followModuleAddress: string;
  profileId: string;
  addressProfile: string;
  gasFee: any;
  priceFeed: number;
  wmaticBalance: number;
};

const SetFollowModuleModal = ({
  isOpen,
  onClose,
  followModule,
  followModuleAddress,
  profileId,
  addressProfile,
  gasFee,
  priceFeed,
  wmaticBalance,
}: CreateProfileProps) => {
  const steps = [
    { label: "Confirm follow module" },
    { label: "Follow module changed" },
  ];

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [txHash, setTxHash] = React.useState("");

  const gasLimitNumber = 50000;

  const handleConfirmSetFollowModule = async () => {
    setIsLoading(true);
    const lensContract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENS_HUB_ABI,
      getSignerFront()
    );

    const DEFAULT_FOLLOW_PRICE = parseEther("0.1");

    const data = defaultAbiCoder.encode(
      ["uint256", "address", "address"],
      [DEFAULT_FOLLOW_PRICE, WMATIC_CONTRACT_ADDRESS, addressProfile]
    );

    try {
      const GAS_LIMIT = BigNumber.from(gasLimitNumber);

      const setFollowModule = await lensContract.setFollowModule(
        profileId,
        followModuleAddress,
        data,
        {
          gasLimit: GAS_LIMIT,
        }
      );

      nextStep();
      setIsLoading(false);
      setSigned(true);

      const setFollowModuleTx = await setFollowModule.wait();

      nextStep();
      setTxHash(setFollowModuleTx.transactionHash);
      setSigned(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setSigned(false);

      console.log(error);
    }
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader>Set follow module</ModalHeader>
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

          {activeStep == 0 && (
            <>
              <Text
                fontWeight="600"
                fontSize="14px"
                lineHeight="120%"
                color="black"
                pt="5"
                pl="5"
                pr="5"
              >
                You are going to change your follow module to for the next
                profile # {profileId}.
              </Text>

              <Flex pt="5" pl="5" pr="5">
                <Text
                  fontWeight="600"
                  fontSize="14px"
                  color="lensDark"
                  width="30%"
                >
                  user address:
                </Text>

                <Text
                  fontWeight="700"
                  fontSize="14px"
                  bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                  bgClip="text"
                >
                  {`${addressProfile.slice(0, 6)} ... ${addressProfile.slice(
                    addressProfile.length - 4,
                    addressProfile.length
                  )}`}
                </Text>
              </Flex>

              <Flex pt="5" pl="5" pr="5">
                <Text
                  fontWeight="600"
                  fontSize="14px"
                  color="lensDark"
                  width="30%"
                >
                  follow Module:
                </Text>

                <Text
                  fontWeight="700"
                  fontSize="14px"
                  bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                  bgClip="text"
                >
                  {`${followModuleAddress.slice(
                    0,
                    6
                  )} ... ${followModuleAddress.slice(
                    followModuleAddress.length - 4,
                    followModuleAddress.length
                  )}`}
                </Text>
              </Flex>

              <Flex pt="5" pl="5" pr="5">
                <Text
                  fontWeight="600"
                  fontSize="14px"
                  color="lensDark"
                  width="30%"
                >
                  followModule:
                </Text>

                <Text
                  fontWeight="700"
                  fontSize="14px"
                  bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                  bgClip="text"
                >
                  {followModule}
                </Text>
              </Flex>

              <Divider mt="5" />

              <Flex mt="5" justify="space-between">
                <Box>
                  <Text fontWeight="700" fontSize="16" color="black">
                    Transaction Fee
                  </Text>
                  <Text fontWeight="500" fontSize="14" color="gray">
                    Total gas paid
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="700" fontSize="16" color="black">
                    ${" "}
                    {(
                      gasLimitNumber *
                      gasFee.fast.maxPriorityFee *
                      1e-9 *
                      priceFeed *
                      10
                    ).toFixed(6)}{" "}
                    USD
                  </Text>
                  <Text fontWeight="500" fontSize="14" color="gray">
                    {(
                      gasLimitNumber *
                      gasFee.fast.maxPriorityFee *
                      1e-9
                    ).toFixed(6)}{" "}
                    MATIC
                  </Text>
                </Box>
              </Flex>

              <Flex mt="5" justify="space-between">
                <Box>
                  <Text fontWeight="700" fontSize="16" color="black">
                    Social DeFi Fee (0%)
                  </Text>
                  <Text fontWeight="500" fontSize="14" color="gray">
                    Platform charge
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="700" fontSize="16" color="black">
                    $ 0 USD
                  </Text>
                  <Text fontWeight="500" fontSize="14" color="gray">
                    0 MATIC
                  </Text>
                </Box>
              </Flex>

              <Alert status="info" borderRadius={10} mt="5">
                <AlertIcon />
                Social DeFi charge 0% fee for all transactions.
              </Alert>

              <Flex pt="5" pl="5">
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
            </>
          )}

          {activeStep == 2 && (
            <>
              <>
                <Center pt="5" pl="5" pr="5">
                  <Alert status="success" borderRadius={10}>
                    <AlertIcon />
                    Change follow module success
                  </Alert>
                </Center>

                <Text pt="5" pl="5" pr="5">
                  Congratulations, you have changed your follow module to{" "}
                  <Text
                    as="span"
                    fontWeight="700"
                    fontSize="14px"
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    bgClip="text"
                  >
                    {followModule}
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
        </ModalBody>

        <ModalFooter>
          {activeStep === 0 && (
            <>
              <Button
                bg="white"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                mr="5"
                onClick={handleClose}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="first"
                >
                  Cancel
                </Text>
              </Button>

              <Button
                bg="lens"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleConfirmSetFollowModule}
                disabled={isLoading}
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
                    fontWeight="500"
                    fontSize="18px"
                    lineHeight="21.6px"
                    color="lensDark"
                    m="auto"
                  >
                    Set follow module
                  </Text>
                </Flex>
              </Button>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Button
                bg="white"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                mr="5"
                onClick={handleClose}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="first"
                >
                  Close
                </Text>
              </Button>

              <Button
                bg="second"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleExploreTx}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="white"
                >
                  View on Explorer
                </Text>
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SetFollowModuleModal;
