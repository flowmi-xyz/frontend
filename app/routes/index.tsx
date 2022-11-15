import { Box } from "@chakra-ui/react";

// components
import NavbarLanding from "~/components/landing/NavbarLanding";
import BuildWith from "~/components/landing/BuiltdWith";
import FooterLanding from "~/components/landing/FooterLanding";

export default function Index() {
  return (
    <Box>
      <NavbarLanding />

      <BuildWith />
      <FooterLanding />
    </Box>
  );
}
