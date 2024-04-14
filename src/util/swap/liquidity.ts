import { useCallback, useEffect, useMemo } from "react";
import { isAddress } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { compareAddress } from "../address";
import { useRouterAllowance, useRouterApprove } from "./erc20";
import { getSwapDeadline } from "./swap";
import { factory, pairABI, router, wtDEAIAddress } from "./swapContracts";

export function useLiquidity(tokenAddress: string) {
  const { address } = useAccount();

  const allowance = useRouterAllowance(tokenAddress);
  const approveRaw = useRouterApprove(tokenAddress);

  const { data: pairAddress } = useReadContract({
    ...factory,
    functionName: "getPair",
    args: [tokenAddress as `0x${string}`, wtDEAIAddress]
  });

  const { data: pairDataResult, refetch } = useReadContract({
    address: pairAddress,
    abi: pairABI,
    args: [],
    functionName: "getReserves",
  });

  useEffect(() => {
    const interval = setInterval(refetch, 10000);
    return () => clearInterval(interval);
  }, [refetch]);

  const { writeContractAsync } = useWriteContract();

  const send = useCallback((amountToken: bigint, amountETH: bigint) => writeContractAsync({
    ...router,
    functionName: "addLiquidityETH",
    args: [tokenAddress as `0x${string}`, amountToken, amountToken / 2n, amountETH / 2n, address!, getSwapDeadline()],
    value: amountETH,
  }), [address, tokenAddress, writeContractAsync]);

  const reserves = useMemo(() => {
    if (!tokenAddress || !isAddress(tokenAddress)) return {
      token: 0n,
      eth: 0n,
    };

    const token_0 = compareAddress(tokenAddress, wtDEAIAddress) === -1 ? "token" : "eth";
    const token_1 = compareAddress(tokenAddress, wtDEAIAddress) === 1 ? "token" : "eth";

    const r_0 = pairDataResult?.[0] || 0n;
    const r_1 = pairDataResult?.[1] || 0n;

    return {
      [token_0]: r_0,
      [token_1]: r_1,
    } as {
      token: bigint;
      eth: bigint;
    };
  }, [pairDataResult, tokenAddress]);

  return {
    pairAddress,
    addLiquidity: async (
      amountToken: bigint, amountETH: bigint,
    ) => {
      if (!address || typeof allowance !== "bigint" || !isAddress(tokenAddress)) return undefined;
      if (allowance < amountToken) {
        return approveRaw(amountToken);
      } else {
        return send(amountToken, amountETH);
      }
    },
    reserves,
    allowance,
  };

}