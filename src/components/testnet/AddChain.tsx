"use client";

import { daozang } from "@/util/testnet";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useWalletClient } from "wagmi";

export default function AddChainButton() {
  const client = useWalletClient();
  const { address, chainId } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <button
      className="py-2 px-3 border border-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => {
        if (!address) {
          open();
          return;
        }

        if (chainId === daozang.id) {
          alert("You already added the chain");
          return;
        }

        console.log("Adding chain...", client.data);
        client.data?.addChain({ chain: daozang })
          .catch((err) => {
            console.error("Failed to add chain", err);
            alert("Failed to add chain");
          });
      }}
    >
      {address ? "Add chain" : "Connect wallet"}
    </button>
  );
}