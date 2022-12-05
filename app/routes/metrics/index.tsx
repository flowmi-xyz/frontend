// BFF components
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getSession } from "~/bff/session";

import { lensClient } from "~/web3/lens/lens-client";
import { GetDefaultProfile } from "~/web3/lens/graphql/generated";

// UI components
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

// components
import NavbarConnected from "~/components/NavbarConnected";

import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Chart } from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Filler);

export const loader: LoaderFunction = async ({ request }) => {
  // Get address from cookie session
  const session = await getSession(request.headers.get("Cookie"));

  const address = session.get("address");

  // Get default profile from Lens
  const variables: any = {
    request: { ethereumAddress: address },
  };

  const responseProfile = await lensClient.request(
    GetDefaultProfile,
    variables
  );

  const defaultProfile = responseProfile.defaultProfile;

  return { address, defaultProfile };
};

export default function Metrics() {
  const { address, defaultProfile } = useLoaderData();

  const labels = [
    "Jan 2023",
    "Feb 2023",
    "Mar 2023",
    "Apr 2023",
    "May 2023",
    "Jun 2023",
    "Jul 2023",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "MMR",
        data: [10, 25, 36, 32, 33, 44, 50],
        borderColor: "#31108F",
        borderWidth: 4,
        lineTension: 0.3,
        fill: true,
        backgroundColor: "rgba(49, 16, 143, 0.1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        max: Math.max(...data.datasets[0].data) * 1.2,
        min: 0,
      },
    },
  };

  return (
    <Box>
      <NavbarConnected
        address={address}
        authenticatedInLens={true}
        handle={defaultProfile?.handle}
      />

      <Box maxWidth="1000px" m="auto" pt="3" pb="3">
        <Box>
          <Text
            fontWeight="700"
            fontSize={["40px", "55px", "45px"]}
            lineHeight={["48px", "66px", "66px"]}
            color="black"
            pt="50px"
          >
            Métricas de nuestros modulos
          </Text>

          <Text
            textAlign="justify"
            fontSize="22px"
            lineHeight="28.8ppx"
            color="grayLetter"
            pt="5"
          >
            En esta sección podrás ver las métricas de nuestros modulos.
          </Text>
        </Box>
        <Text fontWeight="600" fontSize="36px" color="black" pt="10">
          ADS Module (mirror to earn)
        </Text>

        <Box>
          <Text fontWeight="700" fontSize="20px" color="grayLetter">
            MMR
          </Text>
          <Text fontWeight="700" fontSize="36px" color="first">
            $134
          </Text>
        </Box>

        <Box pt="5">
          <Line options={options} data={data} />
        </Box>
      </Box>
    </Box>
  );
}
