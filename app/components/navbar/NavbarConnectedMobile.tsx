import React from "react";

import { Link } from "@remix-run/react";

import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"; // icons
import {
  Flex,
  Text,
  Button,
  useDisclosure,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import AccountModal from "../external/AccountModal";

// components

type NavbarConnectedProps = {
  address: string;
  handle?: string;
};

const NavbarConnectedMobile = ({ address, handle }: NavbarConnectedProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      justify="space-around"
      bgGradient="linear(to-r, #31108F, #7A3CE3, #E53C79, #E8622C, #F5C144)"
      height="65px"
      align="center"
      alignItems="center"
      width="100%"
    >
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Flex display="flex" align="center">
          <Link to="./">
            <Text color="white" fontWeight="700" fontSize="lg" mr={3}>
              Feed
            </Text>
          </Link>

          <Link to="./">
            <Text color="white" fontWeight="700" fontSize="lg" mx={3}>
              Post
            </Text>
          </Link>
        </Flex>
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        <Flex display="flex" align="center">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon color="lensDark" />}
            >
              <Text fontWeight="700" fontSize="14px" color="lensDark">
                @{handle}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to={`/${handle}`} prefetch="intent">
                My profile
              </MenuItem>

              <MenuItem as={Text} onClick={onOpen}>
                My wallet
              </MenuItem>

              <MenuItem as={Text} onClick={toggleColorMode}>
                Change color mode
                {colorMode === "light" ? (
                  <MoonIcon ml="2" />
                ) : (
                  <SunIcon ml="2" />
                )}
              </MenuItem>
            </MenuList>
          </Menu>

          {/* {authenticatedInLens && (
            <Link to={`/${handle}`} prefetch="intent">
              <Button
                bg="lens"
                borderRadius="10px"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                mr="5"
              >
                <Text fontWeight="600" fontSize="14px" color="lensDark">
                  @{handle}
                </Text>
              </Button>
            </Link>
          )} */}
          {/* 
          <Button
            bg="first"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            onClick={onOpen}
          >
            <Text fontSize="14px" color="white">
              {`${address.slice(0, 6)} ... ${address.slice(
                address.length - 4,
                address.length
              )}`}
            </Text>
          </Button> */}
        </Flex>
      </Flex>

      <AccountModal isOpen={isOpen} onClose={onClose} address={address} />
    </Flex>
  );
};

export default NavbarConnectedMobile;
