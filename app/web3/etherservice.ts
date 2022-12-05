import type { TypedDataDomain } from "ethers";
import { ethers } from "ethers";
import { formatEther } from "~/utils/formatEther";
import { omit } from "~/utils/helpers";

import { POLYGON_RPC_URL } from "./lens/lens-hub";

function getSignerFront() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
}

function getSignerBack() {
  const signer = new ethers.Wallet(
    "4b0cde541441ce3e537c6d69f257fbdd543fc55e7e86b72e8a47ecf878fb2e55",
    new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL)
  );

  return signer;
}

async function getBalanceFromAddress(address: string): Promise<Number> {
  const provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);

  const balance = await provider.getBalance(address);

  const wmaticBalance = Number(formatEther(balance));

  return wmaticBalance;
}

function signedTypeData(
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>
) {
  const signer = getSignerFront();

  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export {
  getSignerFront,
  getSignerBack,
  getBalanceFromAddress,
  signedTypeData,
  truncateAddress,
};
