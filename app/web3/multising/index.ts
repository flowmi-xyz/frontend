import { ethers } from "ethers";

import { formatEther } from "~/utils/formatEther";

import { getSignerBack } from "../etherservice";

import { MULTISIG_CONTRACT_ADDRESS, MULTISIG_HUB_ABI } from "./multisig-hub";

import type { MultisigTransaction } from "./multisig.types";

async function getTransactionCount(): Promise<number> {
  const multisigContract = new ethers.Contract(
    MULTISIG_CONTRACT_ADDRESS,
    MULTISIG_HUB_ABI,
    getSignerBack()
  );

  const transactionCount = await multisigContract.getTransactionCount();

  return Number(formatEther(transactionCount)) * 1e18;
}

async function getTransaction(
  transactionId: number
): Promise<MultisigTransaction> {
  const multisigContract = new ethers.Contract(
    MULTISIG_CONTRACT_ADDRESS,
    MULTISIG_HUB_ABI,
    getSignerBack()
  );

  const transactionFromContract = await multisigContract.getTransaction(
    transactionId
  );

  const transaction: MultisigTransaction = {
    id: transactionId,
    to: transactionFromContract[0],
    currency: transactionFromContract[2],
    value: Number(formatEther(transactionFromContract[1])),
    executed: transactionFromContract[3],
    numConfirmations: Number(formatEther(transactionFromContract[4])),
  };

  return transaction;
}
export { getTransactionCount, getTransaction };
