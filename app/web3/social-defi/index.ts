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

async function getFundsInThisRaffle(address: string) {
  const flowmiContract = new ethers.Contract(
    FLOWMI_CONTRACT_ADDRESS,
    FLOWMI_HUB_ABI,
    getSignerBack()
  );

  let wmaticAccumulated = 0;

  try {
    const wmaticBalance = await flowmiContract.getFundsInThisRaffle(address);

    wmaticAccumulated = Number(formatEther(wmaticBalance));
  } catch (error) {
    console.log(error);
  }

  return wmaticAccumulated;
}

async function getGoal() {
  const flowmiContract = new ethers.Contract(
    FLOWMI_CONTRACT_ADDRESS,
    FLOWMI_HUB_ABI,
    getSignerBack()
  );

  let goalOfFollowers = 0;

  try {
    goalOfFollowers = await flowmiContract.getGoal();

    goalOfFollowers = Number(goalOfFollowers);
  } catch (error) {
    console.log(error);
  }

  return goalOfFollowers;
}

async function getNumberOfFollowers(address: string) {
  // Get how much pay in WMATIC
  const flowmiContract = new ethers.Contract(
    FLOWMI_CONTRACT_ADDRESS,
    FLOWMI_HUB_ABI,
    getSignerBack()
  );

  // Get count of followers
  let countFollowers = 0;

  try {
    countFollowers = await flowmiContract.getNumberOfFollowers(address);

    countFollowers = Number(countFollowers);
  } catch (error) {
    console.log(error);
  }

  return countFollowers;
}
export {
  getTotalFundedProfile,
  getFundsInThisRaffle,
  getGoal,
  getNumberOfFollowers,
};
