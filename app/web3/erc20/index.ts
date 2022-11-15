import { ethers } from "ethers";

import { getSignerBack } from "../etherservice";

import { aWMA_CONTRACT_ADDRESS, ERC20_HUB_ABI } from "./erc20-hub";

import { formatEther } from "~/utils/formatEther";

async function getWMATICBalance(address: string) {
  const awmaticContract = new ethers.Contract(
    aWMA_CONTRACT_ADDRESS,
    ERC20_HUB_ABI,
    getSignerBack()
  );

  const balance = await awmaticContract.balanceOf(address);

  return Number(formatEther(balance));
}

export { getWMATICBalance };
