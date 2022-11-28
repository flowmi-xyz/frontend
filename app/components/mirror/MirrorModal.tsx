// logic components
import { ethers } from "ethers";

import { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS } from "~/web3/lens/lens-hub";

// UI components
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
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Link } from "react-router-dom";
import { splitSignature } from "~/utils/formatEther";
import { createPostTypedData } from "~/web3/lens/comment/post";
import { getSignerFront, signedTypeData } from "~/web3/etherservice";

import { v4 as uuid } from "uuid";

import { create } from "ipfs-http-client";
import React from "react";
import { ipfsClient } from "~/web3/ipfs/ipfs-client";

type MirrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  profileId: string;
  handle: string;

  maticBalance: number;
};

const MirrorModal = ({
  isOpen,
  onClose,
  handle,
  address,
  profileId,

  maticBalance,
}: MirrorModalProps) => {
  const [post, setPost] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [firstSign, setFirstSign] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [posted, setPosted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [txHash, setTxHash] = React.useState("");

  async function uploadToIPFS() {
    const metaData = {
      version: "2.0.0",
      content: post,
      description: post,
      name: `Post by @${handle}`,
      external_url: `https://lenster.xyz/u/${handle}`,
      metadata_id: uuid(),
      mainContentFocus: "TEXT_ONLY",
      attributes: [],
      locale: "en-US",
    };

    const added = await ipfsClient.add(JSON.stringify(metaData));
    const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
    return uri;
  }

  const handlePost = async () => {
    setIsLoading(true);
    console.log("handlePost");
    console.log(post);

    const contentURI = await uploadToIPFS();

    const createPostRequest = {
      request: {
        profileId: profileId,
        contentURI: contentURI,
        collectModule: {
          freeCollectModule: { followerOnly: false },
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
      },
    };

    try {
      const signedResult = await createPostTypedData(createPostRequest);

      setIsLoading(false);
      setFirstSign(true);

      const typedData = signedResult.typedData;

      const signature = await signedTypeData(
        typedData.domain,
        typedData.types,
        typedData.value
      );

      const { v, r, s } = splitSignature(signature);

      const lensContract = new ethers.Contract(
        LENS_HUB_CONTRACT_ADDRESS,
        LENS_HUB_ABI,
        getSignerFront()
      );

      setIsLoading(true);

      const tx = await lensContract.postWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      });

      setIsLoading(false);
      setSigned(true);

      await tx.wait();

      setPosted(true);
      setSigned(false);
      setIsLoading(false);

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
                  {maticBalance.toFixed(4)} MATIC
                </Text>
              </Flex>
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
                    Posted successfully!
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    Your post has been successfully created. You can explore
                    your publications to see it.
                  </AlertDescription>
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

          {signed && (
            <Center>
              <VStack paddingTop="5">
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
            // hidden={activeStep == 2}
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
                onClick={handlePost}
                disabled={isLoading || !post}
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
