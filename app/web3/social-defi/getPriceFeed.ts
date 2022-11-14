import { ethers } from "ethers";
import { formatEther } from "~/utils/formatEther";
import { getSignerBack } from "../etherservice";

import { FLOWMI_CONTRACT_ADDRESS, FLOWMI_HUB_ABI } from "./index";

async function getPriceFeedFromFlowmi() {
  const flowmiContract = new ethers.Contract(
    FLOWMI_CONTRACT_ADDRESS,
    FLOWMI_HUB_ABI,
    getSignerBack()
  );

  let priceFeedMaticUSD = 0;

  try {
    const priceFeed = await flowmiContract.getPriceFeed();

    priceFeedMaticUSD = Number(formatEther(priceFeed));
  } catch (error) {
    console.log(error);
  }

  return priceFeedMaticUSD;
}

export default getPriceFeedFromFlowmi;
