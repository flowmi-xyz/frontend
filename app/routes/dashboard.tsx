// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// UI components
import { Box } from "@chakra-ui/react";

import { getSession } from "~/bff/session";
import NavbarConnected from "~/components/NavbarConnected";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  return address;
};

export default function Dashboard() {
  const address = useLoaderData();

  return (
    <Box>
      <NavbarConnected address={address} />
    </Box>
  );
}
