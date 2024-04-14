import { useCallback, useEffect } from "react";
import { erc20Abi } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { routerAddress } from "./swapContracts";

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals?: number;
}


export function useRouterAllowance(tokenAddress: string) {
  const { address } = useAccount();

  const { data, refetch } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: "allowance",
    args: [address!, routerAddress],
    blockTag: "latest"
  });

  useEffect(() => {
    const interval = setInterval(refetch, 10000);
    return () => clearInterval(interval);
  }, [refetch]);

  return data;
}

export function useRouterApprove(tokenAddress: string) {
  const { writeContractAsync } = useWriteContract();

  return useCallback(async (amount: bigint) => writeContractAsync({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: "approve",
    args: [routerAddress, amount]
  }), [tokenAddress, writeContractAsync]);
}