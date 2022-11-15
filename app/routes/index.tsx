import { Box } from "@chakra-ui/react";

// components
import NavbarLanding from "~/components/landing/NavbarLanding";
import Resume from "~/components/landing/Resume";
import AccumulatedProfiles from "~/components/landing/AccumulatedProfiles";
import BuildWith from "~/components/landing/BuiltdWith";
import FooterLanding from "~/components/landing/FooterLanding";

export default function Index() {
  return (
    <Box>
      <NavbarLanding />
      <Resume />
      <AccumulatedProfiles />
      <BuildWith />
      <FooterLanding />
    </Box>
  );
}
