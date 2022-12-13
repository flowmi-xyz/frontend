import { Box } from "@chakra-ui/layout";
import NavbarConnectedDesktop from "./NavbarConnectedDesktop";
import NavbarConnectedMobile from "./NavbarConnectedMobile";

type NavbarConnectedProps = {
  address: string;
  handle?: string;
};

const NavbarConnected = ({ address, handle }: NavbarConnectedProps) => {
  return (
    <>
      <Box display={["block", "none", "none", "none"]}>
        <NavbarConnectedMobile address={address} handle={handle} />
      </Box>

      <Box display={["none", "block", "block", "block"]}>
        <NavbarConnectedDesktop address={address} handle={handle} />
      </Box>
    </>
  );
};

export default NavbarConnected;
