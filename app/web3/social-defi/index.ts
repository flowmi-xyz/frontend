import { ethers } from "ethers";
import { getSignerBack } from "../etherservice";
import { formatEther } from "~/utils/formatEther";

import { FLOWMI_CONTRACT_ADDRESS, FLOWMI_HUB_ABI } from "./social-defi-hub";

async function getTotalFundedProfile(address: string) {
  const flowmiContract = new ethers.Contract(
    FLOWMI_CONTRACT_ADDRESS,
    FLOWMI_HUB_ABI,
    getSignerBack()
  );

  let totalFounded = 0;

  try {
    totalFounded = await flowmiContract.getTotalFundedProfile(address);

    totalFounded = Number(formatEther(totalFounded));
  } catch (error) {
    console.log(error);
  }

  return totalFounded;
}

export { getTotalFundedProfile };
