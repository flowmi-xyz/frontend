// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import { Box } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";
import LensterFeed from "~/components/external/LensterFeed";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  return address;
};

export default function Dashboard() {
  const address = useLoaderData();

  return (
    <Box bg="#FAFAF9" height="100vh">
      <NavbarConnected address={address} />

      <ProfileParticipation />

      <HotProfiles />

      <LensterFeed />
    </Box>
  );
}
