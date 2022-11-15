import type { LinksFunction } from "@remix-run/node";

import { Box, Text } from "@chakra-ui/react";

// import styles from "~/styles/index.css";

import NavbarLanding from "~/components/NavbarLanding";

// export let links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: styles }];
// };

export default function Index() {
  return (
    <Box>
      <NavbarLanding />

      <Text color={"red"}> Yapo mierda</Text>
    </Box>
  );
}
