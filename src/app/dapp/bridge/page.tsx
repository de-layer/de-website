'use client';
import Navbar from "@/components/Navbar";
import { ChainName, useBalance, useSend, useSwitchChainApp } from "@/util/bridge";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

export default function BridgePage() {
  const [from, setFrom] = useState<ChainName>("eth");
  const [to, setTo] = useState<ChainName>("arbitrumOne");
  const [amountText, setAmountText] = useState<string>("2000");
  const [amount, setAmount] = useState<bigint>(() => parseEther("2000"));
  const [tx, setTx] = useState<string | null>(null);
  const balance = useBalance(from);

  useEffect(() => {
    try {
      setAmount(parseEther(amountText));
    } catch (e) {
      setAmount(0n);
    }
  }, [amountText]);

  const [loading, setLoading] = useState(false);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const switchChain = useSwitchChainApp(from);
  const send = useSend(from, to, address, amount);

  const action = async () => {
    setLoading(true);
    setTx(null);

    try {
      if (!address || !isConnected) {
        await open();
        return;
      }

      if (from === to) {
        alert("You cannot bridge to the same chain");
        return;
      }

      await switchChain();

      if (amount > balance) {
        alert("Insufficient balance");
        return;
      }

      const tx = await send();
      if (tx) {
        setTx(tx);
      } else {
        alert("Transaction failed");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred. Refresh the page and try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto min-h-96 relative z-20 my-32 rounded-lg border-white border backdrop-blur-lg text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-medium mb-auto">De Layer Bridge</h1>

      <div className="flex flex-col items-stretch justify-center">
        <label className="flex flex-row gap-2 items-start justify-start w-full">
          <span className="w-16">From:</span>
          <select
            value={from}
            onChange={e => setFrom(e.target.value as ChainName)}
            className="mb-4 text-black w-40"
          >
            <option value="eth" disabled={to === "eth"}>Ethereum</option>
            <option value="base" disabled={to === "base"}>Base Chain</option>
            <option value="arbitrumOne" disabled={to === "arbitrumOne"}>Arbitrum</option>
          </select>
        </label>

        <label className="flex flex-row gap-2 items-start justify-start w-full">
          <span className="w-16">To:</span>
          <select
            value={to}
            onChange={e => setTo(e.target.value as ChainName)}
            className="mb-4 text-black w-40"
          >
            <option value="eth" disabled={from === "eth"}>Ethereum</option>
            <option value="base" disabled={from === "base"}>Base Chain</option>
            <option value="arbitrumOne" disabled={from === "arbitrumOne"}>Arbitrum</option>
          </select>
        </label>

        <label className="flex flex-row gap-2 items-start justify-start w-full">
          <span className="w-16">Amount:</span>
          <input
            type="number"
            placeholder="2000"
            value={amountText}
            onChange={e => setAmountText(e.target.value)}
            className="text-black w-40"
          />
          DEAI
        </label>

        <label className="flex flex-row gap-2 items-start justify-start w-full mt-3">
          <span className="w-16">Balance:</span>
          <span className="text-white">
            {formatEther(balance).split(".")[0]} DEAI
          </span>
        </label>
      </div>

      <p className={`mb-4 mt-auto ${tx ? "visible" : "invisible"}`}>
        Bridge successful! Your funds will arrive in 5-10 minutes. <a
          className="underline"
          href={`https://layerzeroscan.com/tx/${tx}`}
          target="_blank"
          rel="noreferrer"
        >Check the Layer0 transaction here</a>.
      </p>

      <button className="py-2 px-3 border border-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed" disabled={amount === 0n || loading} onClick={action}>{address ? "Send tokens" : "Connect wallet"}</button>
    </div>
  );
}