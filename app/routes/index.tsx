import { Box } from "@chakra-ui/react";

// components
import NavbarLanding from "~/components/landing/NavbarLanding";
import SectionOne from "~/components/landing/SectionOne";
import Resume from "~/components/landing/Resume";
import AccumulatedProfiles from "~/components/landing/AccumulatedProfiles";
import BuildWith from "~/components/landing/BuiltdWith";
import FooterLanding from "~/components/landing/FooterLanding";

export default function Index() {
  return (
    <Box width="100%">
      <NavbarLanding />
      <SectionOne />
      <Resume />
      <AccumulatedProfiles />
      <BuildWith />
      <FooterLanding />
    </Box>
  );
}
