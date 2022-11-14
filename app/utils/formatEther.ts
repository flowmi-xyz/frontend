import type { BigNumber, BigNumberish } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function formatEther(wei: BigNumberish): string {
  return formatUnits(wei, 18);
}

export function parseEther(ether: string): BigNumber {
  return parseUnits(ether, 18);
}
