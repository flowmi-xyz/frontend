import PolygonLogo from "~/components/logos/PolygonLogo";
import type { ChainName } from "~/web3/blockchain.types";

type LogoNetworkProps = {
  chainName: ChainName;
};

function LogoNetwork({ chainName }: LogoNetworkProps) {
  // if (props.chainName === 'eth') {
  //   return <EthereumLogo width={25} height={25} />;
  // }

  if (chainName === "matic" || chainName === "maticmum") {
    return <PolygonLogo />;
  }

  // if (props.chainName === 'bsc') {
  //   return <BnbChainLogo width={25} height={25} />;
  // }

  // if (
  //   props.chainName === 'avalanche' ||
  //   props.chainName === 'avalanche testnet'
  // ) {
  //   return <AvalancheLogo width={25} height={25} />;
  // }

  // if (props.chainName === 'fantom') {
  //   return <FantomLogo width={25} height={25} />;
  // }

  return <PolygonLogo />;
}

export default LogoNetwork;
