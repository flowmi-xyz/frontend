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
import { defaultAbiCoder, parseEther } from "ethers/lib/utils";
import { ERC20_HUB_ABI, WMATIC_CONTRACT_ADDRESS } from "~/web3/erc20/erc20-hub";
import { FLOWMI_CONTRACT_ADDRESS } from "~/web3/social-defi";

type FollowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  handle: string;
  amount: number;
  gasFee: any;
  priceFeed: number;
  maticBalance: number;
  wmaticBalance: number;
};

const DefiFollowModal = ({
  isOpen,
  onClose,
  profileId,
  handle,
  amount,
  gasFee,
  priceFeed,
  maticBalance,
  wmaticBalance,
}: FollowModalProps) => {
  const steps = [
    { label: "Approve move tokens" },
    { label: "Confirm Follow" },
    { label: "Follow complete 🎉" },
  ];

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [approveCompleted, setApproveCompleted] = React.useState(false);
  const [followCompleted, setFollowCompleted] = React.useState(false);

  const [txHash, setTxHash] = React.useState("");

  const gasLimitNumberApprove = 30000;
  const gasLimitNumberDefiFollow = 300000;

  const DEFAULT_FOLLOW_PRICE = parseEther(amount.toString());
  const MAX_UINT256 =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  const handleApprove = async () => {
    setIsLoading(true);

    try {
      const tokenContract = new ethers.Contract(
        WMATIC_CONTRACT_ADDRESS,
        ERC20_HUB_ABI,
        getSignerFront()
      );

      const GAS_LIMIT = BigNumber.from(gasLimitNumberApprove);

      const approve = await tokenContract.approve(
        FLOWMI_CONTRACT_ADDRESS,
        MAX_UINT256,
        {
          gasLimit: GAS_LIMIT,
        }
      );

      setIsLoading(false);
      setSigned(true);

      const approveTx = await approve.wait();

      console.log(" handleApprove() approveTx:", approveTx);

      setSigned(false);

      nextStep();
      setApproveCompleted(true);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setSigned(false);

      console.log(error);
    }
  };

  const handleFollow = async () => {
    setIsLoading(true);

    const lensContract = new ethers.Contract(
      LENS_HUB_CONTRACT_ADDRESS,
      LENS_HUB_ABI,
      getSignerFront()
    );

    const data = defaultAbiCoder.encode(
      ["address", "uint256"],
      [WMATIC_CONTRACT_ADDRESS, DEFAULT_FOLLOW_PRICE]
    );

    try {
      const GAS_LIMIT = BigNumber.from(gasLimitNumberDefiFollow);

      const followProfile = await lensContract.follow([profileId], [data], {
        gasLimit: GAS_LIMIT,
      });

      nextStep();

      setIsLoading(false);
      setSigned(true);

      const followTx = await followProfile.wait();

      setTxHash(followTx.transactionHash);

      nextStep();
      setSigned(false);
      setFollowCompleted(true);
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
    window.open(`https://polygonscan.com/tx/${txHash}`, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader>DeFi Follow</ModalHeader>
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

          {activeStep === 0 && !signed && (
            // {false && (
            <Box pt="5" pl="5" pr="5">
              <Center>
                <Alert status="warning" borderRadius={10}>
                  <AlertIcon />
                  Remember, you are going to do two transacctions.
                </Alert>
              </Center>

              <Text pt="5">
                First, you have to approve our contract to move your tokens.
              </Text>

              <HStack pt="5">
                <Text>
                  You are going to allow us to move{" "}
                  <Text as="span" fontWeight="700" color="sixth" fontSize="16">
                    {amount.toFixed(4)} WMATIC (0.1 $USD)
                  </Text>{" "}
                  to the Aave protocol.
                </Text>
              </HStack>

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
                      gasLimitNumberApprove *
                      gasFee.standard.maxPriorityFee *
                      1e-9 *
                      priceFeed *
                      10
                    ).toFixed(6)}{" "}
                    USD
                  </Text>
                  <Text fontWeight="500" fontSize="14" color="gray">
                    {(
                      gasLimitNumberApprove *
                      gasFee.standard.maxPriorityFee *
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
                  {maticBalance.toFixed(4)} MATIC
                </Text>
              </Flex>
            </Box>
          )}

          {approveCompleted && !signed && !followCompleted && !error && (
            <>
              <Box mt="5" pt="5" pl="5" pr="5">
                <Center>
                  <Alert status="success" borderRadius={10}>
                    <AlertIcon />
                    Approved successfully!
                  </Alert>
                </Center>

                <Text pt="5">
                  Thanks for allowing us to move your tokens to Aave protocol 🙌
                </Text>

                <Text
                  fontWeight="600"
                  fontSize="14px"
                  lineHeight="120%"
                  color="black"
                  pt="5"
                >
                  Now, you are going to start following the profile{" "}
                  <Text
                    as="span"
                    fontWeight="700"
                    fontSize="14px"
                    bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                    bgClip="text"
                  >
                    @{handle}
                  </Text>
                </Text>

                <Divider mt="5" />

                <Flex mt="5" justify="space-between">
                  <Box>
                    <Text
                      fontWeight="700"
                      fontSize="16"
                      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                      bgClip="text"
                    >
                      Defi Follow Fee
                    </Text>
                    <Text fontWeight="500" fontSize="14" color="gray">
                      Total paid
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontWeight="700"
                      fontSize="16"
                      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                      bgClip="text"
                      textAlign="right"
                    >
                      $ 0.1 USD
                    </Text>
                    <Text fontWeight="500" fontSize="14" color="gray">
                      {amount.toFixed(4)} WMATIC
                    </Text>
                  </Box>
                </Flex>

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
                    <Text
                      fontWeight="700"
                      fontSize="16"
                      color="black"
                      textAlign="right"
                    >
                      ${" "}
                      {(
                        gasLimitNumberDefiFollow *
                        gasFee.standard.maxPriorityFee *
                        1e-9 *
                        priceFeed *
                        10
                      ).toFixed(6)}{" "}
                      USD
                    </Text>
                    <Text
                      fontWeight="500"
                      fontSize="14"
                      color="gray"
                      textAlign="right"
                    >
                      {(
                        gasLimitNumberDefiFollow *
                        gasFee.standard.maxPriorityFee *
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
                    fontWeight="600"
                    fontSize="14px"
                    color="grayLetter"
                    my="auto"
                  >
                    Your balance:
                  </Text>

                  <Box>
                    <Flex pb="3">
                      <Image
                        src="../assets/logos/polygon-matic-logo.png"
                        w="5"
                        h="5"
                        ml="2"
                        my="auto"
                      />
                      <Text
                        fontWeight="600"
                        fontSize="14px"
                        color="black"
                        ml="2"
                        my="auto"
                      >
                        {maticBalance.toFixed(4)} MATIC
                      </Text>
                    </Flex>

                    <Flex>
                      <Image
                        src="../assets/logos/wrapped-matic-logo.png"
                        w="5"
                        h="5"
                        ml="2"
                        my="auto"
                      />
                      <Text
                        fontWeight="600"
                        fontSize="14px"
                        color="black"
                        ml="2"
                        my="auto"
                      >
                        {wmaticBalance.toFixed(4)} WMATIC
                      </Text>
                    </Flex>
                  </Box>
                </Flex>

                <Text
                  textAlign="justify"
                  fontWeight="400"
                  fontSize="14px"
                  lineHeight="120%"
                  color="grayLetter"
                  pt="5"
                  pl="5"
                  pr="5"
                >
                  Remember, your WMATIC will be locked in the Aave protocol
                  until the number of Defi followers reaches 3, the accumulated
                  jackpot will be drawn among all the defi followers.
                </Text>
              </Box>
            </>
          )}

          {followCompleted && !error && (
            <>
              <>
                <Center pt="5">
                  <Alert status="success" borderRadius={10}>
                    <AlertIcon />
                    Follow successfully!
                  </Alert>
                </Center>

                <Text pt="5">
                  Congratulations, you have just follow the profile{" "}
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
                bg="first"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleApprove}
                disabled={isLoading || signed}
              >
                <Flex>
                  <Text
                    fontWeight="500"
                    fontSize="18px"
                    lineHeight="21.6px"
                    color="white"
                    m="auto"
                  >
                    Approve
                  </Text>
                </Flex>
              </Button>
            </>
          )}

          {approveCompleted && !followCompleted && (
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
                onClick={handleFollow}
                disabled={isLoading || signed}
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
                    DeFi follow
                  </Text>
                </Flex>
              </Button>
            </>
          )}

          {followCompleted && (
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
                bg="white"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleExploreTx}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="third"
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

export default DefiFollowModal;
