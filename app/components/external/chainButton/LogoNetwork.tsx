import { Image } from "@chakra-ui/react";

import type { ChainName } from "~/web3/blockchain.types";

type LogoNetworkProps = {
  chainName: ChainName;
};

function LogoNetwork({ chainName }: LogoNetworkProps) {
  if (chainName === "matic" || chainName === "maticmum") {
    return <Image src="../assets/logos/polygon-matic-logo.png" w="6" h="6" />;
  }

  return <Image src="../assets/logos/polygon-matic-logo.png" w="6" h="6" />;
}

export default LogoNetwork;
