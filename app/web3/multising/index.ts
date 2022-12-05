import { ethers } from "ethers";

import { formatEther } from "~/utils/formatEther";

import { getSignerBack } from "../etherservice";

import { MULTISIG_CONTRACT_ADDRESS, MULTISIG_HUB_ABI } from "./multisig-hub";

async function getTransactionCount(): Promise<number> {
  const multisigContract = new ethers.Contract(
    MULTISIG_CONTRACT_ADDRESS,
    MULTISIG_HUB_ABI,
    getSignerBack()
  );

  const transactionCount = await multisigContract.getTransactionCount();

  return Number(formatEther(transactionCount));
}

export { getTransactionCount };
