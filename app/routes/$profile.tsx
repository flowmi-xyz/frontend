// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { GraphQLClient } from "graphql-request";
import { GetDefaultProfile } from "~/web3/lens/lens-api";

import { getSession } from "~/bff/session";
// UI components
import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";
import ProfileParticipation from "~/components/ProfileParticipation";

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

      <Grid templateColumns="repeat(3, 1fr)">
        <GridItem colSpan={2}>
          <Box p="10">
            Image
            <Text>Cristian Valdivia</Text>
            <Text>@cristianvaldivia.lens</Text>
            <Flex>
              <Box>
                <Text>24</Text>
                <Text>Followers</Text>
              </Box>

              <Box>
                <Text>34</Text>
                <Text>Following</Text>
              </Box>
            </Flex>
            <Text>Building web3</Text>
            <Divider />
            <Flex>
              <Text>#</Text>
              <Text>0x01</Text>
            </Flex>
            <Flex>
              <Text>9</Text>
              <Text>Chile</Text>
            </Flex>
            <Flex>
              <Text>#</Text>
              <Text>cristianvaldivia.eth</Text>
            </Flex>
            <Flex>
              <Text>#</Text>
              <Text>www.cristianvaldivia.cl</Text>
            </Flex>
            <Flex>
              <Text>#</Text>
              <Text>cris___stark</Text>
            </Flex>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <ProfileParticipation />
        </GridItem>
      </Grid>
    </Box>
  );
}
