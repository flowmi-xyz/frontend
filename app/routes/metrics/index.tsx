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
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Chart } from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => 10 + Math.random() * 100),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => 10 + Math.random() * 100),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
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
          Ads Module
        </Text>
        <Line options={options} data={data} />;
      </Box>
    </Box>
  );
}
