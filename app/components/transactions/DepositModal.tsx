// logic components
import { BigNumber, ethers } from "ethers";

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
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { parseEther } from "ethers/lib/utils";
import { ERC20_HUB_ABI, WMATIC_CONTRACT_ADDRESS } from "~/web3/erc20/erc20-hub";
import {
  ADS_MIRROR_MODULE_ADDRESS,
  ADS_REFERENCE_ABI,
} from "~/web3/social-defi/social-defi-hub";
import SignedMessageTx from "./common/SignedMessage";
import { GiReceiveMoney } from "react-icons/gi";

type ClaimTokensProps = {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  handle: string;
  amount: number;
  gasFee: any;
  priceFeed: number;
  maticBalance: number;
  wmaticBalance: number;
  awmaticBalance: number;
};

const DepositModal = ({
  isOpen,
  onClose,
  profileId,
  handle,
  amount,
  gasFee,
  priceFeed,
  maticBalance,
  wmaticBalance,
  awmaticBalance,
}: ClaimTokensProps) => {
  const steps = [
    { label: "Approve move tokens" },
    { label: "Confirm deposit" },
    { label: "Deposit completed 🏦" },
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

  const [showTooltip, setShowTooltip] = React.useState(false);

  const [amountT, setAmountT] = React.useState(0);

  const gasLimitNumberApprove = 1000000;
  const gasLimitNumberDeposit = 1000000;

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
        ADS_MIRROR_MODULE_ADDRESS,
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

  const handleDeposit = async () => {
    setIsLoading(true);

    const adsMirrorContract = new ethers.Contract(
      ADS_MIRROR_MODULE_ADDRESS,
      ADS_REFERENCE_ABI,
      getSignerFront()
    );

    try {
      const GAS_LIMIT = BigNumber.from(gasLimitNumberDeposit);
      console.log(parseEther(awmaticBalance.toString()));

      const followProfile = await adsMirrorContract.fundMyGlobalBudget(
        profileId,
        parseEther(amountT.toString()),
        WMATIC_CONTRACT_ADDRESS,
        {
          gasLimit: GAS_LIMIT,
        }
      );

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
    window.open(`https://mumbai.polygonscan.com/tx/${txHash}`, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader>Deposit tokens to vault</ModalHeader>
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

          {/* {false && ( */}
          {activeStep === 0 && !signed && (
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

              <Box mt="10">
                <Center>
                  <HStack width={"300px"} justifyContent="space-between">
                    <Text>Deposit:</Text>
                    <HStack justifyContent="end">
                      <Image
                        src="../assets/logos/wrapped-matic-logo.png"
                        w="5"
                        h="5"
                        ml="2"
                        my="auto"
                      />{" "}
                      <Text fontSize={14} fontWeight={700}>
                        WMATIC
                      </Text>
                    </HStack>
                  </HStack>
                </Center>

                <Center paddingTop={"0"}>
                  <InputGroup
                    boxShadow={"0px 4px 14px rgba(0, 0, 0, 0.1)"}
                    borderRadius={"8px"}
                    height={"50px"}
                    width={"300px"}
                  >
                    <Input
                      type="number"
                      border={"0"}
                      focusBorderColor="white"
                      value={amountT}
                      onChange={(event: any) => setAmountT(event.target.value)}
                      margin={"auto"}
                      size={"lg"}
                    />
                    <InputRightElement
                      width="30"
                      paddingRight={"5px"}
                      paddingTop={2}
                    >
                      <Button
                        height="24px"
                        border="2px"
                        borderColor="first"
                        borderRadius="53px"
                        onClick={() =>
                          setAmountT(Number(wmaticBalance.toFixed(4)))
                        }
                      >
                        <Text
                          fontWeight="700"
                          fontSize="14px"
                          lineHeight="16.8px"
                          color="first"
                        >
                          Max
                        </Text>
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Center>

                <Center paddingTop={"3"}>
                  <Slider
                    id="slider"
                    defaultValue={5}
                    min={0}
                    max={100}
                    value={(amountT / wmaticBalance) * 100}
                    onChange={(v) =>
                      setAmountT(Number((v * (wmaticBalance / 100)).toFixed(4)))
                    }
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    width={"300px"}
                  >
                    <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
                      25%
                    </SliderMark>
                    <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                      50%
                    </SliderMark>
                    <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
                      75%
                    </SliderMark>
                    <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
                      100%
                    </SliderMark>
                    <SliderTrack bg={"gray"}>
                      <SliderFilledTrack bg={"primary"} />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="primary"
                      color="white"
                      placement="top"
                      isOpen={showTooltip}
                      label={`${(amount / wmaticBalance) * 100}%`}
                    >
                      <SliderThumb />
                    </Tooltip>
                  </Slider>
                </Center>
              </Box>

              <HStack pt="10">
                <Text>
                  You are going to allow us to move your tokens to the vault.
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

              <Flex pt="5">
                <Text
                  fontWeight="600"
                  fontSize="14px"
                  color="grayLetter"
                  my="auto"
                >
                  Your balance:
                </Text>

                <Box ml="5">
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

                  <Flex pb="3">
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
            </Box>
          )}

          {approveCompleted && !signed && !followCompleted && !error && (
            // {true && (
            <>
              <Box mt="5" pt="5" pl="5" pr="5">
                <Center>
                  <Alert status="success" borderRadius={10}>
                    <AlertIcon />
                    Approved successfully!
                  </Alert>
                </Center>

                <Text
                  fontWeight="600"
                  fontSize="14px"
                  lineHeight="120%"
                  color="black"
                  pt="5"
                >
                  Now, you are going to deposit our tokens to our vault to use
                  for ads.
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
                      Deposit
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
                      {amountT} WMATIC
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
                        gasLimitNumberDeposit *
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
                        gasLimitNumberDeposit *
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

                <Flex pt="5">
                  <Text
                    fontWeight="600"
                    fontSize="14px"
                    color="grayLetter"
                    my="auto"
                  >
                    Your balance:
                  </Text>

                  <Box ml="5">
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

                    <Flex pb="3">
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
              </Box>
            </>
          )}

          {followCompleted && !error && (
            <Box pt="5" pl="5" pr="5">
              <Center pt="5">
                <Alert status="success" borderRadius={10}>
                  <AlertIcon />
                  Deposit successfully!
                </Alert>
              </Center>

              <Text pt="5">
                Congratulations, you have successfully deposit your{" "}
                <Text
                  as="span"
                  fontWeight="700"
                  fontSize="14px"
                  bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
                  bgClip="text"
                >
                  {amountT.toFixed(4)}
                </Text>{" "}
                WMATIC
              </Text>
            </Box>
          )}

          {isLoading && (
            <HStack pt="5" pl="5" pr="5">
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
                bg="first"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                mr="5"
                onClick={handleDeposit}
                disabled={isLoading || signed}
              >
                <Text
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="21.6px"
                  color="white"
                >
                  Deposit
                </Text>
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

export default DepositModal;
