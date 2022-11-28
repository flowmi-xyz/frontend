import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// icons
import { TbHash, TbLocation } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";

import { transformToIpfsUrl } from "~/web3/ipfs/ipfs";

import FollowModal from "../transactions/FollowModal";
import UnfollowModal from "../transactions/UnfollowModal";
import DefiFollowModal from "../transactions/DefiFollowModal";

import { FLOWMI_CONTRACT_ADDRESS } from "~/web3/social-defi/social-defi-hub";

type LensterProfileProps = {
  name: string;
  handle: string;
  id: string;
  avatar?: string;
  followers?: number;
  following?: number;
  location?: string;
  ens?: string;
  website?: string;
  twitter?: string;
  isFollowed: boolean;
  followModuleAddress: string;
  amount: number;
  gasFee: any;
  priceFeed: number;
  maticBalance: number;
  wmaticBalance: number;
  tokensAccumulated: number;
  countFollowers: number;
  goalOfFollowers: number;
};

const LensterProfile = ({
  name,
  handle,
  avatar,
  followers,
  following,
  id,
  location,
  ens,
  website,
  twitter,
  isFollowed,
  followModuleAddress,
  amount,
  gasFee,
  priceFeed,
  maticBalance,
  wmaticBalance,
  tokensAccumulated,
  countFollowers,
  goalOfFollowers,
}: LensterProfileProps) => {
  const {
    isOpen: isOpenUnfollow,
    onOpen: onOpenUnfollow,
    onClose: oncloseUnfollow,
  } = useDisclosure();

  const {
    isOpen: isOpenDefiFollow,
    onOpen: onOpenDefiFollow,
    onClose: onCloseDefiFollow,
  } = useDisclosure();

  const {
    isOpen: isOpenFollow,
    onOpen: onOpenFollow,
    onClose: onCloseFollow,
  } = useDisclosure();

  return (
    <Box
      m="5"
      pt="10"
      pl="10"
      pr="10"
      width="300px"
      border="1px"
      borderColor="#E0E0E3"
      borderRadius="10px"
    >
      <Box p="2" borderRadius="2xl" bg="#FAFAF9">
        <Image
          src={transformToIpfsUrl(avatar as string)}
          w="300px"
          h="200px"
          objectFit="cover"
          borderRadius="md"
        />
      </Box>

      <Text
        fontWeight="600"
        fontSize="24px"
        lineHeight="120%"
        letterSpacing="-0.03em"
        color="black"
        pt="4"
      >
        {name}
      </Text>
      <Text
        fontWeight="700"
        fontSize="22px"
        bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
        bgClip="text"
        pt="1"
      >
        @{handle}
      </Text>
      <Flex pt="5" justifyContent="space-between">
        <Box>
          <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="120%"
            color="black"
            textAlign="center"
          >
            {followers}
          </Text>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="grayLetter"
          >
            Followers
          </Text>
        </Box>

        <Box>
          <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="120%"
            color="black"
            textAlign="center"
          >
            {following}
          </Text>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="grayLetter"
          >
            Following
          </Text>
        </Box>
      </Flex>

      {!isFollowed ? (
        followModuleAddress === FLOWMI_CONTRACT_ADDRESS ? (
          <Button
            bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mt="5"
            onClick={onOpenDefiFollow}
          >
            <Flex>
              <Icon
                as={AiOutlineStar}
                w="6"
                h="6"
                color="white"
                mr="2"
                my="auto"
              />

              <Text
                fontWeight="600"
                fontSize="18px"
                lineHeight="21.6px"
                color="white"
                m="auto"
              >
                DeFi follow
              </Text>
            </Flex>
          </Button>
        ) : (
          <Button
            bg="lens"
            borderRadius="10px"
            boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
            mt="5"
            onClick={onOpenFollow}
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

              <Text fontWeight="700" fontSize="16px" color="lensDark" m="auto">
                Follow
              </Text>
            </Flex>
          </Button>
        )
      ) : (
        <Button
          bg="third"
          borderRadius="10px"
          boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
          mt="5"
          onClick={onOpenUnfollow}
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
      )}

      <DefiFollowModal
        isOpen={isOpenDefiFollow}
        onClose={onCloseDefiFollow}
        profileId={id}
        handle={handle}
        amount={amount}
        gasFee={gasFee}
        priceFeed={priceFeed}
        maticBalance={maticBalance}
        wmaticBalance={wmaticBalance}
        tokensAccumulated={tokensAccumulated}
        countFollowers={countFollowers}
        goalOfFollowers={goalOfFollowers}
      />

      <FollowModal
        isOpen={isOpenFollow}
        onClose={onCloseFollow}
        profileId={id}
        handle={handle}
        gasFee={gasFee}
        priceFeed={priceFeed}
        maticBalance={maticBalance}
      />

      <UnfollowModal
        isOpen={isOpenUnfollow}
        onClose={oncloseUnfollow}
        profileId={id}
        handle={handle}
        gasFee={gasFee}
        priceFeed={priceFeed}
        maticBalance={maticBalance}
      />

      <Divider pt="3" />

      <Flex pt="3" pb="3">
        <Icon as={TbHash} color="first" w="4" h="4" />

        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="120%"
          color="black"
          pl="3"
          my="auto"
        >
          {id}
        </Text>
      </Flex>

      {location && (
        <Flex pt="3">
          <Icon as={TbLocation} color="third" w="4" h="4" />
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="black"
            pl="3"
            my="auto"
          >
            {location}
          </Text>
        </Flex>
      )}

      {ens && (
        <Flex pt="3">
          <Image src="../assets/ens.png" w="4" h="4" />
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="black"
            pl="3"
            my="auto"
          >
            {ens}
          </Text>
        </Flex>
      )}

      {website && (
        <Flex pt="3">
          <Icon as={BiWorld} color="second" w="4" h="4" />
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="black"
            pl="3"
            my="auto"
          >
            {website}
          </Text>
        </Flex>
      )}

      {twitter && (
        <Flex pt="3">
          <Icon as={FaTwitter} color="twitter" w="4" h="4" />

          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="120%"
            color="black"
            pl="3"
            my="auto"
          >
            {twitter}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default LensterProfile;
