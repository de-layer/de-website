'use client';

import AddChainButton from "@/components/testnet/AddChain";
import Link from "next/link";

export default function TestnetPage() {
  return (
    <div className="w-full max-w-lg mx-auto min-h-96 relative z-20 my-32 rounded-lg border-white border backdrop-blur-lg text-white flex flex-col items-start justify-start p-4">
      <h1 className="text-xl font-medium w-full text-center">Daozang Testnet</h1>

      <p>
        The Daozang Testnet is the first step towards building the De Layer ecosystem.
      </p>

      <p>
        In the initial phase, the testnet will be used by the developers to test the integration of Bittensor and EVM,
        and ensure that the network is secure and stable.
      </p>


      <p className="mt-4">
        To add the testnet to your wallet, click:
      </p>
      <AddChainButton />

      {/* <p className="mt-4">
        To open the explorer, click:
      </p>
      <a
        className="py-2 px-3 border border-white rounded-md cursor-pointer"
        rel="noreferrer"
        target="_blank"

      >
        Explorer
      </a> */}

      <p className="mt-4">
        If you are a developer and want to get some testnet tokens, click:
      </p>
      <Link
        className="py-2 px-3 border border-white rounded-md cursor-pointer"
        href="/dapp/faucet"
      >
        Faucet
      </Link>
    </div>
  );
}