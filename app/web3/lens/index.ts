import { ethers } from "ethers";
import { getSignerBack } from "../etherservice";

import { LENS_HUB_ABI, LENS_HUB_CONTRACT_ADDRESS } from "./lens-hub";

async function getFollowModule(profileId: string) {
  const lensContract = new ethers.Contract(
    LENS_HUB_CONTRACT_ADDRESS,
    LENS_HUB_ABI,
    getSignerBack()
  );

  let followModuleAddress = "";

  try {
    followModuleAddress = await lensContract.getFollowModule(profileId);
  } catch (error) {
    console.log(error);
  }

  return followModuleAddress;
}

export { getFollowModule };
