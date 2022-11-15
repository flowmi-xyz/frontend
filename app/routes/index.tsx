import { Box } from "@chakra-ui/react";

// components
import FooterLanding from "~/components/landing/FooterLanding";
import NavbarLanding from "~/components/landing/NavbarLanding";

export default function Index() {
  return (
    <Box>
      <NavbarLanding />

      <FooterLanding />
    </Box>
  );
}
