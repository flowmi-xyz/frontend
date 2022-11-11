import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import LensterFooter from "./external/LensterFooter";

const HotProfilesArr = [
  {
    name: "fabri.lens",
    handle: "fabri.lens",
    image:
      "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreifflpxyheb2bzqeygz7c3h3ytvpxcfobg5gl3liozawj64ph2jafu",
    accumulatedTokens: 12,
  },
  {
    name: "Cris Valdivia",
    handle: "cristianvaldivia.lens",
    image:
      "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreichwq6umgahyohbekflyclq7o7y2u46jatkhwqueqfl2koortgeve",
    accumulatedTokens: 5,
  },
  {
    name: "Guty",
    handle: "gutybv.lens",
    image:
      "https://img.lenster.io/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreidbnm4dapoitvrl52urbnzursub4jy4ncw2q4zpoptlfalruqvdau",
    accumulatedTokens: 2,
  },
];

const SettingsBox = () => {
  return (
    <>
      <Box
        bg="white"
        border="1px"
        borderColor="lensDark"
        borderRadius="10px"
        width="420px"
        mt="10"
        p="5"
      >
        <Text
          fontWeight="700"
          fontSize="18px"
          lineHeight="120%"
          letterSpacing="-0.03em"
          color="lensDark"
          pb="2"
        >
          Setup your Lens profile
        </Text>

        <Text
          fontWeight="500"
          fontSize="15px"
          lineHeight="120%"
          letterSpacing="-0.03em"
          color="lensDark"
          pb="1"
        >
          Create profiles
        </Text>

        <Text
          fontWeight="500"
          fontSize="15px"
          lineHeight="120%"
          letterSpacing="-0.03em"
          color="lensDark"
          pb="1"
        >
          Set default profile
        </Text>

        <Text
          fontWeight="500"
          fontSize="15px"
          lineHeight="120%"
          letterSpacing="-0.03em"
          color="lensDark"
          pb="1"
        >
          Set follow module
        </Text>

        <Text
          fontWeight="500"
          fontSize="15px"
          lineHeight="120%"
          letterSpacing="-0.03em"
          color="lensDark"
          pb="1"
        >
          Whitelist module
        </Text>
      </Box>
    </>
  );
};

export default SettingsBox;
