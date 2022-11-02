import { Box } from "@chakra-ui/react";

// components
import NavbarApp from "~/components/NavbarApp";
import ConnectWallet from "~/components/external/ConnectWallet";

export default function Index() {
  return (
    <Box>
      <NavbarApp />
      <ConnectWallet />
    </Box>
  );
}
