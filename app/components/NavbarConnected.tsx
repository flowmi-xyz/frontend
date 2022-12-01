import React from "react";

import { Link } from "@remix-run/react";

import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";

// components
import SearchBar from "./SearchBar";
import AccountModal from "./external/AccountModal";
import ChainButton from "./external/chainButton/ChainButton";

type NavbarConnectedProps = {
  address: string;
  authenticatedInLens: boolean;
  handle?: string;
};

const NavbarConnected = ({
  address,
  authenticatedInLens,
  handle,
}: NavbarConnectedProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justify="space-around"
      bgGradient="linear(to-r, #FFB83F, #FF5873)"
      height="65px"
      align="center"
      alignItems="center"
      width="100%"
    >
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Link to="/dashboard/feed">
          <Text fontWeight="700" fontSize="20" color="white">
            Modulens
          </Text>
        </Link>

        <SearchBar />
      </Flex>

      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Flex display="flex" align="center">
          <ChainButton />

          {authenticatedInLens && (
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
          )}

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
          </Button>
        </Flex>
      </Flex>

      <AccountModal isOpen={isOpen} onClose={onClose} address={address} />
    </Flex>
  );
};

export default NavbarConnected;
