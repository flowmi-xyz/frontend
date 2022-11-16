import { ethers } from "ethers";
import { networks } from "../blockchain.types";

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

async function switchNetwork() {
  checkMetamaskAvailability();

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networks.maticmum.chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: networks.maticmum.chainId,
              chainName: networks.maticmum.chainName,
              rpcUrls: ["https://polygonscan.com/"],
            },
          ],
        });
      } catch (addError) {
        console.log(addError);
      }
    }
    // handle other "switch" errors
    console.log(switchError);
  }
}

export { loginWithMetamask, signWithMetamask, switchNetwork };
