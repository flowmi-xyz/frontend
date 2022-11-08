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

import { transformToIpfsUrl } from "~/web3/ipfs";

import FollowModal from "../FollowModal";
import UnfollowModal from "../UnfollowModal";

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
}: LensterProfileProps) => {
  const {
    isOpen: isOpenUnfollow,
    onOpen: onOpenUnfollow,
    onClose: oncloseUnfollow,
  } = useDisclosure();

  const {
    isOpen: isOpenFollow,
    onOpen: onOpenFollow,
    onClose: onCloseFollow,
  } = useDisclosure();

  return (
    <Box m="5" p="10" width="300px">
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
        fontSize="14px"
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

      <FollowModal
        isOpen={isOpenFollow}
        onClose={onCloseFollow}
        profileId={id}
        handle={handle}
      />

      <UnfollowModal
        isOpen={isOpenUnfollow}
        onClose={oncloseUnfollow}
        profileId={id}
        handle={handle}
      />

      <Divider pt="3" />

      <Flex pt="3">
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
