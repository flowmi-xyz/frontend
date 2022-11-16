// BFF components
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useSubmit, useTransition } from "@remix-run/react";

import { lensClient } from "~/web3/lens/lens-client";
import { GetChallengue } from "~/web3/lens/graphql/generated";
import authenticateInLens from "~/web3/lens/authentication/authenticate";

import { commitSession, getSession } from "~/bff/session";

// UI components
import { useEffect } from "react";
import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";

import { signWithMetamask, switchNetwork } from "~/web3/metamask";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  // Start challenge with Lens API
  const variables: any = {
    request: { address: address },
  };

  const challengeResponse = await lensClient.request(GetChallengue, variables);

  const challengeText = challengeResponse.challenge.text;

  return { address, challengeText };
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  const form = await request.formData();

  const signature = form.get("signature");

  if (!signature || typeof signature !== "string") return null;

  const authResponse = await authenticateInLens(address, signature);

  session.set("accessToken", authResponse.authenticate.accessToken);
  session.set("refreshToken", authResponse.authenticate.refreshToken);

  return redirect(`/dashboard/feed`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function AuthLens() {
  const { address, challengeText } = useLoaderData();

  const submit = useSubmit();
  const transition = useTransition();

  const handleSignChallengeText = async () => {
    const signature = await signWithMetamask(challengeText);

    const formData = new FormData();

    formData.append("signature", signature);

    submit(formData, {
      action: "/lens/?index",
      method: "post",
      encType: "application/x-www-form-urlencoded",
      replace: true,
    });
  };

  useEffect(() => {
    // declare the data fetching function
    const changeNetwork = async () => {
      await switchNetwork();
    };

    // call the function
    changeNetwork()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <Box bg="#FAFAF9" height="100vh">
      <NavbarConnected address={address} authenticatedInLens={false} />

      {transition.state === "idle" && (
        // {false && (
        <Center mt="50">
          <Box
            borderRadius="20"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            width="500px"
          >
            <Text
              fontWeight="700"
              fontSize="24px"
              lineHeight="120%"
              color="black"
              textAlign="center"
              mt="10"
            >
              Please sign the message
            </Text>

            <Text textAlign={"center"} mt="3">
              We need you sign the message
            </Text>

            <Text
              fontWeight="500"
              fontSize="15px"
              lineHeight="120%"
              color="grayLetter"
              textAlign="center"
              mt="2"
              p="10"
            >
              Social DeFi uses this signature to verify that you're the owner of
              this address
            </Text>

            <Center mt="10" mb="5">
              <Button
                bg="lens"
                borderRadius="10px"
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                onClick={handleSignChallengeText}
              >
                <Flex>
                  <Box w="40px" h="40px">
                    <Image
                      src="../assets/LOGO__lens_ultra small icon.png"
                      alt="lens"
                      my="-5px"
                      mx="-5px"
                    />
                  </Box>

                  <Text
                    fontWeight="700"
                    fontSize="18px"
                    lineHeight="21.6px"
                    color="lensDark"
                    m="auto"
                  >
                    Sign in with Lens
                  </Text>
                </Flex>
              </Button>
            </Center>
          </Box>
        </Center>
      )}

      {/* {true && ( */}
      {transition.state === "loading" && (
        <Box p="10">
          <Text textAlign="center" fontSize="26px" color="lensDark" mt="25px">
            Connecting with garden ...
          </Text>

          <Center mt="10">
            <Image
              src="../assets/animations/Lens-Anim4_16x10.gif"
              rounded="xl"
              w="50%"
            />
          </Center>
        </Box>
      )}
    </Box>
  );
}
