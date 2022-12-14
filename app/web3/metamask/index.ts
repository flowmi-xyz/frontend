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

async function switchNetwork(chainId: string = networks[1].chainId) {
  checkMetamaskAvailability();

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: networks[1].chainId,
              chainName: networks[1].chainName,
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

async function signTypedDataWithMetamask(typedMessage: any, address: string) {
  checkMetamaskAvailability();

  console.log(typedMessage);

  try {
    const signature = await window.ethereum.request({
      method: "eth_signTypedData",
      params: [[typedMessage], address],
    });
    return signature;
  } catch (error) {
    console.log(error);
  }
}

async function getChainId() {
  checkMetamaskAvailability();

  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  return chainId;
}

export {
  loginWithMetamask,
  signWithMetamask,
  switchNetwork,
  signTypedDataWithMetamask,
  getChainId,
};
