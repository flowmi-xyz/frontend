import { ethers } from "ethers";

import { getSignerBack } from "../etherservice";

import { ADS_HUB_ABI, Ads_CONTRACT_ADDRESS } from "./ads-module-hub";

import { formatEther } from "~/utils/formatEther";

async function getGlobalBudget(
  profileId: string,
  currency: string
): Promise<Number> {
  const budgetContract = new ethers.Contract(
    Ads_CONTRACT_ADDRESS,
    ADS_HUB_ABI,
    getSignerBack()
  );
  const balance = await budgetContract.getGlobalBudget(currency, profileId);

  return Number(formatEther(balance));
}

async function getPostBudget(
  profileId: string,
  publicationId: string
): Promise<Number> {
  const budgetContract = new ethers.Contract(
    Ads_CONTRACT_ADDRESS,
    ADS_HUB_ABI,
    getSignerBack()
  );
  const balance = await budgetContract.getPostBudget(publicationId, profileId);

  return Number(formatEther(balance));
}

export { getGlobalBudget, getPostBudget };

// una funcion que me de los ids de las publciacioe sque he hecho
