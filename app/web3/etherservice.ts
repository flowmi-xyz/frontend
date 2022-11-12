import { ethers } from "ethers";

import { MUMBAI_RPC_URL } from "./lens/lens-hub";

function getSignerFront() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
}
function getSignerBack() {
  const signer = new ethers.Wallet(
    "4b0cde541441ce3e537c6d69f257fbdd543fc55e7e86b72e8a47ecf878fb2e55",
    new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL)
  );

  return signer;
}

export { getSignerFront, getSignerBack };
