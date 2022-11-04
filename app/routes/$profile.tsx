import { Box, Text } from "@chakra-ui/react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { GraphQLClient } from "graphql-request";
import { getSession } from "~/bff/session";
import NavbarConnected from "~/components/NavbarConnected";
import { GetDefaultProfile } from "~/web3/lens/lens-api";

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const accessToken = session.get("accessToken");

  // Get default profile from Lens
  const lens = new GraphQLClient("https://api.lens.dev/playground");

  const variables: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lens.request(GetDefaultProfile, variables);

  const profile = responseProfile.defaultProfile;

  return { address, accessToken, profile };
};

export default function Profile() {
  const { address, profile } = useLoaderData();

  return (
    <Box bg="#FAFAF9">
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handler={profile.handle}
      />

      <Text>Cris Valdivia</Text>
    </Box>
  );
}
