// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

// UI components
import { Box } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import HotProfiles from "~/components/HotProfiles";
import ProfileParticipation from "~/components/ProfileParticipation";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const accessToken = session.get("accessToken");

  return { address, accessToken };
};

export default function Dashboard() {
  const { address, accessToken } = useLoaderData();

  return (
    <Box bg="#FAFAF9" height="100vh">
      <NavbarConnected address={address} authenticatedInLens={true} />

      <ProfileParticipation />

      <HotProfiles />

      <Outlet />
    </Box>
  );
}
