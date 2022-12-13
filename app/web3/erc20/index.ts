import { ethers } from "ethers";

import { getSignerBack } from "../etherservice";

import {
  WMATIC_CONTRACT_ADDRESS,
  aWMA_CONTRACT_ADDRESS,
  WEth_CONTRACT_ADDRESS,
  ERC20_HUB_ABI,
  DAI_CONTRACT_ADDRESS,
  USDC_CONTRACT_ADDRESS,
  TOU_CONTRACT_ADDRESS,
} from "./erc20-hub";

import { formatEther } from "~/utils/formatEther";

async function getDAIBalance(address: string) {
  const daiContract = new ethers.Contract(
    DAI_CONTRACT_ADDRESS,
    ERC20_HUB_ABI,
    getSignerBack()
  );
  const balance = await daiContract.balanceOf(address);

  return Number(formatEther(balance));
}

async function getUSDCBalance(address: string) {
  const usdcContract = new ethers.Contract(
    USDC_CONTRACT_ADDRESS,
    ERC20_HUB_ABI,
    getSignerBack()
  );
  const balance = await usdcContract.balanceOf(address);

  return Number(formatEther(balance));
}

async function getTOUBalance(address: string) {
  const touContract = new ethers.Contract(
    TOU_CONTRACT_ADDRESS,
    ERC20_HUB_ABI,
    getSignerBack()
  );
  const balance = await touContract.balanceOf(address);

  return Number(formatEther(balance));
}

async function getWEthBalance(address: string) {
  const wethContract = new ethers.Contract(
    WEth_CONTRACT_ADDRESS,
    ERC20_HUB_ABI,
    getSignerBack()
  );
  const balance = await wethContract.balanceOf(address);

  return Number(formatEther(balance));
}

async function getWMATICBalance(address: string) {
  const awmaticContract = new ethers.Contract(
    WMATIC_CONTRACT_ADDRESS,
    ERC20_HUB_ABI,
    getSignerBack()
  );

  const balance = await awmaticContract.balanceOf(address);

  return Number(formatEther(balance));
}

async function getaWMATICBalance(address: string) {
  const awmaticContract = new ethers.Contract(
    aWMA_CONTRACT_ADDRESS,
    ERC20_HUB_ABI,
    getSignerBack()
  );

  const balance = await awmaticContract.balanceOf(address);

  return Number(formatEther(balance));
}

export {
  getWMATICBalance,
  getaWMATICBalance,
  getWEthBalance,
  getUSDCBalance,
  getDAIBalance,
  getTOUBalance,
};
