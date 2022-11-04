import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

function checkMetamaskAvailability(): boolean {
  console.log("[web3][metamask][checkMetamaskAvailability]");
  const { ethereum } = window;

  if (!ethereum) {
    throw new Error("Metamask is not available");
  }

  return false;
}

async function loginWithMetamask() {
  checkMetamaskAvailability();

  const [address] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  console.log("[web3][metamask][loginWithMetamask] address", address);

  return address;
}

async function signWithMetamask(text: string) {
  checkMetamaskAvailability();

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const signature = await signer.signMessage(text);

  return signature;
}

export { loginWithMetamask, signWithMetamask };
