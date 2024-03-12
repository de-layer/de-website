import { useCallback, useMemo } from "react";
import { erc20Abi } from "viem";
import { useAccount, useChainId, useConfig, useReadContract, useSwitchChain, useWriteContract } from "wagmi";
import { waitForTransaction } from "wagmi/actions";
import AdapterInfo from "./abi/DeLayerAdapter.json";
import BridgedInfo from "./abi/DeLayerBridged.json";

export const mainnetAdapterAddress = "0x478769B86Acf0E13132BAcaC6aeDF11fF939a596";
const mainnetAdapter = {
  address: mainnetAdapterAddress,
  abi: AdapterInfo.abi
} as const;

export const baseBridgedTokenAddress = "0x95d486af638a6972f9c0be2c29d281e404acb08a";
const baseBridgedToken = {
  address: baseBridgedTokenAddress,
  abi: BridgedInfo.abi
} as const;

export const mainnetTokenAddress = "0xD849882983F1bA8A3c23B16b65BB0173A7f63b63";
const mainnetToken = {
  address: mainnetTokenAddress,
  abi: erc20Abi
} as const;

export type ChainName = "eth" | "base";

export function useSwitchChainApp(targetChain: ChainName) {
  const chainId = useChainId();
  const { chainId: accChainId } = useAccount();
  const { switchChainAsync, chains, switchChain } = useSwitchChain();

  return useCallback(() => {
    const targetId = targetChain === "eth" ? 1 : 8453;

    if (targetId !== chainId || targetId !== accChainId) {
      if (!chains.find(c => c.id === targetId)) {
        alert(`Please add the ${targetChain.toUpperCase()} chain to your wallet first.`);
        return Promise.reject();
      }

      return switchChainAsync({ chainId: targetId })
        .catch(e => {
          console.error(e);
          alert(`Please switch to the ${targetChain.toUpperCase()} chain manually and try again.`);
          return Promise.reject();
        });
    } else {
      return Promise.resolve();
    }
  }, [accChainId, targetChain, switchChainAsync, chainId, chains]);
}

export function useBalance(chain: ChainName) {
  const { address } = useAccount();
  const contract = (chain === "eth" ? mainnetToken : baseBridgedToken) as typeof baseBridgedToken;

  const { data } = useReadContract({
    ...contract,
    functionName: "balanceOf",
    args: [address]
  });

  return typeof data === "bigint" ? data : 0n;
}

export function useSend(from: ChainName, address: string | undefined = "", amount: bigint | undefined) {
  const { contract, sendOptions, readArgs } = useMemo(() => {
    const contract = from === "eth" ? mainnetAdapter : baseBridgedToken;
    const opts = {
      dstEid: from === "eth" ? 30184 : 30101,
      to: `0x${address.replace("0x", "").padStart(64, "0")}`,
      amountLD: amount,
      minAmountLD: amount,
      extraOptions: "0x00030100110100000000000000000000000000030d40", // 200 000 gas
      composeMsg: "0x0",
      oftCmd: "0x0",
    };

    return {
      contract,
      sendOptions: opts,
      readArgs: [opts, false]
    };
  }, [from, address, amount]);

  const estimate = useReadContract({
    ...contract,
    functionName: "quoteSend",
    args: readArgs
  });

  const nativeFee = useMemo(() => {
    if (!estimate || !estimate.data || typeof estimate.data !== "object") {
      return 0n;
    }

    let fee = 0n;

    if ("nativeFee" in (estimate.data as any)) {
      fee = (estimate.data as any).nativeFee as bigint;
    }

    return fee * 3n / 2n;
  }, [estimate]);

  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  return useCallback(async () => {
    if (!address || !amount || nativeFee === 0n || !nativeFee) {
      alert("Invalid input. Please try again.");
      return Promise.reject();
    }

    if (from === "eth") {
      const tx = await writeContractAsync({
        ...mainnetToken,
        functionName: "approve",
        args: [contract.address, amount]
      });
      await waitForTransaction(config, { hash: tx, chainId: 1 });
    }

    return writeContractAsync({
      ...contract,
      functionName: "send",
      args: [sendOptions, { nativeFee, lzTokenFee: 0n }, address],
      value: nativeFee,
    });
  }, [address, contract, nativeFee, sendOptions, writeContractAsync, amount, from, config]);
}