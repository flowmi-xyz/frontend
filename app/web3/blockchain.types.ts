// Here define networks for project. Used in ChainButton component
export const networks: { [name: string]: Network } = {
  matic: {
    name: "Polygon",
    chainName: "matic",
    chainId: "0x89",
    dev: false,
    nativeToken: {
      balance: "0",
      symbol: "matic",
      decimals: 18,
      isNative: true,
    },
  },
  maticmum: {
    name: "Mumbai",
    chainName: "maticmum",
    chainId: "0x13881",
    dev: true,
    nativeToken: {
      balance: "0",
      symbol: "matic",
      decimals: 18,
      isNative: true,
    },
  },
};

export type TokenSymbol = "matic" | "WMATIC";

export type Token = {
  balance: string;
  symbol: TokenSymbol;
  decimals: number;
  address?: string;
  isNative: boolean;
};

export type ChainName = "matic" | "maticmum";

export type Network = {
  name: string;
  chainName: ChainName;
  chainId: string;
  dev: boolean;
  nativeToken: Token;
};
